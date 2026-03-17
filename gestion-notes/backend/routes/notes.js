const router = require('express').Router();
const db = require('../db');

// Lister toutes les notes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT n.id, n.note, n.date_saisie,
             e.nom, e.prenom, e.classe,
             m.nom AS matiere, m.coefficient
      FROM notes n
      JOIN etudiants e ON n.etudiant_id = e.id
      JOIN matieres m ON n.matiere_id = m.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter une note
router.post('/', async (req, res) => {
  try {
    const { etudiant_id, matiere_id, note } = req.body;
    const [result] = await db.query(
      'INSERT INTO notes (etudiant_id, matiere_id, note) VALUES (?, ?, ?)',
      [etudiant_id, matiere_id, note]
    );
    res.json({ id: result.insertId, etudiant_id, matiere_id, note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier une note
router.put('/:id', async (req, res) => {
  try {
    const { note } = req.body;
    await db.query(
      'UPDATE notes SET note=? WHERE id=?',
      [note, req.params.id]
    );
    res.json({ message: 'Note mise à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une note
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM notes WHERE id=?', [req.params.id]);
    res.json({ message: 'Note supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;