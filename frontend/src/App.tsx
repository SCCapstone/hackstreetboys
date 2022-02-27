import { useState, useEffect, useContext } from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from './History';
import GoalsPage from './pages/GoalsPage';
import Recipes from './pages/Recipes';
import Ingredients from './pages/Ingredients';
import myPantry from './pages/myPantry';
import myReviews from './pages/myReviews';
import Favorites from './pages/Favorites';
import Preferences from './pages/Preferences';
import Home from './pages/Home';
import MyGoals from './pages/MyGoals';
import Profile from './pages/Profile';
import Goal from "./pages/MyGoal";
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';


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
import {Context, ContextProvider} from './components/Context';
import { User } from './models/User';
import AddIngredient from "./pages/AddIngredient";
import Ingredient from "./pages/Ingredient";
import MyPantry from './pages/myPantry';
import AddGoal from './pages/AddGoal';
import EditRecipe from './pages/EditRecipe';
import AdvancedRecipeSearch from './pages/AdvancedRecipeSearch';
import EditIngredient from "./pages/EditIngredient";
// import Basic from './components/Basic'

//const App: React.FC = () => (
  function App () {

    // const [ loggedIn, setLoggedIn ] = useState(false);
    // const [ user, setUser ] = useState<User>();
    // const [ token, setToken ] = useState<string>();
    // const [ id, setId ] = useState<number>();
    // const [ isAdmin, setAdmin ] = useState<boolean>(false);
    // const [ email, setEmail ] = useState<string>();
    // const globals = {
    //   loggedInState: loggedIn,
    //   currentUser: user,
    //   token,
    //   id,
    //   isAdmin,
    //   email,

    //   setLoggedIn,
    //   setUser,
    //   setToken,
    //   setId,
    //   setAdmin,
    //   setEmail
    // }

    // // If user was previously logged in, reload user data
    // useEffect(() => {
    //   const loggedInUser = localStorage.getItem('user')
    //   if (loggedInUser) {
    //     console.log(loggedInUser);
    //     const foundUser = JSON.parse(loggedInUser);
    //     setUser(foundUser);
    //     setLoggedIn(true);

    //     const savedToken = localStorage.getItem('token');
    //     if (savedToken)
    //       setToken(savedToken);
    //     const savedId = localStorage.getItem('id');
    //     if (savedId)
    //       setId(+savedId);
    //     const savedAdmin = Boolean(JSON.parse(localStorage.getItem('admin') || 'false'));
    //     if (savedAdmin)
    //       setAdmin(savedAdmin);
    //     const savedEmail = localStorage.getItem('email');
    //     if (savedEmail)
    //       setEmail(savedEmail);

    //     console.log(localStorage.getItem('token'))
    //   }
    // }, []);

    function UserRoute(props: any) {
      // if (user !== null && user?.type === 'NORMAL') {
      const context = useContext(Context);
      const user = context.currentUser;
      if (user !== null ) {
          return (<Route {...props} />);
      }
      return (<Redirect to={{ pathname: '/' }} />);
    }
    return (
      <ContextProvider>
          <Router history={history}>
            <Switch>
              {/* /* <Route path="/testform" component={Basic} /> */}.
              <UserRoute path="/recipe/search" component={AdvancedRecipeSearch} />
              <UserRoute path="/recipe/add" component={AddRecipe} />
              <UserRoute path="/recipe/edit/:id" component={EditRecipe} />
              <UserRoute path="/ingredient/add" component={AddIngredient} />
              <UserRoute path="/goals" component={GoalsPage} />
              <UserRoute path="/mypantry" component={MyPantry} />
              <UserRoute path="/myreviews" component={myReviews} />
              <UserRoute path="/favorites" component={Favorites} />
              <UserRoute path="/preferences" component={Preferences} />
              <UserRoute path="/mygoals/add" component={AddGoal} />
              <UserRoute path="/mygoals" component={MyGoals} />
              <UserRoute path="/goal/:id" component={Goal} />
              <UserRoute path="/profile/:id?" component={Profile} />
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
              <UserRoute path="/editprofile" component={EditProfile} />
              <Route path="/changepassword" component={ChangePassword} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
      </ContextProvider>
    );
}
export default App;