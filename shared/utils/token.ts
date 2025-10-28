import { jwtDecode } from "jwt-decode";

export const expired = (token: string): boolean => {
    const decoded = jwtDecode(token);
    return !!decoded && !!decoded.exp && (decoded.exp < Date.now() / 1000);
}