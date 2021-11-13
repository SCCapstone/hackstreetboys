import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuToggle,
  IonPage,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';

// import { FaHome, FaBars, FaUtensils, FaAppleAlt, FaUser, FaHamburger, FaFolder, FaHeart, FaCog} from 'react-icons/fa';


//ceboozer
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
import SideBar from './components/SideBar';
import RecipeCard from './components/RecipeCard';
import { menuOutline } from 'ionicons/icons';

//const App: React.FC = () => (
  function App () {
    return (
  <Router history={history}>
    <Switch>
      <Route path="/Home" component={Home} />
      <Route path="/Recipes" component={Recipes} />
      <Route path="/Ingredients" component={Ingredients} />
      <Route path="/GoalsPage" component={GoalsPage} />
      <Route path="/myPantry" component={myPantry} />
      <Route path="/myReviews" component={myReviews} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/preferences" component={Preferences} />
  <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuToggle>
              <IonButton>
                <IonIcon icon={menuOutline} slot="start" />
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>Fridger</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome back, Seongho!</h1>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />


        
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
);

}




export default App;