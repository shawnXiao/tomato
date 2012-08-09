define([
    'underscore',
    'backbone',
    'models/todo'
], function (_, Backbone, Todo) {

    var TodosCollection = Backbone.Collection.extend({

        model: Todo,

        //Save all of the todo items under the '"todo"'
        //namespace.
        url: '/api/todos',

        //Filter down the list of all todo items that
        //are finished
        completed: function () {
            return this.filter(function (todo) {
                return todo.get('completed');
            });
        },

        //Filter down the list  to only todo itmes
        //that are still not finished
        remaining: function () {
            return this.without.apply(this, this.completed());
        },

        //we keep the Todos in sequential order,despite
        //beign saved by unordered
        nextOrder: function () {
            if (!this.length) {
                return 1;
            }

            return this.last().get('order') + 1;
        },

        //Todos are sorted by ther original insertion order
        comparator: function (todo) {
            return todo.get('order');
        }
    });

    var Todos = new TodosCollection();
    return Todos;
});
