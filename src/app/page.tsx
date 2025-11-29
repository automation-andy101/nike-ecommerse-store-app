import { AuthForm } from "@/components/AuthForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Nike E-commerce Store
        </h1>
        <ThemeToggle />
      </header>

      <main className="flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to the Store
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Built with Next.js, TypeScript, Tailwind CSS, Better Auth, Neon
            PostgreSQL, Drizzle ORM, and Zustand.
          </p>
        </div>

        <AuthForm />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Better Auth
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Secure authentication with email/password support and session
              management.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Drizzle ORM
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Type-safe database operations with Neon PostgreSQL serverless
              database.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Zustand
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Lightweight state management with persistence for theme
              preferences.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
