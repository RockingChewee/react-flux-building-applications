"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}> // this is shown for each page
    <DefaultRoute handler={require('./components/homePage')}/> // if chosen, this is shown together with the root route as a sub-route
    <Route name="authors" handler={require('./components/authors/authorPage')} />
    <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')} />
    <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')} />
    // 'name' is the defined name of the route that is to be used in the code while referring to the route.
    // 'path' is the part of URI that corresponds to the route. It is optional attribute that can be ommitted if it matches the 'name'.
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <NotFoundRoute handler={require('./components/notFoundPage')}/>
    <Redirect from="about-us" to="about" /> // if the URL was renamed
    <Redirect from="awthurs" to="authors" /> // to handle potential typos if needed
    <Redirect from="about/*" to="about" /> 'from' can also contain special characters, like '*'
  </Route>
);

module.exports = routes;
