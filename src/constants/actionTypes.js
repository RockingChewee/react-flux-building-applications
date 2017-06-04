"use strict";

var keyMirror = require('react/lib/keyMirror'); // to avoid typing values for keys to simulate enumeration, i.e. they key is copied to the value

module.exports = keyMirror({
  INITIALIZE: null,
  CREATE_AUTHOR: null,
  UPDATE_AUTHOR: null,
  DELETE_AUTHOR: null
});
