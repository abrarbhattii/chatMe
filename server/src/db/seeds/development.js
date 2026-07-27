const truncateDatabase = require("./utils/truncateDatabase");

module.exports = async function developmentSeed(pool) {

    await truncateDatabase(pool);

    await pool.query(`
        INSERT INTO users (username, password)
        VALUES
            ('Alice', '$1234'),
            ('Bob', '%1234'),
            ('Charlie', '&1234'),
            ('David', '$1231'),
            ('Emma', '%1232'),
            ('John', '$1233');
    `);

    await pool.query(`
        INSERT INTO conversations(type,name)
        VALUES
            ('DIRECT',NULL),
            ('DIRECT',NULL),
            ('GROUP','Backend Team'),
            ('GROUP','GIS Project');
    `);

    await pool.query(`
        INSERT INTO conversation_members
            (conversation_id,user_id)
        VALUES

            (1,1),
            (1,2),

            (2,1),
            (2,3),

            (3,1),
            (3,2),
            (3,4),

            (4,1),
            (4,5),
            (4,6);
    `);

    await pool.query(`
        INSERT INTO messages
            (conversation_id,sender_id,content)
        VALUES

            (1,1,'Hello Bob'),
            (1,2,'Hello Alice'),

            (2,3,'Hi Alice'),
            (2,1,'Hello Charlie'),

            (3,2,'Morning team'),
            (3,4,'Morning'),

            (4,6,'Map completed'),
            (4,5,'Uploading results');
    `);

};