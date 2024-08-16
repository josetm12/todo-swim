import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(100, { message: 'Exceeded max characters.' }),
  status: z.enum(['todo', 'in_progress', 'done']),
  is_priority: z.boolean().default(false),
});

type TodoFormValues = z.infer<typeof formSchema>;

interface TodoFormProps {
  onSubmit: (data: TodoFormValues) => void;
  isLoading?: boolean;
  initialData?: Partial<TodoFormValues> | null;
}

const TodoForm = ({
  onSubmit,
  isLoading = false,
  initialData,
}: TodoFormProps) => {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      status: initialData?.status || 'todo',
      is_priority: initialData?.is_priority || false,
    },
  });
  const submitButtonText =
    initialData?.status === 'todo' ? 'Create Todo' : 'Update Todo';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter todo title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_priority"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Priority</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;
