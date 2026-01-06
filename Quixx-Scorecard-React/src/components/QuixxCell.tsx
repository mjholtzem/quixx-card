import { CircleCheck } from "lucide-react";
import type { CellData } from "../models/CellData";
import { RowData } from "../models/RowData";

interface QuixxCellProps {
  rowDatas: RowData[];
  rowIndex: number;
  cellIndex: number;
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
}

function QuixxCell({ rowDatas, rowIndex, cellIndex, setData }: QuixxCellProps) {
  const row = rowDatas[rowIndex];
  const cell: CellData = row.cells[cellIndex];
  const disabled: boolean =
    !cell.isSelected &&
    (row.rowLocked ||
      row.cells.some((cellItem, c) => c > cellIndex && cellItem.isSelected) ||
      (cellIndex == row.cells.length - 1 &&
        row.cells.filter((cellItem) => cellItem.isSelected).length < 5));

  function onClick() {
    setData((prev) => {
      return prev.map((row, r) => {
        if (r != rowIndex) return row;

        return new RowData(
          row.cells.map((cell, c) => {
            if (c != cellIndex) return cell;
            return { ...cell, isSelected: !cell.isSelected };
          }),
          row.rowColor,
          row.cellColor,
          row.rowLocked
        );
      });
    });
  }

  return (
    <button
      className={`group rounded-md lg:rounded-xl ${
        row.cellColor
      } enabled:hover:brightness-50 flex-1 flex items-center justify-center ${
        disabled && "opacity-50"
      } transition-all  @container`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={`font-black text-[8cqh] text-gray-200`}>
        {cell.isSelected ? (
          <CircleCheck strokeWidth={3} size="1.5em" />
        ) : (
          cell.value
        )}
      </p>
    </button>
  );
}

export default QuixxCell;
