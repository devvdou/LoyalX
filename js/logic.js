/**
 * logic.js - Controlador de Negocio
 * Puro JS, sin DOM.
 */

const Logic = {
    // Calcular porcentaje de progreso
    calcularProgreso: function (sellos, total) {
        return Math.min(100, Math.max(0, (sellos / total) * 100));
    },

    // Verificar si está listo para canje
    esCanjeable: function (sellos, total) {
        return sellos >= total;
    },

    // Obtener color del tema (Tailwind classes)
    getThemeColors: function (themeName) {
        const themes = {
            amber: {
                primary: 'bg-amber-600',
                secondary: 'bg-amber-100',
                text: 'text-amber-900',
                gradient: 'from-amber-500 to-orange-600'
            },
            blue: {
                primary: 'bg-blue-600',
                secondary: 'bg-blue-100',
                text: 'text-blue-900',
                gradient: 'from-blue-500 to-indigo-600'
            }
        };
        return themes[themeName] || themes.amber;
    },

    // Estadísticas para el Dashboard
    getDashboardStats: function () {
        const clientes = DB.clientes.findAll();
        const config = DB.config.get();

        const totalClientes = clientes.length;
        const canjesPendientes = clientes.filter(c => c.sellos >= config.totalSellos).length;

        // Simulación de "Sellos Hoy" (Random para demo)
        const sellosHoy = Math.floor(Math.random() * 15) + 5;

        return {
            totalClientes,
            sellosHoy,
            canjesPendientes
        };
    }
};
