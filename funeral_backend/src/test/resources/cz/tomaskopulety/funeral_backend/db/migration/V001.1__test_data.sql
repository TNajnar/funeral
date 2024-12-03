INSERT INTO funeral.producer(id_producer, producer_id, name)
VALUES (1,6984687458,'Smuteční předměty Kopuletý a Najnar'),
       (2,9837156897,'Moser');

INSERT INTO funeral.product_category(id_product_category, product_category_id, name)
VALUES (1,1548769874,'Rakev'),
       (2,3641279635,'Pyrotechnika');

INSERT INTO funeral.product(id_product, id_producer, id_product_category, product_id, name, note, in_stock)
VALUES (1, 1, 1, 6478426588, 'K 327', 'Modrá, mosazné úchyty, senzor tlukotu srdce.', 5),
       (2, 2, 2, 9955367841, 'Dýmovnice bílá', null, 37);

INSERT INTO funeral.product_movement(id_product_movement, id_product, created, old_state, requested, new_state)
VALUES (1, 1, '2024-11-14T05:30:00+02:00', 0, 5, 5),
       (2, 2, '2024-11-14T06:45:00+02:00', 0, 37, 37);
