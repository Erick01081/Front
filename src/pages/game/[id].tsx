import React from 'react';
import { useParams } from 'react-router-dom';
import TronGame from '../../components/TronGame';
import GameHUD from '../../components/GameHUD'; // Asegúrate de que la ruta sea correcta

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Sala {id}</h1>
      <GameHUD />
      <TronGame />
    </div>
  );
};

export default GamePage;
