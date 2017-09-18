export const actionType = prefix => new Proxy({}, {
	get: (target, name) => `${prefix}_${name}`,
});

export const changed = a => `${a}/changed`;
export const ready = a => `${a}/ready`;
export const error = a => `${a}/error`;
export const unsubscribed = a => `${a}/unsubscribed`;
