import { Check, Copy, Download, Link } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Code } from '../eagle/code';

export function InstallationSteps({ pluginName }: { pluginName: string }) {
	const [copied, setCopied] = useState(false);

	const copyPluginName = async () => {
		await navigator.clipboard.writeText(pluginName);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card className='bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'>
			<CardContent className='p-6'>
				<div className='space-y-6'>
					<div className='flex items-center gap-3'>
						<div className='p-2 bg-primary/10 rounded-lg'>
							<Download className='size-5 text-primary' />
						</div>
						<h3 className='text-lg font-semibold'>
							Quick Installation
						</h3>
					</div>

					<div className='space-y-4'>
						<div className='flex items-center gap-3 p-3 bg-background/50 rounded-lg border'>
							<div className='size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold'>
								1
							</div>
							<div className='flex-1'>
								<p className='font-medium'>Install Vencord</p>
								<p className='text-sm text-muted-foreground'>
									Download and install Vencord if you
									haven&apos;t already
								</p>
							</div>
							<Button variant='outline' size='sm' asChild>
								<Link href='/download'>Download</Link>
							</Button>
						</div>

						<div className='flex items-center gap-3 p-3 bg-background/50 rounded-lg border'>
							<div className='size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold'>
								2
							</div>
							<div className='flex-1'>
								<p className='font-medium'>
									Open Plugin Settings
								</p>
								<p className='text-sm text-muted-foreground'>
									Go to Discord Settings → Vencord → Plugins
								</p>
							</div>
						</div>

						<div className='flex items-center gap-3 p-3 bg-background/50 rounded-lg border'>
							<div className='size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold'>
								3
							</div>
							<div className='flex-1'>
								<p className='font-medium'>Enable Plugin</p>
								<div className='flex items-center gap-2 mt-1'>
									<span className='text-sm text-muted-foreground'>
										Search for:
									</span>
									<Code>
										{pluginName}
									</Code>
									<Button
										variant='ghost'
										size='sm'
										onClick={copyPluginName}
										className='h-auto p-1'>
										{copied ? (
											<Check className='size-3' />
										) : (
											<Copy className='size-3' />
										)}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
