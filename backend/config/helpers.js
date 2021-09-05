const Mysqli = require('mysqli');

let conn = new Mysqli({
    host: 'localhost',
    post: 3306,
    user: 'electro_updated',
    passwd: '123456',
    db: 'electro_updated'
});

let db = conn.emit(false, '');

module.exports = {
    database: db
};