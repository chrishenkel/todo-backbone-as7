/**
 * Module for the Events collection
 */
define([
    // The collection element type and configuration are dependencies
    'app/models/todo',
    'configuration',
    'backbone'
], function (Todo, config) {
    /**
     *  Here we define the Bookings collection
     *  We will use it for CRUD operations on Bookings
     */
    var Events = Backbone.Collection.extend({
        url: config.baseUrl + "rest/todos", // the URL for performing CRUD operations
        model: Todo,
        id:"id", // the 'id' property of the model is the identifier
    });
    return Events;
});