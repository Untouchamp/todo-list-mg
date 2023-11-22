import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';
import '@testing-library/jest-dom';

describe('TodoForm component', () => {
    it('should render TodoForm correctly', () => {
        const addTaskMock = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <TodoForm addTask={addTaskMock} />
        );

        const input = getByPlaceholderText("What's the task today?");
        const addButton = getByText('Add Task');

        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    it('should call addTask function when submitting a valid task', () => {
        const addTaskMock = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <TodoForm addTask={addTaskMock} />
        );

        const input = getByPlaceholderText("What's the task today?");
        const addButton = getByText('Add Task');

        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);

        expect(addTaskMock).toHaveBeenCalledTimes(1);
        expect(addTaskMock).toHaveBeenCalledWith('Task 1');
    });

    it('should not call addTask function when submitting an empty task', () => {
        const addTaskMock = jest.fn();
        const { getByText } = render(<TodoForm addTask={addTaskMock} />);

        const addButton = getByText('Add Task');

        fireEvent.click(addButton);

        expect(addTaskMock).not.toHaveBeenCalled();
    });
});
