exports.up = (pgm) => {

    pgm.createTable("users", {
        id: "id",
        username: {
            type: "varchar(50)",
            notNull: true,
            unique: true,
        },
        password: {
            type: "varchar(50)",
            notNull: true,
        },
        created_at: {
            type: "timestamptz",
            default: pgm.func("now()"),
        },
    });

    pgm.createTable("conversations", {
        id: "id",
        type: {
            type: "varchar(20)",
            notNull: true,
        },
        name: {
            type: "varchar(100)",
        },
        created_at: {
            type: "timestamptz",
            default: pgm.func("now()"),
        },
    });

    pgm.createTable("conversation_members", {
        conversation_id: {
            type: "integer",
            references: "conversations",
            onDelete: "CASCADE",
        },
        user_id: {
            type: "integer",
            references: "users",
            onDelete: "CASCADE",
        },
        joined_at: {
            type: "timestamptz",
            default: pgm.func("now()"),
        },
    });

    pgm.addConstraint(
        "conversation_members",
        "conversation_members_pk",
        {
            primaryKey: [
                "conversation_id",
                "user_id",
            ],
        }
    );

    pgm.createTable("messages", {
        id: "id",
        conversation_id: {
            type: "integer",
            references: "conversations",
            onDelete: "CASCADE",
        },
        sender_id: {
            type: "integer",
            references: "users",
            onDelete: "CASCADE",
        },
        content: {
            type: "text",
            notNull: true,
        },
        created_at: {
            type: "timestamptz",
            default: pgm.func("now()"),
        },
    });


    pgm.createIndex(
        "messages",
        "conversation_id"
    );

    pgm.createIndex(
        "messages",
        "sender_id"
    );

    pgm.createIndex(
        "messages",
        "created_at"
    );

    pgm.createIndex(
        "conversation_members",
        "user_id"
    );

};


exports.down = (pgm) => {
    pgm.dropTable("messages");
    pgm.dropTable("conversation_members");
    pgm.dropTable("conversations");
    pgm.dropTable("users");
};

