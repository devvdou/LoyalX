/**
 * config-local.js
 * Lógica para la página de edición de tarjeta
 */

document.addEventListener('DOMContentLoaded', () => {
    // Verificar sesión
    const session = checkAuth();
    if (!session || session.rol !== 'comerciante') {
        window.location.assign('index.html');
        return;
    }

    const config = obtenerConfig();

    // Cargar valores actuales
    const inputs = $$('input');
    if (inputs.length >= 3) {
        inputs[0].value = config.nombreLocal;
        inputs[1].value = config.recompensa;
        inputs[2].value = config.sellosTotales;
    }

    // Guardar cambios
    const btnGuardar = $('button.bg-primary');
    if (btnGuardar) {
        btnGuardar.onclick = () => {
            const nuevosDatos = obtenerDatos();
            nuevosDatos.config.nombreLocal = inputs[0].value;
            nuevosDatos.config.recompensa = inputs[1].value;
            nuevosDatos.config.sellosTotales = parseInt(inputs[2].value);

            guardarTodo(nuevosDatos);
            showToast('Cambios guardados correctamente', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard-comerciante.html';
            }, 800);
        };
    }

    // Cancelar
    const btnCancelar = $('button.bg-transparent');
    if (btnCancelar) {
        btnCancelar.onclick = () => {
            window.location.href = 'dashboard-comerciante.html';
        };
    }

    // Cerrar (X)
    const btnCerrar = $('button:has(iconify-icon[icon="solar:close-circle-bold"])');
    if (btnCerrar) {
        btnCerrar.onclick = () => {
            window.location.href = 'dashboard-comerciante.html';
        };
    }
});
