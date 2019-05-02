/*
  Responsible for loading, applying and saving settings.
  Requires companion/companion-settings.js
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import * as fs from "fs";
import * as router from "../../common/message-router";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = {};
let onsettingschange;
let noop = function() {};

export function initialize(callback = noop) {
  settings = loadSettings(); // from the file system
  onsettingschange = callback;
  onsettingschange(settings);

  // begin listening for setting updates
  router.on("update_setting").then(function(data) {
    console.log('update_setting on device', data.key, data.value);
    settings[data.key] = data.value;
    onsettingschange(settings);
  });  
}

// Register for the unload event
me.addEventListener("unload", saveSettings);

// Load settings from filesystem
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    return {};
  }
}

// Save settings to the filesystem
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
