
module.exports = function createMessageRepository({ pool, logger, }) {

    async function exists(conversationId) {

        const query = `
            SELECT EXISTS(
                SELECT 1
                FROM conversations
                WHERE id = $1
            ) AS exists
        `;

        const { rows } = await pool.query(query, [conversationId]);

        // console.log("existing rows: ", rows);
        // logger.info({existingRows}, `existing rows: `);
        return rows[0].exists;

    }

    async function createMessage({ conversationId, senderId, content }) {

        const query = `
            INSERT INTO messages(conversation_id, sender_id, content)
            VALUES($1, $2, $3)
            RETURNING *
        `;

       try {
            logger.debug({ conversationId, senderId, }, "Saving message");
            const { rows } = await pool.query(query, [conversationId, senderId, content]);
            // logger.info({rows}, `rows: `);
            return rows[0];
        }
        catch (err) {
            // console.error("Error creating message:", err);
            logger.error({ err, conversationId, }, "Failed to insert message");
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
        createMessage,
        getMessages,
    };
};