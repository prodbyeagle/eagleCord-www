'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BrowserTab } from './browser';
import { LinuxTab } from './linux';
import { MacOSTab } from './macos';
import { WindowsTab } from './windows';

export function DownloadTabs() {
	return (
		<Tabs defaultValue='windows' className='flex flex-col w-full h-full'>
			<TabsList className='w-full'>
				<TabsTrigger className='flex-1' value='windows'>
					Windows
				</TabsTrigger>
				<TabsTrigger className='flex-1' value='linux'>
					Linux
				</TabsTrigger>
				<TabsTrigger className='flex-1' value='mac'>
					macOS
				</TabsTrigger>
				<TabsTrigger className='flex-1' value='browser'>
					Browser
				</TabsTrigger>
			</TabsList>

			<div className='flex-1'>
				<TabsContent value='windows' className='h-full'>
					<WindowsTab />
				</TabsContent>
				<TabsContent value='linux' className='h-full'>
					<LinuxTab />
				</TabsContent>
				<TabsContent value='mac' className='h-full'>
					<MacOSTab />
				</TabsContent>
				<TabsContent value='browser' className='h-full'>
					<BrowserTab />
				</TabsContent>
			</div>
		</Tabs>
	);
}
