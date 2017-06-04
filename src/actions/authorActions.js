"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.js');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  createAuthor: function(author) {

    // Our mock API is synchronous, but typically we'll be making Ajax calls in places like this so we'll probably be handling
    // a some sort of a callback or using Promises right here to be able to handle the response from a web API.
    var newAuthor = AuthorApi.saveAuthor(author);

    // Hey dispatcher, go tell all the stores that an author was just created.
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      author: newAuthor
    });
  },

  updateAuthor: function(author) {

    var updatedAuthor = AuthorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor
    });
  },

  deleteAuthor: function(id) {

    //debugger;

    // If we wanted to make an asynchronous call to the server here (like in the real life scenario) and show a preloader,
    // an easy way to do that would be to have a separate AUTHOR_DELETED action that fires as well.
    // I.e. fire DELETE_AUTHOR action immediately here, then invoke web API and when the call completes - fire AUTHOR_DELETED.
    AuthorApi.deleteAuthor(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id
    });
  }
};

module.exports = AuthorActions;
