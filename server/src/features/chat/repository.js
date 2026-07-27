
module.exports = function createChatRepository({ pool }) {

    async function create({ userId, content }) {

        const query = `
            INSERT INTO messages(user_id, content)
            VALUES($1, $2)
            RETURNING *
        `;

       try {
            const { rows } = await pool.query(query, [userId, content]);
            return rows[0];
        }
        catch (err) {
            console.error("Error creating message:", err);
            throw err;
        }

    }

    async function getAll() {

        const query = `
            SELECT
                m.id,
                u.username,
                m.content,
                m.created_at
            FROM messages m
            JOIN users u
                ON u.id = m.user_id
            ORDER BY m.created_at ASC
        `;

       try {
            const { rows } = await pool.query(query);
            return rows;
        }
        catch (err) {
            console.error("Error getting message:", err);
            throw err;
        }
    }

    return {
        create,
        getAll,
    };
};