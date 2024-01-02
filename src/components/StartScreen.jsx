import { useState } from "react";

function StartScreen({ dispatch }) {
  // const [userName, setUserName] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");

  console.log("StartScreen", level, mode);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "start",
      payload: { difficulty: level, mode },
    });
  }

  return (
    <div className="flex flex-col justify-around items-center">
      <p className="text-textColor  mb-4">
        Select preferred category and difficulty
      </p>
      <form className="text-textColor flex flex-col sm:flex-row gap-6">
        <label htmlFor="difficulty  " className="mr-[2rem] ml-[3px]">
          {/* <p className="text-white">Difficulty:</p> */}
          Difficulty:
          <select
            className="bg-[#D82148] shadow-md cursor-pointer p-1 rounded"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            defaultValue=""
            required
            id="difficulty"
          >
            <option value="" disabled>
              Select Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label htmlFor="category">
          Category:
          <select
            className="bg-[#D82148] shadow-md cursor-pointer p-1 rounded"
            value={mode}
            id="category"
            onChange={(e) => setMode(e.target.value)}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
          </select>
        </label>
      </form>
      <button
        className="btn rounded-[5px] ml-[1rem] shadow-md shadow-black mt-5 px-[24px] hover:opacity-90 text-black py-[5px] bg-[#fff] "
        onClick={handleSubmit}
        disabled={!level || !mode}
      >
        Start
      </button>
    </div>
  );
}

export default StartScreen;
