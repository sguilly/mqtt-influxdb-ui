
module.exports = function (app) {
    var module = {
        create: function (query, model, cb) {

            if(typeof model !== 'undefined' && model.topic && model.params)
            {
                app.dataDb.insert(model, function (err, newDoc) {   // Callback is optional

                    cb(null, newDoc);

                });

                that.data[model.topic] = model.params;
            }
            else
            {
                cb("error", null); //first argument is response status, second is array of response data
            }


        },
        delete: function (id, query, cb) {

            console.log('delete=',id,query);

            var q;
            var p;

            if(id === 'deleteAll')
            {
                console.log('deleteAll');
                q = {};
                p = { multi: true };
            }
            else {
                q = { _id: id };
                p = {};
            }


            app.dataDb.remove(q, p, function (err, numRemoved) {
                cb(null, [numRemoved]);
            });


        },
        read: function (query, cb) {

            console.log('read=',query);

            if(typeof query['count'] !== 'undefined' )
            {
                app.dataDb.count({}, function (err, count) {

                    console.log(count);
                    cb(null, [count]);
                });
            }
            else {
                app.dataDb.find({}, function (err, docs) {
                    cb(null, docs);
                });
            }
        },
        readById: function (id, query, cb) {

            console.log('readById=',id,query);
            app.dataDb.find({ _id: id }, function (err, docs) {
                cb(null, docs);
            });

        },
        update: function (id, query, model, cb) {

            console.log('update=',id,query,model);
            app.dataDb.update({ _id: id }, model, {}, function (err, numReplaced) {
                cb(null, numReplaced);
            });
        }
    };

    return module;
};
