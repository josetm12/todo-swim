import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { TodoData, TodoMenuButtonProps } from '@/lib/types';
import todoService from '@/services/todoService';

import { EllipsisVertical, ListTodo, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import TodoFormPopup from '@/components/TodoFormPopup/TodoFormPopup';

const MenuButton: React.FC<TodoMenuButtonProps> = ({
  todoData,
  className = '',
}) => {
  const queryClient = useQueryClient();
  const todoId = todoData.id || '';
  const status = todoData.status || 'todo';
  const defaultData: TodoData = {
    title: todoData.title || '',
    status: todoData.status || 'todo',
    is_priority: todoData.is_priority || false,
  };

  const handleUpdate = async (data: TodoData) => {
    const todoData = await todoService.updateAll(todoId, {
      title: data.title,
      status: data.status,
      is_priority: data.is_priority,
    });

    return todoData;
  };

  const onStatusChange = (newTodoStatus: string) => {
    updateTodoStatus(newTodoStatus);
  };

  const updateTodoStatus = async (newTodoStatus: string) => {
    const todoData = await todoService.updateSome(todoId, {
      status: newTodoStatus,
    });
    queryClient.invalidateQueries({
      queryKey: ['todos'],
    });

    return todoData;
  };

  const deleteTodo = async (todoId: string) => {
    const todoData = await todoService.delete(todoId);

    queryClient.invalidateQueries({
      queryKey: ['todos', { status: defaultData.status }],
    });

    return todoData;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn('justify-end w-4', className)}
          size="icon"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Todo Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ListTodo className="mr-2 h-4 w-4" />
            <span>Move Todo to</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={status}
                onValueChange={onStatusChange}
              >
                <DropdownMenuRadioItem value="todo">Todo</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="in_progress">
                  In Progress
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <TodoFormPopup
            onSubmit={async (data) => {
              const updatedData = await handleUpdate(data);
              queryClient.invalidateQueries({
                queryKey: ['todos', { status: defaultData.status }],
              });
              return updatedData;
            }}
            data={defaultData}
          >
            <DropdownMenuItem
              // onClick={editTodo}
              onSelect={(event) => event.preventDefault()}
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit Todo</span>
            </DropdownMenuItem>
          </TodoFormPopup>
          <DropdownMenuItem
            onClick={() => {
              deleteTodo(todoId);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Todo</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuButton;
