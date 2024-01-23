import Options from "../components/Options";

function Question({
  filteredQuestions,
  answer,
  numQuestions,
  dispatch,
  index,
  points,
}) {
  if (!filteredQuestions || !filteredQuestions.question) {
    return <div>Loading...</div>; // Or some appropriate loading state or error message
  }

  return (
    <div className="">
      <progress
        className="self-center"
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
      <div className="flex justify-between">
        <h1 className="text-[1.3rem] text-textColor my-3 ">
          Question {index + 1}{" "}
        </h1>

        <strong className="text-[1.3rem] text-textColor my-3 ">
          Current point: {points}
        </strong>
      </div>

      <h2 className="text-[1.5rem] text-textColor mb-[1rem]">
        {filteredQuestions.question}
      </h2>
      <Options
        answer={answer}
        dispatch={dispatch}
        filteredQuestions={filteredQuestions}
      />

      {/* <NextButton
        numQuestions={numQuestions}
        dispatch={dispatch}
        index={index}
        answer={answer}
      /> */}
    </div>
  );
}

export default Question;
