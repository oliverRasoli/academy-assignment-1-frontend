import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTabs,
  IonRouterOutlet,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  useIonRouter,
  IonText,
} from '@ionic/react';
import { peopleOutline, homeOutline, pawOutline } from 'ionicons/icons';

import Tab1 from './tabs/tab-1/Tab1';
import Tab2 from './tabs/tab-2/Tab2';
import Tab3 from './tabs/tab-3/Tab3';
import Tab4 from './tabs/tab-4/Tab4';
import { supabase } from 'apis/supabaseClient';
import { useAuthUserStore } from 'store/user';
import { t } from 'i18next';
import { useProfileStore } from 'store/profile';
import { Center } from 'ui/components/generic/Center';

const HomePage: React.FC = () => {
  const router = useIonRouter();
  const authUser = useAuthUserStore((state) => state.authUser);
  const profile = useProfileStore((profile) => profile.profile);

  useEffect(() => {
    if (!authUser) router.push('/login');
  }, [router, authUser]);

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar color={'tertiary'}>
          <Center>
            <IonText color="dark">{profile?.username ? profile.username : 'FEJL DU'}</IonText>
          </Center>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              {pages.map((p, i) => {
                return <Route key={i} exact path={p.path} component={p.component} />;
              })}

              <Route exact path="/home">
                <Redirect to={pages.filter((p) => p.redirect)[0].path} />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color={'tertiary'} class={'h-[70px] border-t-[1px] border'}>
              {pages.map((p, i) => {
                return (
                  <IonTabButton key={i} tab={`tab${i}`} href={p.path}>
                    <IonIcon icon={p.icon} />
                  </IonTabButton>
                );
              })}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

const pages = [
  {
    name: 'profile',
    icon: peopleOutline,
    path: '/tab2',
    component: Tab2,
    redirect: false,
  },
  {
    name: 'home',
    icon: homeOutline,
    path: '/tab3',
    component: Tab3,
    redirect: true,
  },
  {
    name: 'addDogs',
    icon: pawOutline,
    path: '/tab4',
    component: Tab4,
    redirect: false,
  },
];

const menuItems = [{ name: 'Settings' }, { name: 'Account' }, { name: 'Questionnaire' }, { name: 'Logout' }];
