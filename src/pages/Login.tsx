import {
    IonButton,
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
    useIonLoading,
    useIonRouter,
} from "@ionic/react";
import {
    logInOutline,
    personCircleOutline,
    repeatOutline,
} from "ionicons/icons";
import favicon from "../assets/favicon.png";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen, setintroSeen] = useState(true);
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
        };
        checkStorage();
    }, []);

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present("logging in...");
        setTimeout(() => {
            dismiss();
            router.push("/app", "forward");
        }, 1000);
    };

    async function finishIntro() {
        setintroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: "true" });
    }

    async function seeIntroAgain() {
        setintroSeen(false);
        Preferences.remove({ key: INTRO_KEY });
    }

    if (!introSeen) return <Intro onFinish={finishIntro} />;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="success">
                    <IonTitle color={"danger"}>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollY={false} className="ion-padding">
                <IonGrid fixed>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <div className="ion-padding ion-text-center">
                                <img src={favicon} alt="login" width={"40%"} />
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={doLogin}>
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
                                            expand="block"
                                            type="submit"
                                        >
                                            Login
                                            <IonIcon
                                                icon={logInOutline}
                                                slot="end"
                                            />
                                        </IonButton>
                                        <IonButton
                                            className="ion-margin-top"
                                            expand="block"
                                            type="button"
                                            color={"warning"}
                                            routerLink="/register"
                                        >
                                            Sign Up
                                            <IonIcon
                                                icon={personCircleOutline}
                                                slot="end"
                                            />
                                        </IonButton>
                                        <IonButton
                                            className="ion-margin-top"
                                            expand="full"
                                            type="button"
                                            color={"dark"}
                                            onClick={seeIntroAgain}
                                            size="small"
                                            fill="clear"
                                        >
                                            Watch Intro Again
                                            <IonIcon
                                                icon={repeatOutline}
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

export default Login;
