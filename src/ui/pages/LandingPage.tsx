import React from 'react';
import { IonButton, IonContent, IonImg, IonPage, useIonRouter } from '@ionic/react';
import img from 'static/assets/img/this-is-fine.png';

/**
 * Notice that the img will "underlap" under the content, to keep its proportion.
 * This is the desired behavior, because it allows for any amount of content and takes the space from the bottom of the img.
 */
const LandingPage: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src={img} class="fixed content-center top-48" />
        <div className="fixed w-full bg-red-500 bottom-0 p-5">
          <h3 className="pl-1">Velkommen til min første MeeW App!</h3>
          <p className="pb-4 pl-1">En app hvor du kan tilføje kort med hunde </p>

          <IonButton onClick={() => router.push('/login')} expand="full" className="h-[50px]">
            Kom i gang
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
