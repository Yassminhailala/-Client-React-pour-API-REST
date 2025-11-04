import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/comptes`);
        setComptes(response.data);
        setError(null);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Erreur lors du chargement des comptes');
      } finally {
        setLoading(false);
      }
    };

    fetchComptes();
  }, []);

  const getTypeBadge = (type) => {
    return type === 'COURANT' ? 'bg-primary' : 'bg-success';
  };

  const getTypeIcon = (type) => {
    return type === 'COURANT' ? '💳' : '🏦';
  };

  const formatSolde = (solde) => {
    return new Number(solde).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' €';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-2 text-muted">Chargement des comptes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* En-tête avec statistiques */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center py-3">
              <h5 className="card-title">
                <i className="bi bi-wallet2 me-2"></i>
                Total Comptes
              </h5>
              <h3 className="mb-0">{comptes.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center py-3">
              <h5 className="card-title">
                <i className="bi bi-piggy-bank me-2"></i>
                Comptes Épargne
              </h5>
              <h3 className="mb-0">
                {comptes.filter(c => c.type === 'EPARGNE').length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body text-center py-3">
              <h5 className="card-title">
                <i className="bi bi-credit-card me-2"></i>
                Comptes Courant
              </h5>
              <h3 className="mb-0">
                {comptes.filter(c => c.type === 'COURANT').length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des comptes SANS colonne Actions */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th width="15%" className="text-center">ID</th>
              <th width="30%">Solde</th>
              <th width="30%">Date de Création</th>
              <th width="25%">Type de Compte</th>
              {/* Colonne Actions SUPPRIMÉE */}
            </tr>
          </thead>
          <tbody>
            {comptes.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <i className="bi bi-inbox display-4 text-muted d-block mb-2"></i>
                  <span className="text-muted">Aucun compte trouvé</span>
                </td>
              </tr>
            ) : (
              comptes.map(compte => (
                <tr key={compte.id} className="align-middle">
                  <td className="text-center fw-bold">#{compte.id}</td>
                  <td>
                    <span className="fw-bold fs-6">
                      {formatSolde(compte.solde)}
                    </span>
                  </td>
                  <td>
                    <i className="bi bi-calendar3 me-2 text-muted"></i>
                    {formatDate(compte.dateCreation)}
                  </td>
                  <td>
                    <span className={`badge ${getTypeBadge(compte.type)} p-2`}>
                      {getTypeIcon(compte.type)} {compte.type}
                    </span>
                  </td>
                  {/* Cellule Actions SUPPRIMÉE */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pied du tableau */}
      {comptes.length > 0 && (
        <div className="mt-3 text-muted">
          <small>
            <i className="bi bi-info-circle me-1"></i>
            Affichage de {comptes.length} compte(s)
          </small>
        </div>
      )}
    </div>
  );
}

export default CompteList;