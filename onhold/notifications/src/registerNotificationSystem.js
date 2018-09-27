let notificationSystem = null;

export function registerNotificationSystem(notifySystem) {
	notificationSystem = notifySystem;
}

export function getNotificationSystem() {
	return notificationSystem;
}
