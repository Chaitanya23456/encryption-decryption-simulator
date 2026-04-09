import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen } from 'lucide-react';

const AnimatedEnvelope = ({ state, encryptedText, position }) => {
  const isMoving = state === 'sending';
  const isOpen = state === 'decrypting' || state === 'done';
  // Hide envelope after decryption is complete
  const isVisible = state !== 'idle' && state !== 'done';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="envelope-wrapper"
          initial={{ opacity: 0, scale: 0.5, x: position.start.x, y: position.start.y }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isMoving ? [position.start.x, position.mid.x, position.end.x] : (isOpen ? position.end.x : position.start.x),
            y: isMoving ? [position.start.y, position.mid.y, position.end.y] : (isOpen ? position.end.y : position.start.y),
          }}
          transition={{ 
            duration: isMoving ? 2.5 : 0.5,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          }}
          exit={{ opacity: 0, scale: 0, scale: 0.5, transition: { duration: 0.3 } }}
        >
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isOpen ? (
              <MailOpen size={70} color="#60a5fa" strokeWidth={1.5} />
            ) : (
              <Mail size={70} color="#f8fafc" strokeWidth={1.5} />
            )}
            
            <motion.div 
              style={{
                position: 'absolute',
                top: '55%',
                background: '#1e293b',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '800',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#60a5fa',
                fontFamily: 'monospace',
                letterSpacing: '1px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {encryptedText}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedEnvelope;
