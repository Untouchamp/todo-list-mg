import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StylizedButton from './StylizedButton';
import '@testing-library/jest-dom';

describe('StylizedButton component', () => {
    it('renders the button correctly', () => {
        const clickHandler = jest.fn();
        const buttonDescription = 'Click me';
        const { getByText } = render(
            <StylizedButton
                clickHandler={clickHandler}
                buttonDescription={buttonDescription}
            />
        );

        const button = getByText(buttonDescription);
        expect(button).toBeInTheDocument();
    });

    it('triggers the click handler when the button is clicked', () => {
        const clickHandler = jest.fn();
        const buttonDescription = 'Click me';
        const { getByText } = render(
            <StylizedButton
                clickHandler={clickHandler}
                buttonDescription={buttonDescription}
            />
        );

        const button = getByText(buttonDescription);
        fireEvent.click(button);

        expect(clickHandler).toHaveBeenCalled();
    });
});
