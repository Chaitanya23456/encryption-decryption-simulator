import React from 'react';
import { ArrowRight, Lock, Unlock, Mail } from 'lucide-react';

const SymmetricFlowDiagram = ({ message, encryptedText, sessionKey }) => {
  return (
    <div className="symmetric-flow-diagram-wrapper">
      <h3 className="diagram-title">Conceptual Flow (Symmetric)</h3>
      <div className="symmetric-flow-diagram">
        {/* Original */}
        <div className="flow-step">
          <div className="compact-box">
            {message}
          </div>
          <span className="step-label">Original Data</span>
        </div>

        {/* Encrypt Arrow */}
        <div className="flow-connector">
          <div className="connector-top">
             <Lock size={14} color="#f59e0b" />
             <span className="tiny-label">Encryption</span>
          </div>
          <ArrowRight size={20} color="#cbd5e1" />
          <span className="tiny-label">Shared Key</span>
        </div>

        {/* Encrypted */}
        <div className="flow-step">
          <div className="envelope-box">
            <Mail size={24} color="#1e293b" />
            <div className="encrypted-tag">{encryptedText}</div>
          </div>
          <span className="step-label">Encrypted Packet</span>
        </div>

        {/* Decrypt Arrow */}
        <div className="flow-connector">
          <div className="connector-top">
             <Unlock size={14} color="#f59e0b" />
             <span className="tiny-label">Decryption</span>
          </div>
          <ArrowRight size={20} color="#cbd5e1" />
          <span className="tiny-label">Shared Key</span>
        </div>

        {/* Result */}
        <div className="flow-step">
          <div className="compact-box">
            {message}
          </div>
          <span className="step-label">Recovered Data</span>
        </div>
      </div>
    </div>
  );
};

export default SymmetricFlowDiagram;
