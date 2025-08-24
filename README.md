# Grand Reserve Hotel Booking

This is a Next.js application for a luxury hotel website, "The Grand Reserve." It features a seamless booking system for room reservations, detailed room pages with high-resolution photo galleries, and an intuitive admin panel for managing bookings.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **UI:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** [Neon](https://neon.tech/) (Serverless Postgres)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)

---

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A [Neon](https://console.neon.tech/) account to create a serverless PostgreSQL database.

### 1. Install Dependencies

First, install the necessary project dependencies using npm from your project's root directory:

```bash
npm install
```

### 2. Set Up Environment Variables

This project requires a connection to a Neon database.

1.  Create a new project in your [Neon Dashboard](https://console.neon.tech).
2.  From your project's dashboard, copy the **PostgreSQL connection string**. It will look something like this: `postgresql://user:password@ep-plain-block-123456.us-east-2.aws.neon.tech/dbname?sslmode=require`
3.  Create a new file named `.env` in the root of the project.
4.  Add your Neon database connection string to the `.env` file like so:

    ```env
    NEON_DATABASE_URL="YOUR_NEON_CONNECTION_STRING_HERE"
    ```

    Replace `"YOUR_NEON_CONNECTION_STRING_HERE"` with the actual string you copied from Neon.

### 3. Push Database Schema

Once your environment variable is set, you need to push the database schema to your Neon database. This will create the necessary tables (e.g., the `bookings` table).

Run the following command:

```bash
npm run db:push
```

You can verify the table was created using the Neon SQL editor or by running Drizzle Studio.

### 4. Run the Development Server

Now you're ready to start the application. Run the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

---

## Project Structure

The project follows a standard Next.js App Router structure. Key directories and files are organized as follows:

```
.
├── /drizzle/             # Drizzle ORM migration files (auto-generated)
├── /src/
│   ├── /ai/              # Genkit AI flows and configuration
│   │   ├── genkit.ts     # Genkit global instance
│   │   └── dev.ts        # Entry point for Genkit development server
│   ├── /app/             # Next.js App Router directory
│   │   ├── /admin/       # Admin dashboard page and components
│   │   ├── /booking/     # Booking page and logic
│   │   ├── /rooms/       # All rooms list and single room detail pages
│   │   ├── globals.css   # Global styles and ShadCN theme variables
│   │   ├── layout.tsx    # Root layout for the entire application
│   │   └── page.tsx      # Homepage of the application
│   ├── /components/      # Reusable React components
│   │   ├── /admin/       # Components specific to the admin dashboard
│   │   └── /ui/          # ShadCN UI components (Button, Card, etc.)
│   ├── /db/              # Database configuration and schema
│   │   ├── index.ts      # Drizzle client instance
│   │   └── schema.ts     # Database table schemas (bookings)
│   ├── /hooks/           # Custom React hooks (e.g., use-toast)
│   └── /lib/             # Utility functions and server actions
│       ├── actions.ts    # Server Actions for form submissions & DB operations
│       └── utils.ts      # General utility functions (e.g., cn for classnames)
├── /public/              # Static assets (images, fonts) - currently empty
├── .env                  # Environment variables (NEON_DATABASE_URL)
├── drizzle.config.ts     # Configuration for Drizzle Kit (migrations)
├── next.config.ts        # Configuration for Next.js
├── package.json          # Project dependencies and scripts
└── tailwind.config.ts    # Configuration for Tailwind CSS
```

---

## Key Dependencies & Purpose

- **`next`**: The core React framework for server-rendered applications.
- **`react` & `react-dom`**: The UI library for building components.
- **`drizzle-orm` & `@neondatabase/serverless`**: A modern TypeScript ORM for interacting with the Neon PostgreSQL database.
- **`tailwindcss` & `tailwindcss-animate`**: A utility-first CSS framework for styling.
- **`shadcn-ui` (various `@radix-ui` packages)**: A collection of beautifully designed, accessible UI components that are copied into the project for full control.
- **`lucide-react`**: A library of simply designed icons.
- **`zod`**: A TypeScript-first schema declaration and validation library, used here to validate form submissions.
- **`genkit` & `@genkit-ai/googleai`**: The toolkit for building AI-powered features and flows.

---

## Coding Patterns & Architecture

### Next.js App Router

The application uses the Next.js App Router, which enables modern features like Server Components, nested layouts, and file-system based routing. Each folder inside `/app` represents a route segment.

### Server Components vs. Client Components

- **Server Components (Default)**: Most components are rendered on the server to improve performance and reduce the amount of JavaScript sent to the client. The homepage (`src/app/page.tsx`) is a good example.
- **Client Components (`"use client"`)**: Components requiring interactivity, state, or browser-only APIs (like `useState`, `useEffect`, `useRouter`) are marked with the `"use client";` directive at the top of the file. The booking form (`src/app/booking/page.tsx`) is a client component.

### Server Actions

Form submissions and data mutations are handled by **Server Actions**. These are `async` functions marked with `"use server";` that run securely on the server. They can be called directly from client components (e.g., in a form's `action` prop) without needing to create separate API endpoints. See `src/lib/actions.ts` for examples like `createBooking`.

### Styling with Tailwind CSS & ShadCN UI

- **Tailwind CSS**: Styling is primarily done with Tailwind's utility classes for rapid and consistent design.
- **ShadCN UI**: The UI is built using components from ShadCN. These are not installed as a typical library; instead, their source code is added directly to `src/components/ui`, allowing for complete customization.
- **Theming**: The application's color scheme (primary, accent, background colors) is defined using CSS variables in `src/app/globals.css`, which are then consumed by both Tailwind and ShadCN components.

### Database with Drizzle ORM

- **Schema Definition**: The database table structure is defined in `src/db/schema.ts` using Drizzle's syntax.
- **Database Client**: A singleton Drizzle client is instantiated in `src/db/index.ts` to be used by server-side code.
- **Migrations**: `drizzle-kit` is used to generate and push schema changes to the database via the `npm run db:push` command.

---

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter to check for code quality issues.
- `npm run db:push`: Pushes the Drizzle schema to your Neon database.
- `npm run db:studio`: Starts Drizzle Studio, a local GUI to browse your database.
- `npm run genkit:dev`: Starts the Genkit development server for AI flows.

## Admin Panel

The application includes an admin dashboard to view and manage bookings.

-   **URL:** `/admin`
-   **Password:** `admin`

You can log in to view all reservations made through the booking system.
