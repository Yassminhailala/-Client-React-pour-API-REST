import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* En-tête avec style amélioré */}
      <header className="bg-primary text-white py-4 shadow">
        <div className="container">
          <h1 className="text-center mb-0">
            <i className="bi bi-bank me-2"></i>
            Gestion des Comptes Bancaires
          </h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container-fluid py-4">
        <div className="row">
          {/* Formulaire sur la gauche */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow">
              <div className="card-header bg-success text-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-plus-circle me-2"></i>
                  Ajouter un Compte
                </h5>
              </div>
              <div className="card-body">
                <CompteForm />
              </div>
            </div>
          </div>

          {/* Liste des comptes sur la droite */}
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-header bg-info text-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Liste des Comptes
                </h5>
              </div>
              <div className="card-body">
                <CompteList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;