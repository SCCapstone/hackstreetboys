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
  IonTextarea
} from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link, RouteComponentProps, Router, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import history from '../History';
import {NavContext} from '@ionic/react';
import Context from '../components/Context';
import { userInfo } from 'os';
import { Ingredient } from '../models/Ingredient';


const AddRecipe: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const context = useContext(Context);
    const { navigate } = useContext(NavContext);
    const history = useHistory();
    const [checked, setChecked] = useState(false);

    //Form controls and default values that will be loaded over upon fetch
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
        title: "",
        id: 0,
        author: context.currentUser?.id,
        description: "",
        body: "",
        prepTime: 0,
        cookTime: 0,
        yield: 0,
        imgSrc: "",
        alcoholic: false,
        estimatedCost: 0,
        type: "",
        tags: "",
        ingredientIds: "",
    }
  });
  //Dummy ingredient
  const [ingredients, setIngredients] = React.useState<[Ingredient]>([{
    id: 1,
    name: "",
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    alcohol: false,
    cost: 0.0,
    imgSrc: ""
}]);
  console.log(errors);
  console.log(getValues());

  /**
   *
   * @param data
   */
  const onSubmit = () => {
    // preventDefault()
    console.log("updatedValues" + getValues());
    //Post applciation JSON from form values along with the context token. Set the context ids and then post.
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
        };
        console.log("User ID: " + context.currentUser?.id)
        // setValue("id",string(context.currentUser?.id);
        setValue("author", (context.currentUser?.id  ? (context.currentUser?.id) : 0))
        console.log("double takero")
        console.log(getValues('imgSrc'));
        const body = JSON.stringify(getValues());
        console.log("Values" + body)
        const res = axios.post(
            'https://api.fridger.recipes/v1/recipe/',
            // 'https://api.fridger.recipes/v1/recipe/',
            body,
            config
        ).then( res =>{
            console.log("Resulting data" + res.data);
            if(res.status == 200){
                console.log("Status is " + res.status);
            //  navigate("/recipes");
            // props.history.push('/recipes')
        }
        });
        return res;
    } catch (e) {
        console.error(e);
    }

    
    // alert(JSON.stringify(data, null, 2));

   
    return false;
  };
  useEffect(() => {
    // if(!context.currentUser){
    //     props.history.push('/login');
    // }
    //set ingredients
    fetch("https://api.fridger.recipes/v1/ingredient/")
        .then(response => response.json())
        .then(data => setIngredients(data))
  }, [])
  //set title
  useEffect(() => {
    document.title = "Add Recipe";
  }, []);

//   const file2Base64 = (file:File):Promise<string> => {
//     return new Promise<string> ((resolve,reject)=> {
//          const reader = new FileReader();
//          reader.readAsDataURL(file);
//          reader.onload = () => resolve(reader.result?.toString() || '');
//          reader.onerror = error => reject(error);
//      })
//     }

// const  fileSetBase64FunFunctionOperation = async (file:File) => {
//     if(file.size>0){
//         let base64Intern = await file2Base64(file);
//         setValue("imgSrc", base64Intern)
//         console.log(getValues('imgSrc'));
// }
// }
  return (
    <Router history={history}>
    <Switch>
        <IonApp>
<SideBar />
<IonPage className="ion-page" id="main-content">
<Header/>
{/* TODO: Remove Paramters From URL, this was achievable under the buttom, but form validation wasn't being checked.*/}
       <IonContent className="ion-padding">
           <h1>To add a recipe, fill out all form items</h1>
           {/* Upon submission the form will frigger the post method, then move to recipes and force a refresh of that page. */}
           {/* The set value function sets the user values in the form objects */}
        <form onSubmit={ async () =>{onSubmit(); props.history.push('/recipes'); history.go(0)}} >
                <IonItem>
                    <IonLabel position="floating" >Title</IonLabel>
                    <IonInput type="text" name="title" required onIonInput={(e: any) => setValue("title",e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" >Description</IonLabel>
                    <IonInput type="text" name="description" required onIonInput={(e: any) => setValue("description",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Ingredients</IonLabel>
                    {/* <IonSelect name="type" multiple={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('ingredientIds',JSON.stringify(e.detail.value).replaceAll("[","").replaceAll("]","").replaceAll('\"',""))}> */}
                    <IonSelect name="type" multiple={true} aria-require={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('ingredientIds',String(e.detail.value))}>
                   {/* TODO: Add Searching Through Modal */}
                   {ingredients.map(ingredient => 
                        <IonSelectOption key={ingredient.id} value={Number(ingredient.id)}>{ingredient.name}</IonSelectOption>
                    )}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Instructions</IonLabel>
                    <IonTextarea name="instructions" required onIonInput={(e: any) => setValue("body",e.target.value)} />
                </IonItem>
                <IonItem>
                    <p>For legal and technical constraints, we do not host images. Use a service like <a href="https://postimages.org/">To Upload</a></p>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Image URL</IonLabel>
                    <IonInput type="url" name="imgSrc" required onIonInput={(e: any) => setValue("imgSrc",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prep Time</IonLabel>
                    <IonInput type="number" min="1" max="1000" name="prepTime" required onIonInput={(e: any) => setValue("prepTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Cook Time</IonLabel>
                    <IonInput type="number" min="1" max="1000" name="cookTime" required onIonInput={(e: any) => setValue("cookTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Yields</IonLabel>
                    <IonInput type="number" min="1" max="100" name="yield" required onIonInput={(e: any) => setValue("yield",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Estimated Cost</IonLabel>
                    <IonInput type="number" min="1" max="5000" name="estimatedCost" required onIonInput={(e: any) => setValue("estimatedCost",e.target.value)} />
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>Is it alcoholic (21+)</IonLabel>
                    <IonCheckbox name="alcoholic" checked={getValues("alcoholic")} slot="start" onIonChange={(e: any) => setValue('alcoholic',e.detail.checked)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Type</IonLabel>
                    {/* <IonSelect name="type" multiple={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('type',JSON.stringify(e.detail.value).replaceAll("[","").replaceAll("]","").replaceAll('\"',""))}> */}
                    <IonSelect name="type" multiple={true} aria-require={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('type',String(e.detail.value))}>
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
                    <IonLabel position="floating">Tags (separated by commas)</IonLabel>
                    <IonInput name="tags" required onIonInput={(e: any) => setValue("tags",e.target.value)} />
                </IonItem>
                {/* TOS compliance check */}
                <IonItem lines="none">
                    <IonLabel>I agree that this recipe follows our <a href="/tos">Terms of Service</a></IonLabel>
                    <IonCheckbox name="agree" checked={checked} onIonChange={e => setChecked(e.detail.checked)} slot="start" />
                </IonItem>
                {/* <label htmlFor="imgSrc">Choose a recipe picture:</label> */}
            {/* <input type="file" id="imgSrc" name="imgSrc" accept="image/png, image/jpeg" onChange={(e) => fileSetBase64FunFunctionOperation(e.currentTarget.files![0])}/> */}

                {/* Check that there are values in ingredients and tags as ionic does not natively support drop down requirements */}
                <IonButton className="ion-margin-top" disabled={(!checked || getValues().ingredientIds === "" || getValues().tags === "")} color='primary' type="submit" expand='full'>
                            Submit Recipe
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

export default AddRecipe;
