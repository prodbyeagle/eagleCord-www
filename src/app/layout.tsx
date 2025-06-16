import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist_Mono, Inter } from 'next/font/google';

import './globals.css';

import { DottedBackground } from '@/components/eagle/dotted';
import { ReactScan } from '@/components/eagle/react-scan';
import { Toaster } from '@/components/eagle/toaster';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

const sans = Inter({
	variable: '--font-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: '🦅 @prodbyeagle',
	description: 'Eagle Template for Next.js',
	icons: '/icon.png',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${sans.variable} ${geistMono.variable} antialiased font-sans cursor-default tracking-tight select-text relative`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem>
					<div className='fixed inset-0 -z-10'>
						<DottedBackground
							dotColor='var(--foreground)'
							className='opacity-45'
							spacing={28}
							dotSize={2}
						/>
					</div>

					{/* Navbar (outside container!) */}
					<Navbar />

					{/* Page content */}
					<main className='relative z-0'>{children}</main>

					<Footer />
				</ThemeProvider>

				<Toaster />
				<ReactScan />
			</body>
		</html>
	);
}
