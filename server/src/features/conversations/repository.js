module.exports = function createConversationRepository({ pool, logger, }) {

    async function findConversationsByUser(userId) {

        const query = `
            SELECT
                c.id,
                c.type,
                c.name,
                c.created_at,
                u.id          AS participant_id,
                u.username    AS participant_username,
                (
                    SELECT content
                    FROM messages m
                    WHERE m.conversation_id = c.id
                    ORDER BY created_at DESC
                    LIMIT 1
                ) AS last_message,
                (
                    SELECT created_at
                    FROM messages m
                    WHERE m.conversation_id = c.id
                    ORDER BY created_at DESC
                    LIMIT 1
                ) AS last_message_at
            FROM conversations c
            JOIN conversation_members self
            ON self.conversation_id = c.id
            LEFT JOIN conversation_members other
            ON other.conversation_id = c.id
            AND other.user_id <> self.user_id
            LEFT JOIN users u
            ON u.id = other.user_id
            WHERE self.user_id = $1
            ORDER BY last_message_at DESC NULLS LAST;
        `;

        
        try {
            const { rows } = await pool.query(query, [userId]);
            // console.log("rows: ", rows)
            // logger.info({rows}, "rows");
            return rows;
        }
        catch (err) {
            // console.error("Error Finding Conversations By UserID:", err);
            logger.error({err}, "Error Finding Conversations By UserID:");
            throw err;
        }

    }

    async function findDirectConversation({ creatorId, participantId, }) {

        const query = `
            SELECT c.id, c.type
            FROM conversations c
            WHERE c.type = 'DIRECT'
            AND EXISTS (
                SELECT 1
                FROM conversation_members cm
                WHERE cm.conversation_id = c.id
                AND cm.user_id = $1
            )
            AND EXISTS (
                SELECT 1
                FROM conversation_members cm
                WHERE cm.conversation_id = c.id
                AND cm.user_id = $2
            )
            LIMIT 1;
        `;


        try {
            const { rows } = await pool.query(query, [creatorId, participantId]);
            return rows[0] ?? null;
        }
        catch (err) {
            // console.error("Error Finding Direct Conversation:", err);
            logger.error({ err }, "Failed to Find Direct conversation");
            throw err;
        }
        

    }

    async function createDirectConversation({ creatorId, participantId, }) {

        const client = await pool.connect();

        try {
            // -- Start the transaction block
            await client.query("BEGIN");

            const conversationResult = await client.query(
                `
                INSERT INTO conversations(type)
                VALUES ('DIRECT')
                RETURNING id
                `
            );

            const conversationId = conversationResult.rows[0].id;

            await client.query(
                `
                INSERT INTO conversation_members
                (conversation_id, user_id)
                VALUES
                ($1, $2),
                ($1, $3)
                `,
                [conversationId, creatorId, participantId,]
            );

            // -- save both changes to the db
            await client.query("COMMIT");

            return {
                id: conversationId,
                type: "DIRECT",
            };

        } catch (err) {
            // console.error("Error Creating Direct Conversation:", err);
            logger.error({ err }, "Failed to create Direct conversation");
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }

    }

    return {
        findDirectConversation,
        createDirectConversation,
        findConversationsByUser,
    };

};