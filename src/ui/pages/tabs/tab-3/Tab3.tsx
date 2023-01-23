import React from 'react';
import { IonContent, IonTitle } from '@ionic/react';
import { t } from 'i18next';

const Tab3: React.FC = () => (
  <IonContent color={'white-background'}>
    <IonTitle>{t('homePage.homePage')}</IonTitle>
  </IonContent>
);

export default Tab3;
