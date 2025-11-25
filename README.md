# LoyalX - Sistema de Fidelización SaaS 🚀

Bienvenido al repositorio de **LoyalX**. Este es un prototipo funcional de una aplicación web para gestionar la fidelización de clientes (tarjetas de sellos digitales), diseñada con un enfoque moderno y profesional.

## 📖 ¿Qué es este proyecto?
Es una simulación de una plataforma SaaS (Software as a Service) donde:
1.  **El Comerciante** tiene un panel para gestionar clientes, dar sellos y canjear premios.
2.  **El Cliente** tiene una "billetera digital" web para ver su progreso y recompensas.

Todo funciona en el navegador sin necesidad de base de datos real (usamos `localStorage`), lo que lo hace perfecto para demostraciones y portafolios.

---

## 📂 Estructura del Código (Explicación Sencilla)

El proyecto sigue una arquitectura limpia para que sea fácil de estudiar y modificar.

### 1. Las Vistas (HTML)
Son las páginas que ve el usuario. Usamos **Tailwind CSS** para que se vean bien en celular y PC.
*   `index.html`: La página de presentación (Landing Page).
*   `admin.html`: El panel de control del dueño del negocio.
*   `cliente.html`: La vista móvil que tendría el cliente final.
*   `config.html`: Página para cambiar el nombre del local o la cantidad de sellos.

### 2. La Lógica (JavaScript)
Dividimos el código en 3 partes para mantenerlo ordenado (Patrón MVC simplificado):

*   **`js/db.js` (El Modelo de Datos):**
    *   Es como nuestra base de datos.
    *   Usa `localStorage` para que los datos no se borren al recargar la página.
    *   **Dato Curioso:** Si la app está vacía, inyecta automáticamente datos de prueba ("Café Valdivia", clientes con avatares, etc.) para que no empieces desde cero.

*   **`js/logic.js` (El Cerebro):**
    *   Aquí están las reglas del negocio.
    *   Ejemplo: ¿Cuántos sellos faltan? ¿El cliente ya puede canjear? ¿Qué color de tema usar?
    *   No toca el diseño, solo hace cálculos.

*   **`js/ui.js` (La Interfaz):**
    *   Se encarga de la "magia" visual.
    *   Muestra las notificaciones flotantes (Toasts).
    *   Lanza el confeti 🎉 cuando alguien gana un premio.
    *   Genera las tarjetas de los clientes dinámicamente.

### 3. Estilos (CSS)
*   `css/styles.css`: Aunque usamos Tailwind, aquí agregamos las animaciones personalizadas (como el escáner QR o el efecto de entrada) y los estilos de "vidrio" (Glassmorphism).

---

## 🛠️ Cómo probarlo

1.  **Descarga** este repositorio.
2.  Abre el archivo `index.html` en tu navegador (Chrome, Edge, Firefox).
3.  ¡Listo! No necesitas instalar servidores ni Node.js.

### Pruebas sugeridas:
1.  Entra como **Comerciante** y dale un sello a "Sofía". Verás la notificación.
2.  Busca a "Camila" (que ya tiene 10 sellos) y dale a **Canjear**. ¡Disfruta el confeti!
3.  Ve a **Configuración** y cambia el nombre del negocio. Verás que se actualiza en la vista del Cliente.

---

Hecho con ❤️ para el curso de Desarrollo Web.
