/**
 * db.js - Capa de Modelo (Persistencia)
 * Gestiona el almacenamiento local y la integridad de los datos.
 */

const DB = {
    KEY: 'loyalx_data_v1',

    // Datos Semilla (Initial State) para demostración
    initialData: {
        config: {
            nombreNegocio: "Café Valdivia ☕",
            imagenBanner: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
            totalSellos: 10,
            tema: "amber" // amber, blue, rose, emerald
        },
        clientes: [
            {
                id: 1,
                nombre: "Sofía Martínez",
                avatar: "https://i.pravatar.cc/150?u=1",
                sellos: 9,
                historial: [
                    { fecha: "2023-11-20", accion: "Sello recibido" },
                    { fecha: "2023-11-22", accion: "Sello recibido" },
                    { fecha: "2023-11-24", accion: "Sello recibido" }
                ]
            },
            {
                id: 2,
                nombre: "Diego Rivas",
                avatar: "https://i.pravatar.cc/150?u=2",
                sellos: 4,
                historial: [
                    { fecha: "2023-11-24", accion: "Sello recibido" }
                ]
            },
            {
                id: 3,
                nombre: "Camila Vallejo",
                avatar: "https://i.pravatar.cc/150?u=3",
                sellos: 10,
                historial: [
                    { fecha: "2023-11-10", accion: "Sello recibido" },
                    { fecha: "2023-11-15", accion: "Sello recibido" },
                    { fecha: "2023-11-25", accion: "¡Tarjeta Completada!" }
                ]
            },
            {
                id: 4,
                nombre: "Nuevo Usuario",
                avatar: "https://ui-avatars.com/api/?name=Nuevo+Usuario&background=random",
                sellos: 0,
                historial: []
            }
        ]
    },

    // Inicialización del Singleton de Base de Datos
    init: function () {
        // Verificamos si existe persistencia previa para evitar sobrescritura
        if (!localStorage.getItem(this.KEY)) {
            console.log("DB: Inicializando esquema de datos base...");
            this.save(this.initialData);
        }
    },

    // CRUD Básico
    // Persistencia en LocalStorage (Justificación: Reducción de latencia para MVP)
    save: function (data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },

    load: function () {
        return JSON.parse(localStorage.getItem(this.KEY)) || this.initialData;
    },

    reset: function () {
        localStorage.removeItem(this.KEY);
        this.init();
        return this.load();
    },

    // --- Métodos de Acceso a Datos (DAO) ---
    clientes: {
        findAll: function () {
            return DB.load().clientes;
        },
        findById: function (id) {
            return DB.load().clientes.find(c => c.id === id);
        },
        addSello: function (id) {
            const data = DB.load();
            const cliente = data.clientes.find(c => c.id === id);
            const config = data.config;

            if (cliente && cliente.sellos < config.totalSellos) {
                cliente.sellos++;
                cliente.historial.unshift({
                    fecha: new Date().toLocaleDateString(),
                    accion: "Sello recibido"
                });
                DB.save(data);
                return true;
            }
            return false;
        },
        canjear: function (id) {
            const data = DB.load();
            const cliente = data.clientes.find(c => c.id === id);
            const config = data.config;

            if (cliente && cliente.sellos >= config.totalSellos) {
                cliente.sellos = 0;
                cliente.historial.unshift({
                    fecha: new Date().toLocaleDateString(),
                    accion: "🏆 Premio Canjeado"
                });
                DB.save(data);
                return true;
            }
            return false;
        }
    },

    // --- API Config ---
    config: {
        get: function () {
            return DB.load().config;
        }
    }
};

// Auto-init
DB.init();
