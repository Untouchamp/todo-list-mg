import uuid from 'uuidv4';
import { TaskType } from '../src/components/ToDoList/types';

const tasksMockData: Array<TaskType> = [
    {
        id: uuid(),
        description: 'Brush your teeth',
        isCompleted: false,
        isEditing: false,
    },
    {
        id: uuid(),
        description: 'Go to school',
        isCompleted: false,
        isEditing: false,
    },
    {
        id: uuid(),
        description: 'Buy groceries',
        isCompleted: false,
        isEditing: false,
    },
    {
        id: uuid(),
        description: 'Pay bills',
        isCompleted: true,
        isEditing: false,
    },
    {
        id: uuid(),
        description: 'Call mom',
        isCompleted: false,
        isEditing: false,
    },
];

export default tasksMockData;
