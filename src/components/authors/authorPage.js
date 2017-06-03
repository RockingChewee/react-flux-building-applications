"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({

  getInitialState: function() {
    return {
      authors: []
    };
  },

  componentDidMount: function() {
    if (this.isMounted()) {
      this.setState({ authors: AuthorApi.getAllAuthors() });
    }
  },

  render: function() {

    var createAuthorRow = function(author) {
      return (
        <tr>
          <td><a href={"/#authors/" + author.id}>{author.id}</a></td>
          <td>{author.firstName} {author.lastName}</td>
        </tr>
      );
    };

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
