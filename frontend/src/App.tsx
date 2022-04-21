import { useState, useEffect, useContext } from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from './History';
import GoalsPage from './pages/GoalsPage';
import Recipes from './pages/Recipes';
import Ingredients from './pages/Ingredients';
import myPantry from './pages/myPantry';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MyGoals from './pages/MyGoals';
import Profile from './pages/Profile';
import Goal from "./pages/MyGoal";
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import AddReview from './pages/AddReview';
import AddComplaint from './pages/AddComplaint';
import Complaint from './pages/Complaint';
import Favorite from './pages/Favorite';
import Loading from './pages/Loading';

import Verify from './pages/Verify';
//import Recipe from './pages/Recipe';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import {Context, ContextProvider, useGlobalContext} from './components/Context';
import { User } from './models/User';
import AddIngredient from "./pages/AddIngredient";
import Ingredient from "./pages/Ingredient";
import MyPantry from './pages/myPantry';
import AddGoal from './pages/AddGoal';
import EditRecipe from './pages/EditRecipe';
import ReviewOfRecipe from './pages/ReviewOfRecipe'
//import Review from './pages/MyReviews';

import EditIngredient from "./pages/EditIngredient";

// import Basic from './components/Basic'
import Review from './pages/RecipeReviews';
import SpecificReview from './pages/ReviewOfRecipe';
import myReviews from './pages/myReviews';
import CheckEmail from './pages/CheckEmail';
//const App: React.FC = () => (
  function App () {

    function UserRoute(props: any) {
      const context = useGlobalContext();
      const user = context.currentUser;

      return (
        (context.loading)?
          <Loading /> :
        (context.currentUser !== undefined)?
          <Route {...props} /> :

        <Redirect to={{ pathname: '/login' }} />
      );
  }
    return (
      <ContextProvider>
          <Router history={history}>
            <Switch>
              {/* Routes are for everyone... UserRoutes are for logged in users */}
              <Route path="/review/recipe/:id" component={Review}/>
              <Route path="/favorite/:id" component={Favorite}/>
              <Route path="/complaint/:id" component={Complaint}/>
              <Route path="/review/:id" component={ReviewOfRecipe}/>
              <UserRoute path="/recipe/add" component={AddRecipe} />
              <UserRoute path="/recipe/edit/:id" component={EditRecipe} />
              <UserRoute path="/recipe/:id/complaint" component={AddComplaint}/>
              <UserRoute path="/recipe/:id/review" component={AddReview}/>
              <UserRoute path="/ingredient/add" component={AddIngredient} />
              <UserRoute path="/ingredient/edit/:id" component={EditIngredient} />
              <UserRoute path="/goals" component={GoalsPage} />
              <UserRoute path="/mypantry" component={MyPantry} />
              <UserRoute path="/myreviews" component={myReviews} />
              <UserRoute path="/favorites/recipe/:id" component={Favorites} />
              <UserRoute path="/favorites" component={Favorites} />
              <UserRoute path="/goal/:id" component={Goal} />
              <UserRoute path="/profile/:id?" component={Profile} />
              <UserRoute path="/editprofile" component={EditProfile} />
              <UserRoute path="/mygoals/add" component={AddGoal} />
              <UserRoute path="/mygoals" component={MyGoals} />

              <Route path="/checkemail" component={CheckEmail} />
              <Route path="/verify" component={Verify} />
              <Route path="/recipe/:id" component={Recipe} />
              <Route path="/recipe" component={Recipes} />
              <Route path="/recipes" component={Recipes} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/ingredient/:id" component={Ingredient} />
              <Route path="/ingredient" component={Ingredients} />
              <Route path="/ingredients" component={Ingredients} />
              <Route path="/profile/:id?" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/changepassword" component={ChangePassword} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
      </ContextProvider>
    );
}
export default App;
