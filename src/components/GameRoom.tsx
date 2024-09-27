import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Player {
  id: string;
  name: string;
  color: string;
  ready: boolean;
}

const colorOptions = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
  '#FF00FF', '#00FFFF', '#FFA500', '#800080'
]

export default function GameRoom({ roomId }: { roomId: string }) {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', color: '#FF0000', ready: false },
    { id: '2', name: 'Player 2', color: '#00FF00', ready: false },
    { id: '3', name: 'Player 3', color: '#0000FF', ready: false },
    { id: '4', name: 'Player 4', color: '#FFFF00', ready: false },
  ])
  const [countdown, setCountdown] = useState<number | null>(null)

  useEffect(() => {
    if (players.every(player => player.ready) && countdown === null) {
      setCountdown(5)
    }
  }, [players, countdown])

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      window.location.href = `/game/${roomId}`
    }
  }, [countdown, roomId])

  const toggleReady = (id: string) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, ready: !player.ready } : player
    ))
  }

  const changeColor = (id: string, newColor: string) => {
    if (players.some(player => player.color === newColor)) {
      alert("Este color ya está en uso. Por favor, elige otro.")
      return
    }
    setPlayers(players.map(player => 
      player.id === id ? { ...player, color: newColor } : player
    ))
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-purple-700 rounded-3xl relative shadow-2xl p-8">
        <h1 className="text-yellow-400 text-4xl font-bold mb-8 text-center">SALA DE JUEGO</h1>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          {players.map((player) => (
            <div key={player.id} className="bg-purple-800 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="w-12 h-12 mr-4 cursor-pointer">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48&color=${player.color.slice(1)}`} />
                      <AvatarFallback style={{backgroundColor: player.color}}></AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                          style={{ backgroundColor: color }}
                          onClick={() => changeColor(player.id, color)}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <div>
                  <h2 className="text-white text-xl font-semibold">{player.name}</h2>
                  <p className="text-purple-300">Color: {player.color}</p>
                </div>
              </div>
              <Button
                onClick={() => toggleReady(player.id)}
                className={`${player.ready ? 'bg-green-500' : 'bg-red-500'} text-white`}
              >
                {player.ready ? 'LISTO' : 'NO LISTO'}
              </Button>
            </div>
          ))}
        </div>
        
        {countdown !== null && (
          <div className="text-center">
            <p className="text-white text-2xl mb-4">El juego comenzará en:</p>
            <p className="text-yellow-400 text-6xl font-bold">{countdown}</p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button onClick={() => window.location.href = '/salas'} className="bg-red-500 hover:bg-red-600 text-white">
            ABANDONAR SALA
          </Button>
          <Button onClick={() => window.location.href = `/spectate/${roomId}`} className="bg-blue-500 hover:bg-blue-600 text-white">
            MODO ESPECTADOR
          </Button>
          <Button onClick={() => window.location.href = `/sala/${roomId}/settings`} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            AJUSTES DEL JUEGO
          </Button>
        </div>
      </div>
    </div>
  )
}
