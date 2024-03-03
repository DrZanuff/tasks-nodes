# Task Management API

This is a Node.js project with Typescript that implements an API for CRUD (Create, Read, Update, Delete) operations on tasks. This project explores the use of Node.js vanilla features without any frameworks, intended for educational purposes.

## Features

- **Create a task**: Allows creating a new task by specifying a title and description.
- **List all tasks**: Returns a list of all registered tasks or performs a filtered search by title and/or description.
- **Update a task by `id`**: Allows updating the title and/or description of an existing task.
- **Remove a task by `id`**: Deletes a task based on its unique identifier.
- **Mark a task as complete by `id`**: Marks a task as complete by specifying its unique identifier.
- **Bulk import tasks from a CSV file**: Allows importing multiple tasks from a CSV file.

## Task Structure

Each task has the following fields:

- `id`: Unique identifier of the task.
- `title`: Title of the task.
- `description`: Detailed description of the task.
- `completed_at`: Completion date of the task (initially `null`).
- `created_at`: Creation date of the task.
- `updated_at`: Last update date of the task.

## Routes

- **POST - /tasks**: Creates a new task.
- **GET - /tasks**: Retrieves all tasks or performs a filtered search by title and/or description.
- **PUT - /tasks/:id**: Updates an existing task by its unique identifier.
- **DELETE - /tasks/:id**: Deletes an existing task by its unique identifier.
- **PATCH - /tasks/:id/complete**: Marks a task as complete by its unique identifier.

## Validations and Notes

- The `POST` and `PUT` routes must validate the presence of the `title` and `description` fields in the request body.
- Routes that receive the `/:id` parameter must validate whether the `id` belongs to an existing task in the database and return an appropriate message otherwise.

## Import from CSV

To import tasks from a CSV file, follow these instructions:

1. Add the tasks to be imported in the file db/tasks.csv.
2. In the CSV reading file, parse the CSV and for each line, make a request to the POST - /tasks route, passing the `title` and `description` fields.

Example CSV format:

```
title,description
Task 01,Description of Task 01
Task 02,Description of Task 02
Task 03,Description of Task 03
Task 04,Description of Task 04
Task 05,Description of Task 05
```

## Running the Project

To run the project, use the following command:

```
npm run dev
```
