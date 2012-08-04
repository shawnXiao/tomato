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
        template: hbs.compile(statsTemplate),

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
            console.log("hajs");
            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');

            Todos.on('add', this.addAll, this);
            Todos.on('reset', this.addAll, this);
            Todos.on('change:completed', this.addAll, this);
            Todos.on('all', this.render, this);
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
        }

    });

    return AppView;
});
