import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, RefreshCw, Send, Trash2, Key, Link } from 'lucide-react';
import SystemBlock from './SystemBlock';
import NetworkCloud from './NetworkCloud';
import AnimatedEnvelope from './AnimatedEnvelope';
import AnimatedKey from './AnimatedKey';
import SymmetricFlowDiagram from './SymmetricFlowDiagram';
import GuidedPrompt from './GuidedPrompt';

const EncryptionSimulator = () => {
  const [mode, setMode] = useState('asymmetric');
  const [message, setMessage] = useState('Hello');
  const [currentStage, setCurrentStage] = useState('idle');
  const [workflowStep, setWorkflowStep] = useState('key_setup');
  const [encryptedText, setEncryptedText] = useState('');
  const [isKeyExchanged, setIsKeyExchanged] = useState(false);
  
  const [keys, setKeys] = useState({
    prA: '', puA: '',
    prB: '', puB: '',
    session: ''
  });

  const timerRef = useRef(null);

  useEffect(() => {
    generateRandomKeys();
    setIsKeyExchanged(false);
    setWorkflowStep(mode === 'symmetric' ? 'key_setup' : 'ready_for_message');
  }, [mode]);

  const generateRandomKeys = () => {
    const rand = () => Math.floor(Math.random() * 90 + 10).toString();
    setKeys({
      prA: rand(),
      puA: '5',
      prB: rand(),
      puB: '5',
      session: rand()
    });
    setEncryptedText('');
    setCurrentStage('idle');
    setIsKeyExchanged(false);
    if (mode === 'symmetric') setWorkflowStep('key_setup');
  };

  const transmitKey = () => {
    setWorkflowStep('key_exchanging');
    setTimeout(() => {
        setIsKeyExchanged(true);
        setWorkflowStep('ready_for_message');
    }, 2000);
  };

  const startAnimation = () => {
    if (currentStage !== 'idle') return;
    setWorkflowStep('message_sending');
    setCurrentStage('encrypting');
    setEncryptedText(simulateEncryption());
    
    timerRef.current = setTimeout(() => {
      setCurrentStage('sending');
      timerRef.current = setTimeout(() => {
        setCurrentStage('decrypting');
        timerRef.current = setTimeout(() => {
          setCurrentStage('done');
        }, 1500);
      }, 2500);
    }, 800);
  };

  const simulateEncryption = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  };

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStage('idle');
    setEncryptedText('');
    if (mode === 'symmetric') {
        setIsKeyExchanged(false);
        setWorkflowStep('key_setup');
    }
  };

  const positions = {
    start: { x: -460, y: -50 },
    mid: { x: 0, y: -120 },
    end: { x: 460, y: -50 }
  };

  const asymmetricKeysA = [
    { id: 'prA', label: 'Private key A', type: 'key-private', value: keys.prA },
    { id: 'puB', label: 'Public Key B', type: 'key-public', value: keys.puB },
  ];

  const asymmetricKeysB = [
    { id: 'prB', label: 'Private key B', type: 'key-private', value: keys.prB },
    { id: 'puA', label: 'Public Key A', type: 'key-public', value: keys.puA },
  ];

  const symmetricKeys = [
    { id: 'session', label: 'Session key', type: 'key-session', value: keys.session }
  ];

  const isSymmetricAndNotExchanged = mode === 'symmetric' && !isKeyExchanged;

  return (
    <div className="app-container">
      <header className="simulator-header">
        <h1>Encryption and Decryption Simulator</h1>
        <p>A Visual Guide to Secure Communication</p>
        
        <div className="mode-toggle">
          <button className={`mode-button ${mode === 'asymmetric' ? 'active' : ''}`} onClick={() => setMode('asymmetric')}>
            Asymmetric Encryption
          </button>
          <button className={`mode-button ${mode === 'symmetric' ? 'active' : ''}`} onClick={() => setMode('symmetric')}>
            Symmetric Encryption
          </button>
        </div>
      </header>

      <GuidedPrompt step={workflowStep} mode={mode} />

      <main className="simulator-main">
        <div className="simulation-grid" style={{ gap: '6rem' }}>
          <SystemBlock 
            title="System A (Sender)"
            message={currentStage === 'idle' || currentStage === 'encrypting' ? message : ''}
            keys={mode === 'asymmetric' ? asymmetricKeysA : symmetricKeys}
            onKeyChange={(id, val) => setKeys(prev => ({...prev, [id]: val}))}
            isSender={true}
            status={isKeyExchanged || mode === 'asymmetric' ? 'secure' : 'idle'}
            standby={isSymmetricAndNotExchanged}
          />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', position: 'relative' }}>
            <div style={{ position: 'relative', width: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={`status-label-top ${currentStage === 'encrypting' ? 'active-step' : ''}`} 
                     style={{ color: currentStage === 'encrypting' ? '#3b82f6' : '#94a3b8', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                    {mode === 'asymmetric' ? 'Encrypting (using Public Key B)' : 'Encrypting (using Session Key)'}
                </div>
                
                <NetworkCloud label="Network" />
                
                <div className={`status-label-bottom ${currentStage === 'decrypting' ? 'active-step' : ''}`}
                     style={{ textAlign: 'center', marginTop: '10px', color: currentStage === 'decrypting' ? '#3b82f6' : '#94a3b8', fontWeight: 'bold' }}>
                    {mode === 'asymmetric' ? 'Decrypting (using Private Key B)' : 'Decrypting (using Session Key)'}
                </div>
            </div>
            
            <AnimatedKey 
              isVisible={workflowStep === 'key_exchanging'} 
              startPos={positions.start} 
              endPos={positions.end} 
            />

            <AnimatedEnvelope 
               state={currentStage} 
               encryptedText={encryptedText}
               position={positions}
            />
          </div>

          <SystemBlock 
            title="System B (Receiver)"
            message={currentStage === 'done' ? message : ''}
            keys={mode === 'asymmetric' ? asymmetricKeysB : symmetricKeys}
            onKeyChange={(id, val) => setKeys(prev => ({...prev, [id]: val}))}
            status={isKeyExchanged || mode === 'asymmetric' ? 'secure' : 'idle'}
            standby={isSymmetricAndNotExchanged}
          />
        </div>

        <div className="controls-section">
          {mode === 'symmetric' && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                className={`btn ${isKeyExchanged ? 'btn-secondary' : 'btn-primary'}`} 
                onClick={transmitKey}
                disabled={isKeyExchanged || workflowStep === 'key_exchanging'}
              >
                <Link size={18} style={{ marginRight: '8px' }} />
                {isKeyExchanged ? 'Key Exchanged' : 'Establish Secure Channel'}
              </button>
            </div>
          )}

          {!isSymmetricAndNotExchanged && (
            <motion.div 
               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
               style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '2rem' }}>
                <span style={{ fontWeight: 600, color: '#64748b' }}>Data:</span>
                <input 
                  type="text" className="key-input" style={{ width: '250px' }}
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter secure message..."
                  disabled={currentStage !== 'idle'}
                />
              </div>
              
              <button 
                className="btn btn-primary" onClick={startAnimation}
                disabled={currentStage !== 'idle' || isSymmetricAndNotExchanged}
              >
                <Send size={18} style={{ marginRight: '8px' }} />
                Send Secure Message
              </button>
            </motion.div>
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={generateRandomKeys} title="Regenerate Keys">
              <RefreshCw size={18} />
            </button>
            <button className="btn btn-secondary" onClick={reset} title="Reset Simulation">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {(mode === 'symmetric' && isKeyExchanged) && (
          <SymmetricFlowDiagram 
            message={message} 
            encryptedText={encryptedText || '....'} 
            sessionKey={keys.session} 
          />
        )}
      </main>
    </div>
  );
};

export default EncryptionSimulator;
