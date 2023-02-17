import { IonButton, IonIcon, IonInput, IonItem, IonText, useIonRouter, useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { at, eyeOffOutline, eyeOutline, lockClosedOutline, person } from 'ionicons/icons';
import Separator from 'ui/components/generic/Separator';
import { supabase } from 'apis/supabaseClient';
import { useAuthUserStore } from 'store/user';
import { useProfileStore } from 'store/profile';

type RegisterFormProps = {
  togglePasswordButtonType?: 'text' | 'icon' | 'none';
};

const EditProfileForm: React.FC<RegisterFormProps> = ({ togglePasswordButtonType = 'icon' }) => {
  const authUser = useAuthUserStore((state) => state.authUser);
  const resetAuthUser = useAuthUserStore((state) => state.resetAuthUser);
  const setAuthUser = useAuthUserStore((state) => state.setAuthUser);
  const setProfile = useProfileStore((state) => state.setProfile);
  const resetProfile = useProfileStore((state) => state.resetProfile);
  const router = useIonRouter();
  const [email, setEmail] = useState<string | undefined>('');
  const [emailChanged, setEmailChanged] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [oldEmail, setOldEmail] = useState<string | undefined>('');
  const [username, setUsername] = useState<string>('');
  const [usernameChanged, setUsernameChanged] = useState<boolean>(false);
  const [oldUsername, setOldUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [repeatedPasswordShown, setRepeatedPasswordShown] = useState<boolean>(false);
  const [repPasswordValid, setRepPasswordValid] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [present] = useIonToast();
  const [userInput, setUserInput] = useState({
    username: { old: '', new: '' },
  });

  useEffect(() => {
    setUsername((prevState) => {
      console.log(prevState);
      return prevState.length > 0 ? 'over nul' : 'under nul';
    });
    if (email) {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailCheck = emailRegex.test(email) && email !== '';
      const passwordCheck = password.length >= 8 && password !== '';
      const repPasswordCheck = password === repeatedPassword && repeatedPassword !== '';

      setEmailValid(emailCheck || email === '');
      setPasswordValid(passwordCheck || password === '');
      setRepPasswordValid(repPasswordCheck || repeatedPassword === '');
      setIsDisabled(!emailCheck || !passwordCheck || !repPasswordCheck);
    }
  }, [email, password, repeatedPassword]);

  useEffect(() => {
    if (!authUser) router.push('/login');
  }, [router, authUser]);

  async function handleProfile(uuid: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', uuid).single();
    if (data) {
      setProfile(data);
    }
    if (error) {
      await presentAlert({
        header: t('authentication.loginFailed'),
        message: error?.message,
        buttons: ['OK'],
      });
    }
  }

  async function getData() {
    if (authUser) {
      if (authUser.new_email) {
        setEmail(authUser.new_email);
        setOldEmail(authUser.new_email);
      } else {
        setEmail(authUser.email);
        setOldEmail(authUser.new_email);
      }
    }

    const { data, error } = await supabase.from('profiles').select('*').eq('id', authUser?.id).single();
    if (data) {
      setUsername(data.username);
      setOldUsername(data.username);
      setOldPassword(data.password);
    }
    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (authUser) {
      if (authUser.email !== email && email !== '') {
        setEmailChanged(true);
      } else {
        setEmailChanged(false);
      }
    } else {
      if (oldEmail !== email && email !== '') {
        setEmailChanged(true);
      } else {
        setEmailChanged(false);
      }
    }

    if (username !== oldUsername && username !== '') {
      setUsernameChanged(true);
    } else {
      setUsernameChanged(false);
    }

    if (password !== repeatedPassword) {
      setPasswordChanged(false);
      if (password !== oldPassword && repeatedPassword !== oldPassword) {
        setPasswordChanged(true);
      } else {
        setPasswordChanged(false);
      }
    }
  }, [email, oldEmail, username, oldUsername, password, repeatedPassword, oldPassword]);

  const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };

  const handleUserChange = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (usernameChanged) {
      const { data, error } = await supabase.from('profiles').update({ username: username }).eq('id', authUser?.id);
    }

    //There must be an easier way to do this
    if (emailChanged && passwordChanged) {
      await supabase.from('profiles').update({ password: password }).eq('id', authUser?.id);
      const { data, error } = await supabase.auth.updateUser({
        email: email,
        password: password,
      });
      if (data.user) {
        setAuthUser(data.user);
      }
      if (error) {
        console.log(error);
      }
    } else if (emailChanged) {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
      });
      if (data.user) {
        setAuthUser(data.user);
      }
      if (error) {
        console.log(error);
      }
    } else if (passwordChanged) {
      await supabase.from('profiles').update({ password: password }).eq('id', authUser?.id);
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (data.user) {
        setAuthUser(data.user);
      }
      if (error) {
        console.log(error);
      }
    }
    if (authUser) {
      handleProfile(authUser.id);
    }
    setIsDisabled(true);
    presentToast('bottom', 'User Credentials has been changed!');
  };

  const handleLogOut = async () => {
    resetAuthUser();
    resetProfile();
    await supabase.auth.signOut();
  };

  const togglePasswordButton = (isRepeatedPassword: boolean) => {
    if (togglePasswordButtonType === 'text') {
      if (isRepeatedPassword) {
        return (
          <div className="mr-1 text-sm font-bold cursor-pointer text-primary-brand" onClick={() => setRepeatedPasswordShown(!repeatedPasswordShown)}>
            {repeatedPasswordShown ? <IonText>{t('authentication.hide')}</IonText> : <IonText>{t('authentication.show')}</IonText>}
          </div>
        );
      } else {
        return (
          <div className="mr-1 text-sm font-bold cursor-pointer text-primary-brand" onClick={() => setPasswordShown(!passwordShown)}>
            {passwordShown ? <IonText>{t('authentication.hide')}</IonText> : <IonText>{t('authentication.show')}</IonText>}
          </div>
        );
      }
    }
    if (togglePasswordButtonType === 'icon') {
      if (isRepeatedPassword) {
        return (
          <IonIcon
            className="text-primary-brand"
            icon={repeatedPasswordShown ? eyeOutline : eyeOffOutline}
            size="medium"
            onClick={() => setRepeatedPasswordShown(!repeatedPasswordShown)}
          />
        );
      } else {
        return (
          <IonIcon
            className="text-primary-brand"
            icon={passwordShown ? eyeOutline : eyeOffOutline}
            size="medium"
            onClick={() => setPasswordShown(!passwordShown)}
          />
        );
      }
    }
  };

  let submitChangesButton;
  if (!isDisabled || usernameChanged || emailChanged || passwordChanged) {
    submitChangesButton = (
      <IonButton expand="full" className="w-full mb-2 border-2 border-black" color={'secondary'} onClick={handleUserChange}>
        {t('profilePage.submitChanges')}
      </IonButton>
    );
  } else {
    submitChangesButton = (
      <IonButton expand="full" className="w-full mb-2" onClick={handleUserChange} color={'secondary'} disabled={isDisabled}>
        {t('profilePage.submitChanges')}
      </IonButton>
    );
  }

  return (
    <div className="flex h-50 justify-center bg-custom-palette-vanilla-yellow border-2 border-black items-center w-full py-5">
      <form onSubmit={handleUserChange}>
        <IonText className="text-primary-brand text-xl font-extrabold">{t('profilePage.editProfile')}</IonText>
        <IonItem lines="none" color={'white-background'} className={`border-4 ${emailValid ? 'border-white' : 'border-red-300'} mt-8`}>
          <div className={`${emailChanged ? 'text-black' : 'text-stone-500'}`}>
            <IonInput
              value={email}
              placeholder={t('profilePage.email')}
              onIonChange={(e) => setEmail(e.detail.value ?? '')}
              type="email"
              class={'h-[59px] items-center'}
            />
          </div>

          <IonIcon icon={at} size="medium" className="text-primary-brand" />
        </IonItem>
        <IonText className={`text-red-500 ${emailValid && 'opacity-0'}`}>{t('authentication.emailInvalid')}</IonText>
        <IonItem lines="none" color={'white-background'} className={'border-4 border-white'}>
          <div className={`${usernameChanged ? 'text-black' : 'text-stone-500'}`}>
            <IonInput
              value={username}
              placeholder={t('profilePage.username')}
              onIonChange={(e) => {
                setUsername(e.detail.value ?? '');
              }}
              type="text"
              class="h-[59px] items-center"
            />
          </div>
          <IonIcon icon={person} size="medium" className="text-primary-brand" />
        </IonItem>
        <IonItem lines="none" color={'white-background'} className={`border-4 ${passwordValid ? 'border-white' : 'border-red-300'} mt-6`}>
          <IonInput
            value={password}
            placeholder={t('profilePage.password')}
            onIonChange={(e) => setPassword(e.detail.value ?? '')}
            type={passwordShown ? 'text' : 'password'}
            class="h-[59px] items-center"
          />
          {password !== '' && togglePasswordButton(false)}
          {password === '' && <IonIcon icon={lockClosedOutline} size="medium" className="text-primary-brand" />}
        </IonItem>
        <IonText className={`text-red-500 ${passwordValid && 'opacity-0'}`}>{t('authentication.passwordMinLength')}</IonText>;
        <IonItem lines="none" color={'white-background'} className={`border-4 ${repPasswordValid ? 'border-white' : 'border-red-300'}`}>
          <IonInput
            value={repeatedPassword}
            placeholder={t('profilePage.repeatPassword')}
            onIonChange={(e) => setRepeatedPassword(e.detail.value ?? '')}
            type={repeatedPasswordShown ? 'text' : 'password'}
            class="h-[59px] items-center"
          />
          {repeatedPassword !== '' && togglePasswordButton(true)}
          {repeatedPassword === '' && <IonIcon icon={lockClosedOutline} size="medium" className="text-primary-brand" />}
        </IonItem>
        <IonText className={`text-red-500 ${repPasswordValid && 'opacity-0'}`}>{t('authentication.passwordMustMatch')}</IonText>
        {submitChangesButton}
        <button className="hidden" type="submit" />
        <Separator text={t('authentication.or')} />
        <IonButton onClick={handleLogOut} expand="full" color={'secondary'} class="border-2 border-black" slot="end">
          {t('profilePage.logOut')}
        </IonButton>
      </form>
    </div>
  );
};

export default EditProfileForm;
function presentAlert(arg0: { header: string; message: string; buttons: string[] }) {
  throw new Error('Function not implemented.');
}
