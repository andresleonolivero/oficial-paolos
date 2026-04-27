// --- CONFIGURACIÓN DE FIREBASE ---
if (typeof database === 'undefined') {
    var database = firebase.database();
}

//////////////////////
let listaUsuariosLocal = {};
let userRole = "ventas";

function aplicarPermisos() {
    const elementosAdmin = document.querySelectorAll('.solo-admin');
    elementosAdmin.forEach(el => {
        userRole === 'admin' ? el.classList.remove('hidden') : el.classList.add('hidden');
    });
}

database.ref('users/admin').once('value', (snapshot) => {
    if (!snapshot.exists() || !snapshot.val().rol) {
        database.ref('users').update({
            admin: { clave: "admin123", nombre: "Admin", rol: "admin" },
            ventas: { clave: "1234", nombre: "ventas", rol: "ventas" }
        }).then(() => console.log("✅ Usuarios con roles listos en Firebase"));
    }
});

database.ref('users').on('value', (snapshot) => {
    listaUsuariosLocal = snapshot.val();
    const status = document.getElementById('debug-status');
    if (status) {
        status.innerText = "SISTEMA CONECTADO ✅";
        status.style.color = "#0f0";
    }
});

function validarAcceso() {
    const user = document.getElementById('login-user').value.toLowerCase().trim();
    const pass = document.getElementById('login-pass').value.trim();

    if (listaUsuariosLocal && listaUsuariosLocal[user]) {
        if (listaUsuariosLocal[user].clave === pass) {
            userRole = listaUsuariosLocal[user].rol || "ventas";
            entrarAlSistema(listaUsuariosLocal[user].nombre);
            aplicarPermisos();
        } else {
            mostrarError();
        }
    } else {
        mostrarError();
    }
}

function entrarAlSistema(nombre) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('user-display').innerText = nombre.toUpperCase();
    localStorage.setItem('token_paolos', nombre);
}

function mostrarError() {
    const txt = document.getElementById('error-txt');
    txt.classList.remove('hidden');
    txt.style.display = 'block';
    setTimeout(() => { txt.style.display = 'none'; }, 3000);
}

// --- MODO CLARO / OSCURO ---
function toggleModoClaro() {
    const body = document.body;
    const btn = document.getElementById('btn-tema');
    if (body.classList.contains('modo-claro')) {
        body.classList.remove('modo-claro');
        if (btn) btn.innerText = '☀️';
        localStorage.setItem('paolos_tema', 'oscuro');
    } else {
        body.classList.add('modo-claro');
        if (btn) btn.innerText = '🌙';
        localStorage.setItem('paolos_tema', 'claro');
    }
}

// --- ARRANQUE DEL SISTEMA ---
window.addEventListener('load', () => {

    // Aplicar tema guardado
    if (localStorage.getItem('paolos_tema') === 'claro') {
        document.body.classList.add('modo-claro');
        const btn = document.getElementById('btn-tema');
        if (btn) btn.innerText = '🌙';
    }

    // CSS modo claro inyectado dinámicamente
    const estiloClaro = document.createElement('style');
    estiloClaro.innerHTML = `
        body.modo-claro {
            background: #e8eaf0 !important;
            color: #2c2c3a !important;
        }
        body.modo-claro .glass-card {
            background: #f0f2f8 !important;
            border-color: #c8ccd8 !important;
            color: #2c2c3a !important;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08) !important;
        }
        body.modo-claro .product-card {
            background: #e8eaf0 !important;
            border-color: #c8ccd8 !important;
            color: #2c2c3a !important;
        }
        body.modo-claro .product-card h4,
        body.modo-claro .product-card span,
        body.modo-claro .product-card p {
            color: #2c2c3a !important;
        }
        body.modo-claro .mesa-btn,
        body.modo-claro .domicilio-btn,
        body.modo-claro .llevar-btn,
        body.modo-claro .category-btn {
            background: #dde0ea !important;
            color: #2c2c3a !important;
            border-color: #b8bcc8 !important;
        }
        body.modo-claro .mesa-btn span,
        body.modo-claro .domicilio-btn span,
        body.modo-claro .llevar-btn span {
            color: #2c2c3a !important;
        }
        body.modo-claro .btn-action {
            color: #fff !important;
        }
        body.modo-claro input,
        body.modo-claro select,
        body.modo-claro textarea {
            background: #f0f2f8 !important;
            color: #2c2c3a !important;
            border-color: #b8bcc8 !important;
        }
        body.modo-claro table,
        body.modo-claro td,
        body.modo-claro th {
            color: #2c2c3a !important;
            border-color: #c8ccd8 !important;
        }
        body.modo-claro .inv-total {
            background: #dde0ea !important;
            color: #2c2c3a !important;
        }
        body.modo-claro #login-screen {
            background: #e8eaf0 !important;
        }
        body.modo-claro .top-bar {
            background: #f0f2f8 !important;
            border-color: #c8ccd8 !important;
        }
        body.modo-claro .brand,
        body.modo-claro #user-display {
            color: #2c2c3a !important;
        }
        body.modo-claro .order-summary {
            background: #f0f2f8 !important;
            color: #2c2c3a !important;
        }
        body.modo-claro .summary-item {
            border-color: #c8ccd8 !important;
            color: #2c2c3a !important;
        }
        body.modo-claro .summary-item span,
        body.modo-claro .summary-item b {
            color: #2c2c3a !important;
        }
        body.modo-claro .flavor-item {
            background: #e8eaf0 !important;
            border-color: #c8ccd8 !important;
            color: #2c2c3a !important;
        }
        body.modo-claro .flavor-item h4,
        body.modo-claro .flavor-item span {
            color: #2c2c3a !important;
        }
        body.modo-claro .pay-btn {
            background: #dde0ea !important;
            color: #2c2c3a !important;
            border-color: #b8bcc8 !important;
        }
        body.modo-claro .pay-btn.selected {
            background: var(--accent) !important;
            color: #000 !important;
        }
        body.modo-claro #module-title {
            color: #2c2c3a !important;
        }
        body.modo-claro .menu-item {
            background: #f0f2f8 !important;
            color: #2c2c3a !important;
            border-color: #c8ccd8 !important;
        }
        body.modo-claro .menu-item span {
            color: #2c2c3a !important;
        }
        body.modo-claro small,
        body.modo-claro p,
        body.modo-claro h3,
        body.modo-claro h4,
        body.modo-claro label,
        body.modo-claro b,
        body.modo-claro strong {
            color: #2c2c3a !important;
        }

        /* PANTALLA GRANDE - mejor aprovechamiento de espacio */
        @media (min-width: 1200px) {
            #dashboard {
                max-width: 1400px !important;
                margin: 0 auto !important;
            }
            #module-selector {
                display: grid !important;
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 20px !important;
                padding: 30px !important;
            }
            .tables-grid {
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 20px !important;
            }
            .products-grid {
                grid-template-columns: repeat(4, 1fr) !important;
            }
            .glass-card {
                padding: 24px !important;
            }
            #work-area {
                max-width: 1200px !important;
                margin: 0 auto !important;
            }
        }
        @media (min-width: 1600px) {
            #module-selector {
                grid-template-columns: repeat(5, 1fr) !important;
            }
            .products-grid {
                grid-template-columns: repeat(5, 1fr) !important;
            }
        }
    `;
    document.head.appendChild(estiloClaro);

    // Sincronización de Usuarios y Sesión
    database.ref('users').on('value', (snapshot) => {
        listaUsuariosLocal = snapshot.val();
        const status = document.getElementById('debug-status');
        if (status) {
            status.innerText = "SISTEMA CONECTADO ✅";
            status.style.color = "#0f0";
        }
        const sesion = localStorage.getItem('token_paolos');
        if (sesion && listaUsuariosLocal && listaUsuariosLocal[sesion.toLowerCase()]) {
            userRole = listaUsuariosLocal[sesion.toLowerCase()].rol || "ventas";
            entrarAlSistema(sesion);
            aplicarPermisos();
        }
    });

    // Sincronización de GASTOS
    database.ref('paolos_gastos_actuales').on('value', (snapshot) => {
        const data = snapshot.val();
        Gastos = data ? Object.keys(data).map(key => ({ idFirebase: key, ...data[key] })) : [];
        localStorage.setItem('paolos_gastos_turno', JSON.stringify(Gastos));
        if (document.getElementById('work-area') && !document.getElementById('work-area').classList.contains('hidden')) {
            const title = document.getElementById('module-title').innerText;
            if (title === "OTROS / GASTOS") renderOtros(document.getElementById('module-content'));
            if (title === "CONTROL DE CAJA (TURNO)" && !document.getElementById('module-content').querySelector('h3[style*="a78bfa"]')) {
                renderVentasDia(document.getElementById('module-content'));
            }
        }
    });

    // Sincronización de VENTAS
    database.ref('paolos_ventas_actuales').on('value', (snapshot) => {
        const data = snapshot.val();
        VentasHistoricas = data ? Object.values(data) : [];
        localStorage.setItem('paolos_ventas_turno', JSON.stringify(VentasHistoricas));
        if (document.getElementById('work-area') && !document.getElementById('work-area').classList.contains('hidden')) {
            const title = document.getElementById('module-title').innerText;
            if (title === "REPORTES TRANSFERENCIAS") renderTransferencias(document.getElementById('module-content'));
            if (title === "CONTROL DE CAJA (TURNO)" && !viendoDesglose) {
                renderVentasDia(document.getElementById('module-content'));
            }
            if (title === "CONTROL DE CAJA (TURNO)" && viendoDesglose) {
                renderDesgloseDetallado();
            }
        }
    });

    // Monitor de conexión
    const connectedRef = database.ref(".info/connected");
    connectedRef.on("value", (snap) => {
        const statusLabel = document.getElementById('debug-status');
        if (!statusLabel) return;
        if (snap.val() === true) {
            statusLabel.innerText = "SISTEMA ONLINE ✅";
            statusLabel.style.color = "var(--success)";
        } else {
            statusLabel.innerText = "MODO OFFLINE ⚠️ (Sin conexion)";
            statusLabel.style.color = "var(--danger)";
        }
    });

    // Sincronización estado de CAJA
    database.ref('paolos_caja_estado').on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        const cajaAbiertaAntes = cajaAbierta;
        cajaAbierta = data.abierta === true;
        if (cajaAbierta) {
            CajaActual = {
                base: data.base || 0,
                fecha: data.fecha || null,
                horaApertura: data.horaApertura || null
            };
            localStorage.setItem('paolos_caja_abierta', 'true');
            localStorage.setItem('paolos_caja_datos', JSON.stringify(CajaActual));
        } else if (cajaAbiertaAntes && !cajaAbierta) {
            cajaAbierta = false;
            CajaActual = { base: 0, fecha: null, horaApertura: null };
            localStorage.removeItem('paolos_caja_abierta');
            localStorage.removeItem('paolos_caja_datos');
        }
        if (document.getElementById('work-area') && !document.getElementById('work-area').classList.contains('hidden')) {
            const title = document.getElementById('module-title').innerText;
            if (title === "CONTROL DE CAJA (TURNO)" && !document.getElementById('module-content').querySelector('h3[style*="a78bfa"]')) {
                renderVentasDia(document.getElementById('module-content'));
            }
        }
    });
});

