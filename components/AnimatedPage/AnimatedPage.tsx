import { FC } from "react";
import { motion } from "framer-motion";

interface IAnimatedPageProps {
  className: string;
}

const AnimatedPage: FC<IAnimatedPageProps> = ({ children, className }) => {
  // const variants = {
  //   hidden: { opacity: 0, x: 200, y: 0 },
  //   enter: { opacity: 1, x: 0, y: 0 },
  //   exit: { opacity: 0, x: 0, y: -100 },
  // };

  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      // variants={variants}
      transition={{ type: "linear" }}
      className={className}
    >
      {children}
    </motion.main>
  );
};

export default AnimatedPage;
