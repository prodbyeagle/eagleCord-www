//*
//* Shared types and interfaces used throughout the application.
//*
//* Define reusable type declarations here to ensure consistent typing
//* and improve maintainability across components and modules.
//*
//* @example
//* ❌ Don't use overly generic or shortcut types like this:
//* export type SomePropsInThisCodeBase = React.HTMLAttributes<HTMLElement>;
//*
//* ✅ Do prefer more explicit, larger types or interfaces
//* that precisely describe the component's expected props:
//* export interface SomePropsInThisCodeBase extends React.HTMLAttributes<HTMLElement> {
//*   className?: string;
//*   children?: React.ReactNode;
//* 	 ... // other specific props
//* }
//*

export interface PluginDev {
	name: string;
	id: string;
}

export interface PluginData {
	name: string;
	description: string;
	tags: string[];
	authors: PluginDev[];
	dependencies: string[];
	hasPatches: boolean;
	hasCommands: boolean;
	required: boolean;
	enabledByDefault: boolean;
	target: 'discordDesktop' | 'vencordDesktop' | 'web' | 'dev';
	filePath: string;
}
