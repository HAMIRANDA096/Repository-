// Actualizar hora y fecha
function actualizarReloj() {
    const now = new Date();

    const hora = now.toLocaleTimeString();
    const fecha = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('time').textContent = hora;
    document.getElementById('date').textContent = fecha;

    // Activar cucú cada minuto
    if (now.getSeconds() === 0) {
        mostrarCucu();
    }
}

setInterval(actualizarReloj, 1000);
actualizarReloj();

// Animación cucú
function mostrarCucu() {
    const cucu = document.getElementById('cucu');
    cucu.style.display = 'block';
    cucu.style.animation = 'cucuAnim 2s';

    setTimeout(() => {
        cucu.style.display = 'none';
    }, 2000);
}

// Obtener ubicación
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            document.getElementById('location').textContent =
                `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
        }, () => {
            document.getElementById('location').textContent =
                "No se pudo obtener la ubicación";
        });
    } else {
        document.getElementById('location').textContent =
            "Geolocalización no soportada";
    }
}

obtenerUbicacion();