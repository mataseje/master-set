BEGIN;

INSERT INTO tcgs(tcg_name, tcg_slug, tcg_desc)
VALUES 
    ('Pokemon', 'pokemon', 'The Pokémon Trading Card Game is a strategy-based collectible game 
                            inspired by the iconic Pokémon franchise, where players build decks 
                            of Pokémon, Energy, and Trainer cards to battle, evolve their teams, 
                            and outsmart opponents.'),
    ('Yu-Gi-Oh!', 'yu-gi-oh', 'The Yu-Gi-Oh! Trading Card Game, based on the hit Yu-Gi-Oh! franchise, 
                               is a fast-paced dueling game where players summon monsters, cast spells, 
                               and set traps to outmaneuver opponents using strategic deck‑building 
                               and tactical play.');

INSERT INTO sets(set_name, set_slug, num_cards, tcg_id)
VALUES 
-- Add release dates
    ('Base Set', 'base', 102, 1),
    ('Fossil Set', 'fossil', 62, 1),
    ('Jungle Set', 'jungle', 64, 1);

INSERT INTO cards(card_name, card_slug, set_id, card_number, card_image, tcg_id)
VALUES
-- Does tcg_id need to be here and sets
    ('Alakazam', 'alakazam', 1, 1, 'alakazam.jpg', 1),
    ('Blastoise', 'blastoise', 1, 2, 'blastoise.jpg', 1),
    ('Charizard', 'charizard', 1, 4, 'charizard.jpg', 1),
    ('Nidoking', 'nidoking', 1, 11, 'nidoking.jpg', 1),
    ('Venusaur', 'venusaur', 1, 15, 'venusaur.jpg', 1),
    ('Mewtwo', 'mewtwo', 1, 101, 'mewtwo.jpg', 1),
    ('Aerodactyl', 'aerodactyl', 2, 1, 'mewtwo.jpg', 1),
    ('Kabutops', 'kabutops', 2, 9, 'aerodactyl.jpg', 1),
    ('Nidoqueen', 'nidoqueen', 3, 7, 'nidoqueen.jpg', 1),
    ('Snorlax', 'snorlax', 3, 11, 'snorlax.jpg', 1);

COMMIT;