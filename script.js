// Reloj completo
function actualizarReloj() {
    const now = new Date();

    // DIGITAL
    document.getElementById("time").textContent =
        now.toLocaleTimeString();

    document.getElementById("date").textContent =
        now.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

    // ANALÓGICO
    const segundos = now.getSeconds();
    const minutos = now.getMinutes();
    const horas = now.getHours();

    const secondDeg = segundos * 6;
    const minuteDeg = minutos * 6;
    const hourDeg = horas * 30 + minutos * 0.5;

    document.getElementById("second").style.transform =
        `translateX(-50%) rotate(${secondDeg}deg)`;

    document.getElementById("minute").style.transform =
        `translateX(-50%) rotate(${minuteDeg}deg)`;

    document.getElementById("hour").style.transform =
        `translateX(-50%) rotate(${hourDeg}deg)`;

    // CUCÚ cada hora
    if (minutos === 0 && segundos === 0) {
        activarCucu();
    }
}

setInterval(actualizarReloj, 1000);
actualizarReloj();

// CUCÚ PRO
function activarCucu() {
    const cucu = document.getElementById("cucu");
    const sound = document.getElementById("sound");

    cucu.style.display = "block";
    cucu.style.animation = "cucuAnim 2s";

    sound.play();

    setTimeout(() => {
        cucu.style.display = "none";
    }, 2000);
}

// UBICACIÓN + CIUDAD REAL
function obtenerUbicacion() {
    const loc = document.getElementById("location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                );
                const data = await res.json();

                const ciudad =
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    "Ubicación desconocida";

                loc.textContent = `📍 ${ciudad}`;
            } catch {
                loc.textContent = `📍 Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
            }
        });
    } else {
        loc.textContent = "No soporta geolocalización";
    }
}

obtenerUbicacion();
