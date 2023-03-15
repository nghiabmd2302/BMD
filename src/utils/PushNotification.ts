var firebase = require("firebase-admin");
var configJsonFirebase = require("../../firebaseConfig.json");
var admin = require("firebase-admin");
import { getMessaging } from "firebase-admin/messaging";
var serviceAccount = require("path/to/serviceAccountKey.json");


interface Message {
  title: string;
  body: string;
  requireInteraction?: boolean;
  link?: string;
  type: string
}

interface BodyNoti {
  name: string
  msg: string;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bmdversion-default-rtdb.firebaseio.com",
});


var defaultAppConfig = {
  credential: firebase.credential.cert(configJsonFirebase),
};
// Initialize the default app
firebase.initializeApp(defaultAppConfig);

export async function sendFCMMessage(
  fcmToken: string,
  msg: Message,
  body: BodyNoti
): Promise<string> {
  try {
    const res = await getMessaging().send({
      webpush: {
        notification: {
          ...msg,
        //   requireInteraction: msg.requireInteraction ?? false,
          data: {
            type: body.name,
            message: body.msg
          },
        },
      },
      token: fcmToken,
    });
    return res;
  } catch (e) {
    console.error("sendFCMMessage error", e);
  }
}

export async function sendFCMMessageAndroid(
  fcmToken: string,
  title: string,
  body: BodyNoti
) {
  try {
    const res = await getMessaging().send({
      token: fcmToken,
      android: {
        notification: {
          title: title,
        },
        data: {
          bodyNoti: JSON.stringify({
            type: body.name,
            msg: body.msg,
          }),
        },
      },
    });
    return res;
  } catch (e) {
    console.error("sendFCMMessage error", e);
  }
}

export async function sendFCMMessageIOS(
  fcmToken: string,
  title: string,
  body: BodyNoti
) {
  try {
    const res = await getMessaging().send({
      token: fcmToken,
      notification: {
        title: title
      },
      data:{
        bodyNoti: JSON.stringify({
            type:  body.name,
            msg: body.msg,
          }),
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
    });
    return res;
  } catch (e) {
    console.error("sendFCMMessage error", e);
  }
}
