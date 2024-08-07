"use client";
import { ScrollArea } from "@mantine/core";
import { motion } from "framer-motion";

interface IProps {
  id?: string | number;
  question: React.ReactNode;
  children: React.ReactNode;
}

const LayoutQuestion = ({ id, question, children }: IProps) => {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea type="auto">
        <div className="mx-auto min-h-full max-w-4xl px-my-48 py-my-32">
          <div className="min-h-[100px]">{question}</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            key={id}
            className="min-w-64 max-w-xl"
          >
            {children}
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LayoutQuestion;
