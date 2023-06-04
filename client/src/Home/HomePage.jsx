import React from "react";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import "./HomePage.css";

export default function Home() {
        return (
            <motion.div className="homepage scroll-snap-align-start h-full min-h-screen  items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: '-100vw' }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ opacity: 1, duration: 2.5, type: 'spring', bounce: 0.25 }}
                  exit={{ opacity: 0, x: '-100vw', delay: 0 }} // Delay the exit animation by 2 seconds
                  className="doppelganger"
                >
                  <span className="letters">D</span>
                  <span className="letters">o</span>
                  <span className="letters">p</span>
                  <span className="letters">p</span>
                  <span className="letters">l</span>
                  <span className="letters">e</span>
                  <span className="letters">g</span>
                  <span className="letters">ä</span>
                  <span className="letters">n</span>
                  <span className="letters">g</span>
                  <span className="letters">e</span>
                  <span className="letters">r</span>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  className="tag"
                  initial={{ opacity: 0, x: '100vw' }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ opacity: 1, duration: 2.5, type: 'spring', bounce: 0.25 }}
                  exit={{ opacity: 0, x: '100vw', delay: 0 }}
                >
                  Generate your own personal assistant. Put your best self forward.
                </motion.div>

              </AnimatePresence>
            </motion.div>
          );
        }
    

