import type { PluginData } from '@/types';
import { Command, Globe, Monitor } from 'lucide-react';

export const FILTER_CRITERIA = [
	{
		name: 'Has Commands',
		icon: Command,
		check: (p: PluginData) => p.hasCommands,
	},
	{
		name: 'Desktop',
		icon: Monitor,
		check: (p: PluginData) => p.target !== 'web',
	},
	{
		name: 'Web',
		icon: Globe,
		check: (p: PluginData) => p.target === 'web',
	},
];
