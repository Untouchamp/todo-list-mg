import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditTodoForm from './EditTodoForm';
import '@testing-library/jest-dom';

const mockTask = {
    id: '1',
    description: 'Task 1',
    isEditing: false,
    isCompleted: false,
};

describe('EditTodoForm component', () => {
    it('should render EditTodoForm correctly', () => {
        const updateTaskMock = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <EditTodoForm updateTask={updateTaskMock} task={mockTask} />
        );

        const input = getByPlaceholderText('Update task');
        const updateButton = getByText('Update');

        expect(input).toBeInTheDocument();
        expect(updateButton).toBeInTheDocument();
    });

    it('should update task and call updateTask function on form submission', () => {
        const updateTaskMock = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <EditTodoForm updateTask={updateTaskMock} task={mockTask} />
        );

        const input = getByPlaceholderText('Update task');
        const updateButton = getByText('Update');

        fireEvent.change(input, { target: { value: 'Updated Task' } });
        fireEvent.click(updateButton);

        expect(updateTaskMock).toHaveBeenCalledTimes(1);
        expect(updateTaskMock).toHaveBeenCalledWith({
            ...mockTask,
            description: 'Updated Task',
            isEditing: !mockTask.isEditing,
        });
    });

    it('should not call updateTask function when submitting an empty task', () => {
        const updateTaskMock = jest.fn();
        const { getByText } = render(
            <EditTodoForm updateTask={updateTaskMock} task={mockTask} />
        );

        const input = screen.getByPlaceholderText('Update task');
        const updateButton = getByText('Update');

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(updateButton);

        expect(updateTaskMock).not.toHaveBeenCalled();
    });
});
