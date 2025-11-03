import { useEffect, useState } from 'react';
import { fetchCities } from '../services/Settings.service'; // adapte le chemin si nécessaire

type City = {
  _id: string;
  title: string;
  image: string;
  count: number;
};

export const useCities = (category?: string) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCities(category || '');
        setCities(data);
      } catch (err: any) {
        console.error('❌ useCities error:', err);
        setError(err.message || 'Erreur lors du chargement des villes');
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, [category]);

  return { cities, loading, error };
};