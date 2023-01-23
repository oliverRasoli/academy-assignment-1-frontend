import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { Dogs } from 'types/data-types-exports';
import CardFloatButtons from './CardFloatButtons';

const DogCard = (dog: Dogs) => {
  return (
    <div>
      <div className="relative left-72 top-10 z-10">
        <CardFloatButtons />
      </div>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{dog.race_name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{dog.description}</IonCardContent>
      </IonCard>
    </div>
  );
};

export default DogCard;
