import * as messaging from "messaging";
import { settingsStorage } from "settings";

function format(key, val) {
  return {
    command: 'update_setting',
    key: key,
    value: JSON.parse(val)
  }
}

function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}

function sendValue(key, val) {
  if (val) {
    sendSettingData(format(key, val));
  }
}

export function init(onUpdate) {
  settingsStorage.addEventListener("change", evt => {
    if (evt.oldValue !== evt.newValue) {
      // send new custom setting to the device via messages
      sendValue(evt.key, evt.newValue);
      // also send new custom setting locally via callback
      if (typeof onUpdate === "function") {
        onUpdate(format(evt.key, evt.newValue));
      }
    }
  });
}