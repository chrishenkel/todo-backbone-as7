/**
 * A module for the router of the desktop application
 */
define("router", [
    'jquery',
    'underscore',
    'configuration',
    'utilities',
    'app/collections/todos',
    'app/views/desktop/todos',
    'text!../templates/desktop/main.html'
],function ($,
            _,
            config,
            utilities,
            Todos,
            TodosView,
            MainTemplate) {
	
    $(document).ready(new function() {
       utilities.applyTemplate($('body'), MainTemplate);
    });

    /**
     * The Router class contains all the routes within the application -
     * i.e. URLs and the actions that will be taken as a result.
     *
     * @type {Router}
     */

    var Router = Backbone.Router.extend({
        initialize: function() {
            //Begin dispatching routes
            Backbone.history.start();
        },
        routes : {
            "":"todos",
            "todos":"todos",
        },
        todos : function () {
        	var todos = new Todos();
        	var todosView = new TodosView({
            	el:$("#content"),
            	model:todos});
        	todos.fetch({reset:true}).done(function () {
                utilities.viewManager.showView(todosView);
            });
        },
    });

    // Create a router instance
    var router = new Router();

    return router;
});