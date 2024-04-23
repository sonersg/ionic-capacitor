import { Camera, CameraResultType } from "@capacitor/camera";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useState } from "react";

function Tab1() {
    const [image, setimage] = useState<any>(null);

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
        });
        const img = `data:image/jpeg;base64,${image.base64String}`;
        setimage(img);
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Image Example</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="full" onClick={takePicture}>
                    Take Picture
                </IonButton>
                <img src={image} alt="image from camera" />
            </IonContent>
        </IonPage>
    );
}

export default Tab1;
