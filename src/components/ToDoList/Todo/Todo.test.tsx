import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Todo from './Todo';
import '@testing-library/jest-dom';

const descriptionMock = 'Dummy';

describe('Todo component', () => {
    test('Todo renders correctly', () => {
        const task = {
            id: '1',
            description: descriptionMock,
            isEditing: false,
            isCompleted: false,
        };

        const deleteTask = jest.fn();
        const updateTask = jest.fn();

        render(
            <Todo task={task} deleteTask={deleteTask} updateTask={updateTask} />
        );

        const taskDescription = screen.getByText(descriptionMock);
        const editButton = screen.getByTestId('edit-button');
        const deleteButton = screen.getByTestId('delete-button');

        expect(taskDescription).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    test('Todo calls updateTask function when editing button is clicked', () => {
        const task = {
            id: '1',
            description: descriptionMock,
            isEditing: false,
            isCompleted: false,
        };

        const deleteTask = jest.fn();
        const updateTask = jest.fn();

        const { getByTestId } = render(
            <Todo task={task} deleteTask={deleteTask} updateTask={updateTask} />
        );

        const editButton = getByTestId('edit-button');

        fireEvent.click(editButton);

        expect(updateTask).toHaveBeenCalledWith({
            ...task,
            isEditing: true,
        });
    });

    test('Todo calls deleteTask function when delete button is clicked', () => {
        const task = {
            id: '1',
            description: descriptionMock,
            isEditing: false,
            isCompleted: false,
        };

        const deleteTask = jest.fn();
        const updateTask = jest.fn();

        const { getByTestId } = render(
            <Todo task={task} deleteTask={deleteTask} updateTask={updateTask} />
        );

        const deleteButton = getByTestId('delete-button');

        fireEvent.click(deleteButton);

        expect(deleteTask).toHaveBeenCalledWith('1');
    });
});
