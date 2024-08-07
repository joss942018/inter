"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from "next-intl";

interface Props {
  title: string;
  price: number;
  number_questions: number;
  benefits: string[];
}

const SubscriptionCard = ({ title, price, number_questions, benefits }: Props) => {
  const t = useTranslations("Subscription");

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };

  return (
    <div className="w-full text-center">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
      </div>
      <div className='mt-4 mb-8 flex items-baseline justify-center text-primary dark:text-primary_d'>
        <p className='text-6xl mt-8'>${price}</p>
        {price !== 0 ? (
          <p className="text-base font-semibold ml-1 pb-2">{t("taxes")}</p>
        ) : null}
      </div>
      <div className='mt-4 mb-8 flex items-baseline justify-center'>
        <p className='text-lg font-semibold w-16 h-16 rounded-full bg-zinc-300 dark:bg-zinc-800 shadow-md py-4'>{number_questions}</p>
        <p className='text-sm font-semibold ml-2'>{t("questions_available")}</p>
      </div>
      <div>
        <h2 className='font-semibold my-4 text-xl'>{t("include")}</h2>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={list}
        >
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex justify-start my-2"
              variants={item}
            >
              <div className='w-full flex'>
                <FontAwesomeIcon icon={faCheck} className='text-green-600 w-6 h-6 mr-3' />
                <span className='text-start'>{benefit}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

export default SubscriptionCard;