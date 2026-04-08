import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';

export const useDinosaurs = (sorted = true) => {
  const [dinosaurs, setDinosaurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dinosaursRef = ref(database, 'dinosaurs');

    const unsubscribe = onValue(
      dinosaursRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let dinoList = Object.values(data);
          if (sorted) {
            dinoList = dinoList.sort((a, b) => b.tally - a.tally);
          }
          setDinosaurs(dinoList);
        } else {
          setDinosaurs([]);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sorted]);

  return { dinosaurs, loading, error };
};
