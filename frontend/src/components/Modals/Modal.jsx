import './Modal.css';
import { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

export const Modal = ({ mensaje, visible, onClose, tipo = 'éxito' }) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  if (!visible) return null;

  const getIconColor = () => {
    switch(tipo) {
      case 'éxito': return '#28a745';
      case 'error': return '#dc3545';
      case 'advertencia': return '#ffc107';
      case 'info': return '#17a2b8';
      default: return '#28a745';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-icon" style={{ color: getIconColor() }}>
          <FaCheckCircle size={48} />
        </div>
        
        <h3 className="modal-title">
          {tipo === 'éxito' && '¡Éxito!'}
          {tipo === 'error' && '¡Error!'}
          {tipo === 'advertencia' && '¡Advertencia!'}
          {tipo === 'info' && 'Información'}
        </h3>
        
        <p className="modal-message">{mensaje}</p>
        
        <button 
          className="modal-confirm-btn" 
          onClick={onClose}
          style={{ backgroundColor: getIconColor() }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};
