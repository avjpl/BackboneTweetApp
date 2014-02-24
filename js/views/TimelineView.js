var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.TimelineView = Backbone.View.extend({
    el: '#timeline',

    template: Handlebars.compile($("#timeline-template").html()),

    timeline: null,

    events: {
        'click .profile': 'showDialog'
    },

    initialize: function(options) {
        var dis = this;

        // create a collection for the view to render
        dis.timeline = new com.apress.collection.Timeline();

        // initial render
        dis.render();

        // force the fetch to fire a reset event
        dis.timeline.fetch({reset: true});

        dis.listenTo(dis.timeline, 'reset', dis.render);
    },

    render: function() {
        var dis = this;

        if (dis.timeline.models.length > 0) {
            var output = dis.template({tweet: dis.timeline.toJSON()});

            dis.$el.append(output);
        }

        return dis;
    },

    showDialog: function(options) {
        event.preventDefault();

        var dis = this,
            $target = $(options.currentTarget),
            username = $target.data('user');

        var profileView = new com.apress.view.ProfilePopupView({user: username});
    }
});