/**
 * Created by david on 21/12/16.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';
import '../startup/facebook.html'
/**
 * El metodo template puede llamar el body e incluir datos
 * dentro de el
 */
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    //Permite ver las suscripciones
    Meteor.subscribe('tasks');
});

/*
Permite añadir ayudas al body y al template
 */
Template.body.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }},
        /*
        Funcion que permite contar los tasks checked
         */
        incompleteCount() {
            return Tasks.find({ checked: { $ne: true } }).count();
        },


    prueba: [
        { text: 'David 1' },
        { text: 'Fernando 2' },
        { text: 'Zuluaga 3' },
    ],
});

/**
 *Este metodo permite llamar al evento del body para hacer las respectivas acciones
 */

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;



        /*
        Metodo antigua que insertaba datos a la Base de datos

        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
            name: Meteor.user().name,

        });
        */

        Meteor.call('tasks.insert', text);

        // Clear form
        target.text.value = '';
    },

    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});

/**
 * Permite organizar los comentarios en el orden que se vayan creando
 */
Template.body.helpers({
    tasks() {
        // Show newest tasks at the top-- Metodos de MondoDB
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
});