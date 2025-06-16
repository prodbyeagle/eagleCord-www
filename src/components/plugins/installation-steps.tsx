import { Check, Copy, Download } from 'lucide-react';
import { useState } from 'react';

import { Code } from '../eagle/code';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export function InstallationSteps({ pluginName }: { pluginName: string }) {
	const [copied, setCopied] = useState(false);

	const copyPluginName = async () => {
		await navigator.clipboard.writeText(pluginName);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const steps = [
		{
			title: 'Install Vencord',
			description: "Download and install Vencord if you haven't already",
			action: (
				<Button variant='outline' size='sm' asChild>
					<a href='/download'>Download here!</a>
				</Button>
			),
		},
		{
			title: 'Open Plugin Settings',
			description: 'Go to Discord Settings → Vencord → Plugins',
		},
		{
			title: 'Enable Plugin',
			description: (
				<div className='flex items-center gap-2 flex-wrap'>
					<span className='text-sm text-muted-foreground whitespace-nowrap'>
						Search for:
					</span>
					<Code className='whitespace-nowrap'>{pluginName}</Code>
					<Button
						variant='ghost'
						size='sm'
						onClick={copyPluginName}
						className='h-auto p-1'
						aria-label='Copy plugin name'>
						{copied ? (
							<Check className='size-3 text-primary' />
						) : (
							<Copy className='size-3 text-muted-foreground' />
						)}
					</Button>
				</div>
			),
		},
	];

	return (
		<Card className='bg-background border border-border shadow-sm'>
			<CardContent className='p-6'>
				<div className='space-y-6'>
					<div className='flex items-center gap-3'>
						<div className='p-2 bg-primary/10 rounded-lg flex items-center justify-center'>
							<Download className='size-5 text-primary' />
						</div>
						<h3 className='text-lg font-semibold text-foreground'>
							Quick Installation
						</h3>
					</div>

					<div className='space-y-5'>
						{steps.map((step, idx) => (
							<div
								key={idx}
								className='flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/5 hover:bg-muted transition-colors'>
								<div className='size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold select-none'>
									{idx + 1}
								</div>
								<div className='flex-1 min-w-0'>
									<p className='font-medium text-foreground'>
										{step.title}
									</p>
									<p className='text-sm text-muted-foreground'>
										{step.description}
									</p>
								</div>
								{step.action && <div>{step.action}</div>}
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
