/**
 * utils.js
 * Funciones de ayuda para el proyecto LoyalX
 */

// Selector rápido (como jQuery pero simple)
function $(selector) {
    return document.querySelector(selector);
}

// Selector de múltiples elementos
function $$(selector) {
    return document.querySelectorAll(selector);
}

// Guardar algo en LocalStorage (convierte a texto automáticamente)
function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Leer algo de LocalStorage (convierte de texto a objeto automáticamente)
function leerStorage(clave) {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
}

// Formatear número a moneda (por si se necesita futuro)
function formatearMoneda(numero) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(numero);
}
// Generar Skeleton Screen para cliente (Carga simulada)
function renderSkeletonCliente() {
    return `
        <div class="px-4 py-4 animate-pulse">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3 flex-1">
                    <div class="size-11 rounded-full bg-gray-200"></div>
                    <div class="flex-1 space-y-2">
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>
                <div class="size-10 bg-gray-200 rounded-full shrink-0"></div>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div class="bg-gray-200 h-full rounded-full w-full"></div>
            </div>
        </div>
    `;
}
