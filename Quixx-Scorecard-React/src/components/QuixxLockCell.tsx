import { CircleCheck, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { RowData } from "../models/RowData";

interface QuixxLockCellProps {
  rowDatas: RowData[];
  rowIndex: number;
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
}

function QuixxLockCell({ rowDatas, rowIndex, setData }: QuixxLockCellProps) {
  const row = rowDatas[rowIndex];
  const lastCellChecked = row.cells[row.cells.length - 1].isSelected;
  const locked: boolean = row.rowLocked || lastCellChecked;
  const disabled: boolean = lastCellChecked;

  function onClick() {
    setData((prev) => {
      return prev.map((prevRow, r) => {
        if (r != rowIndex) return prevRow;

        return new RowData(
          prevRow.cells,
          prevRow.rowColor,
          prevRow.cellColor,
          !prevRow.rowLocked
        );
      });
    });
  }

  function icon() {
    const iconStyle = "text-gray-200 group-hover-enabled:text-black";
    const size = "50cqw"
    if (lastCellChecked)
      return <CircleCheck className={iconStyle} strokeWidth={3} size={size} />;
    else if (locked) return <LockKeyhole className={iconStyle} size={size}/>;
    return <LockKeyholeOpen className={iconStyle} size={size}/>;
  }

  return (
    <button
      disabled={disabled}
      className={`@container group rounded-full ${row.cellColor} flex-1 flex items-center justify-center enabled:hover:brightness-50 transition-all`}
      onClick={onClick}
    >
      {icon()}
    </button>
  );
}

export default QuixxLockCell;
