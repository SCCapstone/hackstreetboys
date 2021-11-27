 
 # UPDATED
CREATE TABLE Ingredients (
	id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    calories INT CHECK(calories >= 0),
    carbohydrates INT CHECK(carbohydrates >= 0),
    protein INT CHECK(protein >= 0),
    fat INT CHECK(fat >= 0),
    alcohol BOOL NOT NULL,
    cost FLOAT CHECK(cost >= 0.0)
);

INSERT INTO Ingredients(id, name, calories, carbohydrates, protein, fat, alcohol, cost)
VALUES 
	(100000001, "Apple", 1000, 200, 50, 0, FALSE, 1.00),
    (100000002, "Pork Sausage", 2000, 400, 100, 0, FALSE, 3.00),
    (100000003, "Spaghetti", 2600, 400, 25, 100, FALSE, 6.00),
    (100000004, "Celery", 500, 100, 25, 0, FALSE, 9.00),
    (100000005, "Vodka", 100, 0, 0, 0, TRUE, 10.00);

# UPDATED
CREATE TABLE Recipes (
	id 				BIGINT NOT NULL,
    title 			VARCHAR(255) NOT NULL,
    author 			VARCHAR(100) NOT NULL,
    description 	TEXT NOT NULL,
    total_time 		INT CHECK(total_time >= 0),
    prep_time 		INT CHECK(prep_time >= 0),
    cook_time 		INT CHECK(cook_time >= 0),
    yield 			INT CHECK(yield >= 0),
    ingredient_ids	TEXT NOT NULL,
    estimated_cost 	FLOAT CHECK(estimated_cost >= 0.0),
    type 			VARCHAR(50),
    alcoholic 		BOOL NOT NULL,
    tags 			TEXT,
    rating			INT CHECK(rating >= 0 AND rating <= 5)
);

INSERT INTO Recipes(id, title, author, description, total_time, prep_time, cook_time, yield, ingredient_ids, estimated_cost, type, alcoholic, tags, rating)
VALUES 
	(200000001, "Broccoli Casserole", 000000002, "Good Stuff", 40, 15, 25, 4, "2 Broccoli Heads, 1 Serving Noodles, 2 Cups Beef Stock", 12.06, "Dinner", FALSE, "Salty, Good, Fresh", 5),
    (200000002, "Apple Casserole", 000000003, "Good Stuff", 30, 15, 15, 4, "2 Apples, 1 Serving Noodles, 2 Cups Beef Stock", 21.06, "Dinner", FALSE, "Salty, Moderately Good, Not Fresh", 3),
    (200000003, "Asparagus Casserole", 000000004, "Good Stuff", 50, 12, 38 ,4, "12 Asparagus Stalks, 1 Serving Noodles, 2 Cups Beef Stock", 37.23, "Dinner", FALSE, "Fine, Good, Fresh", 4),
    (200000004, "Beef Casserole", 000000005, "Good Stuff", 70, 25, 45, 4, "1LB Ground Beef, 1 Serving Noodles, 2 Cups Beef Stock", 19.06, "Dinner", FALSE, "Salty, Bad, Fresh", 2),
    (200000005, "Trashy Martini", 000000004, "Good Stuff", 5, 5, 0 , 1, "2oz Vodka, 1oz Sweet Vermouth, 10oz Olive Juice", 4.54, "Cockatil", TRUE, "Salty, Good, James Bond", 5),
    (200000006, "Death Shot", 000000005, "Good Stuff", 5, 5, 0, 1, "1oz Vodka, 1oz Jagermeister, 1oz Kahlua", 6.06, "Cocktail", TRUE, "Strong, Gross, Worth it", 4);

# UPDATED
CREATE TABLE Pantries (
	id BIGINT NOT NULL,
    owner BIGINT NOT NULL,
    items TEXT
);
INSERT INTO Pantries(id, owner, items)
VALUES
	(800000002, 000000002, "Flour, Coffee, White Sugar, Butter, Chicken Breast, Pork Medallions, Teriayki Sauce, Garlic, Linguini, Spaghetti Sauce, Ritz Crackers"),
    (800000004, 000000004, "Chicken Breast, Ground Beef, White Rice, Brown Sugar, Green Onions, Salt, Black Pepper, Provolone Cheese, Spaghetti, Rotini, Avocado, White Bread");

# UPDATED
CREATE TABLE Goals (
	id 			BIGINT NOT NULL,
    endGoal 		VARCHAR(255) NOT NULL,
    calories 		INT CHECK(calories >= 0),
    carbohydrates 	INT CHECK(carbohydrates >= 0),
    protein 		INT CHECK(protein >= 0),
    fat 			INT CHECK(fat >= 0),
    currentWeightLB FLOAT CHECK(currentWeightLB >= 0.0),
    finalWeightLB 	FLOAT CHECK(finalWeightLB >= 0.0)
);

# UPDATED
CREATE TABLE Reviews (
	id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    rating INT CHECK(rating >= 0 AND rating <= 5),
    feedback TEXT
);

INSERT INTO Reviews(id, author_id, recipe_id, rating, feedback)
VALUES 
	(900000001, 000000002, 200000001, 5, "Really good."),
    (900000002, 000000003, 200000002, 3, "Pretty good."),
    (900000003, 000000004, 200000003, 4, "Good."),
    (900000004, 000000005, 200000004, 2, "Not good.");

# UPDATED
CREATE TABLE Users (
	id BIGINT NOT NULL,
    type VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR (100) NOT NULL,
    bio VARCHAR (1000),
    dob DATE,
    height_in INT CHECK(height_in >= 0),
    weight_lb FLOAT CHECK(weight_lb >= 0)
);

INSERT INTO Users(id, type, email, password, name, bio, dob, height_in, weight_lb)
VALUES 
	(000000001, "ADMIN", "admin@fridger.com", "ultimate_SECURE_Pa55w0rD", "Adam Hackstreet", NULL, NULL, NULL, NULL),
    (000000002, "NORMAL", "smith@gmail.com", "password", "Tim Colton", "This is a bio.", "2001-02-01", 0, 0),
    (000000003, "NORMAL", "portrait@yahoo.com", "password", "Mary Smith", "This is another bio.", "2010-03-11", 62, 170),
    (000000004, "NORMAL", "zebra@gmail.com", "password", "Sean Bean", "This is the third bio.", "1990-04-21", 67, 200),
    (000000005, "NORMAL", "nobody@aol.com", "password", "Christine Cheese", "This is yet another bio.", "2005-05-18", 52, 150);
