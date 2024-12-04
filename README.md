Navigation Management System
============================

A Next.js application featuring a drag-and-drop navigation management interface. Built with modern React practices and TypeScript.

Features
--------

-   🔄 Drag and drop navigation item reordering

-   ✏️ Create, edit, and delete navigation items

-   📱 Responsive design with Tailwind CSS

-   ✅ Form validation using Zod

-   🎯 Type-safe development with TypeScript

-   📦 Nested navigation structure support

Tech Stack
----------

-   Next.js 13

-   React 18

-   TypeScript

-   Tailwind CSS

-   dnd-kit for drag and drop

-   React Hook Form

-   Zod for validation

Getting Started
---------------

1\. Install dependencies:

npm install

-   Run the development server:

npm dev

-   Build for production:

npm build

Open http://localhost:3000 with your browser to see the result.

Development
-----------

This project uses TypeScript with strict mode enabled and includes path aliases for clean imports:

-   Source code is located in the src directory

-   Components are organized by feature in src/components

-   Type definitions are in src/types

-   Styles are managed with Tailwind CSS

Contributing
------------

1\. Fork the repository

-   Create your feature branch

-   Commit your changes

-   Push to the branch

5\. Open a Pull Request

License
-------

This project is open source and available under the MIT License.

## Configuration

The application supports the following environment variables:

- `NEXT_PUBLIC_DISABLE_MAX_NESTING`: Set to 'true' to remove the nesting level limit
- `NEXT_PUBLIC_DISABLE_EASTER_EGGS`: Set to 'true' to disable easter egg
- `NEXT_PUBLIC_USE_MOCK_DATA`: Set to 'false' to start with empty navigation

Environment files:
- `.env` - Default configuration
- `.env.local` - Local overrides (not committed to repository)
- `.env.example` - Example configuration with documentation

Example configuration:

NEXT_PUBLIC_DISABLE_MAX_NESTING=true
NEXT_PUBLIC_DISABLE_EASTER_EGGS=true
NEXT_PUBLIC_USE_MOCK_DATA=false
