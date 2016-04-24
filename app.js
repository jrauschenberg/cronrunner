var schedule = require('node-schedule');
var fetch = require('node-fetch');
var jsdiff = require('diff');
var chalk = require('chalk');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

var page = {};
var diffs = "";
var sites = ['http://cnn.com', 'http://google.com', 'http://purple.com'];
sites.forEach(function(site) {
  page[site] = null;
});
 
var j = schedule.scheduleJob('0 0 * * *', function(){
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
        var initialDiff = jsdiff.diffTrimmedLines(page[site], body);
        var modifiedDiff = site + " has changed!\n\n";
        initialDiff.forEach(function(part) {
          if (part.added) modifiedDiff += "\nAdded: " + part.value;
          else if (part.removed) modifiedDiff += "\nRemoved: " + part.value;
        });
        diffs += modifiedDiff;
      }
      page[site] = body;
    }).then(function() {
      if (diffs) {
        transporter.sendMail({
          from: "Cronrunner <cronrunner@cronrunner.com>",
          to: "example@example.com",
          subject: 'Your Daily Page Updates',
          text: diffs,
        }, 
        function(error, info){
          if(error){
            return console.log(error);
          }
          console.log('Message sent: ' + info.response);
        });
      }
    });
}; 


