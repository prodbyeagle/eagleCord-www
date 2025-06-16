export function getEnv(env: NodeJS.ProcessEnv, name: string): string {
	const value = env[name];

	if (!value || value.trim() === '') {
		throw new Error(`Missing environment variable "${name}"`);
	}

	return value;
}
