const router = require('express').Router();
const db = require('../db');

// Lister tous les étudiants
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM etudiants');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un étudiant
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, classe } = req.body;
    const [result] = await db.query(
      'INSERT INTO etudiants (nom, prenom, email, classe) VALUES (?, ?, ?, ?)',
      [nom, prenom, email, classe]
    );
    res.json({ id: result.insertId, nom, prenom, email, classe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier un étudiant
router.put('/:id', async (req, res) => {
  try {
    const { nom, prenom, email, classe } = req.body;
    await db.query(
      'UPDATE etudiants SET nom=?, prenom=?, email=?, classe=? WHERE id=?',
      [nom, prenom, email, classe, req.params.id]
    );
    res.json({ message: 'Étudiant mis à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un étudiant
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM etudiants WHERE id=?', [req.params.id]);
    res.json({ message: 'Étudiant supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;