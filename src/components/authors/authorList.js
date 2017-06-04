"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var AuthorList = React.createClass({

  propTypes: {
    authors: React.PropTypes.object.isRequired
  },

  // This function could have been moved to the controller view and passed down to this author list via props.
  // Judgement call based on how likely this component can be reused and in what way, i.e. if the deleteAuthor()
  // function is likely to stay the same in all occasions - there is no need to provide means to replace it.
  deleteAuthor: function(id, event) {
    event.preventDefault();
    //debugger;
    AuthorActions.deleteAuthor(id);
    toastr.success('Author Deleted');
  },

  render: function() {

    var createAuthorRow = function(author) {
      return (
        <tr>
          <td><a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
          <td><Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link></td>
          <td>{author.firstName} {author.lastName}</td>
        </tr>
      );
    };

    return (
      <div className="jumbotron">
        <table className="table">
          <thead>
            <th></th>
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
