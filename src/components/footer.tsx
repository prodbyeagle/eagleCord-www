import { Github, Heart } from 'lucide-react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/eagle/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { SPONSOR_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { DiscordLogo } from '../../public/discord';

export function Footer() {
	return (
		<footer className='w-full border-t mt-20 py-4 text-sm text-muted-foreground'>
			<div className='max-w-screen-2xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4'>
				<p className='text-center sm:text-left leading-relaxed'>
					<Link
						href='/source'
						className='underline underline-offset-4 hover:text-foreground transition-all'>
						Source Code
					</Link>{' '}
					— Discord is trademark of Discord Inc. Vencord is not
					affiliated with or endorsed by Discord Inc.
				</p>

				<TooltipProvider>
					<div className='flex items-center gap-2'>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='https://github.com/vencord'
									target='_blank'
									rel='noopener noreferrer'
									className={cn(
										buttonVariants({
											variant: 'ghost',
											size: 'icon',
										})
									)}>
									<Github className='size-4' />
									<span className='sr-only'>GitHub</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='top'>
								View Source Code on GitHub
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={SPONSOR_URL}
									target='_blank'
									rel='noopener noreferrer'
									className={cn(
										buttonVariants({
											variant: 'ghost',
											size: 'icon',
										})
									)}>
									<Heart className='size-4' />
									<span className='sr-only'>Donate</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='top'>
								Donate to support our Development.
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='/discord'
									target='_blank'
									rel='noopener noreferrer'
									className={cn(
										buttonVariants({
											variant: 'ghost',
											size: 'icon',
										})
									)}>
									<DiscordLogo className='size-4' />
									<span className='sr-only'>
										Discord Server
									</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='top'>
								Join our Support Discord Server
							</TooltipContent>
						</Tooltip>

						<ThemeToggle />
					</div>
				</TooltipProvider>
			</div>
		</footer>
	);
}
