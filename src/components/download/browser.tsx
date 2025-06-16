'use client';

import { Check, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CHROME_WEBSTORE_URL } from '@/lib/constants';

export function BrowserTab() {
	const [installStates, setInstallStates] = useState<
		Record<'chrome' | 'userscript', 'idle' | 'installing' | 'installed'>
	>({
		chrome: 'idle',
		userscript: 'idle',
	});

	function handleInstall(type: 'chrome' | 'userscript', url: string) {
		setInstallStates((prev) => ({ ...prev, [type]: 'installing' }));

		setTimeout(() => {
			setInstallStates((prev) => ({ ...prev, [type]: 'installed' }));
		}, 1500);

		setTimeout(() => {
			setInstallStates((prev) => ({ ...prev, [type]: 'idle' }));
		}, 5000);

		window.open(url, '_blank', 'noreferrer');
	}

	const getButtonContent = (
		type: 'chrome' | 'userscript',
		defaultText: string,
		icon: React.ReactNode
	) => {
		const state = installStates[type];

		switch (state) {
			case 'installing':
				return (
					<>
						<div className='size-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-3' />
						Opening...
					</>
				);
			case 'installed':
				return (
					<>
						<Check className='size-4 mr-3' />
						Opened!
					</>
				);
			default:
				return (
					<>
						{icon}
						{defaultText}
					</>
				);
		}
	};

	return (
		<div className='space-y-10 mt-6'>
			<div className='text-center space-y-4'>
				<h2 className='text-2xl font-bold tracking-tight'>
					Install Vencord in Browser
				</h2>
				<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
					Use Discord directly in your web browser with Vencord&apos;s
					enhanced features.
				</p>
			</div>

			{/* Chrome Card */}
			<Card className='relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5'>
				<div className='absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]' />
				<div className='relative p-8 text-center space-y-6'>
					<div className='space-y-4'>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
							<CheckCircle className='size-3' />
							Recommended
						</div>
						<h4 className='text-xl font-semibold'>Chrome</h4>
						<p className='text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
							Use Vencord as a full-featured browser extension
							directly inside Chrome or Chromium-based browsers.
							Installed via the Chrome Web Store.
						</p>
					</div>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Button
							onClick={() =>
								handleInstall('chrome', CHROME_WEBSTORE_URL)
							}
							size='lg'
							disabled={installStates.chrome === 'installing'}
							className='h-14 px-8 text-base font-medium min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]'>
							{getButtonContent(
								'chrome',
								'Install from Chrome Store',
								<ExternalLink className='size-4 mr-3' />
							)}
						</Button>
						<p className='text-xs text-muted-foreground'>
							Via Chrome Web Store • Full feature support
						</p>
					</div>
				</div>
			</Card>

			{/* Userscript Fallback */}
			<div className='space-y-6'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center justify-center size-8 rounded-full bg-muted'>
						<Download className='size-4 text-muted-foreground' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>
							Userscript Alternative
						</h3>
						<p className='text-sm text-muted-foreground'>
							For browsers that don&apos;t support extensions
						</p>
					</div>
				</div>

				<Card className='border-dashed border-2 hover:border-solid hover:border-muted-foreground/30 transition-all duration-300'>
					<div className='p-8 space-y-6'>
						<div className='text-center space-y-4'>
							<h4 className='text-lg font-semibold'>
								Direct Userscript Installation
							</h4>
							<p className='text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
								Install a userscript manager like Violentmonkey
								or Tampermonkey, then install the Vencord
								userscript. Note that some features may be
								limited due to browser security policies.
							</p>
						</div>

						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Button
								onClick={() =>
									handleInstall(
										'userscript',
										'https://raw.githubusercontent.com/Vencord/builds/main/Vencord.user.js'
									)
								}
								size='lg'
								variant='outline'
								disabled={
									installStates.userscript === 'installing'
								}
								className='h-12 px-6 hover:bg-muted transition-colors duration-200'>
								{getButtonContent(
									'userscript',
									'Get Userscript',
									<Download className='size-4 mr-3' />
								)}
							</Button>
							<p className='text-xs text-muted-foreground'>
								Vencord.user.js • Works with most userscript
								managers
							</p>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
