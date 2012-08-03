define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/todos',
    'views/todos',
    'text!templates/stats.html'
], function ($, _, Backbone, hbs, Todos, TodoView, statsTemplate) {
    var AppView = Backbone.Viw.extend({
        
        //Instead of generating a new element,bind to
        //the existing skeleton of the App already
        //present in the HTML
        el: $("#todoapp"),

        //Our template for the line of statistics at the 
        //bottom of the app
        statsTemplate:
    });
});
