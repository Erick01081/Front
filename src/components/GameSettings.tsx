import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useParams } from 'react-router-dom'

export default function GameSettings() {
  const {roomId} = useParams()
  const [settings, setSettings] = useState({
    gameMode: '2v2',
    maxJumps: 3,
    turboEnabled: true,
    obstaclesEnabled: true,
    gameSpeed: 1,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Aquí puedes agregar lógica para guardar la configuración si es necesario.
    // Luego redirigir a la sala de juego.
    window.location.href = `/sala/${roomId}`; // Asegúrate de que esta ruta sea correcta
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-purple-700 rounded-3xl shadow-2xl p-8">
        <h1 className="text-yellow-400 text-4xl font-bold mb-8 text-center">AJUSTES DEL JUEGO</h1>

        <div className="space-y-6">
          <div>
            <label className="text-white text-lg mb-2 block">Modo de Juego</label>
            <Select 
              value={settings.gameMode} 
              onValueChange={(value) => updateSetting('gameMode', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el modo de juego" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2v2">2 vs 2</SelectItem>
                <SelectItem value="ffa">Todos contra Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white text-lg mb-2 block">Máximo de Saltos</label>
            <Slider
              min={0}
              max={5}
              step={1}
              value={[settings.maxJumps]}
              onValueChange={(value) => updateSetting('maxJumps', value[0])}
              className="w-full"
            />
            <p className="text-purple-300 mt-2">Saltos permitidos: {settings.maxJumps}</p>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white text-lg">Turbos Habilitados</label>
            <Switch
              checked={settings.turboEnabled}
              onCheckedChange={(checked) => updateSetting('turboEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white text-lg">Obstáculos Habilitados</label>
            <Switch
              checked={settings.obstaclesEnabled}
              onCheckedChange={(checked) => updateSetting('obstaclesEnabled', checked)}
            />
          </div>

          <div>
            <label className="text-white text-lg mb-2 block">Velocidad del Juego</label>
            <Slider
              min={0.5}
              max={2}
              step={0.1}
              value={[settings.gameSpeed]}
              onValueChange={(value) => updateSetting('gameSpeed', value[0])}
              className="w-full"
            />
            <p className="text-purple-300 mt-2">Velocidad: x{settings.gameSpeed.toFixed(1)}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
            GUARDAR CONFIGURACIÓN
          </Button>
        </div>
      </div>
    </div>
  )
}
