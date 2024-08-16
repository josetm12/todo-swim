import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import todoService from '@/services/todoService';
import { Button } from '@/components/ui/button';
import { debounceFn } from '@/lib/utils';
import { TodoData } from '@/lib/types';
import TodoFormPopup from '@/components/TodoFormPopup/TodoFormPopup';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';

import Lane from '@/pages/Home/Lane';
import {
  swimLanes,
  swimLaneValues,
  BREAK_POINT_WIDTH,
  RESET_DELAY,
  RESIZE_DEBOUNCE_TIME,
} from '@/lib/constants';

const createTodo = async (data: TodoData) => {
  const todoData = await todoService.create({
    title: data.title,
    status: data.status,
    is_priority: data.is_priority,
  });
  console.log(todoData);

  return todoData;
};

const getInitialData = (lane: TodoData['status']): TodoData => {
  return {
    title: '',
    status: lane,
    is_priority: false,
  };
};

const SwimlaneBoardComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleResize = debounceFn(() => {
      setIsMobile(window.innerWidth < BREAK_POINT_WIDTH);

      // Clear any previous timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      // Set a new timeout to reset isResizing
      resizeTimeout = setTimeout(() => {
        setIsResizing(false);
      }, RESET_DELAY);
    }, RESIZE_DEBOUNCE_TIME);

    handleResize();
    window.addEventListener('resize', () => {
      setIsResizing(true);
      handleResize();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clear any remaining timeout on component unmount
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  if (isResizing) {
    return (
      <div className="flex items-center justify-center h-full">Resizing...</div>
    );
  }

  return (
    <div className="container h-full mx-auto">
      {isMobile ? <MobileContainer /> : <DesktopContainer />}
    </div>
  );
};

const MobileContainer = () => {
  const [activeSwimLane, setActiveSwimLane] = useState<number>(0);
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const handlePrev = () => {
    setActiveSwimLane((prev) => (prev > 0 ? prev - 1 : swimLanes.length - 1));
  };

  const handleNext = () => {
    setActiveSwimLane((prev) => (prev < swimLanes.length - 1 ? prev + 1 : 0));
  };

  const getInitialData = (lane: TodoData['status']): TodoData => {
    return {
      title: '',
      status: lane,
      is_priority: false,
    };
  };

  return (
    <div className="relative h-full">
      <div className="flex justify-between items-center mb-4 pt-2">
        <Button variant="ghost" onClick={handlePrev} className="p-2">
          <ChevronLeft />
        </Button>
        <div className="lane-title-mobile h-8 flex gap-6 justify-between items-center">
          <h2 className="text-2xl font-bold">{swimLanes[activeSwimLane]}</h2>

          <TodoFormPopup
            onSubmit={async (data) => {
              const updatedData = await createTodo(data);
              queryClient.invalidateQueries({
                queryKey: ['todos', { status: swimLaneValues[activeSwimLane] }],
              });
              return updatedData;
            }}
            data={getInitialData(swimLaneValues[activeSwimLane])}
          >
            <Button variant="ghost" className="p-0 h-fit">
              <Plus className="h-8 w-8 p-0" />
            </Button>
          </TodoFormPopup>
        </div>
        <Button variant="ghost" onClick={handleNext} className="p-2">
          <ChevronRight />
        </Button>
      </div>
      <div className="overflow-hidden flex-1">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeSwimLane * 100}%)` }}
        >
          {swimLanes.map((lane, index) => (
            <div
              key={lane + index}
              className="w-full flex-shrink-0 p-4 rounded-lg"
            >
              <Lane lane={swimLaneValues[index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

//I'm setting a static height(h-app-body) to the parent, div with class swimlane, here to keep scrolls specific to one container/swim-lane
//If there is a better way in the future, please change it
const DesktopContainer = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    debugger;
    if (over && active.id !== over.id) {
      const todoId = active.id as string;
      const newStatus = over.id as string;

      // Update the todo's status
      await todoService.updateSome(todoId, { status: newStatus });

      // Invalidate queries to refetch data
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="swimlanes-ct h-full grid grid-cols-3 gap-4">
        {swimLanes.map((lane, index) => (
          <div
            key={index}
            className="swimlane h-app-body p-4 rounded-lg flex flex-col"
          >
            <div className="swimlane-title flex flex-row items-center justify-between">
              <h3 className="text-xl font-semibold mb-2">{lane}</h3>

              <TodoFormPopup
                onSubmit={async (data) => {
                  const updatedData = await createTodo(data);
                  queryClient.invalidateQueries({
                    queryKey: ['todos', { status: swimLaneValues[index] }],
                  });
                  return updatedData;
                }}
                data={getInitialData(swimLaneValues[index])}
              >
                <Button variant="ghost" className="p-2">
                  <Plus />
                </Button>
              </TodoFormPopup>
            </div>
            <Lane lane={swimLaneValues[index]} />
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default SwimlaneBoardComponent;
