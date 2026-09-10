// Returns true if a token exists in localStorage (user is logged in), false otherwise
export function checkAuthentication() {
    const token = localStorage.getItem('token');
    return !!token;
}