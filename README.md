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
3. /dynapi server route provides path to dynamic API discovery for MSSQL server stored procedures that are prefixed with a configurable prefix found in the server-config.json
4. /api server route is configurable via the api.js file for static api discovery
5. Easily configurable server-config.json and db-config.json to provide options for database connectivity and other server settings.

Installation:
1. Clone repository to your desired server location
2. Modify server-config.json, and db-config.json to match your needs
3. Install nodemon (optional)
4. Start server

ExtJS Client Configuration:
1. All dynamic API discovery must be routed to <host>:<port>/dynapi
2. All state API discovery must be routed to <host>:<port>/api
3. All remote procedure calls must be routed to <host>:<port>/direct

Future releases:
1. I plan to incorporate a /login function that returns a session GUID provided by the database, and an accompanying /logout function to invalidate a session by GUID.
2. I'll also be securing all requests to paths other than /login for security purposes by checking for the GUID parameter in the query string of each XHR.
3. I'm also planning to incorporate support for ExtJS Direct batching.

Final Thoughts:
I hope this helps those who use the ExtJS framework, as I have searched far and long for an easy to use back-end connector for MS SQL. I realize this is not an enterprise solution, but it should help those who wish to get an idea of how to produce a server standard for themselves or improve upon what I've written. I've done my best to comment what I have, although the routing practices and module organization I'm sure can be improved upon. So please feel free to do so.
