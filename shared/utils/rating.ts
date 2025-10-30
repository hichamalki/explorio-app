export const ratingLabel = (rating: number): string => {
    if (rating >= 4.5) return 'Exceptionnel';
    if (rating >= 4.0) return 'Excellent';
    if (rating >= 3.5) return 'Très bien';
    if (rating >= 3.0) return 'Bien';
    if (rating >= 2.0) return 'Moyen';
    if (rating > 0) return 'À éviter';
    return 'Non noté';
}