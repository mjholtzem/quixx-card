import type { CellData } from "./CellData";

export class RowData {
  cells: CellData[];
  rowColor: string;
  cellColor: string;
  rowLocked: boolean;

  private static scoreLookup: number[] = [
    0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78,
  ];

  constructor(
    cells: CellData[],
    rowColor: string,
    cellColor: string,
    rowLocked: boolean
  ) {
    this.cells = cells;
    this.rowColor = rowColor;
    this.cellColor = cellColor;
    this.rowLocked = rowLocked;
  }

  /**
   * CalculateRowScore
   * @returns calculated score based on the selected cells
   */
  public CalculateRowScore(): number {
    const selectedCellCount =
      this.cells.filter((cell) => cell.isSelected).length +
      (this.cells[this.cells.length - 1].isSelected ? 1 : 0);

    const clampedIndex = Math.min(RowData.scoreLookup.length - 1, selectedCellCount);
    return RowData.scoreLookup[clampedIndex];
  }
}
