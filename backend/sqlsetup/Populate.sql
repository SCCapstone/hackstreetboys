CREATE TABLE Ingredients (
	id BIGINT,
    name VARCHAR(50),
    calories INT,
    carbohydrates INT,
    protein INT,
    fat INT,
    alcohol BOOL,
    cost FLOAT
);

INSERT INTO Ingredients(id, name, calories, carbohydrates, protein, fat, alcohol, cost)
VALUES 
	(100000001, "Apple", 1000, 200, 50, 0, FALSE, 1.00),
    (100000002, "Pork Sausage", 2000, 400, 100, 0, FALSE, 3.00),
    (100000003, "Spaghetti", 2600, 400, 25, 100, FALSE, 6.00),
    (100000004, "Celery", 500, 100, 25, 0, FALSE, 9.00),
    (100000005, "Vodka", 100, 0, 0, 0, TRUE, 10.00);

CREATE TABLE Recipes (
	recipeId BIGINT,
    title VARCHAR(50),
    author VARCHAR(100),
    description TEXT,
    totalTime INT,
    prepTime INT,
    cookTime INT,
    yield INT,
    ingredients TEXT,
    estimatedCost FLOAT,
    type VARCHAR(20),
    alcoholic BOOL,
    tags TEXT,
    rating INT
);

INSERT INTO Recipes(recipeId, title, author, description, totalTime, prepTime, cookTime, yield, ingredients, estimatedCost, type, alcoholic, tags, rating)
VALUES 
	(200000001, "Broccoli Casserole", 000000002, "Good Stuff", 40, 15, 25, 4, "2 Broccoli Heads, 1 Serving Noodles, 2 Cups Beef Stock", 12.06, "Dinner", FALSE, "Salty, Good, Fresh", 5),
    (200000002, "Apple Casserole", 000000003, "Good Stuff", 30, 15, 15, 4, "2 Apples, 1 Serving Noodles, 2 Cups Beef Stock", 21.06, "Dinner", FALSE, "Salty, Moderately Good, Not Fresh", 3),
    (200000003, "Asparagus Casserole", 000000004, "Good Stuff", 50, 12, 38 ,4, "12 Asparagus Stalks, 1 Serving Noodles, 2 Cups Beef Stock", 37.23, "Dinner", FALSE, "Fine, Good, Fresh", 4),
    (200000004, "Beef Casserole", 000000005, "Good Stuff", 70, 25, 45, 4, "1LB Ground Beef, 1 Serving Noodles, 2 Cups Beef Stock", 19.06, "Dinner", FALSE, "Salty, Bad, Fresh", 2),
    (200000005, "Trashy Martini", 000000004, "Good Stuff", 5, 5, 0 , 1, "2oz Vodka, 1oz Sweet Vermouth, 10oz Olive Juice", 4.54, "Cockatil", TRUE, "Salty, Good, James Bond", 5),
    (200000006, "Death Shot", 000000005, "Good Stuff", 5, 5, 0, 1, "1oz Vodka, 1oz Jagermeister, 1oz Kahlua", 6.06, "Cocktail", TRUE, "Strong, Gross, Worth it", 4);

CREATE TABLE Pantries (
	userId BIGINT,
    inventory TEXT
);
INSERT INTO Pantries(userId, inventory)
VALUES
	(000000002, "Flour, Coffee, White Sugar, Butter, Chicken Breast, Pork Medallions, Teriayki Sauce, Garlic, Linguini, Spaghetti Sauce, Ritz Crackers"),
    (000000004, "Chicken Breast, Ground Beef, White Rice, Brown Sugar, Green Onions, Salt, Black Pepper, Provolone Cheese, Spaghetti, Rotini, Avocado, White Bread");

CREATE TABLE Goals (
	userId BIGINT,
    type VARCHAR(20),
    calories INT,
    carbohydrates INT,
    protein INT,
    fat INT,
    currentWeightLB FLOAT,
    finalWeightLB FLOAT
);

CREATE TABLE Reviews (
	id BIGINT,
    authorId BIGINT,
    recipeId BIGINT,
    rating INT,
    feedback TEXT
);

INSERT INTO Reviews(id, authorId, recipeId, rating, feedback)
VALUES 
	(900000001, 000000002, 200000001, 5, "Really good."),
    (900000002, 000000003, 200000002, 3, "Pretty good."),
    (900000003, 000000004, 200000003, 4, "Good."),
    (900000004, 000000005, 200000004, 2, "Not good.");

CREATE TABLE Users (
	id BIGINT,
    type VARCHAR(20),
    email VARCHAR(255),
    password VARCHAR(100),
    name VARCHAR (100),
    bio VARCHAR(255),
    dob DATE,
    heightIN INT,
    weightLB INT
);

INSERT INTO Users(id, type, email, password, name, bio, dob, heightIN, weightLB)
VALUES 
	(000000001, "ADMIN", "admin@fridger.com", "ultimate_SECURE_Pa55w0rD", "Adam Hackstreet", NULL, NULL, NULL, NULL),
    (000000002, "NORMAL", "smith@gmail.com", "password", "Tim Colton", "This is a bio.", "2001-02-01", 0, 0),
    (000000003, "NORMAL", "portrait@yahoo.com", "password", "Mary Smith", "This is another bio.", "2010-03-11", 62, 170),
    (000000004, "NORMAL", "zebra@gmail.com", "password", "Sean Bean", "This is the third bio.", "1990-04-21", 67, 200),
    (000000005, "NORMAL", "nobody@aol.com", "password", "Christine Cheese", "This is yet another bio.", "2005-05-18", 52, 150);

