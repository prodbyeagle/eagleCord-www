import {
	AlertTriangle,
	CheckCircle,
	Download,
	ExternalLink,
	Terminal,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function WindowsTab() {
	type InstallerType = 'gui' | 'cli';

	const [downloadStates, setDownloadStates] = useState<
		Record<InstallerType, 'idle' | 'downloading' | 'downloaded'>
	>({
		gui: 'idle',
		cli: 'idle',
	});

	function downloadVencord(type: InstallerType): void {
		const urls = {
			gui: 'https://github.com/Vencord/Installer/releases/latest/download/VencordInstaller.exe',
			cli: 'https://github.com/Vencord/Installer/releases/latest/download/VencordInstallerCli.exe',
		};

		setDownloadStates((prev) => ({ ...prev, [type]: 'downloading' }));

		// Simulate download completion after a short delay
		setTimeout(() => {
			setDownloadStates((prev) => ({ ...prev, [type]: 'downloaded' }));
		}, 1500);

		// Reset state after longer delay
		setTimeout(() => {
			setDownloadStates((prev) => ({ ...prev, [type]: 'idle' }));
		}, 5000);

		window.open(urls[type], '_blank', 'noreferrer');
	}

	const getButtonContent = (type: InstallerType, defaultText: string) => {
		const state = downloadStates[type];

		switch (state) {
			case 'downloading':
				return (
					<>
						<div className='size-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-3' />
						Downloading...
					</>
				);
			case 'downloaded':
				return (
					<>
						<CheckCircle className='size-4 mr-3' />
						Downloaded!
					</>
				);
			default:
				return (
					<>
						<Download className='size-4 mr-3' />
						{defaultText}
					</>
				);
		}
	};

	return (
		<div className='space-y-10 mt-6'>
			<div className='text-center space-y-3'>
				<h2 className='text-2xl font-bold tracking-tight'>
					Install Vencord on Windows
				</h2>
				<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
					Choose your preferred installation method below. Both
					installers are safe and will guide you through the process.
				</p>
			</div>

			<div className='space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center justify-center size-8 rounded-full bg-primary/10'>
						<Download className='size-4 text-primary' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>
							Recommended Installation
						</h3>
						<p className='text-sm text-muted-foreground'>
							Best for most users
						</p>
					</div>
				</div>

				<Card className='relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5'>
					<div className='absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]' />
					<div className='relative p-8 text-center space-y-6'>
						<div className='space-y-4'>
							<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
								<CheckCircle className='size-3' />
								Most Popular
							</div>
							<h4 className='text-xl font-semibold'>
								GUI Installer
							</h4>
							<p className='text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
								The easiest way to install Vencord.
								Automatically detects all Discord installations
								on your system and guides you through the
								installation process with a user-friendly
								interface.
							</p>
						</div>

						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Button
								onClick={() => downloadVencord('gui')}
								size='lg'
								disabled={downloadStates.gui === 'downloading'}
								className='h-14 px-8 text-base font-medium min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]'>
								{getButtonContent(
									'gui',
									'Download GUI Installer'
								)}
							</Button>
							<p className='text-xs text-muted-foreground'>
								VencordInstaller.exe • ~2MB
							</p>
						</div>
					</div>
				</Card>
			</div>

			<div className='flex items-center gap-4'>
				<div className='flex-1 h-px bg-border' />
				<span className='text-sm text-muted-foreground font-medium'>
					OR
				</span>
				<div className='flex-1 h-px bg-border' />
			</div>

			<div className='space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center justify-center size-8 rounded-full bg-muted'>
						<Terminal className='size-4 text-muted-foreground' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>
							Command Line Alternative
						</h3>
						<p className='text-sm text-muted-foreground'>
							For advanced users and troubleshooting
						</p>
					</div>
				</div>

				<Card className='border-dashed border-2'>
					<div className='p-8 text-center space-y-6'>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold'>
								CLI Installer
							</h4>
							<p className='text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
								Command-line version perfect for power users,
								automation, or when the GUI installer
								doesn&apos;t work on your system. Offers the
								same functionality with terminal interface.
							</p>
						</div>

						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Button
								onClick={() => downloadVencord('cli')}
								size='lg'
								variant='outline'
								disabled={downloadStates.cli === 'downloading'}
								className='h-12 px-6 hover:bg-muted transition-colors duration-200'>
								{getButtonContent(
									'cli',
									'Download CLI Installer'
								)}
							</Button>
							<p className='text-xs text-muted-foreground'>
								VencordInstallerCli.exe • ~1.5MB
							</p>
						</div>
					</div>
				</Card>
			</div>

			<Card className='border-destructive/30 bg-destructive/[0.03]'>
				<div className='p-6'>
					<div className='flex gap-4'>
						<div className='flex items-center justify-center size-8 rounded-full bg-destructive/10 shrink-0'>
							<AlertTriangle className='size-4 text-destructive' />
						</div>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-destructive'>
								Important Security Information
							</h4>
							<div className='space-y-3'>
								<div className='flex items-start gap-3'>
									<div className='size-1.5 rounded-full bg-destructive/60 shrink-0 mt-2' />
									<p className='text-sm text-destructive/90'>
										<strong>
											Never run the installer as
											Administrator.
										</strong>{' '}
										This is unnecessary and potentially
										unsafe for your system.
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='size-1.5 rounded-full bg-destructive/60 shrink-0 mt-2' />
									<p className='text-sm text-destructive/90'>
										If Windows shows a security warning,
										click{' '}
										<strong>&quot;Run Anyway&quot;</strong>{' '}
										or{' '}
										<strong>&quot;More Info&quot;</strong>{' '}
										to reveal this option. This warning
										appears because the application
										isn&apos;t digitally signed.
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='size-1.5 rounded-full bg-destructive/60 shrink-0 mt-2' />
									<p className='text-sm text-destructive/90'>
										Code signing certificates cost{' '}
										<a
											href='https://shop.certum.eu/data-safety/code-signing-certificates/certum-ev-code-sigining.html'
											target='_blank'
											rel='noopener noreferrer'
											className='inline-flex items-center gap-1 underline hover:no-underline font-medium transition-colors hover:text-destructive'>
											€300 annually
											<ExternalLink className='size-3' />
										</a>
										, which is why we don&apos;t provide
										signed binaries.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
