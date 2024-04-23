import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import favicon from "../assets/favicon.png";
import { IonButton, IonText } from "@ionic/react";
import "./Intro.css";

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

interface ContainerProps {
    onFinish: () => void;
}

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
    return (
        <Swiper>
            <SwiperSlide>
                <img src={favicon} alt="slide pic 1" />
                <IonText>intro info one</IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide>
                <img src={favicon} alt="slide pic 2" />
                <IonText>intro info two</IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide>
                <img src={favicon} alt="slide pic 3" />
                <IonText>intro info three</IonText>
                <IonButton onClick={() => onFinish()}>Finish</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;
