 let descricaoProduto = document.getElementById('descricao')
let precoProduto = document.getElementById('preco')
let btnSalvar = document.getElementById('btnSalvar')

let linha = ''
let produtos = []
let indexEditado = null

function renderizarTabela() {
    linha = ''

    produtos.forEach((p, index) => linha += `
        <tr>
            <td>${p.codigo}</td>
            <td>${p.descricao}</td>
            <td>R$ ${p.preco.toFixed(2)}</td>
            <td>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="removerProduto(${index})">Remover</button>
            </td>
        </tr>
    `)

    document.getElementById('produtos').innerHTML = linha
}

function addProduto() {
    produtos.push({
        codigo: produtos.length + 1,
        descricao: descricaoProduto.value,
        preco: Number(precoProduto.value)
    })

    renderizarTabela()

    descricaoProduto.value = ''
    precoProduto.value = ''
    descricaoProduto.focus()
}

function atualizarProduto() {
    produtos[indexEditado].descricao = descricaoProduto.value
    produtos[indexEditado].preco = Number(precoProduto.value)

    renderizarTabela()

    descricaoProduto.value = ''
    precoProduto.value = '' 
    descricaoProduto.focus()
    btnSalvar.innerText = 'Adicionar Produto' 
    btnSalvar.onclick = addProduto
}

function editarProduto(index) {
    const produto = produtos[index]
    descricaoProduto = produto.descricao
    precoProduto.value = produto.preco
    indexEditado = index
    btnSalvar.innerText = 'Editar Produto'   
}

function removerProduto(index) {
    const produto = produtos[index]
    alert(`Produto selecionado: ${produto.descricao}`)
}