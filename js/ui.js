/**
 * ui.js - Capa de Vista (Interfaz de Usuario)
 * Gestiona la manipulación del DOM, eventos y feedback visual.
 */

const UI = {
    // --- Notificaciones (Toasts) ---
    toast: function (mensaje, tipo = 'success') {
        const container = document.getElementById('toast-container') || this.createToastContainer();

        const el = document.createElement('div');
        const bgClass = tipo === 'success' ? 'bg-emerald-500' : 'bg-red-500';
        const icon = tipo === 'success' ? '✨' : '⚠️';

        el.className = `${bgClass} text-white px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-500 z-50 mb-3 backdrop-blur-md bg-opacity-90`;
        el.innerHTML = `<span class="text-xl">${icon}</span> <span class="font-medium">${mensaje}</span>`;

        container.appendChild(el);

        // Animate In
        requestAnimationFrame(() => {
            el.classList.remove('translate-y-10', 'opacity-0');
        });

        // Remove
        setTimeout(() => {
            el.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => el.remove(), 500);
        }, 3000);
    },

    createToastContainer: function () {
        const div = document.createElement('div');
        div.id = 'toast-container';
        div.className = 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center';
        document.body.appendChild(div);
        return div;
    },

    // --- Modales ---
    showRedeemModal: function (clienteName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center relative overflow-hidden shadow-2xl transform scale-90 animate-pop-in">
                <div class="absolute inset-0 bg-gradient-to-b from-amber-100/50 to-transparent pointer-events-none"></div>
                
                <div class="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce">
                    🏆
                </div>
                
                <h2 class="text-2xl font-bold text-gray-900 mb-2">¡Premio Canjeado!</h2>
                <p class="text-gray-500 mb-8">El cliente <strong class="text-amber-600">${clienteName}</strong> ha recibido su recompensa.</p>
                
                <button onclick="this.closest('.fixed').remove()" class="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-all">
                    ¡Genial!
                </button>
            </div>
            <div id="confetti-container" class="absolute inset-0 pointer-events-none"></div>
        `;
        document.body.appendChild(modal);
        this.fireConfetti();

        // Sonido opcional
        // new Audio('assets/success.mp3').play().catch(() => {});
    },

    showQRScanner: function (onFound) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in';
        modal.innerHTML = `
            <div class="relative w-full max-w-md p-6 text-center">
                <div class="w-64 h-64 mx-auto border-4 border-white/30 rounded-3xl relative overflow-hidden mb-6 bg-black">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-transparent w-full h-full animate-scan"></div>
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-scan-line"></div>
                    <p class="absolute inset-0 flex items-center justify-center text-white/50 text-sm">Cámara Activa</p>
                </div>
                <p class="text-white text-lg font-medium animate-pulse">Escaneando código QR...</p>
                <button onclick="this.closest('.fixed').remove()" class="mt-8 text-white/60 hover:text-white underline">Cancelar</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Emulación de detección exitosa tras delay
        setTimeout(() => {
            modal.remove();
            onFound();
        }, 2000);
    },

    // --- Efectos ---
    fireConfetti: function () {
        // Generación de partículas para feedback positivo
        // Se utiliza manipulación directa del DOM para rendimiento
        const colors = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981'];
        const container = document.getElementById('confetti-container');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const el = document.createElement('div');
            el.className = 'absolute w-2 h-2 rounded-full';
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.top = '-10px';
            el.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
            container.appendChild(el);
        }
    },

    // --- Renderers ---
    renderClientCard: function (cliente, config, onAdd, onRedeem) {
        const isReady = cliente.sellos >= config.totalSellos;
        const progress = Logic.calcularProgreso(cliente.sellos, config.totalSellos);

        const div = document.createElement('div');
        div.className = "bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group";

        div.innerHTML = `
            <div class="flex items-center gap-4 mb-4">
                <img src="${cliente.avatar}" alt="${cliente.nombre}" class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100">
                <div>
                    <h3 class="font-bold text-gray-900">${cliente.nombre}</h3>
                    <p class="text-xs text-gray-500">ID: #${cliente.id.toString().padStart(4, '0')}</p>
                </div>
            </div>
            
            <div class="mb-4">
                <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="${isReady ? 'text-amber-600' : 'text-gray-400'}">${cliente.sellos} / ${config.totalSellos} Sellos</span>
                    <span class="text-gray-300">${Math.round(progress)}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500 ${isReady ? 'bg-amber-500' : 'bg-blue-500'}" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="flex gap-2">
                ${isReady
                ? `<button onclick="handleRedeem(${cliente.id})" class="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-all transform hover:scale-105 animate-pulse">
                         🏆 CANJEAR
                       </button>`
                : `<button onclick="handleAddStamp(${cliente.id})" class="flex-1 py-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl font-semibold transition-all active:scale-95">
                         ➕ Sello
                       </button>`
            }
            </div>
        `;
        return div;
    }
};
