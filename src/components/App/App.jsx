import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CalendarView from "../CalendarView/CalendarView";
import CalendarList from "../CalendarList/CalendarList";
import Favorites from "../Favorites/Favorites";
import FooterNav from "../Footer/FooterNav";
import FullCalendar from "../FullCalendar/FullCalendar";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import NewRecipe from "../NewRecipe/NewRecipe";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RecipeView from "../RecipeView/RecipeView";
import RegisterPage from "../RegisterPage/RegisterPage";
import SearchApi from "../SpoonacularAPI/SearchAPI";
import "./App.css";
import RecipeDetailsAPI from "../SpoonacularAPI/RecipeDetailsAPI";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
        <Redirect exact from="/" to="/home" />


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

        <ProtectedRoute exact path="/favorites">
          <Favorites />
        </ProtectedRoute>

        <ProtectedRoute exact path="/newRecipe">
          <NewRecipe />
        </ProtectedRoute>

        <ProtectedRoute exact path="/searchApi">
          <SearchApi />
        </ProtectedRoute>

        <ProtectedRoute exact path="/apiRecipe/:apiId">
          <RecipeDetailsAPI />
        </ProtectedRoute>

        <ProtectedRoute exact path="/recipe/:recipeId">
          <RecipeView />
        </ProtectedRoute>

        <ProtectedRoute exact path="/fullCalendar">
          <FullCalendar />
        </ProtectedRoute>

        <ProtectedRoute exact path="/calendarList">
          <CalendarList />
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
      {/* Only show FooterNav when a user is logged in */}
      {user.id && <FooterNav />}
    </Router>
  );
}

export default App;
