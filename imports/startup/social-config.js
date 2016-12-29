/**
 * Created by david on 27/12/16.
 */

import { Accounts } from 'meteor/accounts-facebook';
/*
 Permite llamar una libreria de Meteor y poder usarla en el login
 */

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1425065967793044',
    secret: '3fc2599db269d0e6f26907954f32b6d2'
});