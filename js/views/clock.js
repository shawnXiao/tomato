define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/clock.html'
], function ($, _, Backbone, hds, clockTemplate) {
    
    var clockView = Backbone.View.extend({

        template: hds.compile(clockTemplate),

        events: {
            'click .timerToggle': 'toggleTimer',
            'clck .doneToggle': 'toggleDone'
        }

        //initialize: function () {},
    });

});
