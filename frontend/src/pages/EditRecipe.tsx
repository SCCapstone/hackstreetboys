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
import { Link, Router, Switch, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import history from '../History';
import {NavContext} from '@ionic/react';
import { routePrams } from './Recipe';
import { Recipe } from '../models/Recipe';


const EditRecipe: React.FunctionComponent = () => {
    const { navigate } = useContext(NavContext);
    const [checked, setChecked] = useState(false);
    const { id } = useParams<routePrams>();
    const [recipe, setRecipe] = React.useState<Recipe>({
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
        type: "",
        tags: "",
        ingredientIds: "",
        rating: 0
      });
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
        description: "",
        body: "",
        prepTime: 0,
        cookTime: 0,
        yield: 0,
        alcoholic: false,
        estimatedCost: 0,
        type: "",
        tags: "",
        ingredientIds: "",
    }
  });

  console.log(errors);
  console.log(getValues());

  /**
   *
   * @param data
   */
  const onSubmit = async () => {
    // preventDefault()
    console.log("updatedValues" + getValues());
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify(getValues());
        const res = await axios.post(
            // 'https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/recipe/',
            'http://localhost:8080/v1/recipe/',
            body,
            config
        ).then( res =>{
            console.log("Resulting data" + res.data);
            navigate("/recipes");
        });
        return res;
    } catch (e) {
        console.error(e);
    }
    // alert(JSON.stringify(data, null, 2));
   
    return false;
  };

  return (
    <Router history={history}>
    <Switch>
        <IonApp>
<SideBar />
<IonPage className="ion-page" id="main-content">
<Header/>
       <IonContent className="ion-padding">
        <form /*onSubmit={onSubmit}*/ >
                <IonItem>
                    <IonLabel position="floating" >Title</IonLabel>
                    <IonInput type="text" name="title" value={getValues("title")} required onIonInput={(e: any) => setValue("title",e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" >Description</IonLabel>
                    <IonInput type="text" name="description" value={getValues("description")}required onIonInput={(e: any) => setValue("description",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Ingredients</IonLabel>
                    <IonSelect name="ingredients" multiple={true} value={getValues("ingredientIds")} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('ingredientIds',JSON.stringify(e.detail.value).replaceAll("[","").replaceAll("]","").replaceAll('\"',""))}>
                        <IonSelectOption value="1">Carrot</IonSelectOption>
                        <IonSelectOption value="2">Apple</IonSelectOption>
                        <IonSelectOption value="3">Uh</IonSelectOption>
                        <IonSelectOption value="4">What</IonSelectOption>
                        <IonSelectOption value="5">Yeah</IonSelectOption>
                        <IonSelectOption value="6">Static</IonSelectOption>
                        <IonSelectOption value="7">Right...</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Instructions</IonLabel>
                    <IonTextarea name="instructions" required value={getValues("body")} onIonInput={(e: any) => setValue("body",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prep Time</IonLabel>
                    <IonInput name="prepTime" required value={getValues("prepTime")} onIonInput={(e: any) => setValue("prepTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Cook Time</IonLabel>
                    <IonInput name="cookTime" required value={getValues("cookTime")} onIonInput={(e: any) => setValue("cookTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Yields</IonLabel>
                    <IonInput name="yield" required value={getValues("yield")} onIonInput={(e: any) => setValue("yield",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Estimated Cost</IonLabel>
                    <IonInput name="estimatedCost" required value={getValues("estimatedCost")} onIonInput={(e: any) => setValue("estimatedCost",e.target.value)} />
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>Is it alcoholic (21+)</IonLabel>
                    <IonCheckbox name="alcoholic" checked={getValues("alcoholic")} slot="start" onIonChange={(e: any) => setValue('alcoholic',e.detail.checked)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Type</IonLabel>
                    <IonSelect name="type" multiple={true} value={getValues("type")} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('type',JSON.stringify(e.detail.value).replaceAll("[","").replaceAll("]","").replaceAll('\"',""))}>
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
                    <IonInput name="tags" value={getValues("tags")} onIonInput={(e: any) => setValue("tags",e.target.value)} />
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>I agree that this recipe follows our <a href="/tos">Terms of Service</a></IonLabel>
                    <IonCheckbox name="agree" checked={checked} onIonChange={e => setChecked(e.detail.checked)} slot="start" />
                </IonItem>
                <IonButton className="ion-margin-top" disabled={!checked}
                        color='primary' type="submit" onClick={async () =>{
                            await onSubmit();
                        }}
                        expand='full'>
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

export default EditRecipe;
