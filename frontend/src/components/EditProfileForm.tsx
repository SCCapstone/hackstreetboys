import { IonItem, IonLabel, IonInput, IonButton, IonDatetime, IonAlert } from "@ionic/react";
import { Link, RouteComponentProps } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import axios, {AxiosError} from 'axios';

import Context from '../components/Context';
import history from '../History';

export const EditProfileForm: React.FC = () => {
    const context = useContext(Context);
    const [showAlert, setShowAlert] = useState(false);

    const [error, setError] = useState(false);

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            id: context.id,
            name: context.currentUser?.name,
            bio: context.currentUser?.bio,
            dob: context.currentUser?.dob,
            height_in: context.currentUser?.height_in,
            weight_lb: context.currentUser?.weight_lb
        }
    });

    console.log(errors);
    console.log(getValues());

    const onSubmit = (event: any) => {
        event.preventDefault();
        console.log("updatedValues" + getValues());
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${context.token}`
                },
            };
            const body = JSON.stringify(getValues());
            axios.put(
                `https://api.fridger.recipes/v1/user/`,
                // `https://api.fridger.recipes/v1/user/`,
                body,
                config
            ).then( res => {
                console.log("Resulting data: " + res.data);
                if(res.status == 200) {
                    console.log("Status is " + res.status);
                }

                axios.get(
                // Public API
                `https://api.fridger.recipes/v1/user/${context.id}`
                // Local API
                // `https://api.fridger.recipes/v1/user/${context.id}`
                ).then(function (response) {
                    const user_ret = response.data;
                    if (user_ret) {
                        localStorage.setItem('user', JSON.stringify(user_ret));
                        context.setUser(user_ret);
                        console.log(JSON.stringify(user_ret));
                    } else {
                        setError(true);
                        return;
                    }
                    history.push('/profile')
                })
            }).catch(e => {
                setError(true);
                console.error(e + ":\n" + (e as AxiosError)?.response?.data);
                if ((e as AxiosError)?.response?.status == 401) {
                    history.push('/login');
                    return null;
                }
            });
        } catch (e) {
            console.error(e);
        }

        // return false;
    };

    const onDelete = () => {
        // event.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${context.token}`
                },
            };
            const body = JSON.stringify(getValues());
            axios.delete(
                `https://api.fridger.recipes/v1/user/${context.currentUser?.id}`,
                // `https://api.fridger.recipes/v1/user/${context.currentUser?.id}`,
                config
            ).then( res =>{
                console.log("Deleted User by " + context.currentUser?.id);
                localStorage.clear();
                context.setLoggedIn(false);
                context.setToken(undefined);
                context.setId(undefined)
                context.setAdmin(false);
                context.setEmail(undefined);
                context.setUser(undefined);
            });
            // return res;
        } catch (e) {
            console.error(e);
        }
        // alert(JSON.stringify(data, null, 2));
    
        return false;
    };

    return (
        <div>
        <form onSubmit={onSubmit}>
            <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                    type= "text"
                    name="name"
                    value={context.currentUser?.name}
                    onIonInput={(e: any) => setValue("name",e.target.value)}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Bio</IonLabel>
                <IonInput
                    type= "text"
                    name="bio"
                    value={context.currentUser?.bio}
                    onIonInput={(e: any) => setValue("bio", e.target.value)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Date of Birth</IonLabel>
                <IonDatetime
                    displayFormat="MMM DD YYYY"
                    placeholder="Select Date"
                    name="dob"
                    mode="md"
                    min="1922" max="2009"
                    value={context.currentUser?.dob}
                    onIonChange={(e: any) => setValue("dob", e.detail.value)}>
                </IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Height (in inches)</IonLabel>
                <IonInput
                    type= "number"
                    name="height_in"
                    min="25"
                    max="107"
                    value={context.currentUser?.height_in}
                    onIonInput={(e: any) => setValue("height_in", e.target.value)}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Weight (in pounds)</IonLabel>
                <IonInput
                    type= "number"
                    name="weight_lb"
                    min="50"
                    max="650"
                    value={context.currentUser?.weight_lb}
                    onIonInput={(e: any) => setValue("weight_lb", e.target.value)}
                    required
                />
            </IonItem>
            <IonButton className="ion-margin-top"
                color='primary'
                expand='full'
                type="submit"
                >
                    Submit
            </IonButton>
            <Link to="/">
                <IonButton className="ion-margin-top"
                    color='danger'
                    expand='full'>
                    Cancel
                </IonButton>
            </Link>
        </form>

        <IonButton  color="danger" onClick={() => setShowAlert(true)} expand="block">Delete Account</IonButton>
        <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass='my-custom-class'
            header={'Confirm Deletion?'}
            message={'Are you sure you want to delete your account? This cannot be undone.'}
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
                        history.push('/');
                    }
                }
            ]}
        />
        </div>
    );
}

export default EditProfileForm;
