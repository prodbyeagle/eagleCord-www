import {
	AlertTriangle,
	CheckCircle,
	Copy,
	ExternalLink,
	Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { Code } from '@/components/eagle/code';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { VENCORD_GITHUB } from '@/lib/constants';

const INSTALL_COMMAND = `sh -c "$(curl -sS https://raw.githubusercontent.com/Vendicated/VencordInstaller/main/install.sh)"`;

export function LinuxTab() {
	const [copied, setCopied] = useState(false);
	const [installationStep, setInstallationStep] = useState<
		'ready' | 'copied' | 'installing'
	>('ready');

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(INSTALL_COMMAND);
			setCopied(true);
			setInstallationStep('copied');
			toast.success('Command copied to clipboard!');

			setTimeout(() => {
				setCopied(false);
				setInstallationStep('ready');
			}, 3000);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
			toast.error('Failed to copy command');
		}
	};

	const steps = [
		{
			number: 1,
			title: 'Open Terminal',
			description: 'Launch your preferred terminal application',
		},
		{
			number: 2,
			title: 'Run Installation Command',
			description: 'Copy and paste the command below into your terminal',
		},
		{
			number: 3,
			title: 'Follow Instructions',
			description:
				'The installer will guide you through the rest of the process',
		},
	];

	return (
		<div className='space-y-10 mt-6'>
			<div className='text-center space-y-3'>
				<h2 className='text-2xl font-bold tracking-tight'>
					Install Vencord on Linux
				</h2>
				<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
					Simple one-command installation that works across all Linux
					distributions.
				</p>
			</div>

			<div className='space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center justify-center size-8 rounded-full bg-primary/10'>
						<Terminal className='size-4 text-primary' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>
							Quick Installation
						</h3>
						<p className='text-sm text-muted-foreground'>
							Three simple steps to get started
						</p>
					</div>
				</div>

				<div className='grid md:grid-cols-3 gap-4'>
					{steps.map((step) => (
						<Card
							key={step.number}
							className='p-6 text-center border-2 border-muted/50 hover:border-muted transition-colors duration-200'>
							<div className='space-y-3'>
								<div className='flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-semibold mx-auto'>
									{step.number}
								</div>
								<h4 className='font-semibold'>{step.title}</h4>
								<p className='text-sm text-muted-foreground leading-relaxed'>
									{step.description}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>

			<Card className='relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5'>
				<div className='absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]' />
				<div className='relative p-8 space-y-6'>
					<div className='text-center space-y-4'>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
							<Terminal className='size-3' />
							One Command Install
						</div>
						<h4 className='text-xl font-semibold'>
							Installation Command
						</h4>
						<p className='text-muted-foreground max-w-2xl mx-auto'>
							Run this command in your terminal to automatically
							download and install Vencord. <strong>Note:</strong>{' '}
							If you&apos;re using fish shell, switch to bash
							first by running <Code>bash</Code>
						</p>
					</div>

					<div className='space-y-4'>
						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Button
								onClick={copyToClipboard}
								size='lg'
								disabled={copied}
								className={`h-12 px-8 font-medium min-w-[250px] transition-all duration-300 ${
									installationStep === 'copied'
										? 'bg-green-600 hover:bg-green-700'
										: ''
								}`}>
								{copied ? (
									<>
										<CheckCircle className='size-4 mr-3' />
										Copied to Clipboard!
									</>
								) : (
									<>
										<Copy className='size-4 mr-3' />
										Copy Installation Command
									</>
								)}
							</Button>

							<Button
								onClick={() => {
									window.open(
										`${VENCORD_GITHUB}/Installer/blob/main/install.sh`,
										'_blank',
										'noopener,noreferrer'
									);
								}}
								size='lg'
								variant='ghost'
								disabled={copied}
								className={`h-12 px-8 font-medium min-w-[250px] transition-all duration-300 ${
									installationStep === 'copied'
										? 'bg-green-600 hover:bg-green-700'
										: ''
								}`}>
								View Source Code
							</Button>
						</div>
					</div>
				</div>
			</Card>

			<Card className='border-destructive/30 bg-destructive/[0.03]'>
				<div className='p-6'>
					<div className='flex gap-4'>
						<div className='flex items-center justify-center size-8 rounded-full bg-destructive/10 shrink-0'>
							<AlertTriangle className='size-4 text-destructive' />
						</div>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-destructive'>
								Discord Installation Requirements
							</h4>
							<div className='space-y-3'>
								<p className='text-sm text-destructive/90'>
									<strong>
										Discord installed via Snap is not
										supported.
									</strong>{' '}
									The Snap version runs in a sandboxed
									environment that prevents Vencord from
									working properly.
								</p>
								<div className='space-y-2'>
									<p className='text-sm font-medium text-destructive'>
										Use one of these supported Discord
										installations instead:
									</p>
									<div className='grid sm:grid-cols-2 gap-3'>
										<Link
											href='https://flathub.org/apps/details/com.discordapp.Discord'
											target='_blank'
											rel='noopener noreferrer'
											className='inline-flex items-center gap-2 p-3 rounded-lg border border-destructive/20 bg-background/50 hover:bg-background/80 transition-colors group'>
											<div className='flex items-center justify-center size-8 rounded-full bg-primary/10'>
												<ExternalLink className='size-4 text-primary' />
											</div>
											<div>
												<p className='font-medium text-sm'>
													Discord Flatpak
												</p>
												<p className='text-xs text-muted-foreground'>
													Recommended for most users
												</p>
											</div>
										</Link>
										<Link
											href='https://discord.com/download'
											target='_blank'
											rel='noopener noreferrer'
											className='inline-flex items-center gap-2 p-3 rounded-lg border border-destructive/20 bg-background/50 hover:bg-background/80 transition-colors group'>
											<div className='flex items-center justify-center size-8 rounded-full bg-primary/10'>
												<ExternalLink className='size-4 text-primary' />
											</div>
											<div>
												<p className='font-medium text-sm'>
													Official .deb Package
												</p>
												<p className='text-xs text-muted-foreground'>
													For Debian/Ubuntu systems
												</p>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
