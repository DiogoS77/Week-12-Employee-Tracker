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