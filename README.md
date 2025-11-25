# LoyalX - Sistema de Fidelización

¡Hola! Aquí te dejo el proyecto base para LoyalX. Ya está funcional y tiene una arquitectura bastante limpia para que podamos trabajar sobre él sin perdernos.

## 📂 Estructura del Proyecto

El código está organizado siguiendo el patrón **MVC (Modelo-Vista-Controlador)**, pero simplificado para que sea fácil de entender:

*   **`index.html`**: Es la página de inicio (Landing Page).
*   **`admin.html`**: El panel de control para el dueño del negocio.
*   **`cliente.html`**: La vista que ve el cliente en su celular (tipo Wallet).
*   **`config.html`**: Página para cambiar el nombre del local, sellos, etc.

### 🧠 La Lógica (Carpeta `js/`)

1.  **`db.js` (El Cerebro de Datos):**
    *   Aquí es donde guardamos todo.
    *   No usamos base de datos real (SQL) todavía. Usamos `localStorage` del navegador.
    *   Si cierras la pestaña, los datos **no se borran**.
    *   Tiene una función `init()` que crea datos de prueba (Sofía, Diego, etc.) si es la primera vez que lo abres.

2.  **`logic.js` (Las Reglas):**
    *   Aquí están las matemáticas y reglas.
    *   Ejemplo: `calcularProgreso()` nos dice qué porcentaje de la barra llenar.
    *   **Importante:** Este archivo NO toca el HTML. Solo hace cálculos.

3.  **`ui.js` (Lo Visual):**
    *   Este archivo se encarga de todo lo que se ve y se mueve.
    *   Aquí están las funciones para mostrar las notificaciones (Toasts), los Modales y el efecto de confeti.

## 🚀 Tareas Pendientes (Para ti)

Necesito que le des una pasada al código para dejarlo listo para la entrega final. Aquí tienes lo que falta:

1.  **Limpieza de Textos "SaaS":**
    *   En el `index.html`, busca donde dice "v2.0 SaaS Edition" y bórralo o cámbialo por algo más genérico como "Versión 1.0".
    *   Revisa que no haya textos que suenen muy "técnicos" o de venta de software. Que parezca un proyecto hecho a medida.

2.  **Quitar Rastros de IA/Plantilla:**
    *   Revisa los comentarios en el código (los textos en gris en los archivos JS). Si ves algo que suene muy "generado por asistente", simplifícalo o bórralo.
    *   Asegúrate de que los nombres de las funciones te hagan sentido.

3.  **Detalles y Pulido:**
    *   Si puedes, agrega más clientes de prueba en `db.js` para que se vea más lleno.
    *   Revisa los colores en `styles.css` si quieres cambiarlos por los de nuestra marca.

4.  **Funcionalidades:**
    *   intenta completar las funcionalidades de la app para mejora rle flujop de inicio y de usuario para qu ea martin se le haga facil cuando lo presente al profesor.

## 🛠️ Cómo probarlo

Simplemente abre el archivo `index.html` en tu navegador. No necesitas instalar nada extra por ahora.

¡Cualquier duda me avisas!

