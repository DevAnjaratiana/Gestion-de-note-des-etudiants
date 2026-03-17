
import { useState } from 'react';
import Etudiants from './pages/Etudiants';
import Matieres from './pages/Matieres';
import Notes from './pages/Notes';

export default function App() {
  const [page, setPage] = useState('etudiants');

  const sidebarStyle = {
    width: '220px',
    minHeight: '100vh',
    backgroundColor: '#2c3e50',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  const logoStyle = {
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderBottom: '1px solid #3d5166',
    marginBottom: '20px',
  };

  const btnStyle = (p) => ({
    padding: '15px 25px',
    backgroundColor: page === p ? '#3498db' : 'transparent',
    color: 'white',
    border: 'none',
    borderLeft: page === p ? '4px solid #1abc9c' : '4px solid transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '15px',
    width: '100%',
    transition: 'all 0.2s',
  });

  const contentStyle = {
    marginLeft: '220px',
    padding: '30px',
    minHeight: '100vh',
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={logoStyle}>
          🎓 Gestion Notes
        </div>

        <button style={btnStyle('dashboard')} onClick={() => setPage('dashboard')}>
          📊 Dashboard
        </button>
        <button style={btnStyle('etudiants')} onClick={() => setPage('etudiants')}>
          👨‍🎓 Étudiants
        </button>
        <button style={btnStyle('matieres')} onClick={() => setPage('matieres')}>
          📚 Matières
        </button>
        <button style={btnStyle('notes')} onClick={() => setPage('notes')}>
          📝 Notes
        </button>
      </div>

      {/* Contenu principal */}
      <div style={contentStyle}>
        {page === 'dashboard' && <Dashboard />}
        {page === 'etudiants' && <Etudiants />}
        {page === 'matieres' && <Matieres />}
        {page === 'notes' && <Notes />}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>📊 Tableau de bord</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Card titre="Étudiants" valeur="👨‍🎓" couleur="#3498db" />
        <Card titre="Matières" valeur="📚" couleur="#2ecc71" />
        <Card titre="Notes saisies" valeur="📝" couleur="#e74c3c" />
      </div>
    </div>
  );
}

function Card({ titre, valeur, couleur }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px',
      width: '200px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderTop: `4px solid ${couleur}`,
    }}>
      <div style={{ fontSize: '40px' }}>{valeur}</div>
      <div style={{ fontWeight: 'bold', color: '#2c3e50', marginTop: '10px' }}>{titre}</div>
    </div>
  );
}