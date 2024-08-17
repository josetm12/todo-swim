import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LaneProps, TodoData, TodoDataWID } from '@/lib/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import todoService from '@/services/todoService';

import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import TodoCard from '@/components/TodoCard/TodoCard';

export default function Lane({ lane, isMobile }: LaneProps) {
  const [isOver, setIsOver] = useState<boolean>(false);
  const todoOverClasses = isOver ? 'bg-secondary' : '';

  // Queries
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['todos', { status: lane }],
    queryFn: () => todoService.list({ status: lane }),
  });
  const queryClient = useQueryClient();

  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Error loading {lane} status todos.</div>;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isOver) {
      setIsOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLElement>,
    lane: TodoData['status']
  ) => {
    e.preventDefault();

    const id = e.dataTransfer.getData('id');
    setIsOver(false);
    // const task = tasks.find((task) => )
    try {
      await todoService.updateSome(id, { status: lane });
    } catch (err) {
      console.log(err);
    } finally {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  };

  return (
    <ScrollArea
      onDrop={(e) => {
        handleDrop(e, lane);
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn('swimlane-content flex-1 p-2', todoOverClasses)}
    >
      {data.map((todo: TodoDataWID, index: number) => (
        <TodoCard key={lane + index} data={todo} isMobile={isMobile} />
      ))}
    </ScrollArea>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 space-y-2">
      {Array(5)
        .fill(0)
        .map(() => (
          <>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ))}
    </div>
  );
}
