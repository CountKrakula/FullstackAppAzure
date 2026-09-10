export function checkAuthentication() {
    const token = localStorage.getItem('token');
    return !!token;
}