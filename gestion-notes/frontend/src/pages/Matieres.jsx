import { useState, useEffect } from 'react';
import { getMatieres, addMatiere, updateMatiere, deleteMatiere } from '../api/api';

export default function Matieres() {
  const [matieres, setMatieres] = useState([]);
  const [form, setForm] = useState({ nom: '', coefficient: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { charger(); }, []);

  const charger = async () => {
    const res = await getMatieres();
    setMatieres(res.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateMatiere(editId, form);
      setEditId(null);
    } else {
      await addMatiere(form);
    }
    setForm({ nom: '', coefficient: '' });
    charger();
  };

  const handleEdit = (m) => {
    setEditId(m.id);
    setForm({ nom: m.nom, coefficient: m.coefficient });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette matière ?')) {
      await deleteMatiere(id);
      charger();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestion des Matières</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="Nom de la matière" value={form.nom}
          onChange={e => setForm({ ...form, nom: e.target.value })} />
        <input placeholder="Coefficient" type="number" value={form.coefficient}
          onChange={e => setForm({ ...form, coefficient: e.target.value })} />
        <button onClick={handleSubmit}>
          {editId ? 'Modifier' : 'Ajouter'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({ nom: '', coefficient: '' }); }}>
          Annuler
        </button>}
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>Nom</th><th>Coefficient</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map(m => (
            <tr key={m.id}>
              <td>{m.nom}</td>
              <td>{m.coefficient}</td>
              <td>
                <button onClick={() => handleEdit(m)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(m.id)} style={{ marginLeft: '5px', color: 'red' }}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}