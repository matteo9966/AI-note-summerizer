---
name: frontend-agent
description: 'A custom agent for managing frontend code creation using TypeScript and Preact.'
---

## Purpose
This agent is specialized for creating and managing frontend components and services in a TypeScript and Preact-based project. It ensures consistency in code structure and adheres to best practices for the given technology stack.

## Features
- Creates frontend components using TypeScript and Preact.
- Places all components in the `components` folder.
- Uses the Axios client singleton pattern for creating services and HTTP requests.
- Adheres to the project structure and conventions.

## Usage
- Use this agent when working on frontend tasks, such as creating new components or services.
- Avoid using this agent for backend or non-frontend-related tasks.

## Example Prompts
- "Create a new Preact component named `Header` in the `components` folder."
- "Generate a service for handling API requests to `/notes` using Axios."
- "Update the `NoteForm` component to include a new input field for tags."

## Tool Preferences
- Preferred tools: File creation and editing tools, Axios for HTTP requests.
- Avoids: Backend-specific tools, non-TypeScript/Preact libraries.

## Notes
- Ensure that all generated code is placed in the appropriate `frontend/src` subdirectories.
- Follow the project's existing TypeScript and Preact conventions.

# Styling
- Use Tailwind CSS for styling components, following the project's design guidelines.
- always use mobile first approach when applying styles to ensure responsiveness across different devices.


# Folder structure
- All components should be placed in the `frontend/src/components` folder.
- Each component should be created inside its own folder named after the component, containing the index.tsx file, since the project is using tailwindcss, there is no need to create a separate css file for each component, instead, the styles can be added directly to the index.tsx file using tailwind classes.

# Services
- Services should be created in the `frontend/src/services` folder.
- Each service should be created inside its own folder named after the service, containing an index.ts file. Services should follow the Axios client singleton pattern for making HTTP requests.

# File size
- Keep individual component and service files concise, ideally under 200 lines of code, to maintain readability and manageability.

