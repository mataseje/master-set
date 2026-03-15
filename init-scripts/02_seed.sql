BEGIN;

INSERT INTO cards(name, set, number, image)
VALUES
    ('Alakazam', 'Base Set', '1/102', 'alakazam.jpg'),
    ('Blastoise', 'Base Set', '2/102', 'blastoise.jpg'),
    ('Charizard', 'Base Set', '4/102', 'charizard.jpg'),
    ('Venusaur', 'Base Set', '15/102', 'venusaur.jpg'),
    ('Mewtwo', 'Base Set', '101/102', 'mewtwo.jpg');

COMMIT;