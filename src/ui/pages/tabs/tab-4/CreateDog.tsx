import { IonButton, IonPage, IonModal, IonContent, IonButtons, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { supabase } from 'apis/supabaseClient';
import React, { useRef, useState } from 'react';
import { useAuthUserStore } from 'store/user';
import { t } from 'i18next';
import { Center } from 'ui/components/generic/Center';

const CreateDog: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [raceName, setRaceName] = useState('');
  const [description, setDescription] = useState('');

  const authUser = useAuthUserStore((state) => state.authUser);

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  const submitDog = async () => {
    if (authUser) {
      await supabase.from('Dogs').insert({ race_name: raceName, description: description, uuid: authUser?.id });
    }
  };

  return (
    <div>
      <IonButton id="open-modal" slot="end" color="warning" className="">
        {t('dogPage.createDogCard')}
      </IonButton>
      <IonModal ref={modal} trigger="open-modal">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>{t('dogPage.cancel')}</IonButton>
            </IonButtons>
            <IonTitle>{t('dogPage.newDogCard')}</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm()}>
                {t('dogPage.confirm')}
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <Center>
              <form>
                <IonLabel position="stacked">{t('dogPage.describeDog')}</IonLabel>
                <IonInput onIonChange={(e) => setRaceName(e.detail.value ?? '')} type="text" placeholder={t('dogPage.dogsRace')} />
                <IonInput onIonChange={(e) => setDescription(e.detail.value ?? '')} type="text" placeholder={t('dogPage.dogsDescription')} />
                <IonButton expand="full" className="w-full mb-2 border-2 border-black" color={'secondary'} onClick={submitDog}>
                  {t('dogPage.createDogCard')}
                </IonButton>
              </form>
            </Center>
          </IonItem>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default CreateDog;
