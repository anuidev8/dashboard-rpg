'use client';
import React, { useState } from 'react';
import styles from './css/AdminPanel.module.css';

const AdminPanel: React.FC = () => {
  const [newQuest, setNewQuest] = useState({ title: '', xp: 0 });

  const addQuest = () => {
    // Aquí deberíamos añadir la lógica para crear un nuevo quest
    // y actualizar el estado global
    console.log('Añadir nueva misión:', newQuest);
    setNewQuest({ title: '', xp: 0 });
  };

  return (
    <div className={styles.adminPanel}>
      <h2>Panel de Administración</h2>
      <div>
        <input
          type="text"
          value={newQuest.title}
          onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
          placeholder="Título de la misión"
        />
        <input
          type="number"
          value={newQuest.xp}
          onChange={(e) => setNewQuest({ ...newQuest, xp: Number(e.target.value) })}
          placeholder="XP"
        />
        <button onClick={addQuest}>Añadir Misión</button>
      </div>
    </div>
  );
};

export default AdminPanel;
