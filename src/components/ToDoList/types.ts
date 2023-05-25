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
    editTodo: Function;
    editTask: Function;
    toggleComplete: Function;
};

export type EditTodoFormPropType = {
    editTask: Function;
    task: TaskType;
};

export type TodoWrapperType = {
    todoTasks: Array<TaskType>;
};

export type EditingPenIconPropType = {
    isTaskCompleted: boolean;
};
