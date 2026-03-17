import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Etudiants
export const getEtudiants   = () => API.get('/etudiants');
export const addEtudiant    = (data) => API.post('/etudiants', data);
export const updateEtudiant = (id, data) => API.put(`/etudiants/${id}`, data);
export const deleteEtudiant = (id) => API.delete(`/etudiants/${id}`);

// Matieres
export const getMatieres   = () => API.get('/matieres');
export const addMatiere    = (data) => API.post('/matieres', data);
export const updateMatiere = (id, data) => API.put(`/matieres/${id}`, data);
export const deleteMatiere = (id) => API.delete(`/matieres/${id}`);

// Notes
export const getNotes   = () => API.get('/notes');
export const addNote    = (data) => API.post('/notes', data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);