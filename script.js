// RELOJ
function reloj() {
    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString();

    document.getElementById("date").textContent =
        now.toLocaleDateString();

    const s = now.getSeconds() * 6;
    const m = now.getMinutes() * 6;
    const h = now.getHours() * 30;

    document.getElementById("second").style.transform =
        `translateX(-50%) rotate(${s}deg)`;

    document.getElementById("minute").style.transform =
        `translateX(-50%) rotate(${m}deg)`;

    document.getElementById("hour").style.transform =
        `translateX(-50%) rotate(${h}deg)`;

    if (now.getMinutes() === 0 && now.getSeconds() === 0) cucu();
}

setInterval(reloj, 1000);

// CUCÚ
function cucu() {
    const bird = document.getElementById("cucu");
    const sound = document.getElementById("sound");

    bird.style.display = "block";
    sound.play();

    setTimeout(() => bird.style.display = "none", 2000);
}

// UBICACIÓN + CLIMA
async function obtenerDatos() {
    navigator.geolocation.getCurrentPosition(async pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // Ciudad
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await res.json();

        document.getElementById("location").textContent =
            "📍 " + (data.address.city || "Tu ubicación");

        // Clima (Open-Meteo)
        const clima = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const climaData = await clima.json();

        document.getElementById("weather").textContent =
            `🌦️ ${climaData.current_weather.temperature}°C`;
    });
}

obtenerDatos();

// MODO OSCURO
function toggleModo() {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "modo",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

// Cargar modo guardado
if (localStorage.getItem("modo") === "dark") {
    document.body.classList.add("dark");
}
