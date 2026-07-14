
INSERT INTO users(username, password) 
VALUES 
('admin', '@1234'), 
('ab', '#1234'),
('Alice', '$1234'),
('Bob', '%1234'),
('Charlie', '&1234');

INSERT INTO conversations(type)
VALUES
('DIRECT');

INSERT INTO conversation_members
(conversation_id, user_id)
VALUES
(1,3),
(1,4);

INSERT INTO messages
(conversation_id, sender_id, content)
VALUES
(1,1,'Hello Bob'),
(1,2,'Hello Alice');