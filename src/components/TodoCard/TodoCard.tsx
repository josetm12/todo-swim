import React from 'react';
import { TodoData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardContent } from '@/components/ui/card';
import MenuButton from './MenuButton';

export default function TodoCard({ data }: { data: TodoData }) {
  console.log('Todo Card', data);
  // const editTodo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   console.log(e);
  //   console.log('Todo Data Edit', data);
  // };

  return (
    <Card className="mr-3 mb-3 py-2 px-4 bg-primary-foreground">
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
}
