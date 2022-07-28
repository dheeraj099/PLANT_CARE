import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const showPushNotification = () => {
    console.log("Setting notification handler");
    Notifications.setNotificationHandler({
        handleNotification: async () => {
        console.log("Notification handler was called");
        return {
            shouldShowAlert: true,
            shouldShowAlert: true,
            shouldShowAlert: true,
        }
        }
    })
}

const checkRequiredPermission = () => {
    return Notifications.requestPermissionsAsync()
}

export async function schedulePushNotification({title, body}, {day=0, hour=0, minute=0, second=0}, isRepeating) {
    const isPermissionPresent =  await checkRequiredPermission();
     if (isPermissionPresent) {
        console.log("Notification permission granted");
        return Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: {type: 'delayed'}
            },
            trigger: {
                seconds: Math.max(60, second + minute * 60 + hour * 3600 + day * 86400),
                repeats: isRepeating
            },
        });
    }
    else {
        Alert.alert("Notification permission is required to proceed");
    }
}

export function cancelScheduledPushNotification(identifier) {
    return Notifications.cancelScheduledNotificationAsync(identifier);
}

export function cancelAllScheduledPushNotifications() {
    return Notifications.cancelAllScheduledNotificationsAsync();
}