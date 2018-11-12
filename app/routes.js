var Build = require('./models/build');

function getBuilds(res) {
    Build.find(function (err, builds) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(builds); // return all builds in JSON format
    });
};


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all build
    app.get('/api/build', function (req, res) {
        // use mongoose to get all builds in the database
        getBuilds(res);
    });
    // get build by ID
    app.get('/api/build/:id', function (req, res) {
        Build.find({
            _id: req.params.id
        }, function (err, build) {
            if (err) {
                res.send(err);
            }
            res.json(build);
            //getBuildById(res);
        });
    });

    // create build and send back all builds after creation
    app.post('/api/build', function (req, res) {

        // create a build, information comes from AJAX request from Angular
        Build.create({
            text: req.body.text,
            build: req.body.build,
            done: false
        }, function (err, build) {
            if (err)
                res.send(err);

            // get and return all the buildd after you create another
            getBuilds(res);
        });

    });

    // create build and send back all builds after creation
    app.post('/api/build/update', function (req, res) {

        // create a build, information comes from AJAX request from Angular
        Build.findByIdAndUpdate({
            _id: req.body.id
        }, {
            build: req.body.newBuildNumber
        }, function (err, build) {
            if (err)
                res.send(err);

            // get and return all the buildd after you create another
            getBuilds(res);
        });

    });

    // delete a build
    app.delete('/api/build/:id', function (req, res) {
        Build.remove({
            _id: req.params.id
        }, function (err, build) {
            if (err)
                res.send(err);

            getBuilds(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};