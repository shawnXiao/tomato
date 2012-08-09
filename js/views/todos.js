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
        },

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            $(this.el).toggleClass('completed', this.model.get('completed'));

            this.input = this.$('.edit');
            return this;
        },

        togglecompleted: function () {
            this.model.toggle();
        },

        edit: function () {
            $(this.el).addClass('editing');
            this.input.focus();
        },

        close: function () {
            var value = this.input.val().trim();

            if (value) {
                this.model.save({title: value});
            } else {
                this.clear();
            }

            $(this.el).removeClass('editing');
        },

        updateOnEnter: function (e) {
            if (e.keyCode === Common.ENTER_KEY) {
                this.close();
            }
        },

        clear: function () {
            this.model.destroy();
        }

    });

    return TodoView;

});
