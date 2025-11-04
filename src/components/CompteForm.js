import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm({ onCompteAdded }) {
  const [compte, setCompte] = useState({ 
    solde: '', 
    dateCreation: '', 
    type: 'COURANT' 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!compte.solde || !compte.dateCreation) {
      alert('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/comptes`, compte);
      alert('✅ Compte ajouté avec succès!');
      setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
      // Recharger la page pour afficher le nouveau compte
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'ajout du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">
            <i className="bi bi-currency-euro me-1"></i>
            Solde *
          </label>
          <input 
            type="number" 
            name="solde" 
            className="form-control" 
            placeholder="Entrez le montant..."
            value={compte.solde}
            onChange={handleChange} 
            required
            step="0.01"
            min="0"
          />
          <div className="form-text">Montant en euros</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            <i className="bi bi-calendar-date me-1"></i>
            Date de Création *
          </label>
          <input 
            type="date" 
            name="dateCreation" 
            className="form-control" 
            value={compte.dateCreation}
            onChange={handleChange} 
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">
            <i className="bi bi-wallet2 me-1"></i>
            Type de Compte
          </label>
          <select 
            name="type" 
            className="form-select" 
            value={compte.type}
            onChange={handleChange}
          >
            <option value="COURANT">
              💳 Compte Courant
            </option>
            <option value="EPARGNE">
              🏦 Compte Épargne
            </option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-success w-100 py-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Ajout en cours...
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i>
              Ajouter le Compte
            </>
          )}
        </button>
      </form>

      <div className="mt-3 p-2 bg-light rounded">
        <small className="text-muted">
          <i className="bi bi-info-circle me-1"></i>
          * Champs obligatoires
        </small>
      </div>
    </div>
  );
}

export default CompteForm;