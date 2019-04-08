/*
  Responsible for loading, applying and saving settings.
  Requires companion/companion-settings.js
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings;
let onsettingschange;
let noop = function(){};

export function initialize(callback = noop) {
  settings = loadSettings(); // from the file system
  onsettingschange = callback;
  onsettingschange(settings);
}

// Received message containing settings data
messaging.peerSocket.addEventListener("message", function(evt) {
  if (evt.data.command !== 'update_setting') { return; }
  settings[evt.data.key] = evt.data.value;
  onsettingschange(settings);
})

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
