import { useEffect, useMemo, useState } from 'react';
import { fetchPlaces } from '../services/Place.service';

type Options = {
    city?: string,
    country?: string,
    tags?: string[],
    q?: string,
    lat?: number,
    lng?: number,
    radius?: number,
    minRating?: number,
    page?: number,
    limit?: number
};

export function usePlaces(options: Options = {}) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const queryString = useMemo(() => {
        const query = new URLSearchParams({
            ...(options.city && { city: options.city }),
            ...(options.country && { country: options.country }),
            ...(options.tags && { tags: options.tags.join(',') }),
            ...(options.q && { q: options.q }),
            ...(options.lat && { lat: options.lat.toString() }),
            ...(options.lng && { lng: options.lng.toString() }),
            ...(options.radius && { radius: options.radius?.toString() }),
            ...(options.minRating && { minRating: options.minRating?.toString() }),
            ...(options.page && { page: options.page?.toString() }),
            ...(options.limit && { limit: options.limit?.toString() }),
        });
        return query.toString();
    }, [
        options.city,
        options.country,
        options.tags?.join(','),
        options.q,
        options.lat,
        options.lng,
        options.radius,
        options.minRating,
        options.page,
        options.limit
    ]);

    useEffect(() => {
        if (queryString) {
            fetchPlaces(queryString)
                .then(data => setPlaces(data))
                .finally(() => setLoading(false));
        }
    }, [queryString]);

    return { places, loading };
}