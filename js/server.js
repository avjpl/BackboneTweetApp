var express = require('express');
var app = express();

var Twit = require('twit');

var client = null;

function connectToTwitter() {
    client = new Twit({
        consumer_key:       '',
        consumer_secret:    '',
        access_token:       '',
        access_token_secret:''
    });
}

connectToTwitter();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,UPDATE,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.configure(function() {
    app.use(allowCrossDomain);
    // Parse the JSON object given in the body request
    app.use(express.bodyParser());
});

/**
 * Retuens the twitter timeline for the current user
 */
app.get('/timeline', function(req, res) {
    client.get('statuses/home_timeline', function(err, reply) {
        if (err) {
            res.send(404);
        }

        if (reply) {
            res.json(reply);
        }
    });
});

/**
 * Get the account settings for the user with the id provided.
 **/
app.get('/profile/:id', function(request, response) {
    client.get('users/show', {screen_name: request.params.id},  function (err, reply) {
        if(err) {
            console.log('Error: ' + err);
            response.send(404);
        }

        if(reply) {
            /// console.log('Reply: ' + reply);
            response.json(reply);
        }
    });
});

// Start up the app on port 8089
app.listen(9089);
