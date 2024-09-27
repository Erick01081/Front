import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Room {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Sala 1', players: 2, maxPlayers: 4 },
    { id: '2', name: 'Sala 2', players: 1, maxPlayers: 4 },
    { id: '3', name: 'Sala 3', players: 3, maxPlayers: 4 },
    { id: '4', name: 'Sala 4', players: 4, maxPlayers: 4 },
  ])

  const joinRoom = (roomId: string) => {
    window.location.href = `/sala/${roomId}`
  }

  const handleBackToMenu = () => {
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-purple-700 rounded-3xl relative shadow-2xl p-8">
        <h1 className="text-yellow-400 text-4xl font-bold mb-8 text-center">SALAS DISPONIBLES</h1>
        
        <div className="mb-6">
          <Input 
            type="text" 
            placeholder="Buscar sala..." 
            className="w-full bg-purple-600 text-white placeholder-purple-300 border-none"
          />
        </div>

        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="bg-purple-800 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h2 className="text-yellow-300 text-xl font-semibold">{room.name}</h2>
                <p className="text-purple-300">Jugadores: {room.players}/{room.maxPlayers}</p>
              </div>
              <Button 
                onClick={() => joinRoom(room.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={room.players === room.maxPlayers}
              >
                {room.players === room.maxPlayers ? 'LLENA' : 'UNIRSE'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button 
            onClick={handleBackToMenu}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            VOLVER AL MENÚ
          </Button>
          <Button onClick={() => window.location.href = '/crear-sala'} className="bg-green-500 hover:bg-green-600 text-white">
            CREAR SALA
          </Button>
        </div>
      </div>
    </div>
  )
}
