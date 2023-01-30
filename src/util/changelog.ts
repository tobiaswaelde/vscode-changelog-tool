export function getCurrentDate(): string {
	const d = new Date();
	return d.toISOString().split('T')[0];
}
