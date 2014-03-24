/**
 * Module for the Todo model
 */
define([ 
    'configuration',
    'backbone'
], function (config) {
    /**
     * The Event model class definition
     * Used for CRUD operations against individual events
     */
    var Event = Backbone.Model.extend({
        urlRoot: config.baseUrl + 'rest/todos' // the URL for performing CRUD operations
    });
    // export the Event class
    return Event;
}); 