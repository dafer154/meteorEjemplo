import { Meteor } from 'meteor/meteor';
/**
 * Importa la API o las colecciones de datos, es aqui donde
 * se crea la coleccion dentro del servidor
 */
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});
