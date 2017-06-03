"use strict";

var React = require('react');

var Home = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      if (!confirm('Are you sure you want to read a page that\'s this boring?')) {
        transition.abort(); // this is fired once unless the page is reloaded...
      } else {
        callback();
      }
    },
    willTransitionFrom: function(transition, component) {
      if (!confirm('Are you sure you want to leave a page that\'s this exciting?')) {
        transition.abort();
      }
    }
  },
  render: function() {
    return (
      <div className="jumbotron">
        <h1>About</h1>
        <p>
          This application uses the following technologies:
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Flux</li>
            <li>Node</li>
            <li>Gulp</li>
            <li>Browserify</li>
            <li>Bootstrap</li>
          </ul>
        </p>
      </div>
    );
  }
});

module.exports = Home;
