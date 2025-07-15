"use client";
import Button from "@/components/button";
import Header from "@/components/header";
import { useState, useRef, useEffect } from "react";

export default function Game() {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSound, setCurrentSound] = useState(null);
  const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'waiting', 'answered', 'finished'
  const [feedback, setFeedback] = useState({ show: false, correct: false, side: null });
  const [score, setScore] = useState(0);
  const audioRef = useRef(null);

  // Sonidos originales (los mismos de la página train)
  const sounds = [
    { id: 1, path: "/sounds/sound1.mp3" },
    { id: 2, path: "/sounds/sound2.mp3" },
    { id: 3, path: "/sounds/sound3.mp3" },
    { id: 4, path: "/sounds/sound4.mp3" }
  ];

  // Generar secuencia de sonidos para las 6 rondas con mejor distribución
  const generateGameSequence = () => {
    const sequence = [];

    // Crear array balanceado de lados (3 izquierda, 3 derecha)
    const sides = ['left', 'left', 'left', 'right', 'right', 'right'];

    // Mezclar el array de lados para evitar patrones
    for (let i = sides.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sides[i], sides[j]] = [sides[j], sides[i]];
    }

    // Verificar que no haya más de 2 del mismo lado consecutivos y ajustar si es necesario
    for (let i = 0; i < sides.length - 2; i++) {
      if (sides[i] === sides[i + 1] && sides[i + 1] === sides[i + 2]) {
        // Si hay 3 consecutivos, intercambiar el tercero con otro
        for (let j = i + 3; j < sides.length; j++) {
          if (sides[j] !== sides[i]) {
            [sides[i + 2], sides[j]] = [sides[j], sides[i + 2]];
            break;
          }
        }
      }
    }

    // Primeras 5 rondas: sonidos 1-3 aleatorios con los lados balanceados
    for (let i = 0; i < 5; i++) {
      const soundIndex = Math.floor(Math.random() * 3); // 0, 1, 2 (sonidos 1, 2, 3)
      sequence.push({ soundIndex, side: sides[i] });
    }

    // Última ronda: sonido 4 con el último lado
    sequence.push({ soundIndex: 3, side: sides[5] }); // índice 3 = sonido 4

    return sequence;
  };

  const [gameSequence] = useState(() => generateGameSequence());

  const playCurrentSound = () => {
    if (currentRound > 6) return;

    const currentGame = gameSequence[currentRound - 1];
    const sound = sounds[currentGame.soundIndex];

    setCurrentSound({ ...currentGame, correctSide: currentGame.side });
    setGameState('playing');
    setFeedback({ show: false, correct: false, side: null });

    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(sound.path);
      audioRef.current = audio;

      // Crear contexto de audio para controlar el panning (izquierda/derecha)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      const panner = audioContext.createStereoPanner();

      // Configurar el panning: -1 = izquierda, 1 = derecha
      panner.pan.value = currentGame.side === 'left' ? -1 : 1;

      // Conectar: source -> panner -> destino
      source.connect(panner);
      panner.connect(audioContext.destination);

      audio.play().catch(error => {
        console.error('Error al reproducir el sonido:', error);
      });

      audio.addEventListener('ended', () => {
        setGameState('waiting');
        // Limpiar el contexto de audio
        audioContext.close();
      });
    } catch (error) {
      console.error('Error al crear el audio:', error);
    }
  };

  const startNextRound = () => {
    playCurrentSound();
  };

  const handleSideClick = (clickedSide) => {
    if (gameState !== 'waiting' || !currentSound) return;

    const isCorrect = clickedSide === currentSound.correctSide;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setFeedback({
      show: true,
      correct: isCorrect,
      side: clickedSide
    });
    setGameState('answered');

    // Pasar a la siguiente ronda después de 2 segundos
    setTimeout(() => {
      if (currentRound < 6) {
        setCurrentRound(prev => prev + 1);
        setFeedback({ show: false, correct: false, side: null });
        // Auto-reproducir el siguiente sonido después de 1 segundo (solo después de la primera ronda)
        setTimeout(() => {
          playCurrentSound();
        }, 1000);
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentRound(1);
    setCurrentSound(null);
    setGameState('ready');
    setFeedback({ show: false, correct: false, side: null });
    setScore(0);
    // Regenerar secuencia
    window.location.reload();
  };

  // Remover el useEffect de auto-inicio

  const getArticleClasses = (side) => {
    let baseClasses = "w-1/2 flex-1 cursor-pointer transition-all duration-300 flex items-center justify-center text-white font-bold text-2xl";

    if (side === 'left') {
      baseClasses += " rounded-l-2xl";
    } else {
      baseClasses += " rounded-r-2xl";
    }

    // Solo mostrar colores durante el feedback
    if (feedback.show && feedback.side === side) {
      // El artículo que fue presionado
      if (feedback.correct) {
        baseClasses += " bg-green-600 scale-105";
      } else {
        baseClasses += " bg-red-600 scale-105";
      }
    } else {
      // Color gris por defecto para todos los demás casos
      baseClasses += " bg-gray-400 hover:bg-gray-500 active:bg-gray-500";
    }

    return baseClasses;
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <section className="flex justify-between items-center my-4 px-[5%]">
        <Button href="/train">Volver</Button>

        {/* Botón para reproducir sonido solo en la primera ronda */}
        {gameState === 'ready' && currentRound === 1 && (
          <section className="flex justify-center items-center my-4 w-1/3">
            <button
              onClick={startNextRound}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-bold"
            >
              🔊 Reproducir Sonido
            </button>
          </section>
        )}

        <div className="text-center w-1/3">
          <p className="font-black">Toca el lugar donde escuchas el sonido</p>
          <p className="text-sm mt-1">
            Ronda {currentRound}/6 | Puntaje: {score}/6
          </p>
        </div>

        {gameState === 'finished' && (
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reiniciar
          </button>
        )}
      </section>

      <section className="flex px-[5%] pb-[5%] justify-between flex-1 min-h-0">
        <article
          className={getArticleClasses('left')}
          onClick={() => handleSideClick('left')}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">👈</div>
            <div>IZQUIERDA</div>
          </div>
        </article>

        <article
          className={getArticleClasses('right')}
          onClick={() => handleSideClick('right')}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">👉</div>
            <div>DERECHA</div>
          </div>
        </article>
      </section>

      {gameState === 'finished' && (
        <div className="absolute h-screen inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">¡Juego Terminado!</h2>
            <p className="text-xl mb-4">
              Tu puntaje: {score}/6 ({Math.round((score / 6) * 100)}%)
            </p>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold">
          🔊 Escuchando...
        </div>
      )}
    </div>
  );
}
