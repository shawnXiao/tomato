define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/todos.html',
    'common'
], function ($, _, Backbone, hds, todosTemplate, Common) {
    
    var TodoView = Backbone.View.extend({

        tagName: 'li',

        template: hds.compile(todosTemplate),

        //The Dom events specific to an item
        events: {
            'click .toggle': 'togglecompleted',
            'dbclick .view': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },
        initialize: function () {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        }
    });


});
