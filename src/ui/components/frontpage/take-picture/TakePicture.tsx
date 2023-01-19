import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { takePicture } from 'apis/photo.service';
import { Photo } from '@capacitor/camera';

type TakePictureProps = {
  onPictureTaken: (picture: Photo) => void;
};

const TakePicture: React.FC<TakePictureProps> = ({ onPictureTaken }) => (
  <IonFab vertical="bottom" horizontal="center" slot="fixed">
    <IonFabButton color={'secondary'} onClick={() => takePicture().then((d) => onPictureTaken(d))}>
      <IonIcon icon={camera} />
    </IonFabButton>
  </IonFab>
);
export default TakePicture;
