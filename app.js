var schedule = require('node-schedule');
var fetch = require('node-fetch');

// var j = schedule.scheduleJob('* * * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });
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
      if (page[site] !== body && page[site]) console.log(site, "has changed!");
      page[site] = body;
    });
}; 