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
        className={`rounded-[8px] ${row.rowColor} flex gap-1 p-2 grow h-0`}
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
                  className="w-1 bg-black/80 shrink-0 rounded-full mx-1"
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
      <div className="flex flex-col grow basis-0">
        <h1 className="text-left m-5 text-1xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Score
        </h1>
        <div className=" @container mx-5 items-center gap-2 border-gray-200 border-2 rounded-[8px] p-4 flex">
          {rows.flatMap((row, rowIndex) => {
            return [
              <RowScore key={`rowScore-${rowIndex}`} data={row} />,
              rowIndex == rows.length - 1 ? (
                <Minus
                  key={`minus`}
                  color="#000000"
                  strokeWidth={5}
                  size="1em"
                />
              ) : (
                <Plus
                  key={`plus-${rowIndex}`}
                  color="#000000"
                  strokeWidth={5}
                  size="1em"
                />
              ),
            ];
          })}
          <div className="rounded-[8px] bg-white border-slate-950 border-2 flex items-center justify-center text-slate-950 font-black text-2xl grow">
            {penaltyScore}
          </div>
          <Equal color="#000000" strokeWidth={3} />
          <div className="rounded-[8px] bg-slate-950 flex items-center justify-center text-white font-black text-2xl grow">
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
      <div className="flex-col grow flex basis-0">
         <h1 className="text-left m-5 text-1xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Penalties
        </h1>
        <div className="mx-5 inline-flex items-center flex-wrap gap-3 border-gray-200 border-2 rounded-[8px] p-4 grow">
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
      <div className="bg-slate-100 h-screen w-screen p-10 flex flex-col">
        <div className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden grow">
          <h1 className="text-left text-xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Quixx Scorecard
          </h1>
          <div
            id="card-root"
            className="items-center justify-left grid grow-6 @container-[size]"
          >
            <div
              id="card-aspect-controller"
              className="w-[min(100cqw,calc(100cqh*19/8))] aspect-19/8 flex"
            >
              <div
                id="card"
                className="rounded-xl border-2 border-gray-200 p-1 m-5 flex-col flex gap-1 grow"
              >
                {Rows()}
              </div>
            </div>
          </div>
          <div className="flex flex-row grow mb-5">
            {/*Horizontal Layout*/}
            <div className="flex-1 grow-2 flex flex-col">
              {/*Score Cells*/}
              {Scores()}
              {/*Penalty Cells*/}
              {Penalties()}
            </div>
            <div className="bg-green-500 grow"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
