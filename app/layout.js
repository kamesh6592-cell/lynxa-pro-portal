// app/layout.js
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from './providers';
import './globals.css'; // Make sure this is imported

export const metadata = {
  title: 'Lynxa Pro Portal',
  description: 'Manage your Lynxa Pro API Keys',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: undefined,
        variables: { colorPrimary: '#3b82f6' }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
