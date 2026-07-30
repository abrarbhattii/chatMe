module.exports = async function truncateDatabase(pool) {
    // logger.info("trucated dbs1: ");
    await pool.query(`
        DO $$ 
        BEGIN
            IF TO_REGCLASS('public.messages') IS NOT NULL
                AND TO_REGCLASS('public.conversation_members') IS NOT NULL
                AND TO_REGCLASS('public.conversations') IS NOT NULL
                AND TO_REGCLASS('public.users') IS NOT NULL
            THEN
                TRUNCATE TABLE 
                    messages,
                    conversation_members,
                    conversations,
                    users
                RESTART IDENTITY CASCADE;
            END IF;
        END $$;
    `);
    // logger.info("trucated dbs2: ")
};