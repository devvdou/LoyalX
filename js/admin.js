/**
 * admin.js
 * Lógica para el Dashboard del Comerciante
 * Refactorizado para MVC
 */

import { Logic } from './logic.js';

document.addEventListener('DOMContentLoaded', () => {
    // Verificar sesión (Asumimos que checkAuth sigue en session.js global por ahora, 
    // o idealmente deberíamos modularizarlo también, pero para no romper todo de golpe:
    // window.checkAuth viene de session.js que NO es módulo aún. 
    // PRECAUCIÓN: Al hacer admin.js module, el scope cambia.

    if (typeof window.checkAuth === 'function') {
        const session = window.checkAuth();
        if (!session || session.rol !== 'comerciante') {
            window.location.assign('index.html');
            /**
             * admin.js
             * Lógica para el Dashboard del Comerciante
             * Refactorizado para MVC
             */

            import { Logic } from './logic.js';

            document.addEventListener('DOMContentLoaded', () => {
                // Verificar sesión (Asumimos que checkAuth sigue en session.js global por ahora, 
                // o idealmente deberíamos modularizarlo también, pero para no romper todo de golpe:
                // window.checkAuth viene de session.js que NO es módulo aún. 
                // PRECAUCIÓN: Al hacer admin.js module, el scope cambia.

                if (typeof window.checkAuth === 'function') {
                    const session = window.checkAuth();
                    if (!session || session.rol !== 'comerciante') {
                        window.location.assign('index.html');
                        return;
                    }
                }

                renderizarInfoLocal();
                renderizarClientes();
                renderizarHistorialAdmin();
                configurarBotones();

                // Escuchar cambios en LocalStorage (Sincronización)
                window.addEventListener('storage', (e) => {
                    if (e.key.startsWith('loyalx_db_')) {
                        console.log("Datos actualizados externamente...");
                        renderizarInfoLocal();
                        renderizarClientes(false);
                        renderizarHistorialAdmin();
                    }
                });
            });

            function renderizarInfoLocal() {
                const config = Logic.obtenerConfig();

                // Actualizar textos del local
                const tituloLocal = document.querySelector('h2.font-heading');
                if (tituloLocal) tituloLocal.textContent = config.nombre_local;

                // Actualizar sellos necesarios y recompensa
                const infoItems = document.querySelectorAll('.bg-accent .space-y-3 .flex span');
                if (infoItems.length >= 2) {
                    infoItems[0].textContent = `${config.total_sellos} sellos necesarios`;
                    infoItems[1].textContent = `Recompensa: ${config.recompensa}`;
                }
            }

            function renderizarHistorialAdmin() {
                const contenedor = document.getElementById('lista-transacciones-admin');
                if (!contenedor) return;

                const transacciones = Logic.obtenerUltimasTransacciones(5);

                if (transacciones.length === 0) {
                    contenedor.innerHTML = '<p class="text-center text-muted-foreground text-xs py-2">Sin movimientos recientes</p>';
                    return;
                }

                contenedor.innerHTML = transacciones.map(t => {
                    const fecha = new Date(t.fecha);
                    const hora = `${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`;

                    let icon = 'solar:record-circle-outline';
                    let color = 'text-gray-500';
                    let bg = 'bg-gray-100';

                    if (t.tipo_accion === 'SELLO') { icon = 'solar:check-circle-bold'; color = 'text-green-600'; bg = 'bg-green-100'; }
                    if (t.tipo_accion === 'CANJE') { icon = 'solar:gift-bold'; color = 'text-amber-600'; bg = 'bg-amber-100'; }
                    if (t.tipo_accion === 'ALTA') { icon = 'solar:user-bold'; color = 'text-blue-600'; bg = 'bg-blue-100'; }

                    return `
        <div class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <div class="size-8 rounded-full ${bg} flex items-center justify-center ${color} shrink-0">
                <iconify-icon icon="${icon}" class="size-4"></iconify-icon>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-foreground truncate">${t.cliente_nombre}</p>
                <p class="text-xs text-muted-foreground truncate">${t.detalle || t.tipo_accion}</p>
            </div>
            <span class="text-xs font-mono text-muted-foreground">${hora}</span>
        </div>
        `;
                }).join('');
            }

            function renderizarClientes(usarSkeleton = true) {
                const contenedor = document.getElementById('lista-clientes');
                if (!contenedor) return;

                if (usarSkeleton) {
                    // Renderizar skeleton (Asumimos que renderSkeletonCliente es global en utils.js)
                    if (typeof window.renderSkeletonCliente === 'function') {
                        contenedor.innerHTML = window.renderSkeletonCliente().repeat(3);
                    }

                    setTimeout(() => {
                        pintarListaReal(contenedor);
                    }, 600);
                } else {
                    pintarListaReal(contenedor);
                }
            }

            function pintarListaReal(contenedor) {
                const clientes = Logic.obtenerClientes();
                const config = Logic.obtenerConfig();

                contenedor.innerHTML = '';

                if (clientes.length === 0) {
                    contenedor.innerHTML = '<p class="text-center text-muted-foreground py-8">No hay clientes activos</p>';
                    return;
                }

                // Ordenar: primero los que tienen más sellos
                clientes.sort((a, b) => b.sellos - a.sellos);

                clientes.forEach(cliente => {
                    const porcentaje = (cliente.sellos / config.total_sellos) * 100;
                    const porcentajeAncho = porcentaje > 100 ? 100 : porcentaje;
                    const esCompletado = cliente.sellos >= config.total_sellos;

                    let botonHtml = '';
                    if (esCompletado) {
                        botonHtml = `
                <button
                    onclick="window.manejarCanje(${cliente.id})"
                    class="h-10 px-4 bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-amber-200 transition-all shrink-0 cursor-pointer active:scale-95 gap-2 animate-pulse"
                >
                    <iconify-icon icon="solar:gift-bold" class="size-5"></iconify-icon>
                    <span>CANJEAR</span>
                </button>
            `;
                    } else {
                        botonHtml = `
                <button
                    onclick="window.sumarSello(${cliente.id})"
                    class="size-10 bg-secondary hover:bg-primary rounded-full flex items-center justify-center text-primary hover:text-white transition-colors shrink-0 cursor-pointer active:scale-95"
                >
                    <iconify-icon icon="solar:add-circle-bold" class="size-5"></iconify-icon>
                </button>
            `;
                    }

                    const html = `
            <div class="px-4 py-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3 flex-1">
                        <img
                            src="${cliente.avatar}"
                            alt="${cliente.nombre}"
                            class="size-11 rounded-full border border-border"
                        >
                        <div class="flex-1">
                            <h3 class="text-base font-semibold text-foreground">${cliente.nombre}</h3>
                            <p class="text-sm text-muted-foreground">${cliente.sellos} de ${config.total_sellos} sellos</p>
                        </div>
                    </div>
                    ${botonHtml}
                </div>
                <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                        class="bg-primary h-full rounded-full transition-all duration-500 ease-out ${esCompletado ? 'bg-amber-400' : ''}"
                        style="width: ${porcentajeAncho}%"
                    ></div>
                </div>
            </div>
        `;

                    contenedor.innerHTML += html;
                });
            }

            // === HANDLERS (Expuestos a window para onclick) ===

            window.sumarSello = function (id) {
                try {
                    Logic.agregarSello(id);
                    renderizarClientes(false);
                    renderizarHistorialAdmin(); // Actualizar historial
                    if (window.showToast) window.showToast('Sello agregado exitosamente', 'success');
                } catch (e) {
                    if (window.showToast) window.showToast(e.message, 'error');
                }
            };

            window.manejarCanje = function (id) {
                if (window.showConfirmModal) {
                    window.showConfirmModal(
                        '🎁 ¿Confirmar canje de recompensa? Esto reiniciará la tarjeta del cliente.',
                        () => {
                            try {
                                Logic.canjearPremio(id);
                                renderizarClientes(false);
                                renderizarHistorialAdmin(); // Actualizar historial
                                if (window.showToast) window.showToast('¡Premio canjeado!', 'success');
                                if (window.showRewardModal) window.showRewardModal();
                            } catch (e) {
                                if (window.showToast) window.showToast(e.message, 'error');
                            }
                        }
                    );
                }
            };

            window.confirmarNuevoCliente = function () {
                const input = document.getElementById('input-nombre-cliente');
                const nombre = input.value.trim();

                try {
                    Logic.registrarCliente(nombre);
                    if (window.cerrarModalNuevoCliente) window.cerrarModalNuevoCliente();
                    renderizarClientes(false);
                    renderizarHistorialAdmin(); // Actualizar historial
                    if (window.showToast) window.showToast(`Cliente "${nombre}" registrado`, 'success');
                } catch (e) {
                    if (window.showToast) window.showToast(e.message, 'error');
                }
            };

            function configurarBotones() {
                // Botón editar tarjeta
                const btnEditar = document.querySelector('button:has(iconify-icon[icon="solar:pen-bold"])');
                if (btnEditar) {
                    btnEditar.onclick = () => {
                        window.location.href = 'editar-tarjeta.html';
                    };
                }

                // Botón inicio (footer)
                const btnInicio = document.querySelector('button:has(iconify-icon[icon="solar:home-2-bold"])');
                if (btnInicio) {
                    btnInicio.onclick = () => {
                        window.location.href = 'index.html';
                    };
                }
            }

            // Re-conectar modales UI (que ya estaban en window o ui.js)
            // Aseguramos que las funciones de UI sigan disponibles
            // Hacer funciones globales para que el HTML pueda llamarlas (onclick)
            window.sumarSello = sumarSello;
            window.manejarCanje = manejarCanje;
            window.abrirModalNuevoCliente = abrirModalNuevoCliente;
            window.cerrarModalNuevoCliente = cerrarModalNuevoCliente;
            window.confirmarNuevoCliente = confirmarNuevoCliente;
            window.renderizarHistorialAdmin = renderizarHistorialAdmin;
        });
