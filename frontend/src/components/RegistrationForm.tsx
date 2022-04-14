import { IonItem, IonLabel, IonInput, IonButton, IonDatetime } from "@ionic/react";
import { Link, RouteComponentProps } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import axios, {AxiosError} from 'axios';

import Context from '../components/Context';
import history from '../History';

const RegistrationForm: React.FC = () => {
    const context = useContext(Context);

    const [pwsMatch, setPwsMatch] = useState(true);
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
            email: "",
            password: "",
            name: "",
            bio: "",
            dob: "",
            height_in: 0,
            weight_lb: 0,
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
                },
            };
            const body = JSON.stringify(getValues());
            axios.post(
                // `https://api.fridger.recipes/v1/auth/register`,
                `https://api.fridger.recipes/v1/auth/register`,

                //sending test
                // 'http://localhost:8080/v1/auth/register',
                body,
                config
            ).then( res => {
                console.log("Resulting data: " + res.data);
                if(res.status == 200) {
                    console.log("Status is " + res.status);
                }
                history.push('/login')
            }).catch(e => {
                setError(true);
                console.error(e + ":\n" + (e as AxiosError)?.response?.data);
            });
        } catch (e) {
            console.error(e);
        }

        // return false;
    };

    return (
        <form onSubmit={onSubmit}>
            {error &&
                <IonLabel position="floating" color="danger">Account with this email already exists</IonLabel>
            }
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                    type= "email"
                    name="email"
                    onIonInput={(e: any) => setValue("email",e.target.value)}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                    type= "password"
                    name="password"
                    onIonInput={(e: any) => setValue("password",e.target.value)}
                    required
                />
            </IonItem>
            {!pwsMatch &&
                <IonLabel position="floating" color="danger">Passwords must match</IonLabel>
            }
            <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                    type= "password"
                    onIonInput={(e: any) => setPwsMatch(getValues().password == e.target.value)}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                    type= "text"
                    name="name"
                    onIonInput={(e: any) => setValue("name",e.target.value)}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Bio</IonLabel>
                <IonInput
                    type= "text"
                    name="bio"
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
                    onIonInput={(e: any) => setValue("weight_lb", e.target.value)}
                    required
                />
            </IonItem>
            <IonButton className="ion-margin-top" disabled={!pwsMatch}
                color='primary'
                expand='full'
                type="submit"
                // type="button"
                // onClick={async () => {onSubmit()}}
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
    );
}

export default RegistrationForm;