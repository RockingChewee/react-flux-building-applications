"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter; // Broadcasts events from our stores to React components
var assign = require('object-assign'); // A way to glue multiple objects together, e.g.: assign({foo: 0}, {bar, 1}) ==> {foo: 0, bar: 1}
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = []; // '_' marks that the variable is private and is not exported out of this module

// Here we are taking the empty target object ({}) and copying the properties of EventEmitter.prototype and AuthorStore to it
// in ordrer to add EventEmitter capabilities to the AuthorStore.
var AuthorStore = assign({}, EventEmitter.prototype, {

  // expose adding change listeners for the particular React component to get notified of the Store changes
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  // expose removing change listeners for the particular React component to get notified of the Store changes
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // method that actually emits the change
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllAuthors: function() {
    return _authors;
  },

  getAuthorById: function(id) {
    return _.find(_authors, {id: id});
  }
});

// The following function is called EVERY time ANY action is dispatched. This is where this pattern differs from the traditional Publish-Subscribe.
Dispatcher.register(function(action) { // The type of 'action' used here is the one defined in authorAction.js.
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      _authors.push(action.author); // We changed the store state here and this is why we are emitting the change right after,
      AuthorStore.emitChange();     // so that all the React components that are registered with this store get re-rendered.
      break;
    case ActionTypes.UPDATE_AUTHOR:
      var existingAuthor = _.find(_authors, {id: action.author.id}); // Instead of re-retrieving author here we might just save the amended object,
      var existingAuthorIndex = _.indexOf(_authors, existingAuthor); // but it is safer from the data integrity perspective to re-retrieve it.
      _authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      //debugger;
      _.remove(_authors, function(author) {
        return action.id === author.id;
      });
      AuthorStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = AuthorStore;
