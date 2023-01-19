import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IonButton, IonIcon, IonInput, IonItem, IonText, useIonLoading, useIonAlert } from '@ionic/react';
import { supabase } from 'apis/supabaseClient';
import { at, chevronBackCircle } from 'ionicons/icons';
import { t } from 'i18next';

type ForgotPasswordProps = {
  iconsDisabled?: boolean;
};

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({ iconsDisabled = false }) => {
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const [emailValid, setEmailValid] = useState<boolean>(true);

  //TODO: change this with .env
  const [IONIC_SERVER_HOST_URL, setIONIC_SERVER_HOST_URL] = useState<string>('');
  useEffect(() => {
    const ionicServerHostUrl = window.location.origin;
    setIONIC_SERVER_HOST_URL(ionicServerHostUrl);
  }, []);

  useEffect(() => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = emailRegex.test(email) && email !== '';

    setEmailValid(emailCheck || email === '');

    setIsDisabled(!emailCheck);
  }, [email]);

  const handleSendPasswordReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await present({ message: t('authentication.sendingEmail') });
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${IONIC_SERVER_HOST_URL}/resetpassword` });
    if (data) {
      await dismiss();
      await presentAlert({
        header: t('authentication.resetLinkSent'),
        message: t('authentication.ifAccountExists'),
        buttons: ['OK'],
      });
    } else {
      await dismiss();
      await presentAlert({
        header: t('authentication.genericError'),
        message: error?.message,
        buttons: ['OK'],
      });
    }
  };

  let resetButton;
  if (isDisabled) {
    resetButton = (
      <IonButton expand="full" type="submit" className="w-full mb-2" disabled={isDisabled}>
        {t('authentication.sendResetLink')}
      </IonButton>
    );
  } else {
    resetButton = (
      <IonButton expand="full" type="submit" className="w-full mb-2 border-2 border-black">
        {t('authentication.sendResetLink')}
      </IonButton>
    );
  }

  return (
    <div className="flex h-50 justify-center bg-custom-palette-vanilla-yellow border-2 border-black items-center w-full py-5">
      <form className="sm:w-[400px] w-3/4 relative" onSubmit={handleSendPasswordReset}>
        <div className="flex items-center">
          <IonIcon
            onClick={() => history.goBack()}
            icon={chevronBackCircle}
            size={'large'}
            color={'primary-brand'}
            className="cursor-pointer bg-white rounded-full"
          />
          <IonText className="pl-2 text-primary-brand text-xl font-extrabold">{t('authentication.resetPassword')}</IonText>
        </div>
        <IonItem lines="none" color={'white-background'} className={`border-4 ${emailValid ? 'border-white' : 'border-red-300'} mt-8`}>
          <IonInput
            value={email}
            placeholder={t('authentication.email')}
            onIonChange={(e) => setEmail(e.detail.value ?? '')}
            type="email"
            required
            class="h-[59px] items-center"
          />
          {!iconsDisabled && <IonIcon icon={at} size="medium" className="text-primary-brand" />}
        </IonItem>

        <IonText className={`text-red-500 ${emailValid && 'opacity-0'}`}>{t('authentication.emailInvalid')}</IonText>

        {resetButton}
      </form>
    </div>
  );
};
export default ForgotPasswordForm;
