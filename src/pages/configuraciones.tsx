import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GameSettings from '../components/GameSettings'
import GeneralSettings from '../components/GeneralSettings'

export default function ConfiguracionesPage() {
  const handleBackToMenu = () => {
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-purple-700 rounded-3xl relative shadow-2xl p-8">
        <h1 className="text-yellow-400 text-4xl font-bold mb-8 text-center">CONFIGURACIONES</h1>
        
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="game">Juego</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          <TabsContent value="game">
            <GameSettings />
          </TabsContent>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleBackToMenu} className="bg-blue-500 hover:bg-blue-600 text-white">
            VOLVER AL MENÚ PRINCIPAL
          </Button>
        </div>
      </div>
    </div>
  )
}
