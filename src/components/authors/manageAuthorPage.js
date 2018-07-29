"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({

  mixins: [
    Router.Navigation // this is used in the saveAuthor() handler for transitionTo() invocation
  ],

  statics: {
    willTransitionFrom: function(transition, component) { // this prevents from navigating away if there were changes to inputs
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      author: { id: '', firstName: '', lastName: '' },
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() { // not 'componentDidMount', because we want to setState before rendering occurres
    var authorId = this.props.params.id; // from the path '/author/:id' if routed here by 'manageAuthor' route and not 'addAuthor'
    if (authorId) {
      this.setState({author: AuthorStore.getAuthorById(authorId)});
    }
  },

  // When specified as onChange event handler, this function will be called on every single key press
  setAuthorState: function(event) {
    this.setState({dirty: true}); // setting 'dirty' when any key pressed
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },

  authorFormIsValid: function() {
    var formIsValid = true;
    this.state.error = {}; // clear any previous errors

    if (this.state.author.firstName.length < 2) {
      this.state.errors.firstName = 'First name must be at least 2 characters';
      formIsValid = false;
    } else {
      this.state.errors.firstName = null;
    }

    if (this.state.author.lastName.length < 2) {
      this.state.errors.lastName = 'Last name must be at least 2 characters';
      formIsValid = false;
    } else {
      this.state.errors.lastName = null;
    }

    this.setState({errors: this.state.errors});

    return formIsValid;
  },

  saveAuthor: function(event) {
    event.preventDefault(); // we don't want the default browser behavior here, i.e. we are going to use JavaScript code and not browser Submit behavior
    if (!this.authorFormIsValid()) {
      return;
    }
    if (this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
    } else {
      AuthorActions.createAuthor(this.state.author);
    }
    this.setState({dirty: false}); // resetting 'dirty' flag
    toastr.success('Author Saved'); // popup feedback message
    this.transitionTo('authors'); // the Router.Navigation mixin is used here
  },

  render: function() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.setAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageAuthorPage;
