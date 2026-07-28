const truncateDatabase = require("./utils/truncateDatabase");

module.exports = async function testSeed(pool) {

    await truncateDatabase(pool);

    await pool.query(`
        INSERT INTO users (username, password)
        VALUES
            ('Alice', '$1234'),
            ('Bob', '%1234'),
            ('Charlie', '&1234'),
            ('admin', '@1234'), 
            ('ab', '#1234');
    `);

    await pool.query(`
        INSERT INTO conversations (type, name)
        VALUES
            ('DIRECT', NULL);
    `);

    await pool.query(`
        INSERT INTO conversation_members
            (conversation_id, user_id)
        VALUES
            (1, 3),
            (1, 4);
    `);

    await pool.query(`
        INSERT INTO messages
            (conversation_id, sender_id, content)
        VALUES
            (1, 3, 'Hello Bob'),
            (1, 4, 'Hello Alice');
    `);

};