let presupuesto = 0;
let gastos = [];

const inputPresupuesto = document.getElementById('presupuesto');
const btnCalcular = document.getElementById('btnCalcular');
const totalPresupuesto = document.getElementById('totalPresupuesto');
const totalGastos = document.getElementById('totalGastos');
const saldo = document.getElementById('saldo');
const nombreGasto = document.getElementById('nombreGasto');
const cantidadGasto = document.getElementById('cantidadGasto');
const btnAnadirGasto = document.getElementById('btnAnadirGasto');
const bodyTablaGastos = document.getElementById('bodyTablaGastos');
const btnReiniciar = document.getElementById('btnReiniciar');

// Calcular el presupuesto
btnCalcular.addEventListener('click', function () {
    presupuesto = Number(inputPresupuesto.value);
    totalPresupuesto.textContent = `$${presupuesto}`;
    saldo.textContent = `$${presupuesto}`;
    inputPresupuesto.value = '';
    habilitarReinicio();
    habilitarAgregarGasto();
    inputPresupuesto.disabled = true;
});

// Añadir un nuevo gasto
btnAnadirGasto.addEventListener('click', function () {
    const gasto = {
        nombre: nombreGasto.value,
        cantidad: Number(cantidadGasto.value)
    };

    gastos.push(gasto);

    // Añadir gasto a la tabla de gastos
    const filaGasto = document.createElement('tr');
    filaGasto.innerHTML = `
        <th scope="row">${gastos.length}</th>
        <td>${gasto.nombre}</td>
        <td>$${gasto.cantidad}</td>
        <td><i class="fas fa-trash text-danger" style="cursor:pointer;"></i></td>
    `;
    bodyTablaGastos.appendChild(filaGasto);

    // Eliminar gasto
    filaGasto.querySelector('.fa-trash').addEventListener('click', function () {
        bodyTablaGastos.removeChild(filaGasto);
        const index = gastos.indexOf(gasto);
        gastos.splice(index, 1);
        actualizarTotales();
    });

    actualizarTotales();

    // Limpiar los inputs
    nombreGasto.value = '';
    cantidadGasto.value = '';
});

// Evento par reinciar la aplicación
btnReiniciar.addEventListener('click', function () {
    reiniciarApp();
});

// Reiniciar la aplicación
function reiniciarApp() {
    presupuesto = 0;
    gastos = [];
    totalPresupuesto.textContent = '0';
    totalGastos.textContent = '0';
    saldo.textContent = '0';
    bodyTablaGastos.innerHTML = '';
    inputPresupuesto.value = '';
    habilitarReinicio();
    habilitarAgregarGasto();
    inputPresupuesto.disabled = false;
}

// Desactivar el botón y el campo de presupuesto al inicio
habilitarReinicio();
habilitarAgregarGasto();

// Función para habilitar o deshabilitar el botón de reinicio
function habilitarReinicio() {
    btnReiniciar.disabled = presupuesto === 0;
}

// Función para habilitar o deshabilitar la opción de añadir gastos
function habilitarAgregarGasto() {
    btnAnadirGasto.disabled = presupuesto === 0;
    nombreGasto.disabled = presupuesto === 0;
    cantidadGasto.disabled = presupuesto === 0;
}

// Función para actualizar los totales
function actualizarTotales() {
    // Actualizamos el total de gastos
    const totalGasto = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    totalGastos.textContent =  `$${totalGasto}`;

    // Actualizar el saldo
    saldo.textContent = `$${presupuesto - totalGasto}`;
}
