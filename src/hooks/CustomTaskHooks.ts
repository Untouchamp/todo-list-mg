import { useState } from 'react';
import uuid from 'uuidv4';
import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';

function useCustomTaskHooks(todoTasks: Array<TaskType>) {
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

    const updateTask = ({
        id,
        taskText,
        isCompleted,
        isEditing,
    }: UpdateTaskParams) => {
        const taskIndex = tasks.findIndex((task) => task.id === id);

        if (taskIndex !== -1) {
            const updatedTask = {
                ...tasks[taskIndex],
                description: taskText ?? tasks[taskIndex].description,
                isCompleted: isCompleted ?? tasks[taskIndex].isCompleted,
                isEditing: isEditing ?? tasks[taskIndex].isEditing,
            };

            const updatedTasks = [...tasks];
            updatedTasks[taskIndex] = updatedTask;

            setTasks(updatedTasks);
        }
    };

    return [tasks, addTask, deleteTodo, updateTask];
}

export default useCustomTaskHooks;
