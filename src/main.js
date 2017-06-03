"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// Passing the additional Router.HistoryLocation argument switches the Location engine from Hash (default) to History (HTML5 History API)
Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
