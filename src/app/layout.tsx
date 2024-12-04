import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Navigation Manager',
  description: 'Manage your navigation items with drag and drop functionality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.className}>
      <body className="bg-gray-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
