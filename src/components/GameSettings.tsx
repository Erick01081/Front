import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GameSettings() {
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

  return (
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

      <div className="mt-8 flex justify-end">
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          GUARDAR CONFIGURACIÓN
        </Button>
      </div>
    </div>
  )
}