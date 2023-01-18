import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
import RegisterForm from 'ui/components/authentication/register/RegisterForm';

const RegisterPage: React.FC = () => (
  <IonPage>
    <IonContent fullscreen class="flex justify-center items-center">
      <RegisterForm togglePasswordButtonType="icon" />
    </IonContent>
  </IonPage>
);

export default RegisterPage;
