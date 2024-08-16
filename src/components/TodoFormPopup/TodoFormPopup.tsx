import { useState } from 'react';
import { TodoData, TodoFormPopupProps } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import TodoForm from './TodoForm';

export default function TodoFormPopup({
  data,
  onSubmit,
  children,
}: TodoFormPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverTitle =
    !data?.title || data?.title === '' ? 'Create Todo' : 'Edit Todo';
  const popoverDescription =
    !data?.title || data?.title === ''
      ? 'Create a Todo.'
      : 'Edit this Todo and save.';

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = (formData: TodoData) => {
    onSubmit(formData);
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="Todo Create Update Form Popover"
      >
        <DialogHeader>
          <DialogTitle>{popoverTitle}</DialogTitle>
          <DialogDescription>{popoverDescription}</DialogDescription>
        </DialogHeader>
        <TodoForm onSubmit={handleSubmit} initialData={data} />
      </DialogContent>
    </Dialog>
  );
}
