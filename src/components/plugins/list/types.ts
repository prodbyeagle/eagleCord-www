import type { PluginData } from '@/types';

export interface FilterCriterion {
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	state: boolean;
	check: (plugin: PluginData) => boolean;
}
