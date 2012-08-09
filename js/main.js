require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-wrap',
        handlebars: 'libs/handlebars/handlebars-wrap',
        text: 'libs/require/text'
    }
});

require([
    'views/app',
    'routers/router'
], function (AppView, Workspace) {
    //Initialize routing 
    var workspace = new Workspace();
    var app_view = new AppView();
});
