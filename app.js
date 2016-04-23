var schedule = require('node-schedule');
var fetch = require('node-fetch');
var jsdiff = require('diff');
var chalk = require('chalk');

var page = {};
var sites = ['http://cnn.com', 'http://google.com', 'http://purple.com'];
sites.forEach(function(site) {
  page[site] = null;
});
 
var j = schedule.scheduleJob('*/2 * * * * *', function(){
  sites.forEach(function(site) {
    siteChecker(site);
  });
});

var siteChecker = function(site) {
  fetch(site)
    .then(function(res) {
      return res.text();
    }).then(function(body) {
      if (page[site] !== body && page[site]) {
        console.log(site, "has changed!");
        var diff = jsdiff.diffLines(page[site], body);
        diff.forEach(function(part) {
          if (part.added) console.log("Added: " + chalk.green(part));
          if (part.removed) console.log("Removed: " + chalk.red(part));
        });
      }
      page[site] = body;
    });
}; 