function cerrarSesion() {
    sesionInventarioToken = null;
    viendoDesglose = false;
    localStorage.removeItem('token_paolos');
    location.reload();
}

// --- BASE DE DATOS Y ESTADO GLOBAL ---
let DB = {
    menu: {
        pizzas_completa: [
            { nombre: "Pizza Grande (16 Porc.)",  precio_esp: 85000, precio_trad: 75000 },
            { nombre: "Pizza Mediana (12 Porc.)", precio_esp: 62000, precio_trad: 57000 },
            { nombre: "Pizza Pequeña (8 Porc.)",  precio_esp: 50000, precio_trad: 40000 },
            { nombre: "Pizza Mini (6 Porc.)",     precio_esp: 32000, precio_trad: 28000 }
        ],
        crepes: [
            { nombre: "Crepe Paolos",   precio: 30000 },
            { nombre: "Crepe Marinero", precio: 30000 },
            { nombre: "Crepe Clasico",  precio: 27000 }
        ],
        lasañas: [
            { nombre: "Lasaña Especial",    precio_p: 23000, precio_m: 32000, precio_f: 42000 },
            { nombre: "Lasaña Blanca",      precio_p: 23000, precio_m: 32000, precio_f: 42000 },
            { nombre: "Lasaña Vegetariana", precio_p: 23000, precio_m: 32000, precio_f: 42000 }
        ],
        panzerottis: [
            { nombre: "Marinero",            precio: 20000 },
            { nombre: "Jamon y Queso",       precio: 20000 },
            { nombre: "Italiano",            precio: 20000 },
            { nombre: "Romano",              precio: 23000 },
            { nombre: "Hawaiano",            precio: 23000 },
            { nombre: "Pollo y Champiñones", precio: 23000 },
            { nombre: "Vegetariano",         precio: 23000 },
            { nombre: "Trifasico",           precio: 25000 }
        ],
        pastas: [
            { nombre: "A la Boloñesa",     precio: 25000 },
            { nombre: "Carbonara",         precio: 25000 },
            { nombre: "Pasta Paolo's",     precio: 30000 },
            { nombre: "Coctel de Camarones", precio: 20000 }
        ],
        bebidas: []
    },
    sabores_pizzas: [
        { id: 1,  nombre: "Peperoni Picante",   tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 2,  nombre: "Marinera",            tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 3,  nombre: "Mexicana",            tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 4,  nombre: "Camaron y Pollo",     tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 5,  nombre: "BBQ",                 tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 6,  nombre: "Carnes",              tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 7,  nombre: "Maiz Tocineta",       tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 8,  nombre: "Tropical",            tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 9,  nombre: "De la Huerta",        tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 10, nombre: "Romana",              tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 11, nombre: "Salami",              tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 12, nombre: "Supercarnes",         tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 13, nombre: "Paolos",              tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 14, nombre: "Super",               tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 15, nombre: "Alcaldesa",           tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 16, nombre: "Diputado",            tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 17, nombre: "UFO",                 tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 18, nombre: "Rumbera",             tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 19, nombre: "Caribena",            tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 20, nombre: "Pollo Maiz Tocineta", tipo: "especialidad", precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000, precio: 7000 },
        { id: 21, nombre: "Hawaiana",            tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 22, nombre: "Pollo Champiñones",   tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 23, nombre: "Pollo Jamon",         tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 24, nombre: "Pollo Tocineta",      tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 25, nombre: "Napolitana",          tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 26, nombre: "Vegetariana",         tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 27, nombre: "Bocadillo y Queso",   tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 28, nombre: "Pollo Miel Mostaza",  tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 },
        { id: 29, nombre: "Jamon Pollo",         tipo: "tradicional",  precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000, precio: 7000 }
    ],
    bebidas_inv: []
};

// --- ESTADO GLOBAL ---
let Cuentas = JSON.parse(localStorage.getItem('paolos_cuentas')) || {};
let VentasHistoricas = JSON.parse(localStorage.getItem('paolos_ventas_turno')) || [];
let Gastos = JSON.parse(localStorage.getItem('paolos_gastos_turno')) || [];
let metodoPagoSeleccionado = 'Efectivo';
let metodoPagoMixto = { activo: false, efectivo: 0, transferencia: 0 };
let viendoDesglose = false;

let cajaAbierta = localStorage.getItem('paolos_caja_abierta') === 'true';
let CajaActual = JSON.parse(localStorage.getItem('paolos_caja_datos')) || { base: 0, fecha: null, horaApertura: null };
let HistorialCierres = [];

function guardarEstadoLocal() {
    localStorage.setItem('paolos_cuentas', JSON.stringify(Cuentas));
    localStorage.setItem('paolos_ventas_turno', JSON.stringify(VentasHistoricas));
    localStorage.setItem('paolos_gastos_turno', JSON.stringify(Gastos));
    localStorage.setItem('paolos_caja_abierta', cajaAbierta);
    localStorage.setItem('paolos_caja_datos', JSON.stringify(CajaActual));
}

// --- SINCRONIZACIÓN FIREBASE ---
database.ref('paolos_historial').on('value', (snapshot) => {
    const data = snapshot.val();
    HistorialCierres = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    if (document.getElementById('stats-results')) updateStatsFilter();
});

database.ref('bebidas_inv').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) DB.bebidas_inv = data;
});

database.ref('config_precios').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        if (data.menu) DB.menu = data.menu;
        if (data.sabores) {
            const preciosEsp  = { precio_mini: 32000, precio_p: 50000, precio_m: 62000, precio_g: 85000 };
            const preciosTrad = { precio_mini: 28000, precio_p: 40000, precio_m: 57000, precio_g: 75000 };
            DB.sabores_pizzas = data.sabores.map(s => {
                const defaults = s.tipo === 'especialidad' ? preciosEsp : preciosTrad;
                return Object.assign({}, defaults, s);
            });
        }
    }
});

let ultimaSincronizacion = JSON.stringify({});
database.ref('paolos_cuentas_activas').on('value', (snapshot) => {
    const data = snapshot.val() || {};
    const datosStringificados = JSON.stringify(data);
    if (datosStringificados !== ultimaSincronizacion && datosStringificados !== JSON.stringify(Cuentas)) {
        Cuentas = JSON.parse(datosStringificados);
        guardarEstadoLocal();
        if (document.getElementById('product-list-container')) {
            const modTitle = document.getElementById('module-title').innerText;
            for (let dest of Object.keys(Cuentas)) {
                if (modTitle.toUpperCase() === dest.toUpperCase()) {
                    renderOrderSummary(dest);
                    break;
                }
            }
        }
    }
    ultimaSincronizacion = datosStringificados;
});

function syncCuentasToFirebase() {
    database.ref('paolos_cuentas_activas').set(Cuentas)
        .catch(error => console.error("Error sincronizando cuentas:", error));
}

function syncInv() { database.ref('bebidas_inv').set(DB.bebidas_inv); }

function syncPrecios() {
    database.ref('config_precios').set({ menu: DB.menu, sabores: DB.sabores_pizzas });
}

// --- NAVEGACIÓN ---
function openModule(tipo) {
    if (!cajaAbierta && userRole !== 'admin' && (tipo === 'pizzas' || tipo === 'otros')) {
        alert("⚠️ DEBES ABRIR CAJA PRIMERO EN EL MODULO 'CAJA TURNO'");
        return;
    }
    document.getElementById('module-selector').classList.add('hidden');
    document.getElementById('work-area').classList.remove('hidden');
    const container = document.getElementById('module-content');
    const title = document.getElementById('module-title');
    document.getElementById('btn-back-tables').classList.add('hidden');

    if (tipo === 'pizzas')              { title.innerText = "MODULO MESAS";             renderTables(container); }
    else if (tipo === 'inv-bebidas')    { title.innerText = "INV. BEBIDAS";             abrirInventarioConClave(container, 'bebidas_inv'); }
    else if (tipo === 'transferencias') { title.innerText = "REPORTES TRANSFERENCIAS";  renderTransferencias(container); }
    else if (tipo === 'ventas-dia')     { title.innerText = "CONTROL DE CAJA (TURNO)";  renderVentasDia(container); }
    else if (tipo === 'otros')          { title.innerText = "OTROS / GASTOS";            renderOtros(container); }
    else if (tipo === 'stats')          { title.innerText = "GANANCIAS Y ESTADISTICAS"; renderStats(container); }
    else if (tipo === 'ajustes')        { title.innerText = "AJUSTES DE PRECIOS";       renderAjustes(container); }
}

// Volver al menú principal (botón HOME)
function showMenu() {
    inventarioDesbloqueado = false;
    viendoDesglose = false;
    document.getElementById('work-area').classList.add('hidden');
    document.getElementById('module-selector').classList.remove('hidden');
    document.getElementById('btn-back-tables').classList.add('hidden');
}

// Volver a la pantalla de mesas (desde dentro de un pedido)
function volverAMesas() {
    document.getElementById('btn-back-tables').classList.add('hidden');
    document.getElementById('module-title').innerText = "MODULO MESAS";
    renderTables(document.getElementById('module-content'));
}

