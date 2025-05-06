import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { AnimatePresence } from 'framer-motion';
export const Transition = () => {

  const[isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return() => clearTimeout(timer);
  },[]);

  return(
      <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: .5 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: "#0074FF",
                  zIndex: 9999,
                }}
              />
            )}
          </AnimatePresence>
  )
}