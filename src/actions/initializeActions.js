"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');

var InitializeActions = {

  initApp: function() {

    // We could have moved this code to issue the Action directly to main.js, but it is cleaner for all actions
    // to sit at one place and in case there is a need for any further application bootstrapping.
    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      initialData: {
        authors: AuthorApi.getAllAuthors()
      }
    });
  }
};

module.exports = InitializeActions;
