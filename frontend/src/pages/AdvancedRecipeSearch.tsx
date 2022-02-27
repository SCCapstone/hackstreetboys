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
  IonAlert,
  IonItemDivider
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
  export interface routePrams {
    id: string;
  }

  const AdvancedRecipeSearch: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const history = useHistory()
    const { navigate } = useContext(NavContext);
    const context = useContext(Context);

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
  const onSubmit = async () => {
    // preventDefault()
    console.log("updatedValues" + getValues());
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
        };
        const body = JSON.stringify(getValues());
        console.log("Body" + body)
        const res = await axios.put(
            //'https://api.fridger.recipes/v1/recipe/',
            'https://api.fridger.recipes/v1/recipe/',
            body,
            config
        ).then( res =>{
            console.log("Resulting data" + res.data);
            // navigate("/recipes");
        });
        return res;
    } catch (e) {
        console.error(e);
    }
    // alert(JSON.stringify(data, null, 2));
   
    return false;
  }
  const [rangeValue, setRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 0 });
  
  const customFormatter = (value: number) => `${value}%`;
  return (
    <Router history={history}>
    <Switch>
        <IonApp>
<SideBar />
<IonPage className="ion-page" id="main-content">
<Header/>
<IonContent className="ion-padding">
       <form onSubmit={async () =>{onSubmit();  props.history.push(`/recipe/`); history.go(0)} } >
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
                    <IonSelect name="ingredients" multiple={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('ingredientIds',String(e.detail.value))}>
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
          <IonLabel position="floating">Prep Times</IonLabel>
            <IonRange dualKnobs={true} min={0} max={120} step={5} snaps={true} onIonChange={e => setRangeValue(e.detail.value as any)} />
          </IonItem>
          <IonItem>
            <IonLabel>Value: lower: {rangeValue.lower} upper: {rangeValue.upper}</IonLabel>
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Cook Time</IonLabel>
            <IonRange min={0} max={200} value={50} color="secondary" onChange={(e: any) => setValue("cookTime",e.target.value)}>
            <IonLabel slot="start">Current: {getValues("cookTime")}</IonLabel>
              <IonLabel slot="start">0</IonLabel>
              <IonLabel slot="end">200</IonLabel>
            </IonRange>
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Yield</IonLabel>
            <IonRange min={0} max={20} color="secondary" onChange={(e: any) => setValue("yield",e.target.value)}>
            <IonLabel slot="start">Current: {getValues("yield")}</IonLabel>
              <IonLabel slot="start">0</IonLabel>
              <IonLabel slot="end">200</IonLabel>
            </IonRange>
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Estimated Cost</IonLabel>
            <IonRange min={0} max={200} color="secondary" onChange={(e: any) => setValue("estimatedCost",e.target.value)}>
              <IonLabel slot="start">0</IonLabel>
              <IonLabel slot="end">200</IonLabel>
            </IonRange>
          </IonItem>
                <IonItem lines="none">
                    <IonLabel>Is it alcoholic (21+)</IonLabel>
                    <IonCheckbox name="alcoholic"  slot="start" onIonChange={(e: any) => setValue('alcoholic',e.detail.checked)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Type</IonLabel>
                    <IonSelect name="type" multiple={true}  cancelText="Cancel" okText="Okay" onIonChange={e => setValue('type',String(e.detail.value))}>
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
                <IonButton className="ion-margin-top"
                        color='primary' type="submit" 
                        expand='full'>
                            Search
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

export default AdvancedRecipeSearch;