// --- MÓDULO DE CAJA ---
function renderVentasDia(container) {
    if (!cajaAbierta && userRole !== 'admin') {
        container.innerHTML = `
            <div class="glass-card" style="text-align:center; padding:30px;">
                <h2 class="accent">APERTURA DE CAJA</h2>
                <p>Fecha: <b>${new Date().toLocaleDateString()}</b></p>
                <input type="number" id="base-caja" placeholder="Base Inicial $" class="inv-input-inline" style="width:80%; margin:20px 0; text-align:center;">
                <button class="btn-action" style="background:var(--success); color:black; width:100%;" onclick="abrirCaja()">ABRIR CAJA</button>
            </div>`;
        return;
    }

    if (!cajaAbierta && userRole === 'admin') {
        container.innerHTML = `
            <div class="glass-card" style="text-align:center; padding:30px; border-left: 4px solid #7c3aed;">
                <h3 style="color:#a78bfa;">👁️ MODO ADMIN — CAJA AUN NO ABIERTA</h3>
                <p style="opacity:0.6; margin-top:10px;">Esperando que ventas abra la caja...</p>
            </div>`;
        return;
    }

    let totalesDetalle = { porciones: 0, pizzas: 0, crepes: 0, lasañas: 0, pastas: 0, panzerotti: 0, bebidas: 0, transferencia: 0 };
    let totalEfectivo = 0, totalTransf = 0;
    let totalGastos = Gastos.reduce((sum, g) => sum + g.monto, 0);

    VentasHistoricas.forEach(v => {
        if (v.metodo === 'Efectivo') {
            totalEfectivo += v.total;
        } else if (v.metodo === 'Transferencia') {
            totalTransf += v.total;
            totalesDetalle.transferencia += v.total;
        } else if (v.metodo === 'Mixto') {
            totalEfectivo += (v.pagoEfectivo || 0);
            totalTransf += (v.pagoTransferencia || 0);
            totalesDetalle.transferencia += (v.pagoTransferencia || 0);
        }
        if (v.items) {
            v.items.forEach(item => {
                const cat = item.categoria || "otros";
                if (cat === "porciones")    totalesDetalle.porciones  += item.precio;
                else if (cat === "pizzas")  totalesDetalle.pizzas     += item.precio;
                else if (cat === "crepes")  totalesDetalle.crepes     += item.precio;
                else if (cat === "lasañas") totalesDetalle.lasañas    += item.precio;
                else if (cat === "pastas")  totalesDetalle.pastas     += item.precio;
                else if (cat === "panzerottis") totalesDetalle.panzerotti += item.precio;
                else if (cat === "bebidas") totalesDetalle.bebidas    += item.precio;
            });
        }
    });

    const totalVentas = totalEfectivo + totalTransf;
    // Las transferencias se descuentan del efectivo en caja
    const efectivoEnCaja = (totalEfectivo + CajaActual.base) - totalGastos;

    container.innerHTML = `
        <div class="glass-card" style="border-left: 5px solid var(--accent); margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between;">
                <h3 class="accent">TURNO ACTUAL</h3>
                <small>${CajaActual.horaApertura}</small>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
                <div class="product-card"><h4>Base</h4><span class="price">$${CajaActual.base.toLocaleString()}</span></div>
                <div class="product-card"><h4>Efectivo Caja</h4><span class="price" style="color:var(--success);">$${efectivoEnCaja.toLocaleString()}</span></div>
            </div>
        </div>

        <div class="glass-card">
            <h3 class="accent">Resumen de Ventas</h3>
            <div class="products-grid" style="grid-template-columns: 1fr 1fr;">
                <div class="product-card"><h4>🍕 Porciones</h4><span>$${totalesDetalle.porciones.toLocaleString()}</span></div>
                <div class="product-card"><h4>🥘 Pizzas C.</h4><span>$${totalesDetalle.pizzas.toLocaleString()}</span></div>
                <div class="product-card"><h4>🥞 Crepes</h4><span>$${totalesDetalle.crepes.toLocaleString()}</span></div>
                <div class="product-card"><h4>🍝 Lasañas</h4><span>$${totalesDetalle.lasañas.toLocaleString()}</span></div>
                <div class="product-card"><h4>🍽️ Pastas</h4><span>$${totalesDetalle.pastas.toLocaleString()}</span></div>
                <div class="product-card"><h4>🍔 Panzerotti</h4><span>$${totalesDetalle.panzerotti.toLocaleString()}</span></div>
                <div class="product-card"><h4>🥤 Bebidas</h4><span>$${totalesDetalle.bebidas.toLocaleString()}</span></div>
                <div class="product-card"><h4>📱 Transf.</h4><span style="color:#f87171;">-$${totalesDetalle.transferencia.toLocaleString()}</span></div>
            </div>
            <div class="inv-total" style="margin-top:20px;">
                <div style="display:flex; justify-content:space-between;"><span>VENTAS TOTALES:</span><span>$${totalVentas.toLocaleString()}</span></div>
                <div style="display:flex; justify-content:space-between; color:#f87171;"><span>TRANSFERENCIAS (no en caja):</span><span>-$${totalTransf.toLocaleString()}</span></div>
                <div style="display:flex; justify-content:space-between; color:#ff4444;"><span>GASTOS:</span><span>-$${totalGastos.toLocaleString()}</span></div>
                <div style="display:flex; justify-content:space-between; border-top:1px solid #333; margin-top:10px; padding-top:10px; font-size:1.2rem;">
                    <span>NETO:</span><b class="accent">$${(totalVentas - totalGastos).toLocaleString()}</b>
                </div>
            </div>

            <button class="btn-action" style="background:var(--accent); color:black; margin-top:20px; width:100%; font-weight:bold;" onclick="prepararDatosYImprimir()">
                🖨️ IMPRIMIR REPORTE DE CAJA
            </button>

            ${userRole === 'admin' ? `
            <button class="btn-action" style="background:#7c3aed; margin-top:10px; width:100%; font-weight:bold;" onclick="renderDesgloseDetallado()">
                📊 VER DESGLOSE DETALLADO
            </button>` : ''}

            <button class="btn-action" style="background:#ff4444; margin-top:10px; width:100%;" onclick="prepararCierre(${totalVentas}, ${totalGastos})">
                FINALIZAR TURNO
            </button>
        </div>`;
}

// --- DESGLOSE DETALLADO (PORCIONES + PIZZAS AGRUPADAS) ---
function renderDesgloseDetallado() {
    viendoDesglose = true;
    const container = document.getElementById('module-content');

    const conteo = {};
    VentasHistoricas.forEach(v => {
        if (!v.items) return;
        v.items.forEach(item => {
            const key = item.nombre;
            // Normalizar: porciones y pizzas van al grupo "pizzas_y_porciones"
            let catNorm = item.categoria || 'otros';
            if (catNorm === 'porciones') catNorm = 'pizzas_y_porciones';
            if (catNorm === 'pizzas')    catNorm = 'pizzas_y_porciones';

            if (!conteo[key]) conteo[key] = { nombre: item.nombre, cantidad: 0, total: 0, categoria: catNorm };
            conteo[key].cantidad++;
            conteo[key].total += item.precio;
        });
    });

    const grupos = {};
    Object.values(conteo).forEach(item => {
        const cat = item.categoria;
        if (!grupos[cat]) grupos[cat] = [];
        grupos[cat].push(item);
    });

    const iconos = {
        pizzas_y_porciones: '🍕',
        crepes: '🥞',
        lasañas: '🍝',
        pastas: '🍽️',
        panzerottis: '🍔',
        bebidas: '🥤',
        otros: '📦'
    };

    const nombresCat = {
        pizzas_y_porciones: 'PIZZAS Y PORCIONES',
        crepes: 'CREPES',
        lasañas: 'LASAÑAS',
        pastas: 'PASTAS',
        panzerottis: 'PANZEROTTIS',
        bebidas: 'BEBIDAS',
        otros: 'OTROS'
    };

    let html = `
        <div class="glass-card" style="margin-bottom:15px; border-left:5px solid #7c3aed;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="color:#a78bfa;">📊 DESGLOSE DETALLADO</h3>
                <button class="btn-action" style="background:#333; padding:5px 12px;" onclick="viendoDesglose=false; openModule('ventas-dia')">← VOLVER</button>
            </div>
            <small style="opacity:0.5;">Se actualiza automaticamente con cada venta</small>
        </div>`;

    if (Object.keys(grupos).length === 0) {
        html += `<div class="glass-card" style="text-align:center; opacity:0.5; padding:30px;">Sin ventas registradas aun</div>`;
    } else {
        // Orden preferido de categorías
        const ordenCat = ['pizzas_y_porciones', 'crepes', 'lasañas', 'pastas', 'panzerottis', 'bebidas', 'otros'];
        const catsOrdenadas = ordenCat.filter(c => grupos[c]);

        catsOrdenadas.forEach(cat => {
            const items = grupos[cat];
            const icono = iconos[cat] || '📦';
            const nombreCat = nombresCat[cat] || cat.toUpperCase();
            const totalCat = items.reduce((s, i) => s + i.total, 0);
            html += `
            <div class="glass-card" style="margin-bottom:15px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h4 class="accent">${icono} ${nombreCat}</h4>
                    <span style="color:var(--success); font-weight:bold;">$${totalCat.toLocaleString()}</span>
                </div>
                <table style="font-size:0.85rem; width:100%;">
                    <thead><tr><th style="text-align:left;">Producto</th><th>Cant.</th><th>Total</th></tr></thead>
                    <tbody>`;
            items.sort((a, b) => b.cantidad - a.cantidad).forEach(item => {
                html += `<tr>
                    <td style="text-align:left;">${item.nombre}</td>
                    <td style="text-align:center; font-weight:bold; color:var(--accent);">${item.cantidad}x</td>
                    <td style="text-align:right;">$${item.total.toLocaleString()}</td>
                </tr>`;
            });
            html += `</tbody></table></div>`;
        });
    }

    container.innerHTML = html;
}

