// Semantic versioning
// ^ intersted in any versions major than 6 (6.x.x)
/* if ~ intersted in minor versions (1.13.x) */

// Listing the installed packages
// // npm list
// npm view (--deph=0)
// npm view mongoose
// npm view mongoose dependencies
// npm view mongoose versions
// npm update ** updates only the same major version 
// npm i -g npm-check-updates => install the checker package to update to latest versions
// Then run '$ncu -u'
// To oinstall a developer tool:
// npm i jshint --save-dev

// Uninstalling
// npm un mongoose

// working with global packages (like npm)
// npm -g i [npm]

// Publishing a module on 
// create an index.js
// npm createaccount
// npm login
// Once logged id..
// npm publish
// ** to update versions
// npm version major|minor|patch x

const  _ = require('underscore');
const mongoose = require('mongoose');

var test = _.contains([1,2,3,4], 3);
console.log(test);

// var m = mongoose.
