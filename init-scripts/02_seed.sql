BEGIN;

INSERT INTO sets(set_name)
VALUES 
    ('base'),
    ('fossil'),
    ('jungle');

INSERT INTO cards(card_name, set_id, number, image)
VALUES
    ('Alakazam', 1, '1/102', 'alakazam.jpg'),
    ('Blastoise', 1, '2/102', 'blastoise.jpg'),
    ('Charizard', 1, '4/102', 'charizard.jpg'),
    ('Venusaur', 1, '15/102', 'venusaur.jpg'),
    ('Mewtwo', 1, '101/102', 'mewtwo.jpg');

COMMIT;