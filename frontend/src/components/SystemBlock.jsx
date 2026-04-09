import React from 'react';
import { Lock, Unlock, ShieldCheck, ShieldAlert } from 'lucide-react';

const SystemBlock = ({ 
  title, 
  message, 
  keys, 
  onKeyChange, 
  isSender = false, 
  status = 'idle', // 'idle', 'secure', 'encrypting', 'decrypting'
  standby = false,
  messageLabel = "Message"
}) => {
  return (
    <div className={`system-block ${standby ? 'standby' : ''}`}>
      <div className="system-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {status === 'secure' ? <ShieldCheck size={20} color="#10b981" /> : <ShieldAlert size={20} color="#64748b" />}
          {title}
        </div>
      </div>
      
      <div className={`message-box ${standby ? 'blurred' : ''}`}>
        <span className="message-label">{messageLabel}</span>
        <div className="message-content">
          {standby ? (
            <div className="standby-text">
               <Lock size={16} />
               Waiting for secure channel...
            </div>
          ) : (
            message || <span style={{ color: '#cbd5e1' }}>Empty</span>
          )}
        </div>
      </div>
      
      <div className="keys-container">
        {keys.map((key, index) => (
          <div key={index} className="key-field">
            <span className={`key-label ${key.type}`}>
              {key.label}:
            </span>
            <input 
              type="text" 
              className={`key-input ${key.type}`}
              value={key.value}
              onChange={(e) => onKeyChange(key.id, e.target.value)}
              disabled={status === 'encrypting' || status === 'decrypting'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemBlock;
