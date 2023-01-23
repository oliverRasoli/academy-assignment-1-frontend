import React, { useEffect, useState } from 'react';
import './tab-4.module.css';
import { IonContent, IonTitle } from '@ionic/react';
import { Dogs } from 'types/data-types-exports';
import { supabase } from 'apis/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import { useAuthUserStore } from 'store/user';
import DogCard from './DogCard';
import CreateDog from './CreateDog';

const Tab4: React.FC = () => {
  const [fetchError, setFetchError] = useState<PostgrestError | null>();
  const [dogs, setDogs] = useState<Dogs[]>();
  const authUser = useAuthUserStore((state) => state.authUser);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data, error } = await supabase.from('Dogs').select('*').eq('uuid', authUser?.id);
      if (error) {
        setFetchError(error);
      }
      if (data) {
        setDogs(data);
        setFetchError(null);
      }
    };

    fetchDogs();
  }, []);
  return (
    <IonContent className="ion-padding">
      <div className="m-14">
        <CreateDog />
      </div>
      {dogs?.map((dog) => (
        <DogCard key={dog.id} race_name={dog.race_name} description={dog.description} id={dog.id} uuid={''} />
      ))}
    </IonContent>
  );
};

export default Tab4;
