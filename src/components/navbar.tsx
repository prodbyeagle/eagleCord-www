'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ThemeToggle } from '@/components/eagle/theme-toggle';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { cn } from '@/lib/utils';

export function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const isActive = (href: string) => pathname === href;

	const navigationItems = [
		{ href: '/download', label: 'Download' },
		{ href: '/plugins', label: 'Plugins' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/cloud', label: 'Cloud' },
	];

	return (
		<header className='w-full border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60'>
			<div className='container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8'>
				<Link
					href='/'
					className='flex items-center gap-2 transition-opacity hover:opacity-80'
					aria-label='Vencord Home'>
					<div className='relative size-8'>
						<Image
							src='/icon.png'
							alt='Vencord'
							fill
							className='object-contain'
							sizes='32px'
							priority
						/>
					</div>
					<span className='font-semibold text-lg tracking-tight'>
						Vencord
					</span>
				</Link>

				<div className='flex items-center gap-1'>
					<nav className='hidden md:flex items-center gap-1'>
						{navigationItems.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={cn(
									'px-3 py-2 text-sm font-medium transition',
									'hover:text-accent-foreground',
									'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
									isActive(href)
										? 'underline decoration-dotted'
										: 'text-muted-foreground'
								)}>
								{label}
							</Link>
						))}
					</nav>

					<div className='md:hidden'>
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button
									variant='ghost'
									size='sm'
									className='size-9 px-0'
									aria-label='Toggle menu'>
									<Menu className='size-4' />
								</Button>
							</SheetTrigger>
							<SheetContent
								side='right'
								className='w-[300px] sm:w-[400px]'>
								<SheetHeader>
									<SheetTitle>Navigation</SheetTitle>
									<SheetDescription>
										Access Vencord features and settings
									</SheetDescription>
								</SheetHeader>

								<div className='flex flex-col gap-4'>
									<nav className='flex flex-col gap-2 p-2 text-center'>
										{navigationItems.map(
											({ href, label }) => (
												<Link
													key={href}
													href={href}
													onClick={() =>
														setIsOpen(false)
													}
													className={cn(
														'px-3 py-3 text-sm font-medium rounded-md transition-colors',
														'hover:bg-accent hover:text-accent-foreground',
														'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
														isActive(href)
															? 'bg-accent text-accent-foreground'
															: 'text-muted-foreground'
													)}>
													{label}
												</Link>
											)
										)}
									</nav>

									<div className='flex items-center justify-center'>
										<span className='pl-1'>
											Switch Theme:{' '}
										</span>
										<ThemeToggle />
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
