define([
    'jquery',
    'backbone',
    'collections/todos',
    'common'
], function ($, Backbone, Todos, Common) {
    
    var Workspace = Backbone.Router.extend({
        routers: {
            '*filter': 'setFilter'
        },

        setFilter: function () {
            // Set the current filter to be used
            Common.TodoFilter = param.trim() || '';

            console.log("setFilter");
            //Trigger a collection reset/addAll
            Todos.trigger('reset');
        }
    });

    return Workspace;
});
