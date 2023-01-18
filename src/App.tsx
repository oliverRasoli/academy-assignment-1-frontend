import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonLoading, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { supabase } from 'apis/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useAuthUserStore } from 'store/user';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Tailwind & Ant-d CSS imports */
import 'antd/dist/reset.css';
import './ui/theme/tailwind-setup.css';

/* Theme variables */
import './ui/theme/ionic-variables.css';
import './ui/theme/variables.css';
import './ui/theme/global.css';

/* _i18n */
import './_i18n/config';

/** Pages imports */
import LandingPage from './ui/pages/LandingPage';
import { UILibRouter } from './ui/pages/ui-library/UILibRouter';
import IntroPage from './ui/pages/IntroPage';
import LoginPage from './ui/pages/LoginPage';
import RegisterPage from 'ui/pages/RegisterPage';
import ForgotPasswordPage from 'ui/pages/ForgotPasswordPage';
import ResetPasswordPage from 'ui/pages/ResetPasswordPage';
import HomePage from 'ui/pages/HomePage';
import { AntdThemeWrapper } from './ui/theme/AntdThemeWrapper';

setupIonicReact({ mode: 'ios' });

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const setAuthUser = useAuthUserStore((state) => state.setAuthUser);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => updateSession());
    void updateSession();
    return () => data.subscription.unsubscribe();
  }, []);

  const updateSession = async (): Promise<void> => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    data.session && setAuthUser(data.session.user);
    setLoading(false);
  };
  if (loading) return <IonLoading isOpen />;
  return (
    <IonApp>
      <AntdThemeWrapper>
        <IonReactRouter>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/welcome" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
            <Route exact path="/resetpassword" component={ResetPasswordPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/intro" component={IntroPage} />
            <Route path="/ui-library" component={UILibRouter} />
            <Route path="/*">
              <Redirect to={session ? '/home' : '/welcome'} />
            </Route>
          </Switch>
        </IonReactRouter>
      </AntdThemeWrapper>
    </IonApp>
  );
};
export default App;
