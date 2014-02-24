var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.ProfileView = Backbone.View.extend({
    el: '#profile',

    template: Handlebars.compile($("#profile-template").html()),

    model: null,

    initialize:  function(options) {
        var dis = this;

        //create a collection for this view to render
        dis.model = new com.apress.model.Profile({id: options.user});

        //force the fetch to fire a reset event
        dis.model.fetch({});
        dis.listenTo(dis.model, 'change', dis.render);
    },

    render: function() {
        var dis = this;
        var output = dis.template({user: dis.model.toJSON()});

        dis.$el.html(output);

        return dis;
    }
});