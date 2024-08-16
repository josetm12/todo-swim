import React, { useState, useRef, useEffect } from 'react';
import { TodoData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardContent } from '@/components/ui/card';
import MenuButton from './MenuButton';

export default function TodoCard({ data }: { data: TodoData }) {
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = dragRef.current;
    if (element) {
      element.addEventListener('dragstart', handleDragStart);
      element.addEventListener('dragend', handleDragEnd);
      return () => {
        element.removeEventListener('dragstart', handleDragStart);
        element.removeEventListener('dragend', handleDragEnd);
      };
    }
  }, []);

  const handleDragStart = (e) => {
    setIsDragging(true);
    const dragImage = dragRef.current.cloneNode(true);
    dragImage.style.opacity = '1';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.boxShadow =
      '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
    dragImage.style.transform = 'scale(1.05)';
    dragImage.style.border = '2px solid #3b82f6'; // Blue border
    dragImage.style.borderRadius = '.5rem';
    dragImage.style.backgroundColor = '#eff6ff'; // Light blue background
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const style = {
    border: '1px solid #ccc',
    padding: '1rem',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
    cursor: 'grab',
    ...(isDragging && {
      opacity: 0.5,
      transform: 'scale(.9)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      border: '2px solid #3b82f6',
      backgroundColor: '#eff6ff',
    }),
  };

  return (
    <Card
      ref={dragRef}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('id', data.id || '');
      }}
      className="mr-3 mb-3 py-2 px-4 bg-primary-foreground"
      style={style}
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
}
