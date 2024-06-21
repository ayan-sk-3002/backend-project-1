const config = require('../config/config');
const mysql = require('mysql');

// Function to connect to the MySQL server, execute a query, and close the connection
function executeQuery(queryString, params, callback) {
    let connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    });

    // Log when attempting to connect to MySQL server
    console.log('LOG ================================');
    console.log('LOG ======== Attempting to connect to MySQL server');

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL server:', err);
            callback(err, null);
            return;
        }
        console.log('LOG ======== MySQL Connected');

        // Perform the database query
        console.log(`LOG ======== Executing query: [ ${queryString} ] with params: ${JSON.stringify(params)}`);
        connection.query(queryString, params, (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
            }
            console.log('LOG ======== Query executed successfully');

            // Close the connection to the MySQL server
            connection.end((err) => {
                if (err) {
                    console.error('Error closing MySQL connection:', err);
                    callback(err, null);
                    return;
                }
                console.log('LOG ======== MySQL Connection closed');
                console.log('LOG ================================');

                // Pass the query results to the callback function
                callback(null, rows);
            });
        });
    });
}

module.exports = { 
    executeQuery 
};
