import React from 'react';
import { IonContent, IonTitle } from '@ionic/react';
import TakePicture from 'ui/components/frontpage/take-picture/TakePicture';
import { Photo } from '@capacitor/camera';
import { t } from 'i18next';

const Tab1: React.FC = () => {
  const [picture, setPicture] = React.useState<Photo>();

  return (
    <IonContent color={'white-background'}>
      {!picture && <IonTitle>{t('tabContent.takeAPhoto')}</IonTitle>}
      {picture && <img src={picture?.webPath} alt="your upload" className="h-full w-auto m-auto" />}

      <TakePicture onPictureTaken={(p) => setPicture(p)} />
    </IonContent>
  );
};

export default Tab1;
