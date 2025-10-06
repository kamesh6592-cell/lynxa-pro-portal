// components/MainLayout.jsx
import { Sidebar } from './Sidebar';

export function MainLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <main className="flex-1 space-y-4 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
