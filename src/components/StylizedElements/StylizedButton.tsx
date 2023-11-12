import React from 'react';
import { StylizedButtonType } from '../ToDoList/types';

function StylizedButton(props: StylizedButtonType): JSX.Element {
    const { clickHandler, buttonDescription } = props;

    return (
        <div>
            <button type="button" onClick={clickHandler}>
                {buttonDescription}
            </button>
        </div>
    );
}

export default StylizedButton;
