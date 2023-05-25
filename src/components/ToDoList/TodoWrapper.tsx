import React, { useState } from 'react';
import uuid from 'uuidv4';
import { TaskType, TodoWrapperType } from './types';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoWrapper(props: TodoWrapperType): JSX.Element {
    const { todoTasks } = props;
    const [tasks, setTasks] = useState<Array<TaskType>>(todoTasks);

    const addTask = (task: string) => {
        setTasks([
            ...tasks,
            {
                id: uuid(),
                description: task,
                isCompleted: false,
                isEditing: false,
            },
        ]);
    };

    const deleteTodo = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };
    const editTodo = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, isEditing: !task.isEditing } : task
            )
        );
    };
    const editTask = (id: string, taskText: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          description: taskText,
                          isEditing: !task.isEditing,
                      }
                    : task
            )
        );
    };

    const toggleComplete = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task
            )
        );
    };

    return (
        <div className="bg-gray-800 mt-20 p-8 rounded-md shadow-3xl">
            <h1>GET THINGS DONE</h1>
            <TodoForm addTask={addTask} />
            {tasks.map((task) => (
                <Todo
                    key={task.id}
                    task={task}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    editTask={editTask}
                    toggleComplete={toggleComplete}
                />
            ))}
        </div>
    );
}

export default TodoWrapper;
