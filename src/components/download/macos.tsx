import { AlertTriangle, CheckCircle, Download, ExternalLink, Folder, MousePointer2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';



import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';





export function MacOSTab() {
	const [downloadState, setDownloadState] = useState<
		'idle' | 'downloading' | 'downloaded'
	>('idle');

	function downloadVencord(): void {
		const url =
			'https://github.com/Vencord/Installer/releases/latest/download/VencordInstaller.MacOs.zip';

		setDownloadState('downloading');

		// Simulate download completion after a short delay
		setTimeout(() => {
			setDownloadState('downloaded');
		}, 1500);

		// Reset state after longer delay
		setTimeout(() => {
			setDownloadState('idle');
		}, 5000);

		window.open(url, '_blank', 'noreferrer');
	}

	const getButtonContent = () => {
		switch (downloadState) {
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
						Download for macOS
					</>
				);
		}
	};

	const steps = [
		{
			number: 1,
			icon: Download,
			title: 'Download & Extract',
			description:
				'Download the zip file and extract VencordInstaller.app',
		},
		{
			number: 2,
			icon: MousePointer2,
			title: 'Run Installer',
			description: 'Double-click or right-click → Open the installer app',
		},
		{
			number: 3,
			icon: CheckCircle,
			title: 'Install Vencord',
			description: 'Select your Discord installation and click Install',
		},
	];

	return (
		<div className='space-y-10 mt-6'>
			<div className='text-center space-y-3'>
				<h2 className='text-2xl font-bold tracking-tight'>
					Install Vencord on macOS
				</h2>
				<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
					Simple app-based installation that works with all Discord
					versions on macOS.
				</p>
			</div>

			<div className='space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center justify-center size-8 rounded-full bg-primary/10'>
						<Download className='size-4 text-primary' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>
							Installation Process
						</h3>
						<p className='text-sm text-muted-foreground'>
							Three simple steps to get started
						</p>
					</div>
				</div>

				<div className='grid md:grid-cols-3 gap-4'>
					{steps.map((step) => {
						const IconComponent = step.icon;
						return (
							<Card
								key={step.number}
								className='p-6 text-center border-2 border-muted/50 hover:border-muted transition-colors duration-200'>
								<div className='space-y-3'>
									<div className='flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mx-auto'>
										<IconComponent className='size-5' />
									</div>
									<div className='space-y-1'>
										<div className='text-xs font-medium text-muted-foreground'>
											Step {step.number}
										</div>
										<h4 className='font-semibold'>
											{step.title}
										</h4>
									</div>
									<p className='text-sm text-muted-foreground leading-relaxed'>
										{step.description}
									</p>
								</div>
							</Card>
						);
					})}
				</div>
			</div>

			<div className='space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center justify-center size-8 rounded-full bg-primary/10'>
						<Folder className='size-4 text-primary' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>
							Download Installer
						</h3>
						<p className='text-sm text-muted-foreground'>
							Get the macOS application installer
						</p>
					</div>
				</div>

				<Card className='relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5'>
					<div className='absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]' />
					<div className='relative p-8 text-center space-y-6'>
						<div className='space-y-4'>
							<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
								<CheckCircle className='size-3' />
								Native macOS App
							</div>
							<h4 className='text-xl font-semibold'>
								VencordInstaller.app
							</h4>
							<p className='text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
								Download the installer app that will
								automatically detect all Discord installations
								on your Mac and guide you through the
								installation process with a native macOS
								interface.
							</p>
						</div>

						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Button
								onClick={downloadVencord}
								size='lg'
								disabled={downloadState === 'downloading'}
								className='h-14 px-8 text-base font-medium min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]'>
								{getButtonContent()}
							</Button>
							<p className='text-xs text-muted-foreground'>
								VencordInstaller.MacOs.zip • ~3MB
							</p>
						</div>

						<div className='pt-4 border-t border-muted/20'>
							<p className='text-sm text-muted-foreground'>
								<strong>After downloading:</strong> Extract the
								zip file and run{' '}
								<code className='bg-muted px-2 py-1 rounded text-sm font-mono'>
									VencordInstaller.app
								</code>
								. The app will list all Discord installations on
								your system.
							</p>
						</div>
					</div>
				</Card>
			</div>

			<Card className='border-destructive/30 bg-destructive/[0.03] hover:bg-destructive/[0.05] transition-colors duration-200'>
				<div className='p-6'>
					<div className='flex gap-4'>
						<div className='flex items-center justify-center size-8 rounded-full bg-destructive/10 shrink-0'>
							<AlertTriangle className='size-4 text-destructive' />
						</div>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-destructive'>
								macOS Security Settings
							</h4>
							<div className='space-y-4'>
								<div className='space-y-3'>
									<p className='text-sm text-destructive/90'>
										If you get a{' '}
										<strong>
											&quot;VencordInstaller can&apos;t be
											opened&quot;
										</strong>{' '}
										warning, this is normal behavior for
										unsigned applications on macOS.
									</p>

									<div className='grid md:grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<h5 className='font-medium text-destructive text-sm'>
												macOS Sonoma and earlier:
											</h5>
											<p className='text-sm text-destructive/90'>
												Right-click{' '}
												<strong>
													VencordInstaller.app
												</strong>{' '}
												and select{' '}
												<strong>
													&quot;Open&quot;
												</strong>{' '}
												from the context menu.
											</p>
										</div>

										<div className='space-y-2'>
											<h5 className='font-medium text-destructive text-sm'>
												macOS Sequoia:
											</h5>
											<p className='text-sm text-destructive/90'>
												Go to{' '}
												<strong>
													System Settings → Privacy &
													Security
												</strong>{' '}
												and allow the app to run.
											</p>
										</div>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<ExternalLink className='size-4 text-destructive/70 shrink-0 mt-0.5' />
									<div className='space-y-2'>
										<p className='text-sm text-destructive/90'>
											<a
												href='https://support.apple.com/102445#openanyway'
												target='_blank'
												rel='noopener noreferrer'
												className='underline hover:no-underline font-medium'>
												Learn more about opening
												unsigned apps on macOS
											</a>
										</p>
									</div>
								</div>

								<div className='mt-4 p-4 bg-background/30 rounded-lg'>
									<p className='text-sm font-medium text-destructive mb-3'>
										macOS Sequoia Privacy & Security
										Settings:
									</p>
									<div className='bg-background/50 rounded-lg p-2 border border-destructive/20'>
										<Image
											src='/sequoia-install.jpg'
											alt='macOS System Settings showing Privacy & Security section with VencordInstaller.app permissions'
											className='w-full max-w-2xl rounded border border-muted/30'
											width={1000}
											height={1000}
											unoptimized
											loading='lazy'
										/>
									</div>
								</div>

								<div className='pt-3 border-t border-destructive/20'>
									<p className='text-sm text-destructive/90'>
										This security warning is entirely
										harmless and only appears because the
										app isn&apos;t digitally signed. Apple
										Developer Program membership costs{' '}
										<a
											href='https://developer.apple.com/support/compare-memberships/'
											target='_blank'
											rel='noopener noreferrer'
											className='inline-flex items-center gap-1 underline hover:no-underline font-medium'>
											$99/year
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