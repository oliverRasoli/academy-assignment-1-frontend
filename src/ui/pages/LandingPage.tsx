import React from 'react';
import { IonButton, IonContent, IonImg, IonPage, useIonRouter } from '@ionic/react';
import img from 'static/assets/img/this-is-fine.png';
import { Center } from 'ui/components/generic/Center';
import { t } from 'i18next';

/**
 * Notice that the img will "underlap" under the content, to keep its proportion.
 * This is the desired behavior, because it allows for any amount of content and takes the space from the bottom of the img.
 */
const LandingPage: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <Center>
          <IonImg src={img} class="fixed object-cover" />
        </Center>
        <div className="fixed w-full bg-prompt-color bottom-0 p-5">
          <h3 className="pl-1">{t('landingPage.title')}</h3>
          <p className="pb-4 pl-1">{t('landingPage.subTitle')}</p>

          <IonButton onClick={() => router.push('/login')} expand="full" className="h-[50px]">
            {t('landingPage.getStarted')}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
