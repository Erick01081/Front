import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    musicVolume: 50,
    soundEffectsVolume: 75,
    language: 'es',
    darkMode: true,
    showFPS: false,
    graphicsQuality: 'high',
  })

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar la configuración
    alert("Configuración guardada.");
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-white text-lg mb-2 block">Volumen de Música</label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[settings.musicVolume]}
          onValueChange={(value) => updateSetting('musicVolume', value[0])}
          className="w-full"
        />
        <p className="text-purple-300 mt-2">Volumen: {settings.musicVolume}%</p>
      </div>

      <div>
        <label className="text-white text-lg mb-2 block">Volumen de Efectos de Sonido</label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[settings.soundEffectsVolume]}
          onValueChange={(value) => updateSetting('soundEffectsVolume', value[0])}
          className="w-full"
        />
        <p className="text-purple-300 mt-2">Volumen: {settings.soundEffectsVolume}%</p>
      </div>

      <div>
        <label className="text-white text-lg mb-2 block">Idioma</label>
        <Select 
          value={settings.language} 
          onValueChange={(value) => updateSetting('language', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-white text-lg">Modo Oscuro</label>
        <Switch
          checked={settings.darkMode}
          onCheckedChange={(checked) => updateSetting('darkMode', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-white text-lg">Mostrar FPS</label>
        <Switch
          checked={settings.showFPS}
          onCheckedChange={(checked) => updateSetting('showFPS', checked)}
        />
      </div>

      <div>
        <label className="text-white text-lg mb-2 block">Calidad Gráfica</label>
        <Select 
          value={settings.graphicsQuality} 
          onValueChange={(value) => updateSetting('graphicsQuality', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona la calidad gráfica" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baja</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
          GUARDAR CONFIGURACIÓN
        </Button>
      </div>
    </div>
  )
}
