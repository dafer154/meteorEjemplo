/**
 * Created by david on 27/12/16.
 */

import { Accounts } from 'meteor/accounts-base';

/*
Permite llamar una libreria de Meteor y poder usarla en el login
 */
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});