function prepararCierre(ventas, gastos) {
    if (!confirm(`¿Sincronizar y cerrar caja?\nNeto: $${(ventas - gastos).toLocaleString()}`)) return;

    let desglose = { porciones: 0, pizzas: 0, crepes: 0, lasañas: 0, pastas: 0, panzerotti: 0, bebidas: 0, transferencia: 0 };

    VentasHistoricas.forEach(v => {
        if (v.metodo === 'Transferencia') desglose.transferencia += v.total;
        else if (v.metodo === 'Mixto') desglose.transferencia += (v.pagoTransferencia || 0);
        if (v.items) {
            v.items.forEach(item => {
                const cat = item.categoria || "otros";
                if (cat === "porciones")        desglose.porciones  += item.precio;
                else if (cat === "pizzas")      desglose.pizzas     += item.precio;
                else if (cat === "crepes")      desglose.crepes     += item.precio;
                else if (cat === "lasañas")     desglose.lasañas    += item.precio;
                else if (cat === "pastas")      desglose.pastas     += item.precio;
                else if (cat === "panzerottis") desglose.panzerotti += item.precio;
                else if (cat === "bebidas")     desglose.bebidas    += item.precio;
            });
        }
    });

    const fechaISO = new Date().toISOString().split('T')[0];
    const nuevoCierre = {
        fecha: fechaISO,
        ventasTotal: Number(ventas),
        gastos: Number(gastos),
        neto: Number(ventas - gastos),
        detalle: desglose,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref('paolos_historial').push(nuevoCierre)
        .then(() => alert("✅ Caja cerrada y sincronizada en la nube"))
        .catch((error) => alert("❌ Error al sincronizar: " + error.message))
        .finally(() => {
            database.ref('paolos_cuentas_activas').set({});
            database.ref('paolos_ventas_actuales').remove();
            database.ref('paolos_gastos_actuales').remove();
            database.ref('paolos_caja_estado').set({ abierta: false });

            VentasHistoricas = [];
            Gastos = [];
            Cuentas = {};
            cajaAbierta = false;
            CajaActual = { base: 0, fecha: null, horaApertura: null };

            localStorage.removeItem('paolos_caja_abierta');
            localStorage.removeItem('paolos_caja_datos');
            localStorage.removeItem('paolos_ventas_turno');
            localStorage.removeItem('paolos_gastos_turno');

            showMenu();
        });
}

// --- ESTADÍSTICAS ---
function renderStats(container) {
    const hoy = new Date().toISOString().split('T')[0];
    const haceSieteDias = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    container.innerHTML = `
        <div class="glass-card" style="margin-bottom:20px;">
            <h3 class="accent">FILTRAR RANGO (NUBE)</h3>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
                <div><small>Desde:</small><input type="date" id="filtro-desde" class="inv-input-inline" style="width:100%;" value="${haceSieteDias}" onchange="updateStatsFilter()"></div>
                <div><small>Hasta:</small><input type="date" id="filtro-hasta" class="inv-input-inline" style="width:100%;" value="${hoy}" onchange="updateStatsFilter()"></div>
            </div>
        </div>
        <div id="stats-results"></div>`;
    updateStatsFilter();
}

function updateStatsFilter() {
    const desdeI = document.getElementById('filtro-desde'), hastaI = document.getElementById('filtro-hasta');
    if (!desdeI || !hastaI) return;

    const desde = desdeI.value, hasta = hastaI.value;
    const resultsContainer = document.getElementById('stats-results');

    const filtrados = HistorialCierres.filter(c => c.fecha >= desde && c.fecha <= hasta);
    const totalV   = filtrados.reduce((s, c) => s + (Number(c.ventasTotal) || 0), 0);
    const totalGas = filtrados.reduce((s, c) => s + (Number(c.gastos) || 0), 0);
    const totalN   = totalV - totalGas;

    let html = `
        <div class="glass-card" style="margin-bottom:20px; border-bottom: 3px solid var(--success);">
            <h3 class="accent">RESUMEN DEL PERIODO</h3>
            <div class="products-grid" style="margin-top:15px;">
                <div class="product-card"><h4>Ventas</h4><span class="price">$${totalV.toLocaleString()}</span></div>
                <div class="product-card"><h4>Gastos</h4><span class="price" style="color:#ff4444;">$${totalGas.toLocaleString()}</span></div>
                <div class="product-card" style="grid-column: span 2; background: rgba(0,255,150,0.05);">
                    <h4>GANANCIA NETA</h4><span class="price" style="color:var(--success); font-size:1.5rem;">$${totalN.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <div class="glass-card">
            <h3 class="accent">HISTORIAL SINCRO</h3>
            <div style="overflow-x:auto; margin-top:15px;">
                <table style="font-size: 0.8rem;">
                    <thead><tr><th>Fecha</th><th>Desglose</th><th>Total</th></tr></thead>
                    <tbody>`;

    if (filtrados.length === 0) {
        html += `<tr><td colspan="3" style="text-align:center; padding:20px;">Sin registros</td></tr>`;
    } else {
        filtrados.sort((a, b) => b.fecha.localeCompare(a.fecha)).forEach(c => {
            const d = c.detalle || {};
            // Botón borrar día individual - solo admin
            const btnBorrar = userRole === 'admin'
                ? `<button onclick="borrarDiaHistorial('${c.id}')" title="Borrar este dia"
                    style="background:none; border:none; cursor:pointer; font-size:1rem; color:#ff4444; margin-left:6px;">🗑️</button>`
                : '';
            html += `<tr>
                <td><b>${c.fecha}</b>${btnBorrar}</td>
                <td style="text-align:left; font-size:0.7rem;">
                    🍕 $${(d.porciones || 0).toLocaleString()} | 🥘 $${(d.pizzas || 0).toLocaleString()}<br>
                    🥞 $${(d.crepes || 0).toLocaleString()} | 🍝 $${(d.lasañas || 0).toLocaleString()}<br>
                    🍽️ $${(d.pastas || 0).toLocaleString()} | 🍔 $${(d.panzerotti || 0).toLocaleString()}<br>
                    🥤 $${(d.bebidas || 0).toLocaleString()}
                </td>
                <td style="font-weight:bold;">$${(Number(c.ventasTotal) || 0).toLocaleString()}</td>
            </tr>`;
        });
    }

    resultsContainer.innerHTML = html + `</tbody></table></div>
        <button class="btn-action" style="margin-top:20px; background:#444; width:100%;" onclick="borrarHistorial()">🗑️ LIMPIAR HISTORIAL COMPLETO</button>
    </div>`;
}

// --- MESAS Y PEDIDOS ---
function renderTables(container) {
    let html = '<div class="tables-grid">';

    // 8 mesas con total visible
    for (let i = 1; i <= 8; i++) {
        const mId = `Mesa ${i}`;
        const items = Cuentas[mId] || [];
        const ocup = items.length > 0;
        const total = items.reduce((s, it) => s + it.precio, 0);
        html += `<button class="mesa-btn ${ocup ? 'active-order' : ''}" onclick="selectDestino('${mId}')">
            <span style="font-size:1rem; font-weight:bold;">MESA ${i}</span>
            ${ocup ? `<span style="display:block; font-size:0.75rem; color:var(--accent); margin-top:4px;">$${total.toLocaleString()}</span>` : ''}
        </button>`;
    }

    // Domicilios activos
    const domicilios = Object.keys(Cuentas).filter(k => k.startsWith('Domicilio'));
    domicilios.forEach(d => {
        const items = Cuentas[d] || [];
        const total = items.reduce((s, it) => s + it.precio, 0);
        html += `<button class="domicilio-btn active-order" onclick="selectDestino('${d}')" style="position:relative;">
            <span>🛵 ${d}</span>
            <span style="display:block; font-size:0.75rem; color:var(--accent); margin-top:4px;">$${total.toLocaleString()}</span>
        </button>`;
    });

    // Llevar activos
    const llevares = Object.keys(Cuentas).filter(k => k.startsWith('Llevar'));
    llevares.forEach(l => {
        const items = Cuentas[l] || [];
        const total = items.reduce((s, it) => s + it.precio, 0);
        html += `<button class="llevar-btn active-order" onclick="selectDestino('${l}')" style="position:relative;">
            <span>🛍️ ${l}</span>
            <span style="display:block; font-size:0.75rem; color:var(--accent); margin-top:4px;">$${total.toLocaleString()}</span>
        </button>`;
    });

    // Botones para crear nuevos domicilio / llevar
    html += `<div class="delivery-group" style="grid-column: span 2; display:flex; gap:10px; margin-top:4px;">
        <button class="domicilio-btn" onclick="crearNuevoDestino('Domicilio')" style="flex:1;">🛵 + DOMICILIO</button>
        <button class="llevar-btn"    onclick="crearNuevoDestino('Llevar')"    style="flex:1;">🛍️ + LLEVAR</button>
    </div>`;

    html += `</div>`;
    container.innerHTML = html;
}

// Crea un nuevo destino numerado (Domicilio 1, Domicilio 2, ...)
function crearNuevoDestino(tipo) {
    const existentes = Object.keys(Cuentas).filter(k => k.startsWith(tipo));
    let num = 1;
    while (existentes.includes(`${tipo} ${num}`)) num++;
    const nuevoId = `${tipo} ${num}`;
    Cuentas[nuevoId] = [];
    guardarEstadoLocal();
    syncCuentasToFirebase();
    selectDestino(nuevoId);
}

function selectDestino(destino) {
    // Ocultar selector de mesas, mostrar área de trabajo de pedido en pantalla completa
    document.getElementById('module-selector').classList.add('hidden');
    document.getElementById('work-area').classList.remove('hidden');
    document.getElementById('module-title').innerText = destino.toUpperCase();
    document.getElementById('btn-back-tables').classList.remove('hidden');

    const container = document.getElementById('module-content');
    container.innerHTML = `
        <div class="search-box">
            <input type="text" id="product-search" placeholder="🔍 Buscar producto o bebida..." onkeyup="filterItems('${destino}')">
        </div>
        <div class="categories-grid">
            <button class="category-btn" onclick="renderProductsByCategory('porcion', '${destino}')">🍕 PORCION</button>
            <button class="category-btn" onclick="renderProductsByCategory('pizzas_completa', '${destino}')">🥘 PIZZA C.</button>
            <button class="category-btn" onclick="renderProductsByCategory('crepes', '${destino}')">🥞 CREPES</button>
            <button class="category-btn" onclick="renderProductsByCategory('lasañas', '${destino}')">🍝 LASANAS</button>
            <button class="category-btn" onclick="renderProductsByCategory('pastas', '${destino}')">🍽️ PASTAS</button>
            <button class="category-btn" onclick="renderProductsByCategory('panzerottis', '${destino}')">🍔 PANZEROTTI</button>
            <button class="category-btn" onclick="renderProductsByCategory('bebidas', '${destino}')">🥤 BEBIDAS</button>
        </div>
        <div id="product-list-container"></div>
        <div id="summary-container"></div>`;

    renderOrderSummary(destino);
}

// --- BÚSQUEDA (incluye bebidas) ---
function filterItems(dest) {
    const searchTerm = document.getElementById('product-search').value.toLowerCase().trim();
    const container = document.getElementById('product-list-container');
    const categoriesDiv = document.querySelector('.categories-grid');

    if (searchTerm === "") {
        categoriesDiv.classList.remove('hidden');
        container.innerHTML = "";
        return;
    }

    categoriesDiv.classList.add('hidden');
    let html = `<div class="products-grid">`;
    let found = false;

    // 🍕 PORCIONES
    DB.sabores_pizzas.forEach(sabor => {
        if (sabor.nombre.toLowerCase().includes(searchTerm)) {
            found = true;
            html += `
            <div class="product-card search-result" style="border: 1px solid var(--warning);">
                <small style="color: var(--warning); font-size: 0.6rem; letter-spacing: 1px;">🍕 PORCION</small>
                <h4 style="margin: 8px 0;">${sabor.nombre}</h4>
                <span class="price" style="font-size: 0.9rem; margin-bottom: 10px;">$${sabor.precio.toLocaleString()}</span>
                <button class="btn-action" style="background: var(--warning); color: #000; border: none;"
                    onclick="addItemToOrder('${dest}', 'Porcion ${sabor.nombre}', ${sabor.precio}, 'porciones')">ANADIR</button>
            </div>`;
        }
    });

    // 🥤 BEBIDAS
    DB.bebidas_inv.forEach(b => {
        if (b.nombre.toLowerCase().includes(searchTerm)) {
            found = true;
            const agotado = b.cantidad <= 0;
            html += `
            <div class="product-card search-result" style="border: 1px solid #22d3ee; ${agotado ? 'opacity:0.5;' : ''}">
                <small style="color: #22d3ee; font-size: 0.6rem; letter-spacing: 1px;">🥤 BEBIDA${agotado ? ' — AGOTADA' : ' · Stock: ' + b.cantidad}</small>
                <h4 style="margin: 8px 0;">${b.nombre}</h4>
                <span class="price" style="font-size: 0.9rem; margin-bottom: 10px;">$${(b.precio || 0).toLocaleString()}</span>
                <button class="btn-action" style="background:#22d3ee; color:#000; border:none;"
                    onclick="sellBebida('${dest}', ${b.id})" ${agotado ? 'disabled' : ''}>${agotado ? 'N/A' : 'ANADIR'}</button>
            </div>`;
        }
    });

    // 🍽️ RESTO DEL MENÚ
    for (const [catKey, items] of Object.entries(DB.menu)) {
        if (catKey === 'bebidas') continue;
        items.forEach(p => {
            if (p.nombre.toLowerCase().includes(searchTerm)) {
                found = true;
                if (catKey === 'lasañas') {
                    const ne = p.nombre.replace(/'/g, "\\'");
                    html += `
                    <div class="product-card search-result">
                        <small style="color: var(--accent); font-size: 0.6rem;">🍝 LASANA</small>
                        <h4>${p.nombre}</h4>
                        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:5px; margin-top:10px;">
                            <button class="category-btn" onclick="addItemToOrder('${dest}', '${ne} (P)', ${p.precio_p}, 'lasañas')">P $${p.precio_p.toLocaleString()}</button>
                            <button class="category-btn" onclick="addItemToOrder('${dest}', '${ne} (M)', ${p.precio_m || p.precio_p}, 'lasañas')">M $${(p.precio_m || p.precio_p).toLocaleString()}</button>
                            <button class="category-btn" onclick="addItemToOrder('${dest}', '${ne} (F)', ${p.precio_f}, 'lasañas')">F $${p.precio_f.toLocaleString()}</button>
                        </div>
                    </div>`;
                } else if (catKey === 'pizzas_completa') {
                    const tamClave = p.nombre.includes('Mini') ? 'mini' : p.nombre.includes('Pequeña') ? 'p' : p.nombre.includes('Mediana') ? 'm' : 'g';
                    html += `
                    <div class="product-card search-result">
                        <small style="color: var(--accent); font-size: 0.6rem;">🥘 PIZZA COMPLETA</small>
                        <h4>${p.nombre}</h4>
                        <button class="btn-action" onclick="renderPizzaFlavorSelector('${dest}', '${tamClave}')">ELEGIR SABOR</button>
                    </div>`;
                } else {
                    const ne = p.nombre.replace(/'/g, "\\'");
                    const cat2 = catKey === 'panzerottis' ? 'panzerottis' : catKey === 'pastas' ? 'pastas' : catKey === 'crepes' ? 'crepes' : catKey;
                    html += `
                    <div class="product-card search-result">
                        <small style="color: var(--accent); font-size: 0.6rem;">${catKey.toUpperCase()}</small>
                        <h4>${p.nombre}</h4>
                        <span class="price">$${p.precio.toLocaleString()}</span>
                        <button class="btn-action" onclick="addItemToOrder('${dest}', '${ne}', ${p.precio}, '${cat2}')">ANADIR</button>
                    </div>`;
                }
            }
        });
    }

    if (!found) {
        html += `
        <div style="grid-column: span 2; text-align:center; padding:40px; opacity:0.5;">
            <p>No se encontraron productos</p>
            <small>Intenta con otra palabra clave</small>
        </div>`;
    }

    container.innerHTML = html + `</div>`;
}

function renderProductsByCategory(cat, dest) {
    document.getElementById('product-search').value = "";
    const container = document.getElementById('product-list-container');

    if (cat === 'porcion') { renderFlavorSelector(container, dest); return; }

    let html = `<div class="products-grid">`;

    if (cat === 'bebidas') {
        DB.bebidas_inv.forEach(p => {
            const agotado = p.cantidad <= 0;
            html += `<div class="product-card" style="${agotado ? 'opacity:0.6;' : ''}">
                <small>${agotado ? 'AGOTADO' : 'STOCK: ' + p.cantidad}</small>
                <h4>${p.nombre}</h4>
                <p class="accent" style="margin:5px 0;">$${(p.precio || 0).toLocaleString()}</p>
                <button class="btn-action" onclick="sellBebida('${dest}', ${p.id})" ${agotado ? 'disabled' : ''}>
                    ${agotado ? 'N/A' : 'ANADIR'}
                </button>
            </div>`;
        });
    } else {
        DB.menu[cat].forEach(p => {
            if (cat === 'pizzas_completa') {
                const tamClave = p.nombre.includes('Mini') ? 'mini' : p.nombre.includes('Pequeña') ? 'p' : p.nombre.includes('Mediana') ? 'm' : 'g';
                html += `<div class="product-card">
                    <h4>${p.nombre}</h4>
                    <button class="btn-action" onclick="renderPizzaFlavorSelector('${dest}', '${tamClave}')">SABORES</button>
                </div>`;
            } else if (cat === 'lasañas') {
                const ne = p.nombre.replace(/'/g, "\\'");
                html += `<div class="product-card">
                    <h4>${p.nombre}</h4>
                    <div style="display:grid; gap:5px;">
                        <button class="category-btn" onclick="addItemToOrder('${dest}', '${ne} (P)', ${p.precio_p}, 'lasañas')">P: $${p.precio_p.toLocaleString()}</button>
                        <button class="category-btn" onclick="addItemToOrder('${dest}', '${ne} (M)', ${p.precio_m || p.precio_p}, 'lasañas')">M: $${(p.precio_m || p.precio_p).toLocaleString()}</button>
                        <button class="category-btn" onclick="addItemToOrder('${dest}', '${ne} (F)', ${p.precio_f}, 'lasañas')">F: $${p.precio_f.toLocaleString()}</button>
                    </div>
                </div>`;
            } else if (cat === 'pastas') {
                const ne = p.nombre.replace(/'/g, "\\'");
                html += `<div class="product-card">
                    <h4>${p.nombre}</h4>
                    <span class="price">$${p.precio.toLocaleString()}</span>
                    <button class="btn-action" onclick="addItemToOrder('${dest}', '${ne}', ${p.precio}, 'pastas')">ANADIR</button>
                </div>`;
            } else if (cat === 'panzerottis') {
                html += `<div class="product-card">
                    <h4>${p.nombre}</h4>
                    <span class="price">$${p.precio.toLocaleString()}</span>
                    <button class="btn-action" onclick="addItemToOrder('${dest}', '${p.nombre}', ${p.precio}, 'panzerottis')">ANADIR</button>
                </div>`;
            } else {
                const ne = p.nombre.replace(/'/g, "\\'");
                html += `<div class="product-card">
                    <h4>${p.nombre}</h4>
                    <button class="btn-action" onclick="addItemToOrder('${dest}', '${ne}', ${p.precio}, '${cat}')">ANADIR</button>
                </div>`;
            }
        });
    }

    container.innerHTML = html + `</div>`;
}

function getPrecioSabor(sabor, tamano) {
    const p = sabor.tipo === 'tradicional'
        ? { mini: 28000, p: 40000, m: 57000, g: 75000 }
        : { mini: 32000, p: 50000, m: 62000, g: 85000 };
    return p[tamano] || 0;
}

function renderPizzaFlavorSelector(dest, tamano) {
    const container = document.getElementById('product-list-container');
    window._pizzaTamano = tamano;
    window._pizzaSeleccionados = [];

    const sabores = [
        { id: 21, nombre: "Hawaiana",            tipo: "tradicional" },
        { id: 22, nombre: "Pollo Champiñones",   tipo: "tradicional" },
        { id: 23, nombre: "Pollo Jamon",         tipo: "tradicional" },
        { id: 24, nombre: "Pollo Tocineta",      tipo: "tradicional" },
        { id: 7,  nombre: "Maiz Tocineta",       tipo: "tradicional" },
        { id: 25, nombre: "Napolitana",          tipo: "tradicional" },
        { id: 26, nombre: "Vegetariana",         tipo: "tradicional" },
        { id: 27, nombre: "Bocadillo y Queso",   tipo: "tradicional" },
        { id: 28, nombre: "Pollo Miel Mostaza",  tipo: "tradicional" },
        { id: 6,  nombre: "Carnes",              tipo: "especialidad" },
        { id: 12, nombre: "Supercarnes",         tipo: "especialidad" },
        { id: 13, nombre: "Paolos",              tipo: "especialidad" },
        { id: 14, nombre: "Super",               tipo: "especialidad" },
        { id: 15, nombre: "Alcaldesa",           tipo: "especialidad" },
        { id: 16, nombre: "Diputado",            tipo: "especialidad" },
        { id: 8,  nombre: "Tropical",            tipo: "especialidad" },
        { id: 17, nombre: "UFO",                 tipo: "especialidad" },
        { id: 3,  nombre: "Mexicana",            tipo: "especialidad" },
        { id: 2,  nombre: "Marinera",            tipo: "especialidad" },
        { id: 5,  nombre: "BBQ",                 tipo: "especialidad" },
        { id: 10, nombre: "Romana",              tipo: "especialidad" },
        { id: 18, nombre: "Rumbera",             tipo: "especialidad" },
        { id: 19, nombre: "Caribena",            tipo: "especialidad" },
        { id: 9,  nombre: "De la Huerta",        tipo: "especialidad" },
        { id: 20, nombre: "Pollo Maiz Tocineta", tipo: "especialidad" },
        { id: 4,  nombre: "Pollo Camaron",       tipo: "especialidad" },
        { id: 1,  nombre: "Peperoni Picante",    tipo: "especialidad" },
    ];
    window._pizzaSaboresLista = sabores;

    const tamNombre = { mini: 'Mini (6p)', p: 'Pequeña (8p)', m: 'Mediana (12p)', g: 'Grande (16p)' }[tamano];

    let html = `<div style="padding:10px;">
        <h4 class="accent" style="margin-bottom:4px;">🍕 ${tamNombre} — ELIGE SABOR(ES)</h4>
        <p style="font-size:0.75rem; opacity:0.7; margin-bottom:10px;">Max. 3 sabores. 3ro suma $3.000. Se cobra el mas caro.</p>
        <div id="pizza-preview" style="text-align:center; font-weight:bold; color:var(--accent); margin-bottom:10px; min-height:22px;"></div>
        <div class="flavor-list">`;

    sabores.forEach(s => {
        const precio = getPrecioSabor(s, tamano);
        html += `<div class="flavor-item" id="pf-row-${s.id}" onclick="togglePizzaSabor(${s.id})" style="cursor:pointer;">
            <div><h4>${s.nombre}</h4><span class="accent">$${precio.toLocaleString()}</span></div>
            <div class="flavor-qty">
                <button id="pf-btn-${s.id}" style="background:var(--glass); border:1px solid var(--border); border-radius:50%; width:32px; height:32px; font-size:1rem; cursor:pointer; pointer-events:none;">○</button>
            </div>
        </div>`;
    });

    html += `</div>
        <button class="btn-action" style="width:100%; margin-top:10px; background:var(--success); color:#000; font-weight:bold;"
            onclick="confirmarPizzaCompleta('${dest}')">✅ CONFIRMAR PIZZA</button>
    </div>`;

    container.innerHTML = html;
}

function togglePizzaSabor(id) {
    const sel = window._pizzaSeleccionados || [];
    const idx = sel.indexOf(id);
    const btn = document.getElementById('pf-btn-' + id);
    const row = document.getElementById('pf-row-' + id);
    if (idx > -1) {
        window._pizzaSeleccionados.splice(idx, 1);
        if (btn) { btn.style.background = 'var(--glass)'; btn.style.color = ''; btn.textContent = '○'; }
        if (row) row.style.background = '';
    } else {
        if (sel.length >= 3) { alert('Maximo 3 sabores por pizza.'); return; }
        window._pizzaSeleccionados.push(id);
        if (btn) { btn.style.background = 'var(--accent)'; btn.style.color = '#000'; btn.textContent = '✓'; }
        if (row) row.style.background = 'rgba(255,180,0,0.07)';
    }
    actualizarPreviewPizza();
}

function actualizarPreviewPizza() {
    const t = window._pizzaTamano;
    const lista = window._pizzaSaboresLista || [];
    const sel = (window._pizzaSeleccionados || []).map(id => lista.find(s => s.id === id)).filter(Boolean);
    const prev = document.getElementById('pizza-preview');
    if (!prev) return;
    if (sel.length === 0) { prev.innerText = ''; return; }
    const precioBase = Math.max(...sel.map(s => getPrecioSabor(s, t)));
    const precio = sel.length === 3 ? precioBase + 3000 : precioBase;
    const extra = sel.length === 3 ? ' (+$3.000)' : '';
    prev.innerText = sel.map(s => s.nombre).join(' / ') + '  →  $' + precio.toLocaleString() + extra;
}

function confirmarPizzaCompleta(dest) {
    const t = window._pizzaTamano;
    if (!t) { alert('⚠️ Elige un tamaño primero.'); return; }
    const lista = window._pizzaSaboresLista || [];
    const sel = (window._pizzaSeleccionados || []).map(id => lista.find(s => s.id === id)).filter(Boolean);
    if (sel.length === 0) { alert('⚠️ Elige al menos 1 sabor.'); return; }
    const precioBase = Math.max(...sel.map(s => getPrecioSabor(s, t)));
    const precio = sel.length === 3 ? precioBase + 3000 : precioBase;
    const tamNombre = { mini: 'Mini', p: 'Pequeña', m: 'Mediana', g: 'Grande' }[t];
    addItemToOrder(dest, 'Pizza ' + tamNombre + ' ' + sel.map(s => s.nombre).join('/'), precio, 'pizzas');
    window._pizzaTamano = null;
    window._pizzaSeleccionados = [];
}

function renderFlavorSelector(container, dest) {
    let html = `<div class="flavor-list">`;
    DB.sabores_pizzas.forEach(s => {
        html += `<div class="flavor-item">
            <div><h4>${s.nombre}</h4><span class="accent">$${s.precio.toLocaleString()}</span></div>
            <div class="flavor-qty">
                <button onclick="updateFlavorQty(${s.id}, -1)">-</button>
                <span id="f-${s.id}">0</span>
                <button onclick="updateFlavorQty(${s.id}, 1)">+</button>
            </div>
        </div>`;
    });
    container.innerHTML = html + `</div><button class="btn-action" onclick="savePortions('${dest}')">CONFIRMAR PORCIONES</button>`;
}

function updateFlavorQty(id, d) {
    const el = document.getElementById(`f-${id}`);
    let v = parseInt(el.innerText) + d;
    if (v >= 0) el.innerText = v;
}

function savePortions(dest) {
    DB.sabores_pizzas.forEach(s => {
        const v = parseInt(document.getElementById(`f-${s.id}`).innerText);
        for (let i = 0; i < v; i++) addItemToOrder(dest, `Porcion ${s.nombre}`, s.precio, 'porciones');
        document.getElementById(`f-${s.id}`).innerText = 0;
    });
}

// --- RESUMEN Y PAGO (con soporte pago mixto) ---
function renderOrderSummary(dest) {
    const items = Cuentas[dest] || [];
    const total = items.reduce((s, i) => s + i.precio, 0);
    const grouped = items.reduce((acc, it, idx) => {
        if (!acc[it.nombre]) acc[it.nombre] = { n: it.nombre, p: it.precio, c: 0, ids: [] };
        acc[it.nombre].c++;
        acc[it.nombre].ids.push(idx);
        return acc;
    }, {});

    let html = `<div class="order-summary"><div class="summary-list">`;
    Object.values(grouped).forEach(it => {
        html += `<div class="summary-item"><span><b>${it.c}x</b> ${it.n}</span>
            <div style="display:flex; gap:10px;"><span>$${(it.p * it.c).toLocaleString()}</span>
            <button class="btn-del-item" onclick="removeItem('${dest}', ${it.ids[it.ids.length - 1]})">✕</button></div></div>`;
    });

    // Selector de método de pago
    html += `</div>
        <div class="payment-selector">
            <button class="pay-btn ${metodoPagoSeleccionado === 'Efectivo' ? 'selected' : ''}"
                onclick="setMetodoPago('Efectivo', '${dest}')">💵 EFECTIVO</button>
            <button class="pay-btn ${metodoPagoSeleccionado === 'Transferencia' ? 'selected' : ''}"
                onclick="setMetodoPago('Transferencia', '${dest}')">📱 TRANSF.</button>
            <button class="pay-btn ${metodoPagoSeleccionado === 'Mixto' ? 'selected' : ''}"
                onclick="setMetodoPago('Mixto', '${dest}')" style="grid-column: span 2; background: ${metodoPagoSeleccionado === 'Mixto' ? 'var(--accent)' : 'var(--glass)'};">
                💵📱 MIXTO (EFECTIVO + TRANSF.)
            </button>
        </div>`;

    // Panel de pago mixto
    if (metodoPagoSeleccionado === 'Mixto') {
        html += `
        <div style="background:rgba(255,180,0,0.08); border:1px solid var(--accent); border-radius:10px; padding:12px; margin-top:8px;">
            <p style="font-size:0.8rem; opacity:0.7; margin-bottom:8px;">Total: <b>$${total.toLocaleString()}</b> — Ingresa el monto en efectivo:</p>
            <div style="display:flex; gap:8px; align-items:center;">
                <input type="number" id="pago-efectivo-mixto" placeholder="$ Efectivo" class="inv-input-inline"
                    style="flex:1;" oninput="calcularResto(${total})" value="${metodoPagoMixto.efectivo || ''}">
                <span style="opacity:0.7;">Transf:</span>
                <b id="resto-transferencia" class="accent">$${metodoPagoMixto.transferencia > 0 ? metodoPagoMixto.transferencia.toLocaleString() : '---'}</b>
            </div>
        </div>`;
    }

    html += `
        <div class="summary-total"><span>TOTAL</span><span>$${total.toLocaleString()}</span></div>

        <button class="btn-action" style="background:#ffc107; color:#000; margin-bottom:10px; font-weight:bold;" onclick="imprimirComandaCocina('${dest}')">
            👩‍🍳 ENVIAR A COCINA
        </button>
        <button class="btn-action" style="background:var(--success); color:#000;" onclick="clearOrder('${dest}')">FINALIZAR CUENTA</button>
    </div>`;

    document.getElementById('summary-container').innerHTML = html;
}

function calcularResto(total) {
    const ef = parseFloat(document.getElementById('pago-efectivo-mixto').value) || 0;
    const resto = total - ef;
    document.getElementById('resto-transferencia').innerText = resto >= 0 ? '$' + resto.toLocaleString() : '⚠️ Excede total';
    metodoPagoMixto.efectivo = ef;
    metodoPagoMixto.transferencia = Math.max(0, resto);
}

function setMetodoPago(m, dest) {
    metodoPagoSeleccionado = m;
    if (m !== 'Mixto') metodoPagoMixto = { activo: false, efectivo: 0, transferencia: 0 };
    renderOrderSummary(dest);
}

function clearOrder(dest) {
    const items = Cuentas[dest] || [];
    const total = items.reduce((s, i) => s + i.precio, 0);
    if (total === 0) return;

    // Validar pago mixto
    if (metodoPagoSeleccionado === 'Mixto') {
        const ef = parseFloat(document.getElementById('pago-efectivo-mixto')?.value) || 0;
        const transf = total - ef;
        if (ef < 0 || transf < 0) {
            alert("⚠️ Los montos del pago mixto no son válidos.");
            return;
        }
        metodoPagoMixto = { activo: true, efectivo: ef, transferencia: transf };
    }

    if (confirm(`¿Finalizar ${dest}?\nTotal: $${total.toLocaleString()}`)) {
        const nuevaVenta = {
            destino: dest,
            total: total,
            metodo: metodoPagoSeleccionado,
            pagoEfectivo: metodoPagoSeleccionado === 'Mixto' ? metodoPagoMixto.efectivo : (metodoPagoSeleccionado === 'Efectivo' ? total : 0),
            pagoTransferencia: metodoPagoSeleccionado === 'Mixto' ? metodoPagoMixto.transferencia : (metodoPagoSeleccionado === 'Transferencia' ? total : 0),
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            items: [...items]
        };

        database.ref('paolos_ventas_actuales').push(nuevaVenta);

        Cuentas[dest] = [];
        syncCuentasToFirebase();
        metodoPagoSeleccionado = 'Efectivo';
        metodoPagoMixto = { activo: false, efectivo: 0, transferencia: 0 };
        openModule('pizzas');
    }
}

function addItemToOrder(dest, nombre, precio, categoria = "otros") {
    if (!Cuentas[dest]) Cuentas[dest] = [];
    Cuentas[dest].push({ nombre, precio, categoria });
    guardarEstadoLocal();
    syncCuentasToFirebase();
    renderOrderSummary(dest);
}

function removeItem(dest, index) {
    Cuentas[dest].splice(index, 1);
    guardarEstadoLocal();
    syncCuentasToFirebase();
    renderOrderSummary(dest);
}

function abrirCaja() {
    const base = parseInt(document.getElementById('base-caja').value);
    if (!isNaN(base) && base >= 0) {
        cajaAbierta = true;
        CajaActual = {
            base,
            fecha: new Date().toLocaleDateString('es-CO'),
            horaApertura: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        guardarEstadoLocal();
        Cuentas = {};
        syncCuentasToFirebase();
        database.ref('paolos_caja_estado').set({
            abierta: true,
            base: CajaActual.base,
            fecha: CajaActual.fecha,
            horaApertura: CajaActual.horaApertura
        });
        renderVentasDia(document.getElementById('module-content'));
    }
}

function sellBebida(dest, pId) {
    const item = DB.bebidas_inv.find(b => b.id == pId);
    if (item && item.cantidad > 0) {
        item.cantidad--;
        syncInv();
        addItemToOrder(dest, item.nombre, item.precio || 0, 'bebidas');
        renderProductsByCategory('bebidas', dest);
    }
}

// --- INVENTARIO ---
let claveInventario = "0000";
let sesionInventarioToken = null;

database.ref('config_clave_inv').on('value', (snap) => {
    if (snap.val() && snap.val() !== claveInventario) {
        claveInventario = snap.val();
        sesionInventarioToken = null;
    } else if (snap.val()) {
        claveInventario = snap.val();
    }
});

function abrirInventarioConClave(container, t) {
    if (userRole === 'admin') { renderInventory(container, t); return; }
    if (sesionInventarioToken === claveInventario) { renderInventory(container, t); return; }
    const clave = prompt("🔒 Ingresa la clave para modificar inventario:");
    if (clave === null || clave.trim() === '') { showMenu(); return; }
    if (clave === claveInventario) {
        sesionInventarioToken = claveInventario;
        renderInventory(container, t);
    } else {
        alert("❌ Clave incorrecta.");
        showMenu();
    }
}

function renderInventory(container, t) {
    const data = DB[t];
    let html = `
        <div class="glass-card" style="margin-bottom:12px;">
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
                <input type="text" id="inv-n" placeholder="Producto" class="inv-input-inline" style="flex:2; min-width:100px;">
                <input type="number" id="inv-c" placeholder="Stock" class="inv-input-inline" style="flex:1; min-width:60px;">
                <input type="number" id="inv-p" placeholder="Precio $" class="inv-input-inline" style="flex:1; min-width:70px;">
                <button class="btn-nav neon-btn" onclick="addToInventory('${t}')" style="flex:none;">+</button>
            </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">`;

    if (!data || data.length === 0) {
        html += `<div class="glass-card" style="text-align:center; opacity:0.5; padding:20px;">Sin productos en inventario</div>`;
    } else {
        data.forEach((item, idx) => {
            const esAlerta = item.cantidad <= (item.stock_minimo || 5);
            html += `
            <div class="glass-card" style="${esAlerta ? 'border-left:4px solid orange;' : 'border-left:4px solid #333;'} padding:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                    <div style="flex:1; min-width:100px;">
                        <b>${item.nombre}</b>
                        ${esAlerta ? '<span style="display:block; font-size:0.7rem; color:orange; margin-top:2px;">⚠️ REABASTECER</span>' : ''}
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                        <div style="display:flex; flex-direction:column; align-items:center;">
                            <small style="opacity:0.6; font-size:0.65rem;">STOCK</small>
                            <input type="number" class="inv-input-inline" value="${item.cantidad}"
                                style="width:60px; text-align:center;"
                                onchange="updateInvField('${t}', ${idx}, 'cantidad', this.value)">
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center;">
                            <small style="opacity:0.6; font-size:0.65rem;">PRECIO</small>
                            <input type="number" class="inv-input-inline" value="${item.precio || 0}"
                                style="width:75px; text-align:center;"
                                onchange="updateInvField('${t}', ${idx}, 'precio', this.value)">
                        </div>
                        <button class="btn-del" onclick="deleteFromInv('${t}', ${idx})">🗑️</button>
                    </div>
                </div>
            </div>`;
        });
    }
    container.innerHTML = html + `</div>`;
}

function updateInvField(t, idx, field, v) { DB[t][idx][field] = parseInt(v) || 0; syncInv(); }
function deleteFromInv(t, idx) { DB[t].splice(idx, 1); syncInv(); renderInventory(document.getElementById('module-content'), t); }
function addToInventory(t) {
    const n = document.getElementById('inv-n').value;
    const c = parseInt(document.getElementById('inv-c').value);
    const p = parseInt(document.getElementById('inv-p').value);
    if (n && !isNaN(c) && !isNaN(p)) {
        DB[t].push({ id: Date.now(), nombre: n, cantidad: c, precio: p });
        syncInv();
        renderInventory(document.getElementById('module-content'), t);
    } else {
        alert("Llena todos los campos (Nombre, Stock y Precio)");
    }
}

// --- GASTOS ---
function renderOtros(container) {
    let total = Gastos.reduce((sum, g) => sum + g.monto, 0);
    let html = `
        <div class="inventory-form glass-card">
            <input type="text" id="g-d" placeholder="Descripcion del gasto">
            <input type="number" id="g-m" placeholder="Monto $">
            <button class="btn-nav" onclick="agregarGasto()">+</button>
        </div>
        <div class="inv-total">TOTAL GASTOS: $${total.toLocaleString()}</div>
        <table>`;
    Gastos.forEach(g => {
        html += `<tr>
            <td>${g.descripcion}</td>
            <td>$${g.monto.toLocaleString()}</td>
            <td><button class="btn-del" onclick="eliminarGasto('${g.idFirebase}')">🗑️</button></td>
        </tr>`;
    });
    container.innerHTML = html + `</table>`;
}

function agregarGasto() {
    const d = document.getElementById('g-d').value, m = parseInt(document.getElementById('g-m').value);
    if (d && m > 0) {
        database.ref('paolos_gastos_actuales').push({ descripcion: d, monto: m });
        document.getElementById('g-d').value = "";
        document.getElementById('g-m').value = "";
    }
}

function eliminarGasto(idFirebase) {
    if (confirm("¿Eliminar este gasto?")) {
        database.ref(`paolos_gastos_actuales/${idFirebase}`).remove();
    }
}

// --- REPORTES TRANSFERENCIAS ---
function renderTransferencias(container) {
    const transf = VentasHistoricas.filter(v => v.metodo === 'Transferencia' || v.metodo === 'Mixto');
    let total = transf.reduce((s, v) => s + (v.pagoTransferencia || v.total || 0), 0);
    let html = `<div class="inv-total">TOTAL TRANSF: $${total.toLocaleString()}</div><div class="products-grid">`;
    transf.forEach(v => {
        const montoTransf = v.pagoTransferencia || v.total || 0;
        html += `<div class="product-card">
            <small>${v.hora} — ${v.metodo}</small>
            <h4>${v.destino}</h4>
            <span>$${montoTransf.toLocaleString()}</span>
        </div>`;
    });
    container.innerHTML = html + `</div>`;
}

// --- HISTORIAL ---
function borrarHistorial() {
    if (userRole !== 'admin') { alert("Solo el administrador puede borrar el historial."); return; }
    const clave = prompt("Introduce la clave para confirmar:");
    if (clave !== claveInventario) { alert("Clave incorrecta."); return; }
    if (!confirm("¿Borrar TODO el historial? Esta accion es permanente.")) return;
    database.ref('paolos_historial').remove()
        .then(() => { HistorialCierres = []; alert("Historial borrado."); updateStatsFilter(); })
        .catch(err => alert("Error al borrar: " + err));
}

function borrarDiaHistorial(id) {
    if (userRole !== 'admin') { alert("Solo el administrador puede borrar registros."); return; }
    if (!confirm("¿Borrar este dia del historial?")) return;
    database.ref('paolos_historial/' + id).remove()
        .then(() => { HistorialCierres = HistorialCierres.filter(c => c.id !== id); updateStatsFilter(); })
        .catch(err => alert("Error al borrar: " + err));
}

// --- AJUSTES DE PRECIOS ---
function renderAjustes(container) {
    let html = `
    <div class="glass-card" style="padding:15px; border-top: 4px solid var(--accent);">
    <p style="font-size:0.8rem; color:var(--accent); margin-bottom:15px; text-align:center;">⚙️ PANEL DE CONTROL DE PRECIOS</p>`;

    html += `<h3 class="accent">🍕 PORCIONES</h3><table>`;
    DB.sabores_pizzas.forEach((s, idx) => {
        html += `<tr><td>${s.nombre}</td><td>
            <input type="number" value="${s.precio}" class="inv-input-inline"
            onchange="DB.sabores_pizzas[${idx}].precio = parseInt(this.value); syncPrecios();">
        </td></tr>`;
    });
    html += `</table>`;

    html += `<hr><h3 class="accent">🥘 PIZZAS COMPLETAS</h3>
    <p style="font-size:0.75rem; opacity:0.7; margin-bottom:8px;">El precio cobrado es el mas alto entre los sabores elegidos.</p>
    <table><tr><th>Tamaño</th><th>Especialidad</th><th>Tradicional</th></tr>`;
    DB.menu.pizzas_completa.forEach((p, idx) => {
        html += `<tr>
            <td>${p.nombre}</td>
            <td><input type="number" value="${p.precio_esp}" class="inv-input-inline" style="width:70px;"
                onchange="DB.menu.pizzas_completa[${idx}].precio_esp = parseInt(this.value); syncPrecios();"></td>
            <td><input type="number" value="${p.precio_trad}" class="inv-input-inline" style="width:70px;"
                onchange="DB.menu.pizzas_completa[${idx}].precio_trad = parseInt(this.value); syncPrecios();"></td>
        </tr>`;
    });
    html += `</table>`;

    html += `<hr><h3 class="accent">🍝 LASANAS</h3><table>`;
    DB.menu.lasañas.forEach((l, idx) => {
        html += `<tr><td>${l.nombre}</td><td>
            P <input type="number" value="${l.precio_p}" style="width:60px;"
            onchange="DB.menu.lasañas[${idx}].precio_p = parseInt(this.value); syncPrecios();">
            M <input type="number" value="${l.precio_m || l.precio_p}" style="width:60px;"
            onchange="DB.menu.lasañas[${idx}].precio_m = parseInt(this.value); syncPrecios();">
            F <input type="number" value="${l.precio_f}" style="width:60px;"
            onchange="DB.menu.lasañas[${idx}].precio_f = parseInt(this.value); syncPrecios();">
        </td></tr>`;
    });
    html += `</table>`;

    html += `<hr><h3 class="accent">🥞 CREPES</h3><table>`;
    DB.menu.crepes.forEach((c, idx) => {
        html += `<tr><td>${c.nombre}</td><td>
            <input type="number" value="${c.precio}" class="inv-input-inline"
            onchange="DB.menu.crepes[${idx}].precio = parseInt(this.value); syncPrecios();">
        </td></tr>`;
    });
    html += `</table>`;

    html += `<hr><h3 class="accent">🍽️ PASTAS</h3><table>`;
    (DB.menu.pastas || []).forEach((p, idx) => {
        html += `<tr><td>${p.nombre}</td><td>
            <input type="number" value="${p.precio}" class="inv-input-inline"
            onchange="DB.menu.pastas[${idx}].precio = parseInt(this.value); syncPrecios();">
        </td></tr>`;
    });
    html += `</table>`;

    html += `<hr><h3 class="accent">🍔 PANZEROTTIS</h3><table>`;
    (DB.menu.panzerottis || []).forEach((p, idx) => {
        html += `<tr><td>${p.nombre}</td><td>
            <input type="number" value="${p.precio}" class="inv-input-inline"
            onchange="DB.menu.panzerottis[${idx}].precio = parseInt(this.value); syncPrecios();">
        </td></tr>`;
    });
    html += `</table>`;

    html += `
    <hr>
    <h3 class="accent">➕ AGREGAR PRODUCTO</h3>
    <input id="nuevo-nombre" placeholder="Nombre" class="inv-input-inline" style="width:100%; margin-top:10px;">
    <input id="nuevo-precio" type="number" placeholder="Precio" class="inv-input-inline" style="width:100%; margin-top:10px;">
    <select id="nuevo-categoria" class="inv-input-inline" style="width:100%; margin-top:10px;">
        <option value="pizzas_completa">Pizza Completa</option>
        <option value="crepes">Crepes</option>
        <option value="lasañas">Lasanas</option>
        <option value="pastas">Pastas</option>
        <option value="panzerottis">Panzerottis</option>
    </select>
    <button class="btn-action" style="margin-top:15px; width:100%;" onclick="agregarProducto()">GUARDAR PRODUCTO</button>

    <hr>
    <h3 class="accent">🔒 CLAVE DE INVENTARIO</h3>
    <p style="font-size:0.8rem; opacity:0.7; margin-bottom:10px;">Clave actual: <b style="color:var(--accent);">${claveInventario}</b></p>
    <input id="nueva-clave-inv" type="text" placeholder="Nueva clave" class="inv-input-inline" style="width:100%; margin-bottom:10px;">
    <button class="btn-action" style="width:100%; background:#7c3aed;" onclick="cambiarClaveInventario()">GUARDAR NUEVA CLAVE</button>

    </div>`;

    container.innerHTML = html;
}

function cambiarClaveInventario() {
    const nueva = document.getElementById('nueva-clave-inv').value.trim();
    if (!nueva) { alert("⚠️ Escribe una clave valida."); return; }
    database.ref('config_clave_inv').set(nueva)
        .then(() => { claveInventario = nueva; alert("✅ Clave actualizada."); openModule('ajustes'); })
        .catch(err => alert("❌ Error: " + err.message));
}

function agregarProducto() {
    const nombre = document.getElementById('nuevo-nombre').value.trim();
    const precio = parseInt(document.getElementById('nuevo-precio').value);
    const categoria = document.getElementById('nuevo-categoria').value;
    if (!nombre || !precio) { alert("⚠️ Completa todos los campos"); return; }
    if (!DB.menu[categoria]) DB.menu[categoria] = [];
    DB.menu[categoria].push({ nombre, precio });
    syncPrecios();
    alert("✅ Producto agregado");
    document.getElementById('nuevo-nombre').value = "";
    document.getElementById('nuevo-precio').value = "";
    openModule('ajustes');
}

// =====================================================
// --- IMPRESIÓN EN 4 PARTES ---
// =====================================================

function limpiarTextoImpresora(texto) {
    const mapa = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
        'ñ': 'n', 'Ñ': 'N', 'ü': 'u', 'Ü': 'U',
        '¿': '?', '¡': '!', '°': '', '·': '.', '…': '...'
    };
    return texto.replace(/[áéíóúÁÉÍÓÚñÑüÜ¿¡°·…]/g, c => mapa[c] || c);
}

function prepararDatosYImprimir() {
    // Separar items por categoría
    const comidaMap = {};   // pizzas, porciones, crepes, lasañas, pastas, panzerottis
    const bebidaMap = {};   // bebidas
    let totalTransferencias = 0;
    let totalVentasGeneral = 0;

    VentasHistoricas.forEach(v => {
        // Acumular transferencias
        if (v.metodo === 'Transferencia') totalTransferencias += v.total;
        else if (v.metodo === 'Mixto') totalTransferencias += (v.pagoTransferencia || 0);

        totalVentasGeneral += v.total;

        if (!v.items) return;
        v.items.forEach(item => {
            const nombre = limpiarTextoImpresora(item.nombre || 'Producto');
            const precio = item.precio || 0;
            const esBebida = item.categoria === 'bebidas';
            const mapa = esBebida ? bebidaMap : comidaMap;

            if (!mapa[nombre]) mapa[nombre] = { nombre, cant: 0, precioUnit: precio, total: 0 };
            mapa[nombre].cant++;
            mapa[nombre].total += precio;
        });
    });

    const totalGastos = Gastos.reduce((s, g) => s + g.monto, 0);
    const gastosArr = Gastos.map(g => ({ motivo: limpiarTextoImpresora(g.descripcion || 'Gasto'), monto: g.monto }));

    const comidaArr = Object.values(comidaMap);
    const bebidaArr = Object.values(bebidaMap);

    // Calcular totales por categoría para el ticket
    const totalComida = comidaArr.reduce((s, i) => s + i.total, 0);
    const totalBebidas = bebidaArr.reduce((s, i) => s + i.total, 0);

    const sep   = "-----------------------------\n";
    const sep2  = "=============================\n";
    const fecha = new Date().toLocaleString('es-CO');

    // ============================================================
    // TICKET 1: GASTOS + TRANSFERENCIAS
    // ============================================================
    let t1 = "";
    t1 += "     PAOLO'S PIZZA\n";
    t1 += "   TICKET 1/4 - GASTOS\n";
    t1 += sep;
    t1 += "F: " + fecha + "\n";
    t1 += sep;

    t1 += "--- GASTOS DEL TURNO ---\n";
    if (gastosArr.length > 0) {
        gastosArr.forEach(g => {
            const mot = g.motivo.substring(0, 14).padEnd(14);
            const val = ("-$" + g.monto.toLocaleString('es-CO')).padStart(8);
            t1 += "* " + mot + val + "\n";
        });
    } else {
        t1 += "  (Sin gastos)\n";
    }
    t1 += sep;
    t1 += "TOTAL GASTOS:".padEnd(18) + ("$" + totalGastos.toLocaleString('es-CO')) + "\n";
    t1 += sep2;

    t1 += "--- TRANSFERENCIAS ---\n";
    const ventasTransf = VentasHistoricas.filter(v => v.metodo === 'Transferencia' || v.metodo === 'Mixto');
    if (ventasTransf.length > 0) {
        ventasTransf.forEach(v => {
            const monto = v.pagoTransferencia || v.total || 0;
            const dest = limpiarTextoImpresora(v.destino || '').substring(0, 10).padEnd(10);
            const hora = (v.hora || '').padEnd(6);
            const val = ("$" + monto.toLocaleString('es-CO')).padStart(7);
            t1 += hora + " " + dest + val + "\n";
        });
    } else {
        t1 += "  (Sin transferencias)\n";
    }
    t1 += sep;
    t1 += "TOTAL TRANSF:".padEnd(18) + ("$" + totalTransferencias.toLocaleString('es-CO')) + "\n";
    t1 += "\n\n";

    // ============================================================
    // TICKET 2: BEBIDAS
    // ============================================================
    let t2 = "";
    t2 += "     PAOLO'S PIZZA\n";
    t2 += "  TICKET 2/4 - BEBIDAS\n";
    t2 += sep;
    t2 += "F: " + fecha + "\n";
    t2 += sep;
    t2 += "CANT  PRODUCTO         TOTAL\n";
    t2 += sep;

    if (bebidaArr.length > 0) {
        bebidaArr.forEach(b => {
            const cant = String(b.cant).padEnd(5);
            const nom  = b.nombre.substring(0, 14).padEnd(14);
            const val  = ("$" + b.total.toLocaleString('es-CO')).padStart(8);
            t2 += cant + nom + val + "\n";
        });
    } else {
        t2 += "  (Sin ventas de bebidas)\n";
    }
    t2 += sep;
    t2 += "TOTAL BEBIDAS:".padEnd(18) + ("$" + totalBebidas.toLocaleString('es-CO')) + "\n";
    t2 += "\n\n";

    // ============================================================
    // TICKET 3: COMIDAS (pizzas, porciones, crepes, etc.)
    // ============================================================
    let t3 = "";
    t3 += "     PAOLO'S PIZZA\n";
    t3 += "  TICKET 3/4 - COMIDAS\n";
    t3 += sep;
    t3 += "F: " + fecha + "\n";
    t3 += sep;
    t3 += "CANT  PRODUCTO         TOTAL\n";
    t3 += sep;

    if (comidaArr.length > 0) {
        comidaArr.forEach(c => {
            const cant = String(c.cant).padEnd(5);
            const nom  = c.nombre.substring(0, 14).padEnd(14);
            const val  = ("$" + c.total.toLocaleString('es-CO')).padStart(8);
            t3 += cant + nom + val + "\n";
        });
    } else {
        t3 += "  (Sin ventas de comida)\n";
    }
    t3 += sep;
    t3 += "TOTAL COMIDAS:".padEnd(18) + ("$" + totalComida.toLocaleString('es-CO')) + "\n";
    t3 += "\n\n";

    // ============================================================
    // TICKET 4: RESUMEN TOTAL
    // ============================================================
    const efectivoEnCaja = (totalVentasGeneral - totalTransferencias + (CajaActual.base || 0)) - totalGastos;

    let t4 = "";
    t4 += "     PAOLO'S PIZZA\n";
    t4 += "   TICKET 4/4 - TOTALES\n";
    t4 += sep;
    t4 += "F: " + fecha + "\n";
    t4 += sep2;

    t4 += "BASE INICIAL:".padEnd(18)  + ("$" + (CajaActual.base || 0).toLocaleString('es-CO')) + "\n";
    t4 += sep;
    t4 += "VENTAS COMIDA:".padEnd(18) + ("$" + totalComida.toLocaleString('es-CO')) + "\n";
    t4 += "VENTAS BEBIDAS:".padEnd(18)+ ("$" + totalBebidas.toLocaleString('es-CO')) + "\n";
    t4 += "TOTAL VENTAS:".padEnd(18)  + ("$" + totalVentasGeneral.toLocaleString('es-CO')) + "\n";
    t4 += sep;
    t4 += "TRANSFERENCIAS:".padEnd(18)+ ("-$" + totalTransferencias.toLocaleString('es-CO')) + "\n";
    t4 += "GASTOS:".padEnd(18)        + ("-$" + totalGastos.toLocaleString('es-CO')) + "\n";
    t4 += sep2;
    t4 += "EFECTIVO EN CAJA:\n";
    t4 += "  $" + efectivoEnCaja.toLocaleString('es-CO') + "\n";
    t4 += sep2;
    t4 += "NETO DEL TURNO:\n";
    t4 += "  $" + (totalVentasGeneral - totalGastos).toLocaleString('es-CO') + "\n";
    t4 += "\n\n";

    // Enviar los 4 tickets a la cola de impresión con pequeño delay entre cada uno
    imprimirConQZ(t1);
    setTimeout(() => imprimirConQZ(t2), 500);
    setTimeout(() => imprimirConQZ(t3), 1000);
    setTimeout(() => imprimirConQZ(t4), 1500);
}

// --- COMANDA DE COCINA ---
function imprimirComandaCocina(dest) {
    const items = Cuentas[dest] || [];
    if (items.length === 0) return alert("No hay productos para enviar a cocina");

    const grouped = items.reduce((acc, it) => {
        acc[it.nombre] = (acc[it.nombre] || 0) + 1;
        return acc;
    }, {});

    const sep  = "-----------------------------\n";
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fecha = new Date().toLocaleDateString('es-CO');

    let txt = "";
    txt += "     PAOLOS PIZZA\n";
    txt += "   COMANDA COCINA\n";
    txt += "   " + dest.toUpperCase() + "\n\n";
    txt += "   " + fecha + "  " + hora + "\n";
    txt += sep;
    txt += "CANT  DESCRIPCION\n";
    txt += sep;

    Object.keys(grouped).forEach(nombre => {
        const cant = String(grouped[nombre]).padEnd(5);
        const nom  = limpiarTextoImpresora(nombre).substring(0, 22).toUpperCase();
        txt += cant + " " + nom + "\n";
    });

    txt += sep + "\n";
    imprimirConQZ(txt);
}

function imprimirConQZ(texto) {
    const entrada = { texto, encoding: 'raw', timestamp: Date.now() };
    database.ref('paolos_print_queue').push(entrada)
        .then(() => console.log("Ticket enviado a cola de impresion"))
        .catch(err => {
            console.error("Error al enviar ticket:", err);
            alert("No se pudo enviar el ticket.\nVerifica la conexion con Firebase.");
        });
}