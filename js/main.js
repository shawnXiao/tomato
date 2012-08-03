require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-optamd3-min',
        handlebars: 'libs/handlebars/handlebars',
        text: 'libs/require/text'
    }
});

require(['views/app'], function (AppView) {
    var app_view = new AppView();
});
