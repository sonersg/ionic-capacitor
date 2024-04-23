import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    CreateAnimation,
    IonButton,
    useIonViewDidEnter,
    createGesture,
    GestureDetail,
    Gesture,
} from "@ionic/react";
import { useRef } from "react";

function Tab2() {
    const animationRef = useRef<CreateAnimation | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useIonViewDidEnter(() => {
        animationRef.current?.animation.play();

        const gesture: Gesture = createGesture({
            el: elementRef.current!,
            threshold: 0,
            gestureName: "my-gesture",
            onStart: e => onStartHandler(e),
            onMove: e => onMoveHandler(e),
            onEnd: e => onMoveEnd(e),
        });
        gesture.enable();
    });

    const onStartHandler = (detail: GestureDetail) => {
        elementRef.current!.style.transition = `none`;
    };

    const onMoveHandler = (detail: GestureDetail) => {
        const x = detail.currentX - detail.startX;
        const y = detail.currentY - detail.startY;

        elementRef.current!.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onMoveEnd = (detail: GestureDetail) => {
        elementRef.current!.style.transition = "500ms ease-out";
        elementRef.current!.style.transform = `translate(0px, 0px)`;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Tab 2</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" scrollY={false}>
                <CreateAnimation
                    ref={animationRef}
                    duration={2000}
                    iterations={Infinity}
                    delay={1000}
                    keyframes={[
                        { offset: 0, transfform: "scale(1)", opacity: "1" },
                        {
                            offset: 0.5,
                            transfform: "scale(1.5)",
                            opacity: "0.5",
                        },
                        { offset: 1, transfform: "scale(1)", opacity: "1" },
                    ]}
                >
                    <IonButton
                        color={"success"}
                        className="ion-margin"
                        expand="full"
                    >
                        join ionic{" "}
                    </IonButton>
                </CreateAnimation>

                <div
                    ref={elementRef}
                    style={{ width: 50, height: 50, backgroundColor: "red" }}
                ></div>
            </IonContent>
        </IonPage>
    );
}

export default Tab2;
