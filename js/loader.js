/**
 * loader.js
 * Carga dinámicamente los estilos centralizados para Tailwind CDN
 * Esto evita problemas con @import dentro de bloques style type="text/tailwindcss"
 */
(function () {
    fetch('css/styles.css')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar css/styles.css');
            return response.text();
        })
        .then(css => {
            const style = document.createElement('style');
            style.type = 'text/tailwindcss';
            style.textContent = css;
            document.head.appendChild(style);
        })
        .catch(error => console.error('Error cargando estilos:', error));
})();
