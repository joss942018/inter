import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SurveyFlowContext from "../context/SurveyFlowContext";
import { Questrial } from "next/font/google";

const roboto = Questrial({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Animation = () => {
  const [showText, setShowText] = useState<boolean>(false);
  const [animateDirection, setAnimateDirection] = useState<number>(1);
  const [titleAnimation, setTitleAnimation] = useState<string>("");
  const { survey } = useContext(SurveyFlowContext);

  // useEffect(() => {
  //   if (survey.surveyData.lng === "es") {
  //     setTitleAnimation("¡Hola, soy Elia!");
  //   } else {
  //     setTitleAnimation("Hi, I am Elia!");
  //   }
  // }, [survey.surveyData.lng]);

  const handleAnimationComplete = () => {
    setShowText(true);
    setAnimateDirection(-1);
  };

  return (
    <div className="flex h-auto flex-col">
      <p className="text-7xl font-bold leading-10 tracking-wider">elia</p>
      <p>Powered by Elia</p>
      {/* <motion.div
        initial={{ x: 0, rotate: 0, opacity: 0 }}
        animate={
          animateDirection === 1
            ? { x: 205, rotate: 720, opacity: 1 }
            : { x: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 2, type: "tween" }}
        onAnimationComplete={handleAnimationComplete}
        className="flex items-center ml-2 relative"
      >
        <Image
          src="/ico/elia-color.svg"
          alt="Elia's logo"
          width={"0"}
          height={"0"}
          style={{ width: 100, height: 100 }}
          priority
        />
      </motion.div>
      <AnimatePresence>
        {showText && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 5 }}
            className="flex items-center text-3xl ml-4"
          >
            {[...titleAnimation].map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default Animation;
