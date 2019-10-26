var db = require('./db'),
    config = require('./server-config');

exports.api = function(req, res) {
  res.sendFile('api.js', {
    "root": __dirname,
    "headers": {'Content-Type': 'text/javascript'}
  });
};

// Function to dynamically query the SQL Server and get all publishable server Methods
 exports.dynapi = function(req, res) {

   // Define a JS file
   var script = "var Ext = Ext || []\n";

   script += "Ext.REMOTING_API = ";

   // Define the actual Ext DIRECT API
   var api = {};
   api.url = config.apiUrl;
   api.type = 'remoting';
   api.timeout = config.apiTimeout;
   api.actions = {};
   api.actions.db = [];

   // Callback after the query runs
   var cb = function(result){

     //Check if there is a result object
     if(result){

       //Loop through each record, create the ext direct action definition, then push to the API object
       result.recordset.forEach(function(record){

         var method = {};
         method.name = record.ROUTINE_NAME;
         method.params = [];
         method.len = 1;

         // push the new method to the api
         api.actions.db.push(method);

       });


       // Update script with the remaining Content
       script += JSON.stringify(api);

       //Respond with the generated script
       res.writeHead(200, {
         'Content-Type': 'text/javascript'
       });
       res.end(script);

     } else {

       //No result, responsd with message
       res.writeHead(200, {
         'Content-Type': 'text/plain'
       });
       res.end('No result was returned.');     }

   };

   // Standard query to find stored procedures in MS SQL Server
   var query = "SELECT ROUTINE_NAME FROM information_schema.routines " +
               "WHERE routine_type = 'PROCEDURE' AND routine_name like '" + config.apiPrefix + "'";

   db.runQuery(query, cb);


 };

//Actual request method for EXT Direct requests
exports.direct = function(req, res) {
  // console.log(req.body);
  var type = req.body.type,
    tid = req.body.tid,
    action = req.body.action,
    method = req.body.method,
    data = req.body.data;

  var cb = function(results) {

    //Define the JSON response to send
    var payload = '[{type:"' + type +
      '", tid:' + tid +
      ', action:"' + action +
      '", method:"' + method +
      '", data:' + results + '}]';
    console.log('payload = ', payload);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(payload);
    // res.sendStatus(200)
  };
  //console.log('typeof data = ', typeof data);
  //console.log('data = ', data);
  db.exec(method, data, null, cb);

};
