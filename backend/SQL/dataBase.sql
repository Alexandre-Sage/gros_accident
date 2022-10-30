CREATE SCHEMA gros_accident_a_brest;

USE gros_accident_a_brest;

CREATE TABLE users(
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_name VARCHAR (255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL ,
    password VARCHAR (255) NOT NULL,
    salt VARCHAR(5000) NOT NULL,
    admin BOOLEAN NOT NULL default FALSE
) ENGINE=InnoDB  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE chat_flows(
    flow_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    
    sending_user_id INTEGER NOT NULL,
    KEY  foreign_key_sending_user_id_users(sending_user_id),
    CONSTRAINT `foreign_key_sending_user_id_chat_flow`
    FOREIGN KEY (sending_user_id) REFERENCES users (user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,

    receiver_user_id INTEGER NOT NULL,
    KEY  receiver_user_id_users(receiver_user_id),
    CONSTRAINT `receiver_user_id_chat_flow`
    FOREIGN KEY (receiver_user_id) REFERENCES users (user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
    creation_date DATETIME NOT NULL
)ENGINE=InnoDB  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE messages(
    message_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    --FOREIGN KEYS
    -- FOREIN KEY CHAT FLOW
    flow_id INTEGER NOT NULL,
    KEY foreign_key_flow_id(flow_id),
    CONSTRAINT `foreign_key_flow_id_chat_flows`
    FOREIGN KEY (flow_id) REFERENCES chat_flows(flow_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
    --FOREIGN KEY USER 
    user_id INTERGER NOT NULL,
    KEY foreign_key_user_id(user_id),
    CONSTRAINT `foreingn_key_user_id_users`
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
    --FIN FOREIGN KEYS
    content LONGTEXT ,
    attachement VARCHAR(255),
    sending_date DATETIME NOT NULL
) ENGINE=InnoDB  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE pictures(
    
) ENGINE=InnoDB  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

