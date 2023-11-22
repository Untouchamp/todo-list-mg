import React from 'react';
import { StylizedButtonType } from '../../ToDoList/types';

function StylizedButton(props: StylizedButtonType): JSX.Element {
    const { clickHandler, buttonDescription } = props;

    const onClickHandler = () => {
        clickHandler();
    };

    return (
        <div>
            <button
                className="bg-purple-500 text-white py-3 px-4 rounded-md mb-4 cursor-pointer"
                type="button"
                onClick={onClickHandler}
            >
                {buttonDescription}
            </button>
        </div>
    );
}

export default StylizedButton;
