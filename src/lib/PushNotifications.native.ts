import {NotificationOpen} from "@react-native-firebase/app/notifications";
import {AppState, Vibration} from "react-native";
import {Navigation} from "react-native-navigation";
import {clearNotifications, FireStorm, getNotificationBadge} from "../../../shared";
import {AddMealPlan} from "../AddMealPlan";
import {showFullPageModal} from "../Modal";

function getMessageId(messageOrNotification: any) {
  return messageOrNotification.messageId || messageOrNotification.notificationId;
}

// Set the badge on the app icon and on the chat tab.
export function setAppBadge(badge: number) {
  console.log(`[push] setting badge to ${badge}`);
  // firebase.notifications().setBadge(badge);
}

export function setTabBadge(badge: number, tab: string) {
  let badgeString;
  if (badge === 0) {
    badgeString = "";
  } else if (badge < 10) {
    badgeString = String(badge);
  } else {
    badgeString = "9+";
  }
  Navigation.mergeOptions(tab, {
    bottomTab: {
      badge: badgeString,
    },
  });
}

export function setAllBadges() {
  const profile = FireStorm.getUser();
  if (profile) {
    setAppBadge(getNotificationBadge(profile));
    setTabBadge(getNotificationBadge(profile, "log"), "LogTab");
    setTabBadge(getNotificationBadge(profile, "feed"), "HomeTab");
    setTabBadge(getNotificationBadge(profile, "chat"), "ChatTab");
    setTabBadge(getNotificationBadge(profile, "profile"), "ProfileTab");
  }
}

export async function clearNotificationsForTab(tab: "log" | "feed" | "chat" | "profile") {
  const profile = FireStorm.getUser();
  if (!profile) {
    console.warn("Cannot clear tab bagdes without profile for:", tab);
    return;
  }

  await clearNotifications(profile, tab);

  setAllBadges();
  setAppBadge(getNotificationBadge(profile));
}

function getAndroidChannel() {
  // const channel = new firebase.notifications.Android.Channel(
  //   "avotoast",
  //   "AvoToast",
  //   firebase.notifications.Android.Importance.Max
  // ).setDescription("AvoToast Notifications");
  // firebase.notifications().android.createChannel(channel);
  // return channel;
}

// Give the system a hint about what kind of notification is being displayed.
// This is used by Android for ranking and filtering notifications.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAndroidNotificationCategory(notificationType: string): "msg" {
  return "msg";
}

interface NotificationPayload {
  notificationId?: string;
  title: string;
  data?: any;
  body: string;
  androidChannel?: {channelId: string};
  date?: number;
}

export function showNotification({
  notificationId,
  title,
  data,
  body,
  androidChannel,
  date,
}: NotificationPayload) {
  // data = data || {};
  // const localNotification = new firebase.notifications.Notification()
  //   .setNotificationId(notificationId || title)
  //   .setTitle(title)
  //   .setBody(body)
  //   .setData(data)
  //   .setSound("default");
  // if (Platform.OS === "android") {
  //   if (!androidChannel) {
  //     androidChannel = getAndroidChannel();
  //   }
  //   localNotification
  //     .setTitle("AvoToast")
  //     .android.setTicker(title)
  //     .android.setBigText(title)
  //     .android.setCategory(getAndroidNotificationCategory(data.type))
  //     .android.setChannelId(androidChannel.channelId)
  //     .android.setAutoCancel(true)
  //     .android.setLargeIcon("ic_large_notification")
  //     .android.setSmallIcon("ic_small_notification");
  // }
  // if (date) {
  //   console.log(
  //     `[notifications] Scheduling notification "${title}" for ${moment(date).toISOString()}`
  //   );
  //   return firebase.notifications().scheduleNotification(localNotification, {
  //     fireDate: date,
  //   });
  // } else {
  //   return firebase.notifications().displayNotification(localNotification);
  // }
}

class PushSvc {
  androidChannel = getAndroidChannel();
  store: any;

  async init(store: any) {
    console.debug("[push] Initializing push service.");
    // this.store = store;

    // try {
    //   const hasPerms = await firebase.messaging().hasPermission();
    //   console.log("[push] Push permissions enabled: ", hasPerms);
    //   console.log(
    //     "[push] Push permissions request result: ",
    //     await firebase.messaging().requestPermission()
    //   );
    // } catch (e) {
    //   console.log("[push] Could not initialized push service.");
    // }
    // Platform.OS === "ios" && firebase.messaging().ios.registerForRemoteNotifications();

    // firebase.messaging().onMessage(this.onDataMessageReceived);
    // firebase.notifications().onNotification(this.onNotificationReceived as any);
    // firebase.notifications().onNotificationOpened(this.onNotificationOpened);
    // firebase.notifications().onNotificationDisplayed(this.onNotificationDisplayed);

    // setAllBadges();
    // FireStorm.onProfileStateChanged(() => setAllBadges());
  }

