import { useState } from 'react';
import uuid from 'uuidv4';
import { TaskType } from '../components/ToDoList/types';

function taskManagementHandler(todoTasks: Array<TaskType>) {
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

    const updateTask = (
        id: string,
        taskText?: string,
        isCompleted?: boolean
    ) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          description:
                              taskText !== undefined
                                  ? taskText
                                  : task.description,
                          isEditing:
                              taskText !== undefined ? false : !task.isEditing,
                          isCompleted:
                              isCompleted !== undefined
                                  ? isCompleted
                                  : task.isCompleted,
                      }
                    : task
            )
        );
    };

    return [tasks, addTask, deleteTodo, updateTask];
}

export default taskManagementHandler;
