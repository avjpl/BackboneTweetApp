var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.ProfilePopupView = Backbone.View.extend({
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

        if (dis.model.get('screen_name')) {
            var output = dis.template({user: dis.model.toJSON()});

            var options = {
                overlayCss: {
                    opacity: 80,
                    backgroundColor: '#000'
                },
                containerCss:{
                    backgroundColor: "#000",
                    borderColor: "#fff",
                    padding: 10
                }
            };

            $.modal(output, options);

            return dis;
        }
    }
});