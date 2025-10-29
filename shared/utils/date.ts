export const expired = (date: Date): boolean => {
    const last = new Date(date).getTime();
    const now = Date.now();
    const diffInMs = now - last;
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
    return diffInMs > twentyFourHoursInMs;

}