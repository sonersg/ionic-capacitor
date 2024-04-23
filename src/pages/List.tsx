import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonText,
    IonMenuButton,
    useIonViewWillEnter,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonCardHeader,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonChip,
    useIonAlert,
    useIonToast,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText,
    IonModal,
    IonFab,
    IonFabButton,
    IonSegment,
    IonSegmentButton,
    IonDatetime,
} from "@ionic/react";
import { addOutline, trashBinOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import "./List.css";

function List() {
    const [users, setusers] = useState<any[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [showAlert] = useIonAlert();
    const [showToast] = useIonToast();
    const [selectedUser, setselectedUser] = useState<any>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonModalElement>(null);
    const [presentingElement, setPresentingElement] =
        useState<HTMLElement | null>(null);
    const page = useRef(null);
    const [activeSegment, setactiveSegment] = useState<any>("details");

    useEffect(() => {
        setPresentingElement(page.current);
    }, []);

    useIonViewWillEnter(() => {
        const fetchData = async () => {
            try {
                const users = await getUsers();
                setusers(users);
                setloading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    });

    const getUsers = async () => {
        const res = await fetch("https://randomuser.me/api?results=20");
        const users = await res.json();
        return users.results;
    };

    const clearList = async () => {
        showAlert({
            header: "Confirm!",
            message: "Are you sure you wanna delete all users?",
            buttons: [
                { text: "Cancel", role: "cancel" },
                {
                    text: "Delete",
                    handler: () => {
                        setusers([]);
                        showToast({
                            message: "All users deleted",
                            duration: 2000,
                            color: "success",
                            position: "middle",
                        });
                    },
                },
            ],
        });
    };

    async function doRefresh(e: any) {
        setloading(true);
        const users = await getUsers();
        setusers(users);
        setloading(false);
        e.detail.complete();
    }

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>

                    <IonTitle color={"danger"}>List</IonTitle>

                    <IonButtons slot="end">
                        <IonButton onClick={clearList}>
                            <IonIcon
                                slot="icon-only"
                                icon={trashBinOutline}
                                color="light"
                            />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonToolbar color={"success"}>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={e => doRefresh(e)}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading &&
                    [...Array(10)].map((_, index) => (
                        <IonCard key={index}>
                            <IonCardHeader className="ion-no-padding">
                                <IonHeader>
                                    <IonSkeletonText
                                        animated
                                        style={{
                                            width: "150px",
                                        }}
                                    />
                                </IonHeader>
                            </IonCardHeader>

                            <IonCardContent className="ion-no-padding">
                                <IonItem lines="none">
                                    <IonAvatar slot="start">
                                        <IonSkeletonText />
                                    </IonAvatar>
                                    <IonLabel>
                                        <IonSkeletonText
                                            animated
                                            style={{
                                                width: "150px",
                                            }}
                                        />
                                    </IonLabel>
                                    <IonChip slot="end" color={"primary"}>
                                        <IonSkeletonText />
                                    </IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))}

                {users.map((user, index) => (
                    <IonCard key={index} onClick={() => setselectedUser(user)}>
                        <IonCardHeader className="ion-no-padding">
                            <IonText>
                                <h1
                                    style={{
                                        textAlign: "center",
                                        padding: 0,
                                        margin: 0,
                                        color: "white",
                                    }}
                                >
                                    {user.name.first} {user.name.last}
                                </h1>
                            </IonText>
                        </IonCardHeader>

                        <IonCardContent className="ion-no-padding">
                            <IonItem lines="none">
                                <IonAvatar slot="start">
                                    <IonImg src={user.picture.thumbnail} />
                                </IonAvatar>
                                <IonLabel>{user.email}</IonLabel>
                                <IonChip slot="end" color={"primary"}>
                                    {user.nat}
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal
                    breakpoints={[0, 0.5, 0.8]}
                    initialBreakpoint={0.5}
                    ref={modal}
                    isOpen={selectedUser !== null}
                    onIonModalDidDismiss={() => setselectedUser(null)}
                >
                    <IonHeader>
                        <IonToolbar color={"light"}>
                            <IonButtons slot="start">
                                <IonButton
                                    onClick={() => modal.current?.dismiss()}
                                >
                                    Close
                                </IonButton>
                            </IonButtons>
                            <IonTitle>
                                {selectedUser?.name?.first}{" "}
                                {selectedUser?.name?.last}
                            </IonTitle>
                        </IonToolbar>

                        <IonToolbar color={"light"}>
                            <IonSegment
                                value={activeSegment}
                                onIonChange={e =>
                                    setactiveSegment(e.detail.value!)
                                }
                            >
                                <IonSegmentButton value={"details"}>
                                    Details
                                </IonSegmentButton>
                                <IonSegmentButton value={"calendar"}>
                                    Calendar
                                </IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className="ion-padding">
                        {activeSegment === "details" && (
                            <IonCard>
                                <IonAvatar slot="start">
                                    <IonImg src={selectedUser?.picture.large} />
                                </IonAvatar>

                                <IonCardContent className="ion-no-padding">
                                    <IonItem lines="none">
                                        <IonLabel class="ion-text-wrap">
                                            {selectedUser?.name?.first}{" "}
                                            {selectedUser?.name?.last}
                                            <p>{selectedUser?.email}</p>
                                        </IonLabel>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        )}

                        {activeSegment === "calendar" && <IonDatetime />}
                    </IonContent>
                </IonModal>
            </IonContent>

            <IonModal
                ref={cardModal}
                trigger="card-modal"
                presentingElement={presentingElement!}
            >
                <IonHeader>
                    <IonToolbar color={"success"}>
                        <IonButtons slot="start">
                            <IonButton
                                onClick={() => cardModal.current?.dismiss()}
                            >
                                Close
                            </IonButton>
                        </IonButtons>
                        <IonTitle>
                            Card Modal
                            {selectedUser?.name?.first}{" "}
                            {selectedUser?.name?.last}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>my card modal content</IonContent>
            </IonModal>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton id="card-modal">
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
}

export default List;
