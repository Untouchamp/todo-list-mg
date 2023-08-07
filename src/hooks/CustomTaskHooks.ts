import { useState } from 'react';
import uuid from 'uuidv4';
import { TaskType } from '../components/ToDoList/types';

const taskManagementHandler = (todoTasks) => {
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
    return [tasks, addTask, deleteTodo, editTodo, editTask, toggleComplete];
};

export default taskManagementHandler;
