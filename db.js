  var sql = require('mssql'),
    cfg = require('./db-config');


  exports.exec = function(proc, input, output, cb) {
  sql.connect(cfg).then(function() {
    //console.log('Connected to database');
    //console.log('input = ', input);
    var request = new sql.Request(),
        params = input[0] || [];
        //console.log('params = ', params[0]);
        // console.log('typeof params = ', typeof params);

        for(var param in params[0]) {
          //console.log('adding param:', param, ' with value of:', params[0][param]);
          if(param != 'page' && param != 'start' && param != 'limit')
            request.input(param, params[0][param]);
        }
        if(output) request.output(output);

    request.execute(proc).then(function(recordsets) {
       //console.log(JSON.stringify(recordsets[0]));
       result = JSON.stringify(recordsets[0]);

       cb(result);
    }).catch(function(err) {
      console.log(err);
    });


    sql.close();
  }).catch(function(err) {
    console.log(err);
  });

  };

  exports.runQuery = function(query, cb){
  // Query
  sql.connect(cfg).then(function() {
        new sql.Request().query(query).then(function(result) {

          // Return the result of the query to the callback
          if(typeof cb === 'function'){
            cb(result);
          }

          //Tidy up and close the connection
          sql.close();

        }).catch(function(err) {
          // ... query error checks
          console.log(err);
        });
  }).catch(function(err) {
    console.log(err);
  });

  };
