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
              {/* /* <Route path="/testform" component={Basic} /> */}
              {/* <Route path="/recipe/:id/addreview" component={AddReview} /> */}
              <Route path="/recipe/:id/complaint" component={AddComplaint}/>
              <Route path="/review/recipe/:id" component={ReviewOfRecipe}/>
              {/* <Route path="/favorite/:id" component={Recipe}/> */}
              <Route path="/favorite/:id" component={Favorite}/>
              <Route path="/complaint/:id" component={Complaint}/>
              <Route path="/review/:id" component={Review}/>
              <Route path="/recipe/add" component={AddRecipe} />

              <Route path="/recipe/edit/:id" component={EditRecipe} />
              {/* /* <Route path="/testform" component={Basic} /> */}

              <UserRoute path="/recipe/add" component={AddRecipe} />
              <UserRoute path="/recipe/edit/:id" component={EditRecipe} />
              <UserRoute path="/recipe/:id/review" component={AddReview}/>
              <UserRoute path="/ingredient/add" component={AddIngredient} />
              <UserRoute path="/goals" component={GoalsPage} />
              <UserRoute path="/mypantry" component={MyPantry} />
              <UserRoute path="/myreviews" component={myReviews} />
              <UserRoute path="/favorites" component={Favorites} />
              <UserRoute path="/mygoals/add" component={AddGoal} />
              <UserRoute path="/mygoals" component={MyGoals} />
              <UserRoute path="/goal/:id" component={Goal} />
              <UserRoute path="/profile/:id?" component={Profile} />
              <UserRoute path="/editprofile" component={EditProfile} />

              <Route path="/recipe/:id" component={Recipe} />
              <Route path="/recipe" component={Recipes} />
              <Route path="/recipes" component={Recipes} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/ingredient/add" component={AddIngredient} />
              <Route path="/ingredient/edit/:id" component={EditIngredient} />
              <Route path="/ingredient/:id" component={Ingredient} />
              <Route path="/ingredient" component={Ingredients} />
              <Route path="/ingredients" component={Ingredients} />
              <Route path="/mygoals/add" component={AddGoal} />
              <Route path="/goals" component={GoalsPage} />
              <Route path="/mypantry" component={MyPantry} />
              <Route path="/myreviews" component={myReviews} />
              <Route path="/favorites/recipe/:id" component={Favorites} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/mygoals/add" component={AddGoal} />
              <Route path="/mygoals" component={MyGoals} />
              <Route path="/goal/:id" component={Goal} />
              <Route path="/profile/:id?" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/editprofile" component={EditProfile} />
              <Route path="/changepassword" component={ChangePassword} />
              <Route path="/" component={Home} />
    
              
              {/* <Route path="/myreviews" component={myReviews} /> */}
              <Route path="/myreviews" component={myReviews} />
              

              
              {/* <Route path="/review/recipe/:id" component={SpecificReview}/> */}
            
 
              {/* <Route path="/myreviews" component={myReviews} /> */}
              
              
            </Switch>
          </Router>
      </ContextProvider>
    );
}
export default App;