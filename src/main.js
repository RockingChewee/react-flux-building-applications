//"use strict"; // Cannot 'use strict' here due to the need of having the jquery variable in a global namespace. This is workarounded by using IIFE.
$ = jQuery = require('jquery'); // Bootstrap expects jquery to be in a global namespace

var React = require('react');
var Home = require('./components/homePage');
var Authors = require('./components/authors/authorPage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');

(function(win) { // an IIFE to workaround the 'use strict' and jquery global variable collision

  "use strict";

  var App = React.createClass({
    render: function() {
      var Child;
      switch(this.props.route) { // capturing the attribute values passed over by the parent component (this.props)
        case 'authors' : Child = Authors; break;
        case 'about': Child = About; break;
        default: Child = Home;
      }

      return (
        <div>
          <Header/>
          <Child/>
        </div>
      );
    }
  });

  function render() {
    var route = win.location.hash.substr(1); // 'window' to 'win', since 'win' is passed to the IIFE
    React.render(<App route={route} />, document.getElementById('app')); // passing props to the child component
  }

  win.addEventListener('hashchange', render); // Event that occurres when there is a hash change in the URL, e.g. http://localhost:9005/#about
  render();

})(window);
