import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
import RegisterForm from 'ui/components/authentication/register/RegisterForm';
import { Center } from 'ui/components/generic/Center';

const RegisterPage: React.FC = () => (
  <IonPage>
    <IonContent fullscreen class="flex justify-center items-center">
      <Center>
        <RegisterForm togglePasswordButtonType="icon" />
      </Center>
    </IonContent>
  </IonPage>
);

export default RegisterPage;
