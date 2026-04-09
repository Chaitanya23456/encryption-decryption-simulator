import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key } from 'lucide-react';

const AnimatedKey = ({ isVisible, startPos, endPos, onComplete }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: 'absolute',
            zIndex: 50,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, scale: 0.5, x: startPos.x, y: startPos.y }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: [startPos.x, (startPos.x + endPos.x) / 2, endPos.x],
            y: [startPos.y, startPos.y - 100, endPos.y],
          }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          onAnimationComplete={onComplete}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <div style={{
            background: '#f59e0b',
            padding: '12px',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            <Key size={32} color="white" />
          </div>
          <div style={{
            marginTop: '8px',
            background: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            color: '#f59e0b'
          }}>
            Session Key
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedKey;
