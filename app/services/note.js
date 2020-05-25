const pool = require('../../config/database');

module.exports = {
    insert: (data, callBack) => {
        pool.query(
            `INSERT INTO notes(title, body) 
            VALUES(?, ?)`,
            [
                data.title,
                data.body
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAll: callBack => {
        pool.query(
            `SELECT * FROM notes`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getById: (id, callBack) => {
        pool.query(
            `SELECT * FROM notes WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateById: (id, data, callBack) => {
        pool.query(
            `UPDATE notes
            SET title = ?, body = ?
            WHERE id = ?`,
            [
                data.title,
                data.body,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteById: (id, callBack) => {
        pool.query(
            `DELETE FROM notes WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}
