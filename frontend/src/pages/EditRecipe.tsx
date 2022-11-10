import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonDatetime,
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonRange,
  IonItem,
  IonInput,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonText,
  IonTextarea,
  IonModal,
  IonAlert
} from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link, RouteComponentProps, Router, Switch, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import history from '../History';
import {NavContext} from '@ionic/react';
import { Recipe } from '../models/Recipe';
import Context from '../components/Context';
import { Ingredient } from '../models/Ingredient';

const DOMAIN = "http://localhost:8080";
  export interface routePrams {
    id: string;
  }

  const EditRecipe: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const { navigate } = useContext(NavContext);
    const history = useHistory()
    const context = useContext(Context);
    const [checked, setChecked] = useState(false);

    const [recipe, setRecipe] = React.useState<Recipe>({
        title: "",
        id: 0,
        author: 0,
        authorName: '',
        description: "",
        body: "",
        imgSrc: "",
        totalTime: 0,
        prepTime: 0,
        cookTime: 0,
        yield: 0,
        estimatedCost: 0,
        alcoholic: true,
        type: "",
        tags: "",
        ingredientIds: "",
        rating: 0
      });
      const { id } = useParams<routePrams>();
      useEffect(() => {
        // if(!context.currentUser){
        //     props.history.push('/login');
        // }
        fetch(DOMAIN+`/v1/recipe/${id}`)
          .then(response => response.json())
          .then(data => setRecipe(data))
      }, [])
      useEffect(() => {
        document.title = "Edit Recipe";
      }, []);
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
       ...recipe
    }
  });
//   console.log("2-16-2022")
//   console.log(errors);
//   console.log(getValues());

  /**
   *
   * @param data
   */
  const onSubmit = async () => {
    // preventDefault()
    // console.log("updatedValues" + getValues());
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
        };
        //set recipe id that is being passed from the edit path
        setValue("id", recipe.id);
        //set authorid to the context
        setValue("author", (context.currentUser?.id  ? ((context.currentUser?.id)) : 0))
        //ensure that ingredients are being listed
        setValue("ingredientIds", recipe.ingredientIds);
        const body = JSON.stringify(getValues());
        // console.log("Body" + body)
        const res = await axios.put(
            //DOMAIN+'/v1/recipe/',
            DOMAIN+`/v1/recipe/`,
            body,
            config
        ).then( res =>{
            // console.log("Resulting data" + res.data);
            // navigate("/recipes");
        });
        return res;
    } catch (e) {
        console.error(e);
    }
    // alert(JSON.stringify(data, null, 2));
   
    return false;
  };
