import './GoalsPage.css';
import Chart from '../components/Chart'
import LineChart from '../components/LineChart'
import PieChart from '../components/PieChartFilterable';
import {
    IonApp,
    IonContent,
    IonPage,
    IonButton,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonInput,
    IonAlert,
    useIonAlert,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonFab,
    IonIcon,
    IonLabel,
    IonHeader,
    IonTitle,
  } from '@ionic/react';
import React, {useState, useEffect, useContext} from 'react';
import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';

import Header from '../components/Header';
import CaloriesCounter from '../components/CaloriesCounter';
import DeleteCalories from '../components/DeleteCalories';
import CalorieInput from '../components/CalorieInput';
import ItemList from '../components/ItemList';
import Calories from '../components/Calories';
import {Recipe} from '../models/Recipe';
import { thumbsUp } from 'ionicons/icons';
import Context from '../components/Context';

const GoalsPage = () => {
  const context = useContext(Context);
  const[recipes, setAllRecipes] = React.useState<[Recipe]> ([{
    id: 1,
    title: "",
    author: "",
    description: "",
    body: "",
    imgSrc: "",
    totalTime: 0,
    prepTime: 0,
    cookTime: 0,
    yield: 0,
    estimatedCost: 0,
    alcoholic: false,
    type: "",
    tags: "",
    ingredientIds: "",
    rating: 0
  }]);
  useEffect(() => {
    fetch('https://api.fridger.recipes/v1/recipe/')
    .then(res => res.json())
    .then(data => setAllRecipes(data))
  }, [])

  const[items, setItems] = useState([""]);
  const[itemName, setItemName] = useState("");
  const[calories, setCalories] = useState(0);
  const[openModel, setOpenModel] = useState(false);

  const addItemHandler = () => {
    console.log(itemName);
    console.log(calories);

    const prevItems = [...items];
    // const item = {
    //   itemName,
    //   calories,
    //   id:Math.floor(Math.random()*10000),      
    // };

    const item = itemName;
    const newItems = prevItems.concat(item);
    //const newItems = [...prevItems, item];

    if(calories <= 0 || itemName === "") {
      alert("Please enter all the fields")
    }else {
        setItems(newItems);
      }
    setItemName("");
    setCalories(0);

  };
  
  const randRecipes = recipes.sort(() => Math.random() - Math.random()).find(() => true);

    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
     <Header/>
      <IonContent className="ion-padding">
        <h1>Welcome to your dashboard, {context.currentUser && context.currentUser.name}!</h1>
        <Link to="/mygoals"><IonButton>
              My Goals 
            </IonButton>
            </Link>
            <Calories/>
            <IonCardContent >
              <IonGrid>
                <IonRow>
                  <IonCol size-xs="12" size-md="6">
                    <IonCard>
                      <Chart ></Chart>
                    </IonCard>
                  </IonCol>
                  <IonCol size-xs="12" size-md="6">
                    <IonCard>
                    <LineChart ></LineChart>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
            <IonCard >
            <IonCardContent>
              <PieChart ></PieChart>
            </IonCardContent>
            </IonCard>
          

            {/* random recipe */}
            <IonCard>
            <IonTitle align-iems='center'>A recipe that may interest you:</IonTitle>
                      <IonRow>
                      {randRecipes &&
                        <IonCol sizeXs="16" sizeSm="4" key={randRecipes.id}>
                           {/* <RecipeCard recipe={recipePassed} showLocation routerLink={`/recipe/${recipePassed.id}`} /> */}
                           <Link to={`/recipe/${randRecipes.id}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>
                              <IonCardTitle>{randRecipes.title}</IonCardTitle>
                              <IonCardSubtitle>By {randRecipes.author ? (randRecipes.author) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{randRecipes.rating ? ("Rating: " + randRecipes.rating) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {randRecipes.totalTime}m</IonLabel>

                              <Link to = {"/recipes"}>
                    
                              </Link>

                            </IonCardContent>
                          </IonCard>
                          </Link>
                        </IonCol>
                      }
                    </IonRow>
                    </IonCard>

          </IonContent> 
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default GoalsPage;