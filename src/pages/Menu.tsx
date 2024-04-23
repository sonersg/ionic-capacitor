import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonText,
    IonMenu,
    IonRouterOutlet,
    IonItem,
    IonMenuToggle,
    IonSplitPane,
    IonMenuButton,
    IonIcon,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import List from "./List";
import Settings from "./Settings";
import { homeOutline, logOutOutline, newspaperOutline } from "ionicons/icons";

function Menu() {
    const paths = [
        {
            name: "Home",
            url: "/app/list",
            icon: homeOutline,
        },
        {
            name: "Settings",
            url: "/app/settings",
            icon: newspaperOutline,
        },
    ];

    return (
        <IonPage>
            <IonSplitPane contentId="main" when="md">
                <IonMenu contentId="main">
                    <IonHeader>
                        <IonToolbar color="success">
                            <IonButtons slot="start">
                                <IonMenuButton />
                            </IonButtons>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className="ion-padding">
                        {paths.map((item, index) => (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    detail={true}
                                    routerLink={item.url}
                                    routerDirection="none"
                                >
                                    <IonIcon slot="start" icon={item.icon} />
                                    {item.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                        <IonMenuToggle autoHide={false}>
                            <IonItem routerLink="/" routerDirection="root">
                                <IonIcon slot="start" icon={logOutOutline} />
                                Logout
                            </IonItem>
                        </IonMenuToggle>
                    </IonContent>
                </IonMenu>

                <IonRouterOutlet id="main">
                    <Route exact path="/app/list" component={List} />
                    <Route path="/app/settings" component={Settings} />
                    <Route exact path="/app">
                        <Redirect to="/app/list" />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
}

export default Menu;
