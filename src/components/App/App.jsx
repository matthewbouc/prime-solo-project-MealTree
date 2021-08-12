import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import CalendarView from '../CalendarView/CalendarView';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Favorites from '../Favorites/Favorites';
import NewRecipe from '../NewRecipe/NewRecipe';
import SearchApi from '../Search/SearchAPI';
import UserPage from '../UserPage/UserPage'; // Took this out for now


import './App.css';
import FooterNav from '../Footer/FooterNav';
import RecipeView from '../RecipeView/RecipeView';
import LogOutButton from '../LogOutButton/LogOutButton';
import { makeStyles } from '@material-ui/core';
import FullCalendar from '../FullCalendar/FullCalendar';


const useStyles = makeStyles(theme => ({
  innerPages: {
    paddingBottom: "65px",
    paddingTop: "10px",
  }
}))

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(store=>store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router >
      
        {/* <Nav />           REFERENCE THIS FOR THE MENU BUTTON ON WHICH PAGES TO USE*/}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows Calendar else shows LoginPage
            exact
            path="/calendar"
          >
          <CalendarView />
          </ProtectedRoute>

          <ProtectedRoute exact path = "/favorites">
            <Favorites />
          </ProtectedRoute>

          <ProtectedRoute exact path = "/newRecipe">
            <NewRecipe />
          </ProtectedRoute>

          <ProtectedRoute exact path = "/searchApi">
            <SearchApi />
          </ProtectedRoute>

          <ProtectedRoute exact path="/recipe/:recipeId">
            <RecipeView />
          </ProtectedRoute>

          <ProtectedRoute exact path = "/fullCalendar">
            <FullCalendar />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/calendar"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/calendar"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/calendar"
            
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {user.id && <FooterNav />}
        {/* <Footer /> */}
        
    </Router>
  );
}

export default App;
