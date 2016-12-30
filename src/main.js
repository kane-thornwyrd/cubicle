import 'figlet';
import chalk        from 'chalk';
import CLI          from 'clui';
import { Spinner }  from 'clui';
import inquirer     from 'inquirer';
import Preferences  from 'preferences';
import _            from 'lodash';
import fs           from 'fs';

function getCredentials(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter username:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}

getCredentials(function(){
  console.log(arguments);
});
