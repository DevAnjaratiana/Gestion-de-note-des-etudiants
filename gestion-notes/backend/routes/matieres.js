const router = require('express').Router();
const db = require('../db');

// Lister toutes les matières
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM matieres');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter une matière
router.post('/', async (req, res) => {
  try {
    const { nom, coefficient } = req.body;
    const [result] = await db.query(
      'INSERT INTO matieres (nom, coefficient) VALUES (?, ?)',
      [nom, coefficient]
    );
    res.json({ id: result.insertId, nom, coefficient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier une matière
router.put('/:id', async (req, res) => {
  try {
    const { nom, coefficient } = req.body;
    await db.query(
      'UPDATE matieres SET nom=?, coefficient=? WHERE id=?',
      [nom, coefficient, req.params.id]
    );
    res.json({ message: 'Matière mise à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une matière
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM matieres WHERE id=?', [req.params.id]);
    res.json({ message: 'Matière supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;