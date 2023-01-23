import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { Dogs } from 'types/data-types-exports';

const DogCard = (dog: Dogs) => {
  return (
    <IonCard>
      <img alt="wrinkly" src={'./assets/icon/cheems.png'} />
      <IonCardHeader>
        <IonCardTitle>{dog.race_name}</IonCardTitle>
      </IonCardHeader>
      <IonCardSubtitle>{dog.description}</IonCardSubtitle>
    </IonCard>
  );
};

export default DogCard;
