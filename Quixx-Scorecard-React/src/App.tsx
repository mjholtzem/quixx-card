import { useState } from "react";
import QuixxCell from "./components/QuixxCell";
import { RowData } from "./models/RowData";
import QuixxLockCell from "./components/QuixxLockCell";
import { Equal, Minus, Plus } from "lucide-react";
import RowScore from "./components/RowScore";
import PenaltyToggle, {
  type PenaltyToggleProps,
} from "./components/PenaltyToggle";

function App() {
  //Penalty State
  const [penalites, setPenalites] = useState<number>(0);
  //Row Data State
  const [rows, setRows] = useState<RowData[]>([
    new RowData(
      Array.from({ length: 11 }, (_cell, i) => {
        return { value: i + 2, isSelected: false };
      }),
      "bg-red-500",
      "bg-red-800",
      false
    ),
    new RowData(
      Array.from({ length: 11 }, (_cell, i) => {
        return { value: i + 2, isSelected: false };
      }),
      "bg-yellow-500",
      "bg-yellow-800",
      false
    ),
    new RowData(
      Array.from({ length: 11 }, (_cell, i) => {
        return { value: i + 2, isSelected: false };
      }),
      "bg-green-500",
      "bg-green-800",
      false
    ),
    new RowData(
      Array.from({ length: 11 }, (_cell, i) => {
        return { value: i + 2, isSelected: false };
      }),
      "bg-blue-500",
      "bg-blue-800",
      false
    ),
  ]);

  function Rows() {
    return rows.map((row, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className={`rounded-lg ${row.rowColor} flex gap-0.5 p-1 grow h-0`}
      >
        {row.cells.flatMap((_cell, cellIndex) => {
          const quixxCell = (
            <QuixxCell
              key={`${rowIndex}-${cellIndex}`}
              rowDatas={rows}
              rowIndex={rowIndex}
              cellIndex={cellIndex}
              setData={setRows}
            ></QuixxCell>
          );
          return cellIndex == row.cells.length - 1
            ? [
                <div
                  key={`divider-${rowIndex}`}
                  className="w-0.5 bg-black/80 shrink-0 mx-1 -my-1"
                />,
                quixxCell,
              ]
            : quixxCell;
        })}
        <QuixxLockCell rowDatas={rows} rowIndex={rowIndex} setData={setRows} />
      </div>
    ));
  }

  function Scores() {
    let totalScore = 0;
    rows.forEach((row) => {
      totalScore += row.CalculateRowScore();
    });
    const penaltyScore = penalites * 5;
    totalScore -= penaltyScore;
    return (
      <div className="flex flex-col w-fit gap-1">
        <h1 className="text-left ml-5 font-extrabold text-gray-900 text-[5cqh]">
          Scores
        </h1>
        <div className="mx-5 items-center justify-start gap-2 border-gray-200 border-2 rounded-lg p-2 w-fit flex h-1/2">
          {rows.flatMap((row, rowIndex) => {
            return [
              <RowScore key={`rowScore-${rowIndex}`} data={row} />,
              rowIndex == rows.length - 1 ? (
                <Minus
                  key={`minus`}
                  color="#000000"
                  strokeWidth={5}
                  className="size-1/3"
                />
              ) : (
                <Plus
                  key={`plus-${rowIndex}`}
                  color="#000000"
                  strokeWidth={5}
                  className="size-1/3"
                />
              ),
            ];
          })}
          <div className="rounded-sm bg-white border-slate-950 border-2 flex items-center justify-center text-slate-950 font-black text-[3cqh] h-full aspect-6/5">
            {penaltyScore}
          </div>
          <Equal color="#000000" strokeWidth={3} className="size-1/3" />
          <div className="rounded-sm bg-slate-950 flex items-center justify-center text-white font-black text-[3cqh] h-full aspect-6/5">
            {totalScore}
          </div>
        </div>
      </div>
    );
  }

  function Penalties() {
    const toggleProps: PenaltyToggleProps[] = [
      {
        curPenaltyCount: penalites,
        setPenalityCount: setPenalites,
        toggleIndex: 0,
      },
      {
        curPenaltyCount: penalites,
        setPenalityCount: setPenalites,
        toggleIndex: 1,
      },
      {
        curPenaltyCount: penalites,
        setPenalityCount: setPenalites,
        toggleIndex: 2,
      },
      {
        curPenaltyCount: penalites,
        setPenalityCount: setPenalites,
        toggleIndex: 3,
      },
    ];

    return (
      <div className="flex flex-col w-fit gap-1">
        <h1 className="text-left ml-5 font-extrabold text-gray-900 text-[5cqh]">
          Penalties
        </h1>
        <div className="mx-5 flex items-center justify-start gap-2 border-gray-200 border-2 rounded-lg p-2 h-1/2 w-fit">
          {toggleProps.map((prop) => {
            return (
              <PenaltyToggle
                key={`penaltyToggle-${prop.toggleIndex}`}
                props={prop}
              ></PenaltyToggle>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-100 h-screen w-screen p-5 flex flex-col">
        <div className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden grow pb-2 pt-2">
          <div className="flex flex-col grow h-[70cqh]">
            <h1 className="text-left ml-5 font-extrabold text-gray-900 text-[5cqh]">
              Quixx Scorecard
            </h1>
            <div
              id="card-root"
              className="items-center justify-left flex grow @container-[size]"
            >
              <div
                id="card-aspect-controller"
                className="w-[min(100cqw,calc(100cqh*20/8))] aspect-20/8 flex"
              >
                <div
                  id="card"
                  className="rounded-xl border-2 border-gray-200 p-1 ml-4 flex-col flex gap-1 grow"
                >
                  {Rows()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row grow h-[30cqh]">
            {/*Score Cells*/}
            {Scores()}
            {/*Penalty Cells*/}
            {Penalties()}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
