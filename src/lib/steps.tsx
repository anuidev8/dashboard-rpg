export const TOUR_ID = "dashboard-tour"
import {  Step } from 'react-joyride';
export const dashboardTourSteps = [
  {
    target: "#welcome-card",
    title: "Tablón de Dudas",
    content: "Aquí podrás ver todos los rangos disponibles y tu progreso en cada uno.",
    placement: "right" as const,
  },
  {
    target: "#stats-card",
    title: "Tabla de Clasificación",
    content: "Aquí puedes ver tu posición y la de otros aprendices en el ranking.",
    placement: "left" as const,
  },
  {
    target: "#challenges-section",
    title: "Desafíos de Aprendiz",
    content: "Completa estos desafíos para subir de rango y demostrar tus habilidades.",
    placement: "top" as const,
  },
  {
    target: "#restart-tour",
    title: "Tour Demo",
    content: "Puedes reiniciar este tour en cualquier momento haciendo clic aquí.",
    placement: "bottom" as const,
  }
]

export const homeTourSteps: Step[] = [
  {
    target: '#welcome-card',
    title: 'Explora los Rangos',
    content: 'Aquí puedes ver todos los rangos de la academia. Selecciona uno para ver sus desafíos y avanzar en tu camino como estratega.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '.second-element',
    title: 'Rango Seleccionado',
    content: 'Este panel muestra los detalles del rango que has seleccionado: su descripción, beneficios y requisitos.',
    placement: 'top',
  },
  {
    target: '#leaderboard-card',
    title: 'Tabla de Clasificación',
    content: 'Consulta a los mejores estrategas de la academia. Aquí verás cómo te posicionas frente a otros usuarios.',
    placement: 'left',
  },
  {
    target: '#challenges-section',
    title: 'Desafíos del Rango',
    content: 'Estos son los desafíos disponibles para tu rango actual. Completa desafíos para avanzar y ganar puntos.',
    placement: 'top',
  },
  {
    target: '#reto-card',
    title: 'Completar Reto',
    content: 'Aquí puedes iniciar un desafío del rango actual. Lee las instrucciones, realiza tu solución y envíala para ser evaluada.',
    placement: 'left',
  }
];

 // Definición de los pasos del tour
 export const HomeTourSteps: Step[] = [
  {
    target: "#welcome-cardd",
    title: "Inicio del Tour",
    content: "Este es tu acceso rápido al perfil y navegación general en la academia. Todo comienza aquí.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "#second-element",
    title: "Tu Rango Actual",
    content: "Aquí puedes consultar el rango que tienes actualmente, su descripción y beneficios.",
    placement: "bottom",
  },
  {
    target: "#leaderboard-cardd",
    title: "Rangos Disponibles",
    content: "Explora todos los rangos que puedes alcanzar en la academia. Cada uno tiene sus propios desafíos.",
    placement: "top",
  },
  {
    target: "#user-board",
    title: "Desafíos del Rango",
    content: "Estos son los desafíos asignados al rango que tienes seleccionado. ¡Atrévete a completarlos!",
    placement: "top",
  },
  {
    target: "#challenges-section",
    title: "Navegación Inferior",
    content: "Desde aquí puedes cambiar entre el tablero de rangos y el leaderboard general.",
    placement: "top",
  },
  {
    target: "#finish-tour",
    title: "¡Has completado el tour!",
    content: "Este es un resumen de tu progreso en la academia. Ya estás listo para comenzar a explorar y completar desafíos por tu cuenta.",
    placement: "center",
  },
  {
    target: "#challenge-submission-modal",
    title: "Envío de Desafío",
    content: "Elige el tipo de evidencia para tu solución:\n\n" +
             "📝 Texto: Explicación detallada\n" +
             "🖼️ Imágenes: JPG, PNG, GIF\n" +
             "🎥 Video: MP4\n" +
             "📄 Documento: PDF, DOC\n\n" +
             "Arrastra archivos o haz clic para seleccionarlos.",
    placement: "bottom",
     
  },
];

  // Definición de los pasos del tour
  export const MobileTourSteps: Step[] = [
    {
      target: "#welcome-cardd",
      title: "Inicio del Tour",
      content: "Este es tu acceso rápido al perfil y navegación general en la academia. Todo comienza aquí.",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: "#second-element",
      title: "Tu Rango Actual",
      content: "Aquí puedes consultar el rango que tienes actualmente, su descripción y beneficios.",
      placement: "bottom",
    },
    {
      target: "#leaderboard-cardd",
      title: "Rangos Disponibles",
      content: "Explora todos los rangos que puedes alcanzar en la academia. Cada uno tiene sus propios desafíos.",
      placement: "top",
    },
    {
      target: "#user-board",
      title: "Desafíos del Rango",
      content: "Estos son los desafíos asignados al rango que tienes seleccionado. ¡Atrévete a completarlos!",
      placement: "top",
    },
   
    
    {
      target: "#finish-tour",
      title: "¡Has completado el tour!",
      content: "Este es un resumen de tu progreso en la academia. Ya estás listo para comenzar a explorar y completar desafíos por tu cuenta.",
      placement: "center",
    }
  ];
  



export const challengeSubmissionTourSteps: Step[] = [
  {
    target: "#challenge-submission-modal",
    title: "Envío de Desafío",
    content: "Elige el tipo de evidencia para tu solución:\n\n" +
             "📝 Texto: Explicación detallada\n" +
             "🖼️ Imágenes: JPG, PNG, GIF\n" +
             "🎥 Video: MP4\n" +
             "📄 Documento: PDF, DOC\n\n" +
             "Arrastra archivos o haz clic para seleccionarlos.",
    placement: "bottom",
      disableBeacon: true,
  },
]