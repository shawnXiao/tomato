define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/todos',
    'views/todos',
    'text!templates/stats.html',
    'common'
], function ($, _, Backbone, hds, Todos, TodoView, statsTemplate, Common) {
    var AppView = Backbone.View.extend({
        
        //Instead of generating a new element,bind to
        //the existing skeleton of the App already
        //present in the HTML
        el: $("#todoapp"),

        //Our template for the line of statistics at the 
        //bottom of the app
        template: hds.compile(statsTemplate),

        //Delegateed events for creating new items,
        //and clearing copleted ones.
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplate'
        },

        //At initialization we bind to the relevant events
        //on the 'Todos' collection, when items are added or 
        //changed.Kick things off by loading any preexisting
        //todos that might be saved
        initialize: function () {
            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');

            Todos.bind('add', this.addOne, this);
            Todos.bind('reset', this.addAll, this);
            Todos.bind('change:completed', this.addAll, this);
            Todos.bind('all', this.render, this);
            Todos.fetch();
        },

        //Re-rendering the App just means refresing the 
        //statstics --the rest of the app doesn't change
        render: function () {
            var completed = Todos.completed().length;
            var remaining = Todos.remaining().length;
            
            if (Todos.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.template({
                    completed: completed,
                    remaining: remaining
                }));

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (Common.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        //Add a single todo items to the list by creating
        //a view for it , and appendign its to the '<ul>'
        addOne: function (todo) {
            var view = new TodoView({model: todo});
            $('#todo-list').append(view.render().el);
        },

        //Add all items in the **Todos** collection at once
        addAll: function () {
            this.$('#todo-list').html();

            switch (Common.TodoFilter) {
            case 'active':
                _.each(Todos.remaining(), this.addOne);
                break;
            case 'completed':
                _.each(Todos.completed(), this.addOne);
                break;
            default:
                Todos.each(this.addOne, this);
                break;
            }
        },

        newAttributes: function () {
            return {
                title: this.input.val().trim(),
                order: 1,
                completed: false
            };
        },

        createOnEnter: function (e) {
            console.log("createOnenter");
            if (e.which !== Common.ENTER_KEY || !this.input.val().trim()) {
                return;
            }

            console.log(this.newAttributes());
            Todos.create(this.newAttributes());
            this.input.val('');
        },

        clearCompleted: function () {
            _.each(Todos.completed(), function () {
                todo.destroy();
            });
            return false;
        },
        
        toggleAllComplate: function () {
            var completed = this.allCheckbox.checked;

            Todos.each(function (todo) {
                todo.save({
                    'completed': completed
                });
            });
        }

    });


    return AppView;
});
