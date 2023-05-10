import React, { FormEvent, useState } from 'react';
import { EditTodoFormPropType } from './types';

function EditTodoForm(props: EditTodoFormPropType): JSX.Element {
    const { setNodeRef, style, attributes, editTask, task } = props;
    const [value, setValue] = useState(task.task);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (value.trim()) editTask(task.id, value.trim());

        setValue('');
    }

    return (
        <div className="w-full" ref={setNodeRef} style={style} {...attributes}>
            <form className="flex mb-4" onSubmit={handleSubmit}>
                <div className="justify-items-stretch text-center h-full bg-transparent w-full text-white rounded-md cursor-pointer">
                    <input
                        type="text"
                        className="w-[calc(100%-2rem-60.6px)] bg-purple-500/30 text-left py-3 px-4 rounded-l-md bg-transparent text-white placeholder:text-white/30"
                        placeholder="Update task"
                        value={value}
                        maxLength={50}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="rounded-r-md py-3 px-4 bg-purple-500 text-white border-x border-purple-500 cursor-pointer"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTodoForm;