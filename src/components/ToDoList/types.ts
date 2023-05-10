import { LegacyRef } from 'react';

export type TaskType = {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
};

export type TodoFormPropType = {
    addTask: Function;
};

export type TodoPropsType = {
    task: TaskType;
    deleteTodo: Function;
    editTodo: Function;
    editTask: Function;
    toggleComplete: Function;
};

export type EditTodoFormPropType = {
    editTask: Function;
    setNodeRef: LegacyRef<HTMLDivElement> | undefined;
    style: { transform: string | undefined; transition: string | undefined };
    task: TaskType;
};

export type TodoWrapperType = {
    todoTasks: Array<TaskType>;
};
