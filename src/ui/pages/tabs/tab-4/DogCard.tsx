import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Dogs } from 'types/data-types-exports';
import CardFloatButtons from './CardFloatButtons';
import { supabase } from 'apis/supabaseClient';

const DogCard = (dog: Dogs) => {
  const [image, setImage] = useState<string>('');

  async function getImage(image: string) {
    const api = async () => {
      const { data } = await supabase.functions.invoke('getDogs', {
        body: { name: image },
      });
      if (data) {
        setImage(data.publicUrl);
      }
    };
    api();
  }

  useEffect(() => {
    getImage(dog.race_name.toLowerCase());
  }, []);

  return (
    <div className="-mb-8">
      <div className="relative left-72 top-10 z-10">
        <CardFloatButtons />
      </div>
      <IonCard>
        <img src={image} alt="dog goes here" className="w-72 h-60" />
        <IonCardHeader>
          <IonCardTitle>{dog.race_name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{dog.description}</IonCardContent>
      </IonCard>
    </div>
  );
};

export default DogCard;
