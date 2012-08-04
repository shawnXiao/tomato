define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/todos.html',
    'common'
], function ($, _, Backbone, hbs,  todosTemplate, Common) {
    
    var TodoView = Backbone.View.extend({

        tagName: 'li',

        template: hbs.compile(todosTemplate),

        //The Dom events specific to an item
        events: {
            'click .toggle': 'togglecompleted',
            'dbclick .view': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },
        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
    });


});
