/**
 * 
 * Wrapper around messaging
 */

import * as messaging from "messaging";

var routes = {};
var listening = false;

function addListeners(route, listener) {
  if (!routes[route]) {
    routes[route] = [];
  }
  routes[route].push(listener);
}

function publish(route, data) {
  if (routes[route]) {
    routes[route].forEach(function(r) {
      r(data);
    })
  }
}

export function on(command) {
  if (!listening) {
    listening = true;
    messaging.peerSocket.addEventListener("message", function(evt) {
      if (evt.data.command) {
        publish(evt.data.command, evt.data);
      }
    })
  }
  return {
    then: function(cb) {
      addListeners(command, cb)
    }
  }
}

messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
};

export function send(route, data = {}) {
  data.command = route;
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}