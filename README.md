# cronrunner
A simple node program to check whether there are changes, once per day, to a number of websites the user wishes to follow. The node program then sends an e-mail to a specified address with those changes in digest form.

## Installation

1. Clone the repository

	```bash
git clone https://github.com/jrauschenberg/cronrunner.git
```

2. Install dependencies

	```bash
npm install
```

3. Insert the email address and password of the account you want to use for sending the emails in the app.js file on line 6.

4. Insert the email address that you want to send the emails to in the app.js file on line 40. You can also optionally add a "from" address and identity on line 39.

5. Insert the web sites you'd like to track in the app.js file on line 10.

6. Set the frequency of update emails in the app.js file on line 15. You will need to know some cron for this. One resource is [here](http://www.nncron.ru/help/EN/working/cron-format.htm).

## Usage

1. Run the application using node by typing `node app.js` into the bash shell.
