import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define ranks data
const ranksData = [
  { 
    name: 'Aprendiz', 
    icon: '/images/Pawn.jpg',
    video: '/videos/Pawn.mp4',
    title: 'Aprendiz del Marketing',
    description: 'Comienza tu viaje en el marketing digital.',
    isUltimate: false,
    avatar: '🧩'
  },
  { 
    name: 'Jinete', 
    icon: '/images/Knight.jpg',
    video: '/videos/Knight.mp4',
    title: 'Caballero Digital',
    description: 'Domina las tácticas básicas del marketing.',
    isUltimate: false,
    avatar: '🐎'
  },
  { 
    name: 'Torre', 
    icon: '/images/Tower.jpg',
    video: '/videos/Tower.mp4',
    title: 'Torre Inquebrantable',
    description: 'Establece una presencia sólida en el marketing digital.',
    isUltimate: false,
    avatar: '🏰'
  },
  { 
    name: 'Sabio', 
    icon: '/images/Bishop.jpg',
    video: '/videos/Bishop.mp4',
    title: 'Sabio del Marketing',
    description: 'Domina todas las facetas del marketing digital.',
    isUltimate: false,
    avatar: '🧙‍♂️'
  },
  { 
    name: 'Reina', 
    icon: '/images/Queen.jpg',
    video: '/videos/Queen.mp4',
    title: 'Reina Estratega',
    description: 'Domina todas las facetas del marketing digital.',
    isUltimate: false,
    avatar: '👸'
  },
  { 
    name: 'Rey', 
    icon: '/images/King.jpg',
    video: '/videos/King.mp4',
    title: 'Rey Maestro',
    description: 'La máxima autoridad en el arte del marketing digital.',
    isUltimate: true,
    avatar: '👑'
  }
];

// Datos iniciales de retos
const challengesData = [
  // RETOS DE APERTURA
  { 
    name: 'Abre tu cuenta de TikTok Business',
    description: 'Crea y configura tu cuenta profesional en TikTok Business para comenzar tu journey.',
    rules: 'Crea y configura tu cuenta profesional en TikTok Business para comenzar tu journey.',
    rankName: 'Aprendiz',
    order: 1,
    difficulty: 'Básico',
    xp: 300
  },
  { 
    name: 'Manten un consumo del contenido del 40%',
    description: 'Demuestra un engagement consistente con el contenido de la academia.',
    rules: 'Demuestra un engagement consistente con el contenido de la academia.',
    rankName: 'Aprendiz',
    order: 2,
    difficulty: 'Intermedio',
    xp: 400
  },
  { 
    name: 'Diseña el esquema de la sociedad de tu agencia',
    description: 'Crea y comparte con la comunidad el esquema organizacional de tu agencia.',
    rules: 'Crea y comparte con la comunidad el esquema organizacional de tu agencia.',
    rankName: 'Aprendiz',
    order: 3,
    difficulty: 'Intermedio',
    xp: 500
  },
  { 
    name: 'Crea 10 Reels de tu marca personal',
    description: 'Desarrolla y publica 10 Reels que fortalezcan tu marca personal.',
    rules: 'Desarrolla y publica 10 Reels que fortalezcan tu marca personal.',
    rankName: 'Aprendiz',
    order: 4,
    difficulty: 'Avanzado',
    xp: 600
  },
  { 
    name: 'Invierte',
    description: 'Realiza tu primera inversión en publicidad digital.',
    rules: 'Realiza tu primera inversión en publicidad digital.',
    rankName: 'Aprendiz',
    order: 5,
    difficulty: 'Intermedio',
    xp: 500
  },
  { 
    name: 'Crea 5 reels con tu avatar de IA',
    description: 'Integra la IA en tu contenido creando 5 Reels con tu avatar personalizado.',
    rules: 'Integra la IA en tu contenido creando 5 Reels con tu avatar personalizado.',
    rankName: 'Aprendiz',
    order: 6,
    difficulty: 'Avanzado',
    xp: 700
  },
  { 
    name: 'Mantente al dia con el pago de la Academia',
    description: 'Mantén tu membresía activa y al día con los pagos.',
    rules: 'Mantén tu membresía activa y al día con los pagos.',
    rankName: 'Aprendiz',
    order: 7,
    difficulty: 'Básico',
    xp: 200
  },
  { 
    name: 'Invierte tus primeros $300 USD en Google Ads',
    description: 'Realiza tu primera campaña en Google Ads con una inversión mínima de $300 USD.',
    rules: 'Realiza tu primera campaña en Google Ads con una inversión mínima de $300 USD.',
    rankName: 'Aprendiz',
    order: 8,
    difficulty: 'Experto',
    xp: 1000
  },

  // RETOS DE JINETE (TRAVESÍA)
  { 
    name: 'Invierte $500 USD en TikTok Ads',
    description: 'Escala tus campañas en TikTok con una inversión de $500 USD.',
    rules: 'Escala tus campañas en TikTok con una inversión de $500 USD.',
    rankName: 'Jinete',
    order: 1,
    difficulty: 'Avanzado',
    xp: 800
  },
  { 
    name: 'Manten un consumo del contenido del 80%',
    description: 'Demuestra un alto nivel de engagement con el contenido de la academia.',
    rules: 'Demuestra un alto nivel de engagement con el contenido de la academia.',
    rankName: 'Jinete',
    order: 2,
    difficulty: 'Intermedio',
    xp: 600
  },
  { 
    name: 'Desarrolla un funnel para un cliente que le genere $5.000 mínimo',
    description: 'Crea y optimiza un embudo de ventas que genere al menos $5.000 para un cliente.',
    rules: 'Crea y optimiza un embudo de ventas que genere al menos $5.000 para un cliente.',
    rankName: 'Jinete',
    order: 3,
    difficulty: 'Experto',
    xp: 1200
  },
  { 
    name: 'Crea 20 Reels de tu Marca Personal',
    description: 'Expande tu presencia digital con 20 Reels profesionales de tu marca.',
    rules: 'Expande tu presencia digital con 20 Reels profesionales de tu marca.',
    rankName: 'Jinete',
    order: 4,
    difficulty: 'Avanzado',
    xp: 900
  },
  { 
    name: 'Conectate a minimo el 80% de las actividades en vivo',
    description: 'Participa activamente en las sesiones en vivo de la academia.',
    rules: 'Participa activamente en las sesiones en vivo de la academia.',
    rankName: 'Jinete',
    order: 5,
    difficulty: 'Intermedio',
    xp: 500
  },
  { 
    name: 'Asiste al 90% de las juntas de agencia',
    description: 'Mantén una alta participación en las reuniones estratégicas de agencia.',
    rules: 'Mantén una alta participación en las reuniones estratégicas de agencia.',
    rankName: 'Jinete',
    order: 6,
    difficulty: 'Básico',
    xp: 400
  },
  { 
    name: 'Crea tu Primer Bot de servicio funcional',
    description: 'Desarrolla y prueba con la comunidad un bot de servicio al cliente.',
    rules: 'Desarrolla y prueba con la comunidad un bot de servicio al cliente.',
    rankName: 'Jinete',
    order: 7,
    difficulty: 'Experto',
    xp: 1000
  },
  { 
    name: 'Invierte un total de $1000 USD en Google Ads',
    description: 'Escala tus campañas en Google Ads hasta alcanzar una inversión de $1000 USD.',
    rules: 'Escala tus campañas en Google Ads hasta alcanzar una inversión de $1000 USD.',
    rankName: 'Jinete',
    order: 8,
    difficulty: 'Experto',
    xp: 1200
  }
]


