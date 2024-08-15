import { TodoData } from '@/lib/types';
import { Button } from './ui/button';
import { FlagTriangleLeft } from 'lucide-react';
import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

export default function TodoCard({ data }: { data: TodoData }) {
  return (
    <Card className="m-3">
      <CardHeader className="flex flex-row gap-2 items-start">
        {data.is_priority && <FlagTriangleLeft color="red" fill="red" />}
        <CardDescription>{data.title}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row items-center justify-between gap-10">
        <Button className="w-full">Edit</Button>
        <Button className="w-full">Start</Button>
        <Button className="w-full">Done</Button>
      </CardFooter>
    </Card>
  );
}
