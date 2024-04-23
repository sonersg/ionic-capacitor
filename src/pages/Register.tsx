import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { checkmarkDoneOutline } from "ionicons/icons";

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log("doRegister");
        router.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle color={"danger"}>Register</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonGrid fixed>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={doRegister}>
                                        <IonInput
                                            fill="outline"
                                            placeholder="sgsg@ionic.com"
                                            labelPlacement="floating"
                                            label="email"
                                            type="email"
                                        ></IonInput>
                                        <IonInput
                                            className="ion-margin-top"
                                            fill="outline"
                                            placeholder="sgsg@ionic.com"
                                            labelPlacement="floating"
                                            label="password"
                                            type="password"
                                        ></IonInput>

                                        <IonButton
                                            className="ion-margin-top"
                                            expand="full"
                                            type="submit"
                                            color={"danger"}
                                        >
                                            Sign Up
                                            <IonIcon
                                                icon={checkmarkDoneOutline}
                                                slot="end"
                                            />
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;
