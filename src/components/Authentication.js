import jwt from "jsonwebtoken";

export function Authentication() {
    const localToken = localStorage.getItem('token');
    var decodedToken = jwt.decode(localToken);
    return decodedToken;
}
