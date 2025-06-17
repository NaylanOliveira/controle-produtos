// Get references to our input fields
let nomeCompletoInput = document.getElementById('nomeCompleto');
let emailInput = document.getElementById('email');
let telefoneInput = document.getElementById('telefone');
let dataNascimentoInput = document.getElementById('dataNascimento'); // Assuming an input for date

let btnSalvar = document.getElementById('btnSalvar');

let clientes = []; // Renamed from 'categorias' to 'clientes'
let indexEditado = null;

// ---
// Function to render the table with customer data
// ---
function renderizarTabela() {
    let linha = '';
    clientes.forEach((cliente, index) => { // Iterate through 'clientes'
        linha += `
            <tr>
                <td>${index + 1}</td> <td>${cliente.nomeCompleto}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.dataNascimento}</td>
                <td>
                    <button onclick="editarCliente(${index})" class="btn btn-sm btn-warning">Editar</button>
                    <button onclick="removerCliente(${index})" class="btn btn-sm btn-danger text-light">Remover</button>
                </td>
            </tr>
        `;
    });
    // Assuming you have an element with id 'clientesTabelaBody' for the table body
    document.getElementById('clientesTabelaBody').innerHTML = linha;
}

// ---
// Function to validate input fields
// ---
function validarCampos() {
    if (nomeCompletoInput.value.trim() === '') {
        alert('O Nome Completo não pode ficar vazio.');
        nomeCompletoInput.focus();
        return false;
    }
    if (emailInput.value.trim() === '') {
        alert('O Email não pode ficar vazio.');
        emailInput.focus();
        return false;
    }
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        alert('Por favor, insira um email válido.');
        emailInput.focus();
        return false;
    }
    if (telefoneInput.value.trim() === '') {
        alert('O Número do Telefone não pode ficar vazio.');
        telefoneInput.focus();
        return false;
    }
    if (dataNascimentoInput.value.trim() === '') {
        alert('A Data de Nascimento não pode ficar vazia.');
        dataNascimentoInput.focus();
        return false;
    }
    return true;
}

// ---
// Function to add a new customer
// ---
function addCliente() {
    if (!validarCampos()) return; // Validate all customer fields

    clientes.push({
        nomeCompleto: nomeCompletoInput.value.trim(),
        email: emailInput.value.trim(),
        telefone: telefoneInput.value.trim(),
        dataNascimento: dataNascimentoInput.value.trim()
    });

    limparCampos();
    renderizarTabela();
}

// ---
// Function to edit an existing customer
// ---
function editarCliente(index) {
    const cliente = clientes[index];
    nomeCompletoInput.value = cliente.nomeCompleto;
    emailInput.value = cliente.email;
    telefoneInput.value = cliente.telefone;
    dataNascimentoInput.value = cliente.dataNascimento;

    indexEditado = index;
    btnSalvar.innerText = 'Editar Cliente';
    btnSalvar.onclick = atualizarCliente; // Change button action to update
}

// ---
// Function to update an edited customer
// ---
function atualizarCliente() {
    if (!validarCampos()) return; // Validate fields before updating

    clientes[indexEditado].nomeCompleto = nomeCompletoInput.value.trim();
    clientes[indexEditado].email = emailInput.value.trim();
    clientes[indexEditado].telefone = telefoneInput.value.trim();
    clientes[indexEditado].dataNascimento = dataNascimentoInput.value.trim();

    indexEditado = null; // Reset index
    btnSalvar.innerText = 'Adicionar Cliente'; // Reset button text
    btnSalvar.onclick = addCliente; // Reset button action to add
    limparCampos();
    renderizarTabela();
}

// ---
// Function to remove a customer
// ---
function removerCliente(index) {
    if (confirm('Tem certeza que deseja remover este cliente?')) { // Add confirmation
        clientes.splice(index, 1);
        renderizarTabela();
    }
}

// ---
// Function to clear all input fields
// ---
function limparCampos() {
    nomeCompletoInput.value = '';
    emailInput.value = '';
    telefoneInput.value = '';
    dataNascimentoInput.value = '';
    nomeCompletoInput.focus(); // Set focus back to the first field
}

// ---
// Initialize: Set the initial button action and render the empty table
// ---
btnSalvar.onclick = addCliente; // Default action is to add a new client
renderizarTabela(); // Display the table (initially empty)