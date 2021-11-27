import { Router, Switch, Route } from "react-router-dom";
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
import SideBar from './components/SideBar';
import RecipeCard from './components/RecipeCard';

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
import { menuOutline } from 'ionicons/icons';
import Header from "./components/Header";
import { IonApp, IonContent, IonPage } from "@ionic/react";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";



//const App: React.FC = () => (
  function App () {
    return (
    <>
  <Router history={history}>
    <Switch>
      <Route path="/recipe/add" component={AddRecipe} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/recipe" component={Recipes} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/ingredients" component={Ingredients} />
      <Route path="/goals" component={GoalsPage} />
      <Route path="/mypantry" component={myPantry} />
      <Route path="/myreviews" component={myReviews} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/preferences" component={Preferences} />
      <Route path="/mygoals" component={MyGoals} />
      <Route path="/goal/:id" component={Goal} />
      <Route path="/profile" component={Profile} />
      <Route path="/" component={Home} />
      </Switch>
  </Router>
  </>
);
}
export default App;