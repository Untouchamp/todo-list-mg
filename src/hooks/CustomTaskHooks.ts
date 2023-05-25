import uuid from 'uuidv4';
//
// const addTask = (task: string) => {
//     setTasks([
//         ...tasks,
//         {
//             id: uuid(),
//             description: task,
//             isCompleted: false,
//             isEditing: false,
//         },
//     ]);
// };
//
// const deleteTodo = (id: string) => {
//     setTasks(tasks.filter((task) => task.id !== id));
// };
// const editTodo = (id: string) => {
//     setTasks(
//         tasks.map((task) =>
//             task.id === id ? { ...task, isEditing: !task.isEditing } : task
//         )
//     );
// };
// const editTask = (id: string, taskText: string) => {
//     setTasks(
//         tasks.map((task) =>
//             task.id === id
//                 ? {
//                       ...task,
//                       description: taskText,
//                       isEditing: !task.isEditing,
//                   }
//                 : task
//         )
//     );
// };
//
// const toggleComplete = (id: string) => {
//     setTasks(
//         tasks.map((task) =>
//             task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
//         )
//     );
// };
