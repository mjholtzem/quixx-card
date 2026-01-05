import { X } from "lucide-react";

export interface PenaltyToggleProps {
  toggleIndex: number;
  curPenaltyCount: number;
  setPenalityCount: React.Dispatch<React.SetStateAction<number>>;
}

function PenaltyToggle({ props }: { props: PenaltyToggleProps }) {
  function onClick() 
  {
    const toggleValue = props.toggleIndex + 1;
    props.setPenalityCount(prev =>{
        return prev >= toggleValue ? toggleValue - 1 : toggleValue;
    });
  }

  return (
    <button onClick={onClick} className="rounded-[8px] border-black bg-white hover:bg-neutral-300 border-2 h-15 w-15 flex items-center justify-center text-red-400">
      {props.toggleIndex + 1 <= props.curPenaltyCount && <X strokeWidth={3} />}
    </button>
  );
}

export default PenaltyToggle;