const initialRankProgress = {
  Aprendiz: {
    rank: 'Aprendiz',
    completedChallenges: [],
    currentChallenge: 'On-Page SEO',
    progress: 0
  },
  Jinete: {
    rank: 'Jinete',
    completedChallenges: [],
    currentChallenge: null,
    progress: 0
  },
  Alfil: {
    rank: 'Alfil',
    completedChallenges: [],
    currentChallenge: null,
    progress: 0
  },
  Torre: {
    rank: 'Torre',
    completedChallenges: [],
    currentChallenge: null,
    progress: 0
  },
  Reina: {
    rank: 'Reina',
    completedChallenges: [],
    currentChallenge: null,
    progress: 0
  },
  Rey: {
    rank: 'Rey',
    completedChallenges: [],
    currentChallenge: null,
    progress: 0
  }
}

async function main() {
  try {
    // Clear existing data
    await prisma.challengeSubmission.deleteMany()
    await prisma.challenge.deleteMany()
    await prisma.progress.deleteMany()
    await prisma.user.deleteMany()
    await prisma.rank.deleteMany() // Delete existing ranks

    // Create ranks
    console.log('Creating ranks...')
    const rankMap: Record<string, string> = {}; // ✅ Define type explicitly

    for (const rankData of ranksData) {
      const rank = await prisma.rank.create({
        data: rankData
      });
      rankMap[rank.name] = rank.id; // ✅ TypeScript now understands this
    }
    
    console.log('Creating challenges...');
    for (const challenge of challengesData) {
      await prisma.challenge.create({
        data: {
          ...challenge,
          rankId: rankMap[challenge.rankName] // ✅ No more TS error
        }
      });
    }
    

    // Create test user
    console.log('Creating test user...')
    const user = await prisma.user.create({
      data: {
        id: 'test-user-1',
        name: 'Usuario de Prueba',
        email: 'test-user-1@example.com',
        progress: {
          create: {
            currentRank: 'Aprendiz',
            experience: 0,
            rankProgress: initialRankProgress
          }
        }
      }
    })

    console.log('Seed completed successfully')
    console.log('User created:', user)
  } catch (error) {
    console.error('Error during seed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })