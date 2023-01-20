import React from 'react';
import { IonContent, IonTitle } from '@ionic/react';
import { t } from 'i18next';
import EditProfileForm from './EditProfileForm';
import { Center } from 'ui/components/generic/Center';

const Tab2: React.FC = () => (
  <IonContent color={'primary'}>
    <Center>
      <EditProfileForm />
    </Center>
  </IonContent>
);

export default Tab2;
