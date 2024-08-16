import { LaneProps, TodoDataWID } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import todoService from '@/services/todoService';

import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import TodoCard from '@/components/TodoCard/TodoCard';

export default function Lane({ lane }: LaneProps) {
  // Queries
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['todos', { status: lane }],
    queryFn: () => todoService.list({ status: lane }),
  });

  if (data) {
    console.log('tanstack query - data', data);
  }

  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Error loading {lane} status todos.</div>;
  }

  return (
    <ScrollArea className="swimlane-content flex-1">
      {data.map((todo: TodoDataWID, index: number) => (
        <TodoCard key={lane + index} data={todo} index={index} />
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
