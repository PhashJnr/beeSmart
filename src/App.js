import data from "./data/data.json";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import QuestionButtons from "./components/QuestionButtons";

import "./App.css";
import { useEffect, useReducer } from "react";
import NextButton from "./components/NextButton";

// import { useState } from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  error: null,
  status: "loading",
  answer: null,
  points: 0,
  category: "",
  difficulty: "",
  index: 0,
  filteredQuestions: [],
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  console.log("action", action, "state", state);
  switch (action.type) {
    case "dataLoaded":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, error: action.payload, status: "error" };
    case "ready":
      return { ...state, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        category: action.payload.mode,
        difficulty: action.payload.difficulty,
      };
    case "filterQuestions":
      const { difficulty, category } = state;

      const filteredQuestions = state.questions.filter(
        (question) =>
          question.difficulty === difficulty && question.category === category
      );

      const secondsRemaining = filteredQuestions.length * SECS_PER_QUESTION;

      return {
        ...state,
        status: "active",
        filteredQuestions,
        secondsRemaining,
      };
    case "newAnswer":
      const question = state.filteredQuestions.at(state.index);
      console.log("question", question);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  // console.log(questions);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    status,
    category,
    difficulty,
    filteredQuestions,
    answer,
    index,
    points,
    highscore,
    secondsRemaining,
  } = state;
  // console.log("state", questions);
  console.log("points", points);
  console.log("answer", answer);
  const numQuestions = filteredQuestions.length;
  const maxPossiblePoints = filteredQuestions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  console.log("secondRemaining", secondsRemaining);
  console.log("logSecs", secondsRemaining * 30);

  // console.log("answer", answer);
  console.log("filteredQuestions", filteredQuestions);

  /*
  const filQuest = questions.filter(
    (question) =>
      question.difficulty === difficulty && question.category === category
  );
  console.log("filterquestion", filQuest);
  console.log("difficulty", difficulty);
  console.log("category", category);

  */

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "dataLoaded", payload: data.questions });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (category && difficulty) {
      dispatch({
        type: "filterQuestions",
        payload: { category, difficulty },
      });
    }

    console.log(category, difficulty);
  }, [category, difficulty, dispatch]);

  return (
    <div className="p-5">
      <div className="mx-auto max-w-[800px] mt-[5rem] p-6 bg-[#354A97] rounded-[12px] shadow-sm shadow-[#354A97] ">
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Question
              filteredQuestions={filteredQuestions[index]}
              answer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
              points={points}
            />

            <QuestionButtons>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                numQuestions={numQuestions}
                dispatch={dispatch}
                index={index}
                answer={answer}
              />
            </QuestionButtons>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  );
}

export default App;