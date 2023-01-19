import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import ForgotPasswordForm from 'ui/components/authentication/forgot-password/ForgotPasswordForm';
import { Center } from 'ui/components/generic/Center';

const ForgotPasswordPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="h-full w-full flex justify-center items-center">
        <Center>
          <ForgotPasswordForm />
        </Center>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;
