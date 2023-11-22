import { User } from 'firebase/auth';

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
    deleteTask: Function;
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
    deleteTask: Function;
    updateTask: Function;
};

export type UpdateTaskParams = {
    id: string;
    description?: string;
    isCompleted?: boolean;
    isEditing?: boolean;
};

export type CustomAuthHooksType = {
    user: User;
    signInGoogle: Function;
    signOutCurrentUser: Function;
    dispatch: Function;
};

export type ProfileDropdownType = {
    signOutCurrentUser: Function;
};

export type StylizedButtonType = {
    clickHandler: Function;
    buttonDescription: string;
};

export type AuthSectionType = {
    user: User | null;
    signInGoogle: Function;
    signOutCurrentUser: Function;
};
