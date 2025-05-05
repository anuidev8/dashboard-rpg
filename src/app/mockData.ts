import { Rank, LeaderboardEntry } from '@/types'

export const ranks: Rank[] = [
    { 
        name: 'Aprendiz', 
        icon: '/images/Pawn.jpg',
        video: '/videos/Pawn.mp4',
        title: 'Aprendiz del Marketing',
        description: 'Comienza tu viaje en el marketing digital.',
        challenges: [
            'Fundamentos 1', 'Fundamentos 2', 'Fundamentos 3', 'Fundamentos 4',
            'Fundamentos 5', 'Fundamentos 6', 'Fundamentos 7', 'Fundamentos 8'
        ],
        isUltimate: false
    },
    { 
        name: 'Jinete', 
        icon: '/images/Knight.jpg',
        video: '/videos/Knight.mp4',
        title: 'Caballero Digital',
        description: 'Domina las tácticas básicas del marketing.',
        challenges: [
            'Táctica 1', 'Táctica 2', 'Táctica 3', 'Táctica 4',
            'Táctica 5', 'Táctica 6', 'Táctica 7', 'Táctica 8'
        ],
        isUltimate: false
    },
    { 
        name: 'Torre', 
        icon: '/images/Tower.jpg',
        video: '/videos/Tower.mp4',
        title: 'Torre Inquebrantable',
        description: 'Establece una presencia sólida en el marketing digital.',
        challenges: [
            'Escudo 1', 'Escudo 2', 'Escudo 3', 'Escudo 4',
            'Escudo 5', 'Escudo 6', 'Escudo 7', 'Escudo 8'
        ],
        isUltimate: false
    },
    { 
        name: 'Sabio', 
        icon: '/images/Bishop.jpg',
        video: '/videos/Bishop.mp4',
        title: 'Sabio del Marketing',
        description: 'Domina todas las facetas del marketing digital.',
        challenges: [
            'Conquista 1', 'Conquista 2', 'Conquista 3', 'Conquista 4',
            'Conquista 5', 'Conquista 6', 'Conquista 7', 'Conquista 8'
        ],
        isUltimate: false
    },

    { 
        name: 'Reina', 
        icon: '/images/Queen.jpg',
        video: '/videos/Queen.mp4',
        title: 'Reina Estratega',
        description: 'Domina todas las facetas del marketing digital.',
        challenges: [
            'Conquista 1', 'Conquista 2', 'Conquista 3', 'Conquista 4',
            'Conquista 5', 'Conquista 6', 'Conquista 7', 'Conquista 8'
        ],
        isUltimate: false
    },
    { 
        name: 'Rey', 
        icon: '/images/King.jpg',
        video: '/videos/King.mp4',
        title: 'Rey Maestro',
        description: 'La máxima autoridad en el arte del marketing digital.',
        challenges: [
            'Maestría Total 1',
            'Maestría Total 2',
            'Maestría Total 3',
            'Maestría Total 4'
        ],
        isUltimate: true
    }
];

export const leaderboard: LeaderboardEntry[] = [
    { name: 'Ana G.', score: 1000, rank: 'Divino', avatar: '👩‍🚀' },
    { name: 'Juan M.', score: 950, rank: 'Supremo', avatar: '🧙‍♂️' },
    { name: 'Carlos R.', score: 900, rank: 'Real', avatar: '🤴' },
    { name: 'María S.', score: 850, rank: 'Jinete', avatar: '🦹‍♀️' },
    { name: 'Pedro L.', score: 800, rank: 'Real', avatar: '🧝‍♂️' },
    { name: 'Laura B.', score: 750, rank: 'Supremo', avatar: '🧚‍♀️' },
    { name: 'Diego M.', score: 700, rank: 'Jinete', avatar: '🦸‍♂️' },
    { name: 'Sofia P.', score: 650, rank: 'Aprendiz', avatar: '👩‍🎓' },
    { name: 'Lucas G.', score: 600, rank: 'Real', avatar: '🧙‍♂️' },
    { name: 'Isabel R.', score: 550, rank: 'Divino', avatar: '👸' }
]

interface Challenge {
  id: string;
  name: string;
  insignia: string;
  description: string;
  difficulty: string;
  xp: number;
  rankName?: string;
}

export const challenges: Challenge[] = [
  {
    id: "1",
    name: "Desafío 1",
    insignia: "/path/to/insignia.png",
    description: "Descripción del desafío",
    difficulty: "Fácil",
    xp: 100,
    rankName: "Aprendiz"
  },
  // ... más desafíos
];

export const userProgress = {
    currentRank: 'Jinete',
    totalPoints: 750,
    progressPercentage: 75
}
