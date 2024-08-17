// import { useState } from 'react';

// import todoService from '@/services/todoService';
// import { Button } from '@/components/ui/button';

// export default function DummyAPIButtons() {
//   const createTodo = async () => {
//     const todoData = await todoService.create({
//       title: 'In Progress Todo',
//       status: 'done',
//       is_priority: false,
//     });
//   };

//   const listTodos = async () => {
//     // const params = {
//     //   status: 'in_progress',
//     //   is_priority: true
//     // };
//     const todos = await todoService.list({});
//   };

//   //dd53325c-5680-4edf-a906-73741839f3bb

//   const getTodoDetails = async () => {
//     const todoData = await todoService.details(
//       'dd53325c-5680-4edf-a906-73741839f3bb'
//     );
//     console.log(todoData);
//   };

//   const updateTodo = async () => {
//     const todoData = await todoService.updateAll(
//       'dd53325c-5680-4edf-a906-73741839f3bb',
//       {
//         title: 'Updated Title',
//       }
//     );
//     console.log(todoData);
//   };

//   const updateTodoSome = async () => {
//     const todoData = await todoService.updateSome(
//       'dd53325c-5680-4edf-a906-73741839f3bb',
//       {
//         title: 'Updated Title with patch',
//       }
//     );
//     console.log(todoData);
//   };

//   const deleteTodo = async () => {
//     const todoData = await todoService.delete(
//       'dd53325c-5680-4edf-a906-73741839f3bb'
//     );
//     console.log(todoData);
//   };

//   const getTodoStats = async () => {
//     const todoStats = await todoService.stats();
//     console.log(todoStats);
//   };

//   return (
//     <>
//       <div className="mt-10 flex flex-row gap-3">
//         <Button onClick={createTodo}>Create Todo</Button>
//         <Button onClick={listTodos}>List Todo</Button>
//         <Button onClick={getTodoDetails}>Detail(GET) Todo</Button>
//         <Button onClick={updateTodo}>Update(PUT) Todo</Button>
//         <Button onClick={updateTodoSome}>Update(PATCH) Todo</Button>
//         <Button onClick={deleteTodo}>Delete(DELETE) Todo</Button>
//         <Button>Priorities(GET) Todos</Button>
//         <Button onClick={getTodoStats}>Stats(GET) Todos</Button>
//       </div>
//     </>
//   );
// }
