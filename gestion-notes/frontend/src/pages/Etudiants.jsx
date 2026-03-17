import { useState, useEffect } from 'react';
import { getEtudiants, addEtudiant, updateEtudiant, deleteEtudiant } from '../api/api';

export default function Etudiants() {
  const [etudiants, setEtudiants] = useState([]);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', classe: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { charger(); }, []);

  const charger = async () => {
    const res = await getEtudiants();
    setEtudiants(res.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateEtudiant(editId, form);
      setEditId(null);
    } else {
      await addEtudiant(form);
    }
    setForm({ nom: '', prenom: '', email: '', classe: '' });
    charger();
  };

  const handleEdit = (e) => {
    setEditId(e.id);
    setForm({ nom: e.nom, prenom: e.prenom, email: e.email, classe: e.classe });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet étudiant ?')) {
      await deleteEtudiant(id);
      charger();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestion des Étudiants</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder="Nom" value={form.nom}
          onChange={e => setForm({ ...form, nom: e.target.value })} />
        <input placeholder="Prénom" value={form.prenom}
          onChange={e => setForm({ ...form, prenom: e.target.value })} />
        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Classe" value={form.classe}
          onChange={e => setForm({ ...form, classe: e.target.value })} />
        <button onClick={handleSubmit}>
          {editId ? 'Modifier' : 'Ajouter'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({ nom: '', prenom: '', email: '', classe: '' }); }}>
          Annuler
        </button>}
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>Nom</th><th>Prénom</th><th>Email</th><th>Classe</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map(e => (
            <tr key={e.id}>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td>{e.email}</td>
              <td>{e.classe}</td>
              <td>
                <button onClick={() => handleEdit(e)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(e.id)} style={{ marginLeft: '5px', color: 'red' }}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}