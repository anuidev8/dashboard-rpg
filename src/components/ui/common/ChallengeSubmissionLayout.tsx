
import ChallengeSubmissionModal from "./ChallengeSubmissionModal"

import { Dialog, DialogContent } from "../dialog"
import { useSubmissionContext } from "@/contexts/SubmissionContext"

export const ChallengeSubmissionLayout = () => {
    const {  setModalOpen, setSelectedChallenge,} = useSubmissionContext();
  /*   const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [runTour, setRunTour] = useState(false);
    const [tourStepIndex, setTourStepIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLayoutReady(true);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);
    useEffect(() => {
        if (isLayoutReady && !localStorage.getItem('tour-guided-submission')) {
          setRunTour(true);
          setTourStepIndex(0);
        }
      }, [isLayoutReady]);

      const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, type } = data;
    
        if (type === 'tour:end' || action === 'skip') {
          setRunTour(false);
          localStorage.setItem('tour-guided-submission', 'true');
        } else if (type === 'step:after' && action === 'next') {
          setTourStepIndex(index + 1);
        }
      }; */
  return (
     <Dialog open={true} onOpenChange={() => {
        setModalOpen(false);
        setSelectedChallenge(null);
    }}>
      <DialogContent className="p-0 overflow-hidden max-w-4xl bg-transparent border-0 fixed top-[10%] left-1/2 -translate-x-1/2 w-[95vw] md:w-full max-h-[90vh] overflow-y-auto">
      <ChallengeSubmissionModal />
      </DialogContent>

       {/* Componente Joyride */}
       
    </Dialog>
  )
}