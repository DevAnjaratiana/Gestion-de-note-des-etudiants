import { useState, useEffect } from 'react';
import { getNotes, addNote, updateNote, deleteNote, getEtudiants, getMatieres } from '../api/api';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [form, setForm] = useState({ etudiant_id: '', matiere_id: '', note: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { charger(); }, []);

  const charger = async () => {
    const [n, e, m] = await Promise.all([getNotes(), getEtudiants(), getMatieres()]);
    setNotes(n.data);
    setEtudiants(e.data);
    setMatieres(m.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateNote(editId, { note: form.note });
      setEditId(null);
    } else {
      await addNote(form);
    }
    setForm({ etudiant_id: '', matiere_id: '', note: '' });
    charger();
  };

  const handleEdit = (n) => {
    setEditId(n.id);
    setForm({ etudiant_id: n.etudiant_id, matiere_id: n.matiere_id, note: n.note });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette note ?')) {
      await deleteNote(id);
      charger();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestion des Notes</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <select value={form.etudiant_id}
          onChange={e => setForm({ ...form, etudiant_id: e.target.value })}
          disabled={!!editId}>
          <option value="">-- Choisir un étudiant --</option>
          {etudiants.map(e => (
            <option key={e.id} value={e.id}>{e.nom} {e.prenom}</option>
          ))}
        </select>

        <select value={form.matiere_id}
          onChange={e => setForm({ ...form, matiere_id: e.target.value })}
          disabled={!!editId}>
          <option value="">-- Choisir une matière --</option>
          {matieres.map(m => (
            <option key={m.id} value={m.id}>{m.nom}</option>
          ))}
        </select>

        <input placeholder="Note (0-20)" type="number" min="0" max="20"
          value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })} />

        <button onClick={handleSubmit}>
          {editId ? 'Modifier' : 'Ajouter'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({ etudiant_id: '', matiere_id: '', note: '' }); }}>
          Annuler
        </button>}
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>Étudiant</th><th>Classe</th><th>Matière</th><th>Coefficient</th><th>Note</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(n => (
            <tr key={n.id}>
              <td>{n.nom} {n.prenom}</td>
              <td>{n.classe}</td>
              <td>{n.matiere}</td>
              <td>{n.coefficient}</td>
              <td style={{ fontWeight: 'bold', color: n.note >= 10 ? 'green' : 'red' }}>
                {n.note}/20
              </td>
              <td>{new Date(n.date_saisie).toLocaleDateString('fr-FR')}</td>
              <td>
                <button onClick={() => handleEdit(n)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(n.id)} style={{ marginLeft: '5px', color: 'red' }}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}