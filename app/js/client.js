require('angular/angular');

// Create our app
var vetApp = angular.module('vetApp', []);

// Load our controllers and directives based on feature. We just have one 
// for this project, but if we expanded it, we might put in more.

require('./pets/entry')(vetApp);