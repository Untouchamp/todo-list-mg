import React from 'react';
import { TodoPropsType } from './types';
import EditTodoForm from './EditTodoForm';
import StyledBurger from '../../assets/icons/StyledBurger';
import TrashBinIcon from '../../assets/icons/TrashBinIcon';
import EditingPenIcon from '../../assets/icons/EditingPenIcon';

function Todo(props: TodoPropsType): JSX.Element {
    const { task, deleteTask, updateTask } = props;
    const { id, isEditing, description, isCompleted } = task;

    return (
        <div className="flex relative justify-between">
            <span className="flex items-center py-3 px-1 mb-4 cursor-grab text-purple-400">
                <StyledBurger />
            </span>
            {isEditing ? (
                <EditTodoForm updateTask={updateTask} task={task} />
            ) : (
                <div className="flex justify-between w-full text-center bg-purple-500 text-white py-3 px-4 rounded-md mb-4 cursor-pointer">
                    <p
                        className={`${
                            isCompleted ? 'text-purple-300 line-through' : ''
                        } w-fit text-left select-none`}
                        onClick={() => {
                            updateTask({
                                ...task,
                                isCompleted: !task.isCompleted,
                            });
                        }}
                    >
                        {description}
                    </p>
                    <div className="flex items-center ml-6">
                        <button
                            type="button"
                            disabled={isCompleted}
                            onClick={() =>
                                updateTask({
                                    ...task,
                                    isEditing: !task.isEditing,
                                })
                            }
                        >
                            <EditingPenIcon isTaskCompleted={isCompleted} />
                        </button>
                        <button type="button" onClick={() => deleteTask(id)}>
                            <TrashBinIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todo;
