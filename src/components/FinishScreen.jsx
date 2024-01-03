function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result text-textColor">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore text-textColor">
        (Highscore: {highscore} points)
      </p>

      <div className="flex justify-between mt-7 ">
        <button
          onClick={() => dispatch({ type: "reset" })}
          className="btn btn-ui rounded-[10px] py-[10px] px-[19px] bg-timeOut text-textColor "
        >
          Reset Highscore
        </button>
        <button
          onClick={() => dispatch({ type: "restart" })}
          className="btn btn-ui rounded-[10px] py-[10px] px-[19px] bg-nextBtn text-textColor "
        >
          Restart
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
