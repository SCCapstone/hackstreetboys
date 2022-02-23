import React, { useCallback, useContext, useState } from 'react';
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


const AddRecipe: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const context = useContext(Context);
    const { navigate } = useContext(NavContext);
    const history = useHistory();
    const [checked, setChecked] = useState(false);
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
        id: context.currentUser?.id,
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

  console.log(errors);
  console.log(getValues());

  /**
   *
   * @param data
   */
  const onSubmit = () => {
    // preventDefault()
    console.log("updatedValues" + getValues());
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log("User ID: " + context.currentUser?.id)
        // setValue("id",string(context.currentUser?.id);
        const body = JSON.stringify(getValues());
        const res = axios.post(
            'http://localhost:8080/v1/recipe/',
            // 'http://localhost:8080/v1/recipe/',
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

  return (
    <Router history={history}>
    <Switch>
        <IonApp>
<SideBar />
<IonPage className="ion-page" id="main-content">
<Header/>
{/* TODO: Remove Paramters From URL, this was achievable under the buttom, but form validation wasn't being checked.*/}
       <IonContent className="ion-padding">
        <form onSubmit={async () =>{onSubmit(); props.history.push('/recipes'); history.go(0)}} >
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
                    <IonSelect name="type" multiple={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('ingredientIds',String(e.detail.value))}>
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
                    <IonTextarea name="instructions" required onIonInput={(e: any) => setValue("body",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Image</IonLabel>
                    {/* MAKE THIS A FILE POND */}
                    <IonTextarea name="imgSrc" required onIonInput={(e: any) => setValue("imgSrc",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prep Time</IonLabel>
                    <IonInput name="prepTime" required onIonInput={(e: any) => setValue("prepTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Cook Time</IonLabel>
                    <IonInput name="cookTime" required onIonInput={(e: any) => setValue("cookTime",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Yields</IonLabel>
                    <IonInput name="yield" required onIonInput={(e: any) => setValue("yield",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Estimated Cost</IonLabel>
                    <IonInput name="estimatedCost" onIonInput={(e: any) => setValue("estimatedCost",e.target.value)} />
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>Is it alcoholic (21+)</IonLabel>
                    <IonCheckbox name="alcoholic" checked={getValues("alcoholic")} slot="start" onIonChange={(e: any) => setValue('alcoholic',e.detail.checked)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Type</IonLabel>
                    {/* <IonSelect name="type" multiple={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('type',JSON.stringify(e.detail.value).replaceAll("[","").replaceAll("]","").replaceAll('\"',""))}> */}
                    <IonSelect name="type" multiple={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('type',String(e.detail.value))}>
                        <IonSelectOption value="1">American</IonSelectOption>
                        <IonSelectOption value="2">Mexican</IonSelectOption>
                        <IonSelectOption value="3">Chinese</IonSelectOption>
                        <IonSelectOption value="4">Italian</IonSelectOption>
                        <IonSelectOption value="5">Spanish</IonSelectOption>
                        <IonSelectOption value="6">Nigerian</IonSelectOption>
                        <IonSelectOption value="7">Lebanese</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tags (seperated by commas)</IonLabel>
                    <IonInput name="tags" onIonInput={(e: any) => setValue("tags",e.target.value)} />
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>I agree that this recipe follows our <a href="/tos">Terms of Service</a></IonLabel>
                    <IonCheckbox name="agree" checked={checked} onIonChange={e => setChecked(e.detail.checked)} slot="start" />
                </IonItem>
                <IonButton className="ion-margin-top" disabled={!checked}
                        color='primary' type="submit" 
                        //onClick={async () =>{
                        //     await onSubmit();
                        // }}
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

export default AddRecipe;
