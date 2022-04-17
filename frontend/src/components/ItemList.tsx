/*
    This file contains part of the functionality for the calorie tracker. 
    It displays the items once they have been added and allows for a single entry to be deleted.
*/

import { IonButton, IonInput, IonCard, IonCardContent } from '@ionic/react';
import { medalSharp } from 'ionicons/icons';
import { values } from 'lodash';
import React from 'react';

const ItemList = ({items, deleteItemHandler}: any) => {
    
    return (
        <div>
            {items?.map((item: any, index: any)=>(
                <div key={index}>
                    <IonCard>
                        <IonCardContent>{`${item.itemName}: ${item.calories}`}
                    <div>
                        <IonButton color="dark" size='small' onClick={()=>deleteItemHandler(item.id)}>
                            Delete
                        </IonButton>
                    </div>
                    </IonCardContent>
                    </IonCard>
                </div>
            ))}
        </div>
    );
}
export default ItemList;