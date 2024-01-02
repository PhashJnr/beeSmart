import { motion } from "framer-motion";

function Options({ answer, filteredQuestions, dispatch }) {
  const hasAnswered = answer !== null;
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1 },
    pressed: { scale: 0.95 },
    initial: { opacity: 0, x: 0 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <div className="options   flex flex-col items-start ">
      {filteredQuestions.options.map((option, index) => {
        return (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="pressed"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            key={option}
            className={`btn  w-3/4 hover:opacity-85 shadow-md text-left mb-[0.8rem] rounded-[10px] py-[10px] px-[15px] leading-none bg-[#D82148] text-textColor ${
              index === answer ? "ml-4" : ""
            } ${
              hasAnswered
                ? index === filteredQuestions.correctOption
                  ? "bg-correctOption"
                  : ""
                : ""
            } `}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </motion.button>
        );
      })}

      <p className="text-textColor mb-3">
        {hasAnswered ? filteredQuestions.explanation : ""}
      </p>
    </div>
  );
}

export default Options;
