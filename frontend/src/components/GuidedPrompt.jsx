import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Lock, CheckCircle, Unlock } from 'lucide-react';

const GuidedPrompt = ({ step, mode }) => {
  const getStepConfig = () => {
    if (mode === 'asymmetric') {
        return {
            icon: <Unlock size={20} />,
            text: "Asymmetric mode active. Digital key pairs are ready for secure messaging.",
            bg: "bg-blue-50",
            color: "#3b82f6"
        };
    }

    switch (step) {
      case 'key_setup':
        return {
          icon: <Info size={20} />,
          text: "Step 1: Define a shared Session Key, then click 'Establish Secure Channel' to synchronize it.",
          bg: "rgba(59, 130, 246, 0.05)",
          color: "#60a5fa"
        };
      case 'key_exchanging':
        return {
          icon: <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}><Lock size={20} /></motion.div>,
          text: "Synchronizing Session Key... Preparing secure channel.",
          bg: "rgba(245, 158, 11, 0.05)",
          color: "#fbbf24"
        };
      case 'ready_for_message':
        return {
          icon: <CheckCircle size={20} />,
          text: "Step 2: Secure channel established! You can now send messages securely.",
          bg: "rgba(16, 185, 129, 0.05)",
          color: "#34d399"
        };
      case 'message_sending':
      case 'done':
        return {
          icon: <Lock size={20} />,
          text: "Secure transmission active. Data is end-to-end encrypted.",
          bg: "rgba(16, 185, 129, 0.05)",
          color: "#34d399"
        };
      default:
        return null;
    }
  };

  const config = getStepConfig();
  if (!config) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step + mode}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="guided-prompt"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          borderRadius: '12px',
          background: config.bg,
          color: config.color,
          fontWeight: 600,
          fontSize: '0.95rem',
          border: `1px solid ${config.color}33`,
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '800px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
        }}
      >
        {config.icon}
        {config.text}
      </motion.div>
    </AnimatePresence>
  );
};

export default GuidedPrompt;
