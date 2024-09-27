import { useEffect } from 'react'
import { redirect, useParams } from 'react-router-dom';

import GameRoom from '../../components/GameRoom'

export default function SalaPage() {
  const { roomId } = useParams()

  if (!roomId) {
    throw redirect("/salas")
  }

  useEffect(() => {
    // Puedes realizar alguna acción al cargar la sala
    console.log(`Cargando la sala con ID: ${roomId}`);
  }, [roomId])

  return <GameRoom roomId={roomId} />
}

// Si necesitas usar esta página en un entorno donde obtienes el roomId dinámicamente,
// puedes implementar un componente contenedor o manejarlo desde un contexto global.
