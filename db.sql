--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: calendar_shared_users; Type: TABLE; Schema: public; Owner: matthewbouc
--

CREATE TABLE public.calendar_shared_users (
    id integer NOT NULL,
    calendar_id integer NOT NULL,
    shared_user_id integer NOT NULL,
    default_calendar boolean DEFAULT false
);


ALTER TABLE public.calendar_shared_users OWNER TO matthewbouc;

--
-- Name: calendar_shared_users_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewbouc
--

CREATE SEQUENCE public.calendar_shared_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calendar_shared_users_id_seq OWNER TO matthewbouc;

--
-- Name: calendar_shared_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewbouc
--

ALTER SEQUENCE public.calendar_shared_users_id_seq OWNED BY public.calendar_shared_users.id;


--
-- Name: calendars; Type: TABLE; Schema: public; Owner: matthewbouc
--

CREATE TABLE public.calendars (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    name character varying(100) DEFAULT 'New Calendar'::character varying
);


ALTER TABLE public.calendars OWNER TO matthewbouc;

--
-- Name: calendars_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewbouc
--

CREATE SEQUENCE public.calendars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calendars_id_seq OWNER TO matthewbouc;

--
-- Name: calendars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewbouc
--

ALTER SEQUENCE public.calendars_id_seq OWNED BY public.calendars.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: matthewbouc
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    category character varying(100)
);


ALTER TABLE public.categories OWNER TO matthewbouc;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewbouc
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO matthewbouc;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewbouc
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: meal_plan; Type: TABLE; Schema: public; Owner: matthewbouc
--

CREATE TABLE public.meal_plan (
    id integer NOT NULL,
    calendar_id integer NOT NULL,
    date date NOT NULL,
    category_id integer,
    recipe_id integer
);


ALTER TABLE public.meal_plan OWNER TO matthewbouc;

--
-- Name: meal_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewbouc
--

CREATE SEQUENCE public.meal_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meal_plan_id_seq OWNER TO matthewbouc;

--
-- Name: meal_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewbouc
--

ALTER SEQUENCE public.meal_plan_id_seq OWNED BY public.meal_plan.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: matthewbouc
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    ingredients text,
    procedure text,
    picture text,
    api_id integer
);


ALTER TABLE public.recipes OWNER TO matthewbouc;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewbouc
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO matthewbouc;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewbouc
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: matthewbouc
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL
);


ALTER TABLE public."user" OWNER TO matthewbouc;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewbouc
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO matthewbouc;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewbouc
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: users_recipes; Type: TABLE; Schema: public; Owner: matthewbouc
--

CREATE TABLE public.users_recipes (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    recipe_id integer NOT NULL
);


ALTER TABLE public.users_recipes OWNER TO matthewbouc;

--
-- Name: users_recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewbouc
--

CREATE SEQUENCE public.users_recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_recipes_id_seq OWNER TO matthewbouc;

--
-- Name: users_recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewbouc
--

ALTER SEQUENCE public.users_recipes_id_seq OWNED BY public.users_recipes.id;


--
-- Name: calendar_shared_users id; Type: DEFAULT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.calendar_shared_users ALTER COLUMN id SET DEFAULT nextval('public.calendar_shared_users_id_seq'::regclass);


