"use strict";

var React = require('react');

var AuthorList = React.createClass({

  propTypes: {
    authors: React.PropTypes.object.isRequired
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
        <table className="table">
          <thead>
            <th>ID</th>
            <th>Name</th>
          </thead>
          <tbody>
            {this.props.authors.map(createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = AuthorList;
