import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { TodoDataWID } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardContent } from '@/components/ui/card';
import MenuButton from './MenuButton';

interface TodoCardProps {
  data: TodoDataWID;
  index: number;
}

const TodoCard: React.FC<TodoCardProps> = ({ data, index }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  });
  debugger;
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mr-3 mb-3 py-2 px-4 bg-primary-foreground z-50 relative"
    >
      <CardContent className="p-0 flex flex-row gap-4 items-center justify-start">
        <p className="text-md">{data.title}</p>
        <MenuButton
          // editTodo={editTodo}
          todoData={data}
          className="ml-auto self-start"
        />
      </CardContent>
      <CardFooter className="p-0 mt-2 flex flex-row items-center justify-between gap-10">
        {data.is_priority && <Badge variant="destructive">Priority</Badge>}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
