define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todos.html',
    'common'
], function ($, _, Backbone, todosTemplate, Common) {
    
    var TodoView = Backbone.View.extend({

        tagName: 'li',

        template:todosTemplate,

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
        },
    });


});
