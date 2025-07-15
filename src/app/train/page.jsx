"use client";
import Image from "next/image";
import Button from "@/components/button";
import Header from "@/components/header";
import { useRef } from "react";

export default function Train() {
  const currentAudioRef = useRef(null);

  const images = [
    { src: "/images/image1.jpg", alt: "Descripción de la imagen 1", sound: "/sounds/sound1.mp3" },
    { src: "/images/image2.jpg", alt: "Descripción de la imagen 2", sound: "/sounds/sound2.mp3" },
    { src: "/images/image3.jpg", alt: "Descripción de la imagen 3", sound: "/sounds/sound3.mp3" },
    { src: "/images/image4.jpg", alt: "Descripción de la imagen 4", sound: "/sounds/sound4.mp3" },
  ];

  const playSound = (soundPath) => {
    try {
      // Detener el audio anterior si existe
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      }

      // Crear y reproducir el nuevo audio
      const audio = new Audio(soundPath);
      currentAudioRef.current = audio;
      
      audio.play().catch(error => {
        console.error('Error al reproducir el sonido:', error);
      });

      // Limpiar la referencia cuando el audio termine
      audio.addEventListener('ended', () => {
        currentAudioRef.current = null;
      });
    } catch (error) {
      console.error('Error al crear el audio:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex justify-between items-center my-4 px-[5%]">
        <p className="font-black ">Conoce los sentidos</p>

        <Button href="/game">Iniciar</Button>
      </section>

      <section className="flex items-center px-[5%] flex-1 justify-between">
        {images.map((image, index) => (
          <article 
            key={index} 
            className="my-4 w-1/5 h-auto aspect-square mx-2 shadow-2xl rounded-2xl overflow-hidden active:scale-110 transition-all cursor-pointer hover:scale-105"
            onClick={() => playSound(image.sound)}
          >
            <Image src={image.src} alt={image.alt} width={400} height={400} className="w-full h-full object-cover rounded-2xl" />
          </article>
        ))}
      </section>
    </div>
  );
}
