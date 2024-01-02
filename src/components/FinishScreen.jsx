function FinishScreen({ highscore, points, dispatch, maxPossiblePoints }) {
  console.log("FinishScreen", highscore, points, maxPossiblePoints);
  return (
    <div className="text-textColor">
      <h1>HighScore: {highscore}</h1>
    </div>
  );
}

export default FinishScreen;
