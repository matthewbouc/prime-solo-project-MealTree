CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100) NOT NULL,
    "email" VARCHAR (100) NOT NULL
);

CREATE TABLE calendars (
	"id" SERIAL PRIMARY KEY,
	"owner_id" INT REFERENCES "user" ON DELETE CASCADE NOT NULL,
	"name" VARCHAR (100) DEFAULT ('New Calendar')
);

CREATE TABLE calendar_shared_users (
	id SERIAL PRIMARY KEY,
	calendar_id INT REFERENCES calendars ON DELETE CASCADE NOT NULL,
	shared_user_id INT NOT NULL,
	default_calendar BOOLEAN DEFAULT false
);

CREATE TABLE recipes (
	id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL,
	ingredients TEXT,
	procedure TEXT,
	picture TEXT,
	api_id INT
);

CREATE TABLE users_recipes (
	id SERIAL PRIMARY KEY,
	owner_id INT REFERENCES "user" ON DELETE CASCADE NOT NULL,
	recipe_id INT REFERENCES recipes ON DELETE CASCADE NOT NULL
);

CREATE TABLE meal_plan (
	id SERIAL PRIMARY KEY,
	calendar_id INT REFERENCES calendars ON DELETE CASCADE NOT NULL,
	date DATE NOT NULL,
	category_id INT,
	recipe_id INT,
	api_id INT
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category VARCHAR (100)
);
