/**
 * Created by david on 21/12/16.
 */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
/*
Libreria  que permite hacer insertar los tasks 'meteor/check'
 */
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks'); //Coleccion en Mongo

/*
 Este metodo se usa cuando se desinstala el paquete "meteor remove autopublish
 permite mostrar los tasks publicados
 */

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}


/*
Estos metodos se usan cuando se desinstala el paquete "meteor remove insecure"
Cada metodo cumple algo en especifico
 */

Meteor.methods({
    'tasks.insert'(texto) {
        console.log(texto)

        //Funcion de Meteor que permite checkear si es un string
        check(texto, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            console.log("No se permite el acceso");
            throw new Meteor.Error('not-authorized');
        }
        else
        Tasks.insert({
            texto,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'tasks.remove'(taskId) {
        console.log(taskId)
        check(taskId, String);

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, chequeo) {
        check(taskId, String);
        check(chequeo, Boolean);

        //if(chequeo == true)

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { checked: chequeo } });
    },

    /*
    Publicaciones privadas o publicas
     */
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
});
