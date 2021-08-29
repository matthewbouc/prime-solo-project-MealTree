# MealTree

## Description

MealTree app was created over a 2 week sprint.

MealTree is an app that allows users to create and share meal planning calendars with friends and family.  Users enter recipes into MealTree manually, upload an image, or search for new recipes within MealTree. Recipes can be added to any MealTree calendar the user is connected with. A calendar owner adds other users to their calendar, allowing everyone to plan together. Within a shared calendar, all connected users have the ability to add or remove recipes from the meal plan.

## Gif

![MealTree App](./public/MealTree.gif)


## Prerequisites


- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Postico](https://eggerapps.at/postico/)


## Installation

1. Create a database named `meal_tree`,
2. The queries in the `db.sql` file are set up to create all the necessary tables. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal - will open up a new browser tab on localhost:3000

## Usage

1. Register a new account on the homepage or sign in with an existing account.
1. Default view is the weekly calendar page view.
1. Add recipes manually by clicking the '+' symbol on the nav bar.
1. Search recipes using Spoonacular API under the Search icon in the nav bar.
    - *Currently requires creating a personal Spoonacular API key and creating a .env file.  Within the .env file:  spoon_Key={API key goes here}
1. View manually entered recipes and favorite searched recipes under the Heart icon.
1. In the menu icon:
    1. Calendar List shows all the calendars created or accessible by the user.
        1. Create new calendars by clicking the green button with a plus icon.
        1. Change the name of a calendar by clicking on the current calendar name.
        1. Switch to a new primary calendar by checking the empty box next to the calendar of choice.
        1. Add new users with the '+ users' icon.
        1. Permanently delete an owned calendar with the trash icon.
    1. Planned Meals shows all future and past meals within the selected primary calendar.

## Built With

- PostgreSQL
- Node.js
- Express
- React.js
- Redux-Saga
- Axios
- Date-io/Luxon
- Passport
- JavaScript
- Material UI
- HTML
- Spoonacular Recipe API


## Acknowledgement
Thanks to [Prime Digital Academy](https://www.primeacademy.io)!
