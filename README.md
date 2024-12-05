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

-   🧪 Comprehensive test coverage with Vitest

Tech Stack
----------

-   Next.js 13

-   React 18

-   TypeScript

-   Tailwind CSS

-   dnd-kit for drag and drop

-   React Hook Form

-   Zod for validation

-   Vitest + Testing Library

Getting Started
---------------

1\. Install dependencies:

```npm install```

-   Run the development server:

```bash 
npm dev 
```

-   Build for production:

```bash 
npm build 
```

-   Testing:

```bash
npm test        # Run tests in watch mode
npm test:ui     # Run tests with UI
npm coverage    # Generate coverage report
``` 

Open http://localhost:3000 with your browser to see the result.

Testing
-------

The project uses Vitest with React Testing Library for testing. Tests are located in `__tests__` directories next to the components they test.

### Running Tests

```bash
npm test        # Run tests in watch mode
npm test:ui     # Open Vitest UI for debugging
npm coverage    # Generate test coverage report
```

### Test Structure

- Unit tests for components
- Form validation tests
- User interaction tests
- Accessibility tests (labels, ARIA)

### Example Test

```typescript
it('validates form input', async () => {
  render(<NavigationForm onSubmit={() => {}} />);
  
  fireEvent.click(screen.getByText('Dodaj'));
  
  expect(await screen.findByText('Nazwa jest wymagana')).toBeInTheDocument();
});
```

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