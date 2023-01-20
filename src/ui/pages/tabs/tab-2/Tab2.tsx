import React from 'react';
import { IonContent, IonTitle } from '@ionic/react';
import { t } from 'i18next';
import EditProfileForm from './EditProfileForm';

const Tab2: React.FC = () => (
  <IonContent color={'white-background'}>
    <IonTitle>{t('profilePage.title')}</IonTitle>
    <EditProfileForm />
  </IonContent>
);

export default Tab2;
