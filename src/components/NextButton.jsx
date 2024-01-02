import { motion } from "framer-motion";

function NextButton({ numQuestions, answer, dispatch, index }) {
  if (answer === null) return;

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1 },
    pressed: { scale: 0.95 },
  };

  if (index < numQuestions - 1) {
    return (
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="pressed"
        className="btn  rounded-[10px] py-[10px] px-[19px] bg-nextBtn text-textColor "
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </motion.button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: "finish" })}
        className="btn  rounded-[10px] py-[10px] px-[19px] bg-nextBtn text-textColor "
      >
        Finish
      </button>
    );
  }
  // return <div></div>;
}

export default NextButton;
