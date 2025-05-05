import { Styles } from 'react-joyride';
import { MedievalSharp } from 'next/font/google';

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

export const joyrideStyles: Styles = {
  // Beacon styling
  beacon: {
    backgroundColor: 'transparent',
    borderRadius: '50%',
    height: '3rem',
    width: '3rem',
    boxShadow: '0 0 15px rgba(201,163,86,0.5)',
  },
  beaconInner: {
    backgroundColor: '#C9A356',
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: medievalSharp.className,
  },
  beaconOuter: {
    border: '2px solid #C9A356',
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
    opacity: 0.75,
  },
  
  // Button styling
  buttonBack: {
    color: '#C9A356',
    border: '1px solid #C9A356',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s',
    fontFamily: medievalSharp.className,
  },
  buttonNext: {
    color: '#1A1A1D',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    backgroundColor: '#C9A356',
    transition: 'background-color 0.3s',
    fontFamily: medievalSharp.className,
  },
  buttonClose: {
    color: '#9CA3AF',
    transition: 'color 0.3s',
    fontFamily: medievalSharp.className,
  },
  buttonSkip: {
    color: '#C9A356',
    border: '1px solid #C9A356',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s',
    fontFamily: medievalSharp.className,
  },
  
  // Tooltip styling
  tooltip: {
    backgroundColor: 'rgba(26, 26, 29, 0.9)',
    border: '2px solid #C9A356',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 0 15px rgba(201,163,86,0.2)',
    backdropFilter: 'blur(4px)',
    backgroundImage: "url('/images/obj/paper-texture.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
  },
  tooltipContainer: {
    position: 'relative',
  },
  tooltipContent: {
    position: 'relative',
    zIndex: 10,
  },
  tooltipTitle: {
    color: '#C9A356',
    fontSize: '1.125rem',
    marginBottom: '0.5rem',
    fontFamily: medievalSharp.className,
  },
  tooltipFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  tooltipFooterSpacer: {
    flex: 1,
  },
  
  // Spotlight styling
  spotlight: {
    backgroundColor: 'transparent',
    borderRadius: '0.5rem',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8)',
    border: '2px solid #C9A356',
    boxSizing: 'border-box',
  },
  
  // Overlay styling
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(2px)',
  },
  
  // Options
  options: {
    arrowColor: '#C9A356',
    backgroundColor: 'rgba(26, 26, 29, 0.9)',
    primaryColor: '#C9A356',
    textColor: '#E5E7EB',
    zIndex: 10000,
  },
  overlayLegacy: {},
  overlayLegacyCenter: {},
  spotlightLegacy: {},
}; 