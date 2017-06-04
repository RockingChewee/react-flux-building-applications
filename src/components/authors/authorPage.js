"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({

  getInitialState: function() {
    return {
      // No need to check if there are authors or not anymore, since we trust the store to retrieve either list of authors or an empty list.
      // Hence there is no need for the componentDidMount() function anymore as well.
      authors: AuthorStore.getAllAuthors()
    };
  },

  // Both componentWillMount() and componentWillUnmount() functions required when the store is updated, but it is needed to stay on the same page.
  // These will be used for deleting an author only, since adding/updating an author redirects us to author list page.
  componentWillMount: function() {
    AuthorStore.addChangeListener(this._onChange);
  },

  // Clean up when this component is unmounted.
  componentWillUnmount: function() {
    AuthorStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    //debugger;
    this.setState({ authors: AuthorStore.getAllAuthors() });
  },

  render: function() {

    return (
      <div className="jumbotron">
        <h1>Authors</h1>
        <Link to="addAuthor" className="btn btn-default">Add Author</Link>
        <AuthorList authors={this.state.authors} />
      </div>
    );
  }
});

module.exports = AuthorPage;
