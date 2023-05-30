function atualizarContatos() {
    // Limpa a lista de contatos
    document.getElementById('listaProdutos').innerHTML = ''
    // Faz uma requisição Fetch para o endereço localhost:3000/contatos
    // e retorna um array de objetos JSON
    const Produto = fetch('http://localhost:3000/produtos')
        .then(resposta => resposta.json())
        .then(produtos => {
            // Para cada objeto JSON do array
            // cria um elemento <li> e adiciona ao <ul id="listaContatos">        
            contatos.forEach(contato => {
                const li = document.createElement('li')
                li.textContent = `${produtos.nome} - ${id.quantidade}`
                // Adiciona um botão de excluir para cada contato
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btCancelar'
                botaoExcluir.addEventListener('click', () => deleteProduto(produtos.id))
                li.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada contato
                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btAtualizar'
                botaoAtualizar.addEventListener('click', () => showProduto(produtos))
                li.appendChild(botaoAtualizar)

                document.getElementById('listaContatos').appendChild(li)
            })
        })
}

function showContato(Produto) {
    document.getElementById('nomeUpdate').value = produtos.nome
    document.getElementById('idUpdate').value = produtos.id
    document.getElementById('btnUpdate').disabled = false
}

function deleteContato(id) {
    fetch(`http://localhost:3000/contatos/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao excluir produto!')
        }
        alert('Produto excluído com sucesso!')
        atualizarContatos()
    })
}

atualizarContatos()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarContato(event)
});

function cadastrarProduto(form) {
    const contato = {
        produto: form.target.produto.value,
        materia: form.target.materia.value
    }

    fetch('http://localhost:3000/contatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar contato!')
        }
        alert('Contato cadastrado com sucesso!')
        form.target.reset()
        atualizarContatos()
    })
}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarProduto(event)
});

function atualizarProduto(form) {
    const contato = {
        nome: form.target.nomeUpdate.value,
        materia: form.target.materia.value
    }

    fetch(`http://localhost:3000/contatos/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar produto!')
        }
        alert('Produto atualizado com sucesso!')
        form.target.reset()
        atualizarContatos()
        document.getElementById('btnUpdate').disabled = true
    })
}