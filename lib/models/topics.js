/**
 * Created by sguilly on 06/01/16.
 */



module.exports = function (clientRedis) {

    var module = {
        create: function (query, model, cb) {
        },
        delete: function (id, query, cb) {
            console.log('delete:', id, query)
            clientRedis.del('lastTopicDate:' + id, function (err, count) {
                console.log(err, count);
                cb(null, [count]);
            });
        },
        read: function (query, cb) {

            var query = 'lastTopicDate';
            var lQuery = query.length + 1;

            var array = [];

            clientRedis.keys(query + ':*', function (err, replies) {


                var multi = app.clientRedis.batch();
                var keys = [];

                replies.forEach(function (reply, index) {

                    keys[index] = reply.toString().slice(lQuery);
                    multi.get(reply);
                });

                multi.exec(function (err, rep) {

                    rep.forEach(function (item, index) {
                        //array[keys[index]] = item;

                        array.push({id: keys[index], date: item});
                    });

                    cb(null, array);

                });

            })


        },
        readById: function (id, query, cb) {

            console.log('clientLog:published:' + id)

            clientRedis.get('clientLog:published:' + id, function (err, reply) {
                console.log('readById:', reply);
                cb(null, [reply]);
            });


        },
        update: function (id, query, model, cb) {
        }

    }

    return module;
};
