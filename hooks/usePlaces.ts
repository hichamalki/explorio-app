import { useEffect, useMemo, useState } from 'react';
import { fetchPlaces } from '../services/Place.service';

type Options = {
    q?: string,
    cities?: string[],
    tags?: string[],
    ratings?: number[],
    minRating?: number,
    lat?: number,
    lng?: number,
    radius?: number,
    page?: number,
    limit?: number
};

export function usePlaces(options: Options = {}) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    const queryString = useMemo(() => {
        const query = new URLSearchParams();

        if (options.q !== undefined && (options?.q.length === 0 || options?.q.length > 2)) query.append('q', options.q);
        if (options.minRating) query.append('minRating', options.minRating.toString());
        if (options.radius) query.append('radius', options.radius.toString());
        if (options.lat) query.append('lat', options.lat.toString());
        if (options.lng) query.append('lng', options.lng.toString());
        if (options.page) query.append('page', options.page.toString());
        if (options.limit) query.append('limit', options.limit.toString());

        if (options.cities?.length) {
            options.cities.forEach(city => query.append('cities', city));
        }

        if (options.tags?.length) {
            options.tags.forEach(tag => query.append('tags', tag));
        }

        if (options.ratings?.length) {
            options.ratings.forEach(rating => query.append('ratings', rating.toString()));
        }

        return query.toString();
    }, [
        options.q,
        options.cities?.join(','),
        options.tags?.join(','),
        options.ratings?.join(','),
        options.minRating,
        options.lat,
        options.lng,
        options.radius,
        options.page,
        options.limit
    ]);

    useEffect(() => {
            setLoading(true);
            fetchPlaces(queryString)
                .then(data => {
                    setPlaces((prev: any) => {
                        if (options.page && options.page > 1) {
                            return {
                                ...data,
                                places: [...(prev?.places || []), ...data.places]
                            };
                        } else {
                            return data;
                        }
                    });
                })
                .finally(() => setLoading(false));
    }, [queryString]);

    return { places, loading };
}