import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import LoginForm from 'ui/components/authentication/login/LoginForm';
import { Center } from 'ui/components/generic/Center';

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="flex justify-center items-center">
        <Center>
          <LoginForm togglePasswordButtonType="icon" />
        </Center>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
