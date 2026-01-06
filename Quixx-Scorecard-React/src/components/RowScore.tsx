import type { RowData } from "../models/RowData";

function RowScore({data} : {data: RowData}) {
  return (
    <div className={`rounded-sm ${data.rowColor} text-white font-black text-[3cqh] flex justify-center items-center h-full aspect-6/5`}>
      {data.CalculateRowScore()}
    </div>
  );
}

export default RowScore;
