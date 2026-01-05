import type { RowData } from "../models/RowData";

function RowScore({data} : {data: RowData}) {
  return (
    <p className={`rounded-[8px] ${data.rowColor} grow 3 text-white font-black text-2xl flex justify-center items-center`}>
      {data.CalculateRowScore()}
    </p>
  );
}

export default RowScore;