//Allows a delete request
  const onDelete = async () => {
    // preventDefault()
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify(getValues());
        //delete by ID on the backend.
        const res = await axios.delete(
            //DOMAIN+'/v1/recipe/',
            DOMAIN+`/v1/recipe/${recipe.id}`,
            config
        ).then( res =>{
            // console.log("Deleted Recipe by " + recipe.id);
            // navigate("/recipes");
        });
        return res;
    } catch (e) {
        console.error(e);
    }
    // alert(JSON.stringify(data, null, 2));
   
    return false;
  };
  //confirmation alert modal
  const [showAlert, setShowAlert] = useState(false);
  return (
    <Router history={history}>
    <Switch>
        <IonApp>
<SideBar />
<IonPage className="ion-page" id="main-content">
<Header/>
<IonContent className="ion-padding">
  {/* Delete recipe modal button */}
 <IonButton  color="danger" onClick={() => setShowAlert(true)} expand="block">Delete Recipe</IonButton>
{/* Delete recipe modal item. Pressing okay will delete the recipe and redirect back to recipes */}
 <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={'Confirm Deletion?!'}
          message={'Are you sure you want to delete the recipe titled ' + recipe.title + '?This cannot be undone.'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Okay',
              handler: () => {
                onDelete();
                props.history.push(`/recipes`);
                history.go(0)
              }
            }
          ]}
        /> 
  {/* Form values are populated from the get request, on change the local form state will be changed and then the backend will check the changes.. */}
       <form onSubmit={async () =>{onSubmit();  props.history.push(`/recipe/${id}`); history.go(0)} } >
                <IonItem>
                    <IonLabel position="floating" >Title</IonLabel>
                    <IonInput type="text" name="title" value={recipe.title} required onIonInput={(e: any) => setValue("title",e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" >Description</IonLabel>
                    <IonInput type="text" name="description" value={recipe.description}required onIonInput={(e: any) => setValue("description",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Instructions</IonLabel>
                    <IonTextarea name="instructions" required value={recipe.body} onIonInput={(e: any) => setValue("body",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prep Time</IonLabel>
                    <IonInput name="prepTime" min="1" max="1000" required value={recipe.prepTime} onIonInput={(e: any) => setValue("prepTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Cook Time</IonLabel>
                    <IonInput name="cookTime" min="1" max="1000" required value={recipe.cookTime} onIonInput={(e: any) => setValue("cookTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Yields</IonLabel>
                    <IonInput name="yield" min="1" max="100" required value={recipe.yield} onIonInput={(e: any) => setValue("yield",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Estimated Cost</IonLabel>
                    <IonInput name="estimatedCost" min="1" max="5000"  required value={recipe.estimatedCost} onIonInput={(e: any) => setValue("estimatedCost",e.target.value)} />
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>Is it alcoholic (21+)</IonLabel>
                    <IonCheckbox name="alcoholic" checked={recipe.alcoholic} slot="start" onIonChange={(e: any) => setValue('alcoholic',e.detail.checked)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Type</IonLabel>
                    <IonSelect name="type" multiple={true} value={Array.from(recipe.type)} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('type',String(e.detail.value))}>
                        {/* <IonSelectOption value="1">American</IonSelectOption>
                        <IonSelectOption value="2">Mexican</IonSelectOption>
                        <IonSelectOption value="3">Chinese</IonSelectOption>
                        <IonSelectOption value="4">Italian</IonSelectOption>
                        <IonSelectOption value="5">Spanish</IonSelectOption>
                        <IonSelectOption value="6">Nigerian</IonSelectOption>
                        <IonSelectOption value="7">Lebanese</IonSelectOption> */}
                        <IonSelectOption value="american">American</IonSelectOption>
                        <IonSelectOption value="mexican">Mexican</IonSelectOption>
                        <IonSelectOption value="chinese">Chinese</IonSelectOption>
                        <IonSelectOption value="italian">Italian</IonSelectOption>
                        <IonSelectOption value="spanish">Spanish</IonSelectOption>
                        <IonSelectOption value="nigerian">Nigerian</IonSelectOption>
                        <IonSelectOption value="lebanese">Lebanese</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tags (seperated by commas)</IonLabel>
                    <IonInput name="tags" value={recipe.tags} onIonInput={(e: any) => setValue("tags",e.target.value)} />
                </IonItem>
                {/* <IonItem lines="none">
                    <IonLabel>I agree that this recipe follows our <a href="/tos">Terms of Service</a></IonLabel>
                    <IonCheckbox name="agree" checked={checked} onIonChange={e => setChecked(e.detail.checked)} slot="start" />
                </IonItem> */}
                {/* <IonButton className="ion-margin-top" disabled={!checked} */}
                <IonItem>
                    <IonLabel>By pressing edit, you agree that this update still meets our Terms of Service agreement</IonLabel>
                </IonItem>
                {/* Submit edit recipe button */}
                <IonButton className="ion-margin-top"
                        color='primary' type="submit" 
                        //onClick={async () =>{
                        //     await onSubmit();
                        // }}
                        expand='full'>
                            Edit Recipe
                </IonButton>
                <Link to="/recipes/">
                    <IonButton className="ion-margin-top"
                        color='danger'
                        expand='full'>
                        Cancel
                    </IonButton>
                </Link>
            </form>
        </IonContent>
        </IonPage>
        </IonApp>
        </Switch>
        </Router>
  );
};

export default EditRecipe;
