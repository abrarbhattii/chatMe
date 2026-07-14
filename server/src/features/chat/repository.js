
module.exports = function createChatRepository({ pool }) {

    async function exists(conversationId) {

        const query = `
            SELECT EXISTS(
                SELECT 1
                FROM conversations
                WHERE id = $1
            ) AS exists
        `;

        const { rows } = await pool.query(query, [conversationId]);

        return rows[0].exists;

    }

    async function create({ conversationId, senderId, content }) {

        const query = `
            INSERT INTO messages(conversation_id, sender_id, content)
            VALUES($1, $2, $3)
            RETURNING *
        `;

       try {
            const { rows } = await pool.query(query, [conversationId, senderId, content]);
            return rows[0];
        }
        catch (err) {
            console.error("Error creating message:", err);
            throw err;
        }

    }

    async function getMessages(conversationId) {

        const query = `
            SELECT
                m.id,
                u.username,
                u.id AS sender_id,
                m.content,
                m.created_at
            FROM messages m
            JOIN users u
                ON u.id = m.sender_id
            WHERE m.conversation_id = $1
            ORDER BY m.created_at ASC
        `;

       try {
            const { rows } = await pool.query(query, [conversationId]);
            return rows;
        }
        catch (err) {
            console.error("Error getting message:", err);
            throw err;
        }
    }

    return {
        exists,
        create,
        getMessages,
    };
};