/**
 * session.js
 * Manejo de sesión simulada para LoyalX
 */

const SESSION_KEY = 'loyalx_session';

// Iniciar sesión simulada
function iniciarSesion(rol, id = null) {
    const session = {
        rol: rol, // 'cliente' | 'comerciante'
        id: id,   // ID del cliente (solo si es rol cliente)
        timestamp: new Date().getTime()
    };

    guardarStorage(SESSION_KEY, session);
    console.log(`Sesión iniciada como ${rol}`);
}

// Verificar si hay sesión activa
function checkAuth() {
    const session = leerStorage(SESSION_KEY);

    if (!session) {
        console.warn("No hay sesión activa. Redirigiendo al inicio...");
        window.location.assign('index.html');
        return null;
    }

    return session;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem(SESSION_KEY);
    console.log("Sesión cerrada");
    window.location.assign('index.html');
}

// Obtener usuario actual sin redirigir (para uso en lógica)
function getUsuarioActual() {
    return leerStorage(SESSION_KEY);
}
