module.exports = async function truncateDatabase(pool) {
    console.log("trucated dbs1: ")
    await pool.query(`
        TRUNCATE TABLE
            messages,
            conversation_members,
            conversations,
            users
        RESTART IDENTITY
        CASCADE;
    `);
    console.log("trucated dbs2: ")
};