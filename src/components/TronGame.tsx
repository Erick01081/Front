import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Player {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  turbos: number;
  jumps: number;
  trail: { x: number, y: number }[];
}

const TronGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', color: '#FF0000', x: 10, y: 10, direction: 'right', turbos: 3, jumps: 3, trail: [] },
    { id: '2', name: 'Player 2', color: '#00FF00', x: 20, y: 20, direction: 'down', turbos: 3, jumps: 3, trail: [] },
    { id: '3', name: 'Player 3', color: '#0000FF', x: 15, y: 15, direction: 'right', turbos: 3, jumps: 3, trail: [] },
    { id: '4', name: 'Player 4', color: '#FFFF00', x: 25, y: 25, direction: 'up', turbos: 3, jumps: 3, trail: [] }
  ]);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('playing');
  const [timeLeft, setTimeLeft] = useState(180);
  const [collisionMessage, setCollisionMessage] = useState<string | null>(null);
  const [motorcyclePosition, setMotorcyclePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('gameState', (state: { players: Player[], gameState: 'waiting' | 'playing' | 'finished', timeLeft: number }) => {
      setPlayers(state.players);
      setGameState(state.gameState);
      setTimeLeft(state.timeLeft);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!socketRef.current) return;

      switch (e.key) {
        case 'ArrowUp':
          socketRef.current.emit('move', 'up');
          break;
        case 'ArrowDown':
          socketRef.current.emit('move', 'down');
          break;
        case 'ArrowLeft':
          socketRef.current.emit('move', 'left');
          break;
        case 'ArrowRight':
          socketRef.current.emit('move', 'right');
          break;
        case 'Shift':
          socketRef.current.emit('turbo');
          break;
        case ' ':
          socketRef.current.emit('jump');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar el tamaño del canvas al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dynamicCellSize = Math.min(canvas.width / 100, canvas.height / 100);
    const CELL_SIZE = dynamicCellSize;

    // Limpiar el canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar estelas y jugadores activos
    players.forEach(player => {
      if (player) { // Asegurarse de que el jugador está definido
        // Dibujar la estela del jugador
        ctx.fillStyle = player.color;
        player.trail.forEach(segment => {
          ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });

        // Dibujar el jugador actual
        ctx.fillRect(player.x * CELL_SIZE, player.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    });

    // Dibujar la moto
    ctx.fillStyle = 'yellow'; // Cambiar color de la moto si se desea
    ctx.fillRect(motorcyclePosition.x * CELL_SIZE, motorcyclePosition.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }, [players, motorcyclePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prevPlayers => {
        const newPlayers = [...prevPlayers];
        newPlayers.forEach(player => {
          let newX = player.x;
          let newY = player.y;

          switch (player.direction) {
            case 'up':
              newY = Math.max(0, player.y - 1);
              break;
            case 'down':
              newY = Math.min(99, player.y + 1);
              break;
            case 'left':
              newX = Math.max(0, player.x - 1);
              break;
            case 'right':
              newX = Math.min(99, player.x + 1);
              break;
          }

          // Verificar colisiones con estelas (incluida la propia)
          const hasCollision = newPlayers.some(p =>
            p.trail.some(segment => segment.x === newX && segment.y === newY) ||
            (p.x === newX && p.y === newY)
          );

          if (!hasCollision) {
            player.trail.push({ x: player.x, y: player.y });
            player.x = newX;
            player.y = newY;
          } else {
            // Mostrar mensaje de colisión y eliminar al jugador
            setCollisionMessage(`${player.name} ha chocado contra una estela`);
            newPlayers.splice(newPlayers.indexOf(player), 1);
            
            // Limpiar estela al eliminar el jugador
            player.trail = []; // Limpiar estela al eliminar el jugador
          }
        });

        return newPlayers.filter(p => p); // Filtrar jugadores activos
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Añadir lógica para mover la moto y verificar colisión con el jugador 3
  useEffect(() => {
    const motorcycleInterval = setInterval(() => {
      setMotorcyclePosition(prevPosition => {
        let newX = prevPosition.x + 1; // Mover a la derecha, puedes cambiar la lógica si es necesario
        if (newX >= 100) newX = 0; // Reiniciar la posición si sale del canvas
        return { x: newX, y: Math.floor(Math.random() * 100) }; // Mover verticalmente aleatoriamente
      });

      // Verificar colisión de la moto con el jugador 3
      const player3 = players.find(player => player.id === '3');
      if (player3 && motorcyclePosition.x === player3.x && motorcyclePosition.y === player3.y) {
        setCollisionMessage(`${player3.name} ha sido atropellado por la moto`);
        setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== '3')); // Eliminar jugador 3
      }
    }, 200);

    return () => clearInterval(motorcycleInterval);
  }, [motorcyclePosition, players]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black relative">
      <div className="absolute top-4 left-4 flex space-x-4 text-white">
        {players.map((player) => (
          <div key={player.id} className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: player.color }}></div>
            <span className="font-bold">{player.name}</span>
            <span className="text-yellow-400">T:{player.turbos}</span>
            <span className="text-blue-400">J:{player.jumps}</span>
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} className="border-2 border-white" />
      <div className="absolute top-4 right-4 text-white">
        <Progress value={timeLeft} max={180} />
        <div>{formatTime(timeLeft)}</div>
      </div>
      {gameState === 'finished' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl">
          ¡Juego Terminado!
        </div>
      )}
      {collisionMessage && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-red-500">
          {collisionMessage}
        </div>
      )}
      <Button className="absolute bottom-10 right-10" onClick={() => { /* lógica para reiniciar juego */ }}>
        Reiniciar Juego
      </Button>
    </div>
  );
};

export default TronGame;
  