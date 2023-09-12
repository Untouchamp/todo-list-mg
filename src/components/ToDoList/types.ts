export type TaskType = {
    id: string;
    description: string;
    isCompleted: boolean;
    isEditing: boolean;
};

export type TodoFormPropType = {
    addTask: (task: string) => void;
};

export type TodoPropsType = {
    task: TaskType;
    deleteTodo: Function;
    updateTask: Function;
};

export type EditTodoFormPropType = {
    updateTask: Function;
    task: TaskType;
};

export type TodoWrapperType = {
    todoTasks: Array<TaskType>;
};

export type EditingPenIconPropType = {
    isTaskCompleted: boolean;
};

export type CustomTypeHooksType = {
    tasks: Array<TaskType>;
    addTask: Function;
    deleteTodo: Function;
    updateTask: Function;
};