--
-- Name: calendars id; Type: DEFAULT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.calendars ALTER COLUMN id SET DEFAULT nextval('public.calendars_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: meal_plan id; Type: DEFAULT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.meal_plan ALTER COLUMN id SET DEFAULT nextval('public.meal_plan_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: users_recipes id; Type: DEFAULT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.users_recipes ALTER COLUMN id SET DEFAULT nextval('public.users_recipes_id_seq'::regclass);


--
-- Data for Name: calendar_shared_users; Type: TABLE DATA; Schema: public; Owner: matthewbouc
--

COPY public.calendar_shared_users (id, calendar_id, shared_user_id, default_calendar) FROM stdin;
18	11	1	f
7	4	1	f
11	4	2	f
2	1	2	t
1	1	1	t
\.


--
-- Data for Name: calendars; Type: TABLE DATA; Schema: public; Owner: matthewbouc
--

COPY public.calendars (id, owner_id, name) FROM stdin;
1	1	M & M
4	1	Labor Day Weekend
11	1	Higgs' Meetup Pot Luck
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: matthewbouc
--

COPY public.categories (id, category) FROM stdin;
3	Elevensies
2	Second Breakfast
7	Supper
4	Luncheon
1	Breakfast
5	Afternoon Tea
6	Dinner
\.


--
-- Data for Name: meal_plan; Type: TABLE DATA; Schema: public; Owner: matthewbouc
--

COPY public.meal_plan (id, calendar_id, date, category_id, recipe_id) FROM stdin;
1	1	2021-08-06	3	1
4	1	2021-08-14	4	1
12	1	2021-08-08	3	2
13	1	2021-08-07	1	1
14	1	2021-08-07	1	2
15	1	2021-08-07	1	3
51	1	2021-08-12	1	7
59	1	2021-08-24	1	17
62	1	2021-08-13	6	13
63	1	2021-08-16	6	17
64	1	2021-08-17	4	17
65	1	2021-08-04	6	18
66	1	2021-08-05	4	18
67	1	2021-08-06	4	18
55	1	2021-08-15	\N	16
70	1	2021-08-16	6	18
72	1	2021-08-17	6	12
37	1	2021-08-17	\N	2
71	1	2021-08-17	4	18
74	4	2021-09-05	2	16
75	1	2021-08-15	3	18
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: matthewbouc
--

COPY public.recipes (id, name, ingredients, procedure, picture, api_id) FROM stdin;
16	Oven Baked Omelet	1 teaspoon butter  9 large eggs  ½ cup sour cream  ½ cup milk  1 teaspoon salt  2 green onions, chopped  ¼ cup shredded Cheddar cheese	Step 1 Preheat oven to 350 degrees F (175 degrees C). Grease an 8x8-inch baking dish with butter.  Step 2 Beat eggs, sour cream, milk, and salt in a bowl until blended. Stir in green onions. Pour mixture in the prepared baking dish.  Step 3 Bake in the preheated oven until set, 25 to 30 minutes. Sprinkle Cheddar cheese over eggs and continue baking until cheese is melted, 2 to 3 minutes more.	https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2060670.jpg&w=272&h=272&c=sc&poi=face&q=85	\N
12	Sugar Cookies	Flour, baking soda, baking powder, butter, white sugar, egg, vanilla	Step 1 Preheat oven to 375 degrees F (190 degrees C). In a small bowl, stir together flour, baking soda, and baking powder. Set aside.  Step 2 In a large bowl, cream together the butter and sugar until smooth. Beat in egg and vanilla. Gradually blend in the dry ingredients. Roll rounded teaspoonfuls of dough into balls, and place onto ungreased cookie sheets.  Step 3 Bake 8 to 10 minutes in the preheated oven, or until golden. Let stand on cookie sheet two minutes before removing to cool on wire racks.	https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3829494.jpg&w=595&h=791&c=sc&poi=face&q=85	\N
13	Chicken Pot Pie	1 pound skinless, boneless chicken breast halves - cubed  1 cup sliced carrots  1 cup frozen green peas  ½ cup sliced celery  ⅓ cup butter  ⅓ cup chopped onion  ⅓ cup all-purpose flour  ½ teaspoon salt  ¼ teaspoon black pepper  ¼ teaspoon celery seed  1 ¾ cups chicken broth  ⅔ cup milk  2 (9 inch) unbaked pie crusts	Step 1 Preheat oven to 425 degrees F (220 degrees C.)  Step 2 In a saucepan, combine chicken, carrots, peas, and celery. Add water to cover and boil for 15 minutes. Remove from heat, drain and set aside.  Step 3 In the saucepan over medium heat, cook onions in butter until soft and translucent. Stir in flour, salt, pepper, and celery seed. Slowly stir in chicken broth and milk. Simmer over medium-low heat until thick. Remove from heat and set aside.  Step 4 Place the chicken mixture in bottom pie crust. Pour hot liquid mixture over. Cover with top crust, seal edges, and cut away excess dough. Make several small slits in the top to allow steam to escape.  Step 5 Bake in the preheated oven for 30 to 35 minutes, or until pastry is golden brown and filling is bubbly. Cool for 10 minutes before serving.	https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4535759.jpg&w=272&h=272&c=sc&poi=face&q=85	\N
14	Emily's Hash Browns	2 medium russet potatoes, shredded  ½ medium onion, finely chopped  ¼ cup all-purpose flour  1 egg  1 cup oil for frying, or as needed  salt and pepper to taste	Step 1 Rinse shredded potatoes until water is clear, then drain and squeeze dry. Place shreds in a bowl, and mix in the onion, flour and egg until evenly distributed.  Step 2 Heat about 1/4 inch of oil in a large heavy skillet over medium-high heat. When oil is sizzling hot, place potatoes into the pan in a 1/2 inch thick layer. Cover the whole bottom of the pan, or make separate piles like pancakes. Cook until nicely browned on the bottom, then flip over and brown on the other side. It should take at least 5 minutes per side. If you are cooking them in one big piece, it can be cut into quarters for easier flipping.  Step 3 Remove from pan, and drain on paper towels. Season with salt and pepper and serve immediately.	https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F801447.jpg&w=272&h=272&c=sc&poi=face&q=85	\N
15	Strawberry Oatmeal Smoothie	1 cup soy milk  ½ cup rolled oats  1 banana, broken into chunks  14 frozen strawberries  ½ teaspoon vanilla extract  1 ½ teaspoons white sugar	In a blender, combine soy milk, oats, banana and strawberries. Add vanilla and sugar if desired. Blend until smooth. Pour into glasses and serve.	https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F409456.jpg&w=272&h=272&c=sc&poi=face&q=85	\N
18	Mom's Shish Kabobs	⅓ cup vegetable oil  ½ cup soy sauce  ¼ cup lemon juice  1 tablespoon prepared mustard  1 tablespoon Worcestershire sauce  1 clove garlic, minced  1 teaspoon coarsely cracked black pepper  1 ½ teaspoons salt  1 ½ pounds lean beef, cut into 1-inch cubes  16 mushroom caps  8 metal skewers, or as needed  2 green bell peppers, cut into chunks  1 red bell pepper, cut into chunks  1 large onion, cut into large squares	Step 1 Whisk the vegetable oil, soy sauce, lemon juice, mustard, Worcestershire sauce, garlic, black pepper, and salt together in a bowl; pour into a resealable plastic bag. Add the beef, coat with the marinade, squeeze out excess air, and seal the bag. Marinate in the refrigerator 8 hours or overnight.  Step 2 Add the mushrooms to the bag, coat with the marinade, squeeze out excess air, and reseal the bag; marinate in the refrigerator another 8 hours.  Step 3 Preheat an outdoor grill for high heat, and lightly oil the grate.  Step 4 Remove the beef and mushrooms from the marinade, shaking off any excess liquid. Pour the marinade into a small saucepan and bring to a boil over high heat. Reduce heat to medium-low, and simmer for 10 minutes; set aside for basting.  Step 5 Thread pieces of green bell pepper, beef, red bell pepper, mushroom, and onion onto metal skewers, repeating until all ingredients are skewered.  Step 6 Cook the skewers on the preheated grill, turning frequently and brushing generously with the reserved marinade until nicely browned on all sides and the meat is no longer pink in the center, about 15 minutes.	https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1014672.jpg&w=596&h=596&c=sc&poi=face&q=85	\N
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: matthewbouc
--

COPY public."user" (id, username, password, first_name, last_name, email) FROM stdin;
1	admin	$2a$10$RvvTru8SsEt2cRlDq.IhuutzYn4ZP8NW9ntshru/O5BhQ4cjsa/SW	Admin	Istrator	boucgm@gmail.com
2	new_user	$2a$10$vq76H9qZBAo4g4U71AFuZe8S4dX60uhAesWOs1F8z6jqHqjGZErmi	New	User	boucgm@gmail.com
\.


--
-- Data for Name: users_recipes; Type: TABLE DATA; Schema: public; Owner: matthewbouc
--

COPY public.users_recipes (id, owner_id, recipe_id) FROM stdin;
12	1	12
13	1	13
14	1	14
15	1	15
16	1	16
18	1	18
\.


--
-- Name: calendar_shared_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewbouc
--

SELECT pg_catalog.setval('public.calendar_shared_users_id_seq', 18, true);


--
-- Name: calendars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewbouc
--

SELECT pg_catalog.setval('public.calendars_id_seq', 11, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewbouc
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- Name: meal_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewbouc
--

SELECT pg_catalog.setval('public.meal_plan_id_seq', 75, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewbouc
--

SELECT pg_catalog.setval('public.recipes_id_seq', 18, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewbouc
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: users_recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewbouc
--

SELECT pg_catalog.setval('public.users_recipes_id_seq', 18, true);


--
-- Name: calendar_shared_users calendar_shared_users_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.calendar_shared_users
    ADD CONSTRAINT calendar_shared_users_pkey PRIMARY KEY (id);


--
-- Name: calendars calendars_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.calendars
    ADD CONSTRAINT calendars_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: meal_plan meal_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.meal_plan
    ADD CONSTRAINT meal_plan_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: users_recipes users_recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.users_recipes
    ADD CONSTRAINT users_recipes_pkey PRIMARY KEY (id);


--
-- Name: calendar_shared_users calendar_shared_users_calendar_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.calendar_shared_users
    ADD CONSTRAINT calendar_shared_users_calendar_id_fkey FOREIGN KEY (calendar_id) REFERENCES public.calendars(id) ON DELETE CASCADE;


--
-- Name: calendars calendars_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.calendars
    ADD CONSTRAINT calendars_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: meal_plan meal_plan_calendar_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.meal_plan
    ADD CONSTRAINT meal_plan_calendar_id_fkey FOREIGN KEY (calendar_id) REFERENCES public.calendars(id) ON DELETE CASCADE;


--
-- Name: users_recipes users_recipes_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.users_recipes
    ADD CONSTRAINT users_recipes_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: users_recipes users_recipes_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: matthewbouc
--

ALTER TABLE ONLY public.users_recipes
    ADD CONSTRAINT users_recipes_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

