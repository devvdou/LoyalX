/**
 * cliente.js
 * Lógica para la vista del Cliente
 * Refactorizado para MVC
 */

import { Logic } from './logic.js';

document.addEventListener('DOMContentLoaded', () => {
    // Verificar sesión (Asumimos checkAuth global)
    if (typeof window.checkAuth === 'function') {
        const session = window.checkAuth();
        if (!session || session.rol !== 'cliente') {
            window.location.assign('index.html');
            return;
        }

        const CLIENTE_ID = session.id;
        cargarDatosCliente(CLIENTE_ID);

        // Escuchar cambios en LocalStorage
        window.addEventListener('storage', (e) => {
            if (e.key.startsWith('loyalx_db_')) {
                console.log("Datos actualizados externamente...");
                cargarDatosCliente(CLIENTE_ID);
            }
        });
    }
});

function cargarDatosCliente(id) {
    const config = Logic.obtenerConfig();
    const cliente = Logic.obtenerCliente(id);

    if (!cliente) {
        console.error("Cliente no encontrado, redirigiendo...");
        window.location.assign('index.html');
        return;
    }

    // Actualizar Header
    const avatarImg = document.getElementById('cliente-avatar');
    const nombreTxt = document.getElementById('cliente-nombre');

    if (avatarImg) avatarImg.src = cliente.avatar;
    if (nombreTxt) nombreTxt.textContent = `Hola, ${cliente.nombre.split(' ')[0]}`;

    // Actualizar Info del Local
    const localTxt = document.getElementById('nombre-local');
    const recompensaTxt = document.getElementById('recompensa-texto');

    if (localTxt) localTxt.textContent = config.nombre_local;
    if (recompensaTxt) recompensaTxt.textContent = config.recompensa;

    // Renderizar Sellos
    renderizarGridSellos(cliente.sellos, config.total_sellos);

    // Actualizar Mensaje de Faltantes
    const faltantes = config.total_sellos - cliente.sellos;
    const mensajeFaltantes = document.getElementById('mensaje-faltantes');

    if (mensajeFaltantes) {
        if (faltantes > 0) {
            mensajeFaltantes.innerHTML = `¡Te faltan <b>${faltantes}</b> sellos para tu recompensa!`;
            mensajeFaltantes.classList.remove('text-green-600');
        } else {
            mensajeFaltantes.innerHTML = `¡Felicidades! Ya tienes tu recompensa 🎉`;
            mensajeFaltantes.classList.add('text-green-600');

            // Mostrar modal de celebración (solo la primera vez al cargar)
            if (!sessionStorage.getItem('reward_shown_' + id)) {
                setTimeout(() => {
                    if (window.showRewardModal) window.showRewardModal(config.nombre_local, config.recompensa);
                    sessionStorage.setItem('reward_shown_' + id, 'true');
                }, 500);
            }
        }
    }

    // Actualizar Barra de Progreso
    const barraProgreso = document.getElementById('barra-progreso');
    if (barraProgreso) {
        const porcentaje = (cliente.sellos / config.total_sellos) * 100;
        barraProgreso.style.width = `${porcentaje}%`;
    }
}

function renderizarGridSellos(actuales, totales) {
    const grid = document.getElementById('grid-sellos');
    if (!grid) return;

    grid.innerHTML = '';

    for (let i = 1; i <= totales; i++) {
        const esObtenido = i <= actuales;

        // Estilos condicionales
        const bgClass = esObtenido ? 'bg-primary text-white shadow-md scale-105' : 'bg-muted text-muted-foreground/50';
        const iconClass = esObtenido ? 'solar:verified-check-bold' : 'solar:star-bold';

        const selloHtml = `
            <div class="aspect-square rounded-full flex items-center justify-center transition-all duration-500 ${bgClass}">
                <iconify-icon icon="${iconClass}" class="size-6 md:size-8"></iconify-icon>
            </div>
        `;

        grid.innerHTML += selloHtml;
    }
}

// === LÓGICA MODAL HISTORIAL ===
window.verHistorial = function () {
    if (typeof window.checkAuth !== 'function') return;
    const session = window.checkAuth();
    if (!session) return;

    const historial = Logic.obtenerHistorialCliente(session.id);

    const modal = document.getElementById('modal-historial');
    const content = document.getElementById('modal-content-historial');
    const lista = document.getElementById('lista-historial');

    // Renderizar historial
    if (!historial || historial.length === 0) {
        lista.innerHTML = `
            <div class="text-center py-8">
                <iconify-icon icon="solar:file-text-bold" class="size-16 text-muted-foreground/30 mb-3"></iconify-icon>
                <p class="text-sm text-muted-foreground">No hay actividad registrada</p>
            </div>
        `;
    } else {
        lista.innerHTML = historial.map(t => {
            // Formatear fecha bonita
            const fecha = new Date(t.fecha);
            const fechaStr = `${fecha.getDate()}/${fecha.getMonth() + 1} - ${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`;

            // Icono según tipo
            let icon = 'solar:record-circle-outline';
            if (t.tipo_accion === 'SELLO') icon = 'solar:check-circle-bold';
            if (t.tipo_accion === 'CANJE') icon = 'solar:gift-bold';
            if (t.tipo_accion === 'ALTA') icon = 'solar:user-bold';

            return `
            <div class="bg-muted/50 rounded-xl p-3 border border-border flex items-center gap-3">
                <iconify-icon icon="${icon}" class="text-primary"></iconify-icon>
                <div>
                    <p class="text-sm text-foreground font-medium">${t.detalle || t.tipo_accion}</p>
                    <p class="text-xs text-muted-foreground">${fechaStr}</p>
                </div>
            </div>
            `;
        }).join('');
    }

    // Mostrar modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('translate-y-full');
    }, 10);
};

window.cerrarHistorial = function () {
    const modal = document.getElementById('modal-historial');
    const content = document.getElementById('modal-content-historial');

    content.classList.add('translate-y-full');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};


