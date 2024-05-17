import { useState, useEffect } from 'react';

const Budget = () => {
  const [viewWarning, setViewWarning] = useState(false);
  const [warning, setWarning] = useState();
  const [idCount, setIdCount] = useState(3);
  const [modifyId, setModifyId] = useState(null);
  const [budgets, setBudgets] = useState([
    { id: 1, type: '교통비', amount: '400' },
    { id: 2, type: '식비', amount: '800' },
  ]);
  const [currentBudget, setCurrentBudget] = useState({ type: '', amount: 0 });

  useEffect(() => {
    if (viewWarning) {
      let timer = setTimeout(() => {
        setViewWarning(false);
      }, 3000);
    }
  }, [viewWarning]);
  return (
    <div className="flex min-h-[100vh] w-[100vw] flex-col gap-y-4 bg-blue-200 p-8">
      {viewWarning ? warning : ''}
      <h2 className="text-2xl font-bold">예산 계산기</h2>
      <div className="rounded-md bg-white p-2">
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col">
            <label for="type">지출 항목</label>
            <input
              type="text"
              value={currentBudget.type}
              placeholder="예)렌트비"
              id="type"
              className="w-full border-b-2 border-black p-1"
              onChange={(e) =>
                setCurrentBudget({ ...currentBudget, type: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col">
            <label for="">비용</label>
            <input
              type="text"
              value={currentBudget.amount}
              id="amount"
              className="w-full border-b-2 border-black p-1"
              onChange={(e) => {
                setCurrentBudget({
                  ...currentBudget,
                  amount: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            if (modifyId == null) {
              setWarning(
                <p className="rounded-md bg-green-600 p-2 text-white">
                  아이템이 생성되었습니다.
                </p>,
              );
              setViewWarning(true);
              setBudgets([...budgets, currentBudget]);
              setCurrentBudget({ id: idCount, type: '', amount: '0' });
              setIdCount(idCount + 1);
            } else {
              setWarning(
                <p className="rounded-md bg-green-600 p-2 text-white">
                  아이템이 수정되었습니다.
                </p>,
              );
              setViewWarning(true);
              setBudgets(
                budgets.map((budget) => {
                  if (budget.id === modifyId) {
                    return {
                      ...budget,
                      type: currentBudget.type,
                      amount: currentBudget.amount,
                    };
                  } else {
                    return budget;
                  }
                }),
              );
              setCurrentBudget({ type: '', amount: '0' });
              setModifyId(null);
            }
          }}
          className="my-4 rounded-md bg-blue-300 p-2 px-4 shadow-md"
        >
          제출
        </button>
        {budgets.length === 0 ? (
          ''
        ) : (
          <>
            <div>
              {budgets.map((budget) => (
                <p key={budget.id} className="flex justify-between border">
                  <span>{budget.type}</span>
                  <span>{budget.amount}</span>
                  <span>
                    <button
                      onClick={() => {
                        setModifyId(budget.id);
                        setCurrentBudget(budget);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        setWarning(
                          <p className="rounded-md bg-red-600 p-2 text-white">
                            아이템이 삭제되었습니다.
                          </p>,
                        );
                        setViewWarning(true);
                        setBudgets(budgets.filter((b) => b.id != budget.id));
                      }}
                    >
                      삭제
                    </button>
                  </span>
                </p>
              ))}
            </div>
            <button
              onClick={() => setBudgets([])}
              className="mt-4 rounded-md bg-blue-300 p-2 px-4 shadow-md"
            >
              모두 지우기
            </button>
          </>
        )}
      </div>
      <p className="text-right text-2xl">
        {budgets
          .map((budget) => parseInt(budget.amount))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
        원
      </p>
    </div>
  );
};

export default Budget;