  /**
   * Handle a Firebase notification that contains both a notification and an optional data payload.
   * This is an iOS-specific code path, since the API server sends data-only messages to
   * Android devices.
   * This callback is only called if the app is running in the foreground; while the app is not
   * running or in the background, none of our code is invoked, and iOS displays the notification
   * itself.
   */
  onNotificationReceived = (notification: Notification) => {
    console.log("[push] Received FCM push notification", notification);
    // setAllBadges();
    // if (Platform.OS !== "ios") {
    //   Sentry.captureException(new Error("Firebase push not expected on Android"));
    //   return;
    // }
    // this.maybeAlertUser({
    //   title: notification.title || notification.data.title,
    //   body: notification.body || notification.data.body,
    //   data: notification.data,
    //   notificationId: getMessageId(notification),
    //   androidChannel: this.androidChannel,
    // });
    // this.handleNotificationPayload(notification);
  };

  /**
   * Handles a data-only FCM message. This is called for all Android messages and for
   * iOS messages without a user-visible notification.
   */
  onDataMessageReceived = (message: any) => {
    console.log("[push] Received FCM data message", message, message.data);
    // setAllBadges();
    // this.maybeAlertUser({
    //   title: message.data.title,
    //   body: message.data.body,
    //   data: message.data,
    //   notificationId: getMessageId(message),
    //   androidChannel: this.androidChannel,
    // });

    // this.handleNotificationPayload(message.data);
  };

  maybeAlertUser = ({title, data, body, notificationId, androidChannel}: NotificationPayload) => {
    if (this.shouldShowNotification(data)) {
      showNotification({title, data, body, notificationId, androidChannel});
    } else {
      // Alert the user, but don't create a separate notification,
      // since they can already see the payload.
      Vibration.vibrate(200, false);
    }
    setAllBadges();
  };

  shouldShowNotification = (data: any) => {
    // TODO: determine if they are on the chat screen or not.
    return Boolean(data && data.title);
  };

  handleNotificationPayload = (notification: Notification) => {
    if (notification.data && notification.data.type === "chat") {
      Vibration.vibrate(200, false);
      console.log("[push] Chat message in foreground, vibrating.");
    } else if (notification.title || (notification.data && notification.data.title)) {
      this.maybeAlertUser(notification);
    } else {
      console.log("[push] Nothing to handle for notification", notification);
    }
  };

  onNotificationOpened = async (notification: NotificationOpen) => {
    console.log("[push] Opened notification", notification);
    setAllBadges();
    this.maybeNavigate(notification.notification.data);
  };

  onNotificationDisplayed = (notification: any) => {
    console.log("[push] Notification displayed", notification);
    setAllBadges();
    this.maybeNavigate(notification);
  };

  maybeNavigate = (data: any) => {
    if (data.modalScreen === "AddMealPlan") {
      showFullPageModal(AddMealPlan, "Add Meal Plan", undefined, JSON.parse(data.passProps));
    }
  };
}

export function cancelAllNotifications() {
  // return firebase.notifications().cancelAllNotifications();
}

// Handles notifications when the app is not currently running. Currently only shows a notification
// on Android. In the future, it should support background refreshes.
export async function processBackgroundNotification(message: any) {
  console.log("[push] Received background notification", message);
  // If it doesn't have a message, we don't need to show anything.
  // TODO: refresh the user and feed when notifications come in while backgrounded.
  // if (!get(message, "data.title")) {
  //   console.log("[push] No title, not showing background notification.");
  //   return Promise.resolve();
  // }

  // return showNotification({
  //   title: message.data.title,
  //   body: message.data.body,
  //   data: message.data,
  //   notificationId: getMessageId(message),
  //   androidChannel: getAndroidChannel(),
  // });
}

let pushTokenUpdated = false;
export const updatePushToken = async () => {
  // const profile = await FireStorm.getUser();
  // Update chat token.
  // if (!pushTokenUpdated && profile) {
  //   const pushToken = await rnfirebase.messaging().getToken();
  //   const timezone = moment.tz.guess(true);
  //   FireStorm.updateProfile({pushToken, timezone} as any);
  //   pushTokenUpdated = true;
  //   console.log("[chat] Updated push token", pushToken);
  // }
};

AppState.addEventListener("change", async (nextState) => {
  if (nextState === "active") {
    setAllBadges();
  }
});

const PushService = new PushSvc();
export {PushService};
