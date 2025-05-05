import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useCustomTour } from "./tour-provider";

export function CustomTooltip() {
  const { currentStep, step, nextStep, endTour } = useCustomTour();
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (step?.selector) {
        const el = document.querySelector(step.selector);
        if (el) {
          const rect = el.getBoundingClientRect();
          console.log(rect)
          console.log(el)
          const tooltipHeight = 100; // Approximate height of tooltip
          const tooltipOffset = 20; // Space between tooltip and element

          setPosition({
            top: rect.top + window.scrollY - tooltipHeight - tooltipOffset,
            left: rect.left + window.scrollX + (rect.width / 2),
          });

          // Smooth scroll to element
          el.scrollIntoView({ 
            behavior: "smooth", 
            block: "center"
          });
        }
      }
    };

    // Initial position update
    updatePosition();

    // Update position when window is resized or scrolled
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [step]);

  if (currentStep === null || !position || !step) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed bg-white text-black p-4 rounded-lg shadow-lg z-[9999] transition-all w-[300px]"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
        transform: 'translate(-50%, 0)'  // Only center horizontally
      }}
    >
      <div className="mb-3">{step.content}</div>
      <div className="flex justify-end gap-2">
        <button 
          onClick={endTour} 
          className="px-3 py-1 text-sm rounded hover:bg-red-50 text-red-600"
        >
          Skip
        </button>
        <button 
          onClick={nextStep} 
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {currentStep === 3 ? "Finish" : "Next"}
        </button>
      </div>
    </div>,
    document.body
  );
}
