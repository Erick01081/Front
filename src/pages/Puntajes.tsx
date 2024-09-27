import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award } from 'lucide-react'

interface Score {
  rank: number;
  username: string;
  score: number;
  date: string;
}

export default function Puntajes() {
  const [scores, setScores] = useState<Score[]>([
    { rank: 1, username: "TronMaster", score: 9999, date: "2024-03-15" },
    { rank: 2, username: "LightCycle", score: 9500, date: "2024-03-14" },
    { rank: 3, username: "GridRunner", score: 9000, date: "2024-03-13" },
    { rank: 4, username: "DiscThrower", score: 8500, date: "2024-03-12" },
    { rank: 5, username: "BitWarrior", score: 8000, date: "2024-03-11" },
    { rank: 6, username: "PixelPilot", score: 7500, date: "2024-03-10" },
    { rank: 7, username: "NeonRider", score: 7000, date: "2024-03-09" },
    { rank: 8, username: "DataStream", score: 6500, date: "2024-03-08" },
    { rank: 9, username: "SyncWave", score: 6000, date: "2024-03-07" },
    { rank: 10, username: "ByteBlazer", score: 5500, date: "2024-03-06" },
  ])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-yellow-600" />;
      default:
        return null;
    }
  }

  const handleBackToMenu = () => {
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-purple-700 rounded-3xl relative shadow-2xl p-8">
        <h1 className="text-yellow-400 text-4xl font-bold mb-8 text-center">TABLA DE PUNTAJES</h1>
        
        <div className="space-y-4 mb-8">
          {scores.map((score) => (
            <div key={score.rank} className="bg-purple-800 rounded-lg p-4 flex items-center">
              <div className="w-8 text-2xl font-bold text-yellow-300 flex items-center justify-center">
                {getRankIcon(score.rank) || score.rank}
              </div>
              <div className="flex-grow ml-4">
                <h2 className="text-yellow-300 text-xl font-semibold">{score.username}</h2>
                <p className="text-purple-300 text-sm">{score.date}</p>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {score.score.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={handleBackToMenu} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 text-lg">
            VOLVER AL MENÚ
          </Button>
        </div>
      </div>
    </div>
  )
}
