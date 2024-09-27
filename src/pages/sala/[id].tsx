import { useEffect } from 'react'
import GameRoom from '../../components/GameRoom'

interface SalaPageProps {
  roomId: string;
}

export default function SalaPage({ roomId }: SalaPageProps) {
  useEffect(() => {
    // Puedes realizar alguna acción al cargar la sala
    console.log(`Cargando la sala con ID: ${roomId}`);
  }, [roomId])

  return <GameRoom roomId={roomId} />
}

// Si necesitas usar esta página en un entorno donde obtienes el roomId dinámicamente,
// puedes implementar un componente contenedor o manejarlo desde un contexto global.
