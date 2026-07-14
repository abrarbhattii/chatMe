-- DROP TABLE IF EXISTS messages;
-- DROP TABLE IF EXISTS users;

-- CREATE TABLE IF NOT EXISTS users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS messages (
--     id SERIAL PRIMARY KEY,

--     user_id INTEGER NOT NULL
--         REFERENCES users(id)
--         ON DELETE CASCADE,

--     content TEXT NOT NULL,

--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- CREATE INDEX idx_messages_created_at
-- ON messages(created_at);

-- CREATE INDEX idx_messages_user_id
-- ON messages(user_id);

-------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversation_members;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,

    type VARCHAR(20) NOT NULL
        CHECK (type IN ('DIRECT', 'GROUP')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE conversation_members (

    conversation_id INTEGER NOT NULL
        REFERENCES conversations(id)
        ON DELETE CASCADE,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (conversation_id, user_id)
);


CREATE TABLE messages (

    id SERIAL PRIMARY KEY,

    conversation_id INTEGER NOT NULL
        REFERENCES conversations(id)
        ON DELETE CASCADE,

    sender_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    content TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX idx_messages_conversation
ON messages(conversation_id);

CREATE INDEX idx_messages_sender
ON messages(sender_id);

CREATE INDEX idx_messages_created
ON messages(created_at);

CREATE INDEX idx_members_user
ON conversation_members(user_id);