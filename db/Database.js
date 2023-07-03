const mysql = require('mysql2');

class Database {
    constructor(options) {
        this.options = options;
        this.db = null;
    }

    validate() {
        const { host, user, password, database } = this.options;
        if (!host || !user || !password || !database) {
            throw new Error('Database configuration is invalid.');
        }
    }

    connect() {
        this.validate();

        const { host, user, password, database } = this.options;

        this.db = mysql.createConnection({
            host,
            user,
            password,
            database,
        });

        this.db.connect((err) => {
            if (err) {
                console.error('Error connecting to the Employee database: ', err.message);
                return;
            }
            console.log('Connected to the Employee database.');
        });
    }

    disconnect() {
        this.db.end((err) => {
            if (err) {
                console.error('Error disconnecting from the Employee database: ', err.message);
                return;
            }
            console.log('Disconnected from the Employee database.');
        });
    }
}

module.exports = Database;

//The code defines a Database class for connecting to and disconnecting from a MySQL database using the mysql2 library.
//The Database class constructor takes an options object as a parameter, containing the necessary database configuration details.
//The connect() method establishes a connection to the database using the provided configuration.
//Inside the connect() method, a connection object (db) is created using the mysql.createConnection() function and the options object.
//The db object's connect() function is called to establish the actual connection. If an error occurs, an error message is logged; otherwise, a success message is logged.
//The disconnect() method terminates the connection to the database.
//Inside the disconnect() method, the end() function of the db object is called to close the connection. If an error occurs, an error message is logged; otherwise, a success message is logged.
//That's a overview of what the code does. It creates a Database class that provides methods to connect to and disconnect from a MySQL database based on the provided configuration.