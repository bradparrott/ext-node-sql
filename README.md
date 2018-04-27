# ext-node-sql
ext-node-sql is a simple ExtJS Direct backend connector for ms sql api for create/read/update/destroy methods

Standards Used:
ES5 (ECMAScript5)
MS SQL Server (T-SQL)
ExtDirect Specification (http://docs.sencha.com/extjs/6.5.3/guides/backend_connectors/direct/specification.html?)

Notes: Although I used the specification provided by Sencha for Ext Direct remote server. I did not build request batching into this version. To get around this I have specified in the client proxy for BatchActions: false

Features:
1. Uses the mssql package from npm to provide connectivty
2. Conforms to the Sencha specification for Ext Direct (For single transactions/non-batching)
3. Provided dynamic API discovery for SQL server stored procedures that are prefixed with a configarable prefix found in the serverConfig.json
4. Easily configurable serverConfig.json, and dbConfig.json to provide option for database connectivity and other server configurations

Installation:
1. Clone repository to your desired server location
2. Modify serverConfig.json, and dbConfig.json to match your needs
3. Install nodemon (optional)
4. Start server

ExtJS Client Configuration:
1. All dynamic API discovery must be routed to <host>:<port>/dynapi
2. All remote procedure calls must be routed to <host>:<port>/direct
  
  
Final Thoughts:
I hope this helps those who use the ExtJS framework, as I have searched far and long for an easy to use back-end connector for MS SQL. I realized this is not an enterprise solution but it should help those who wish to get an idea of how to produce a server standard for themselves or improve upon what I've written. I've done my best to comment what I have, although the routing practices and module orgranization I'm sure can be improved upon. SO PLEASE FEEL FREE TO FORK AND IMPROVE!!!
