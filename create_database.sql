-- Database name

-- Document your create tables SQL here

CREATE TABLE treats (
id SERIAL PRIMARY KEY,
name VARCHAR(80),
description VARCHAR(280),
pic VARBINARY(200)
);

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
