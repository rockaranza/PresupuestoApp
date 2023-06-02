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
const listaGastos = document.getElementById('listaGastos');
const bodyTablaGastos = document.getElementById('bodyTablaGastos');

// Calcular el presupuesto
btnCalcular.addEventListener('click', function () {
    presupuesto = Number(inputPresupuesto.value);
    totalPresupuesto.textContent = `$${presupuesto}`;
    saldo.textContent = `$${presupuesto}`;
    inputPresupuesto.value = '';
});

// Añadir un nuevo gasto
btnAnadirGasto.addEventListener('click', function () {
  const gasto = {
      nombre: nombreGasto.value,
      cantidad: Number(cantidadGasto.value)
  };

  gastos.push(gasto);

  // Añadir gasto a la lista de gastos
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

  // Limpiamos los inputs
  nombreGasto.value = '';
  cantidadGasto.value = '';
});

function actualizarTotales() {
  // Actualizar total de gastos
  const totalGasto = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  totalGastos.textContent =`$${totalGasto}`;

  // Actualizar saldo
  saldo.textContent = `$${presupuesto - totalGasto}`;
}
