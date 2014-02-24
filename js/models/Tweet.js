var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};
com.apress.model.Tweet = Backbone.Model.extend({
    parse: function(model) {
        // model.create_at "Wed Aug 28 04:21:01 +0000 2014"
        var friendly = moment(model.create_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').fromNow();

        model.friendlyDate = friendly;

        return model;
    }
});