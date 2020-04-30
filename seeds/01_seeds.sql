INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley','sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'), 
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Etta West', 'charlielevy@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Allison Brown', 'ab@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'), 
('Canada Detroit', 'cd@yahoo.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'), 
('Edgar Friends', 'edd@msn.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
(1, 'Speed Lamp', 'description', 'https://unsplash.com/photos/561igiTyvSk', 'https://unsplash.com/photos/561igiTyvSk', 700, 6, 4, 8, 'Canada', '536 Canadian Dr.', 'Montreal', 'Quebec', '123443', 'true'),
(3, 'Charmingly Haunted', 'description', 'https://unsplash.com/photos/Hh18POSx5qk', 'https://unsplash.com/photos/Hh18POSx5qk', 23454, 2, 5, 2, 'Canada', '345 Witches wharf', 'Toronto', 'Ontario', 'm5j32n2', 'true'),
(5, 'DoggieLand', 'description', 'https://unsplash.com/photos/eWqOgJ-lfiI', 'https://unsplash.com/photos/eWqOgJ-lfiI', 100, 0, 1, 1, 'Canada', '234 Doggie Dr.', 'Canada', 'St. John', 'Newfoundland', 'o4k2p3', 'false'),
(3, 'Condo Haven', 'High Ceilings with great amenities', 'https://unsplash.com/photos/A16YM7eUSHw', 'https://unsplash.com/photos/A16YM7eUSHw', 240, 1, 2, 2, 'Canada', '234 Wueens Wharf', 'Toronto', 'Ontario', 'm9dk3s', 'true');

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14'),
(2, 1, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 1, 3, messages),
(1, 1, 1, 1, messages),
(1, 2, 3, 4, messages),
(4, 3, 2, 1, messages);