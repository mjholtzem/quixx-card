import type { RowData } from "../models/RowData";

function RowScore({data} : {data: RowData}) {
  return (
    <p className={`rounded-[8px] ${data.rowColor} h-15 w-25 flex items-center justify-center text-white font-black text-2xl`}>
      {data.CalculateRowScore()}
    </p>
  );
}

export default RowScore;
