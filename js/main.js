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
        backbone: 'libs/backbone/backbone-optamd3-min',
        handlebars: 'libs/handlebars/handlebars',
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
