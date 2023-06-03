function atualizarProdutos() {
    document.getElementById('listaProdutos').innerHTML = ''
    const produtos = fetch('http://localhost:3000/produtos')
        .then(resposta => resposta.json())
        .then(produtos => {   
            produtos.forEach(produto => {
                const li = document.createElement('li')
                li.textContent = `${produto.desc} - ${produto.desenho}`

                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger m-1'
                botaoExcluir.addEventListener('click', () => deleteProduto(produto.cod))
                li.appendChild(botaoExcluir)

                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning m-1'
                botaoAtualizar.addEventListener('click', () => showProduto(produto))
                li.appendChild(botaoAtualizar)

                document.getElementById('listaProdutos').appendChild(li)
            })
        })
}

function showProduto(produto) {
    document.getElementById('descUpdate').value = produto.desc
    document.getElementById('dimensoesUpdate').value = produto.dimensoes
    document.getElementById('codUpdate').value = produto.cod
    document.getElementById('btnUpdate').disabled = false
}

function deleteProduto(cod) {
    fetch(`http://localhost:3000/produtos/${cod}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao excluir produto!')
        }
        alert('Produto excluído com sucesso!')
        atualizarProdutos()
    })
}

atualizarProdutos()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarProduto(event)
});

function cadastrarProduto(form) {
    const produto = {
        cod: 1,
        desc: form.target.desc.value,
        desenho: form.target.desenho.value
    }

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar produto!')
        }
        alert('Produto cadastrado com sucesso!')
        form.target.reset()
        atualizarProdutos()
    })
}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarProduto(event)
});

function atualizarProduto(form) {
    const produto = {
        desc: form.target.descUpdate.value,
        desenho: form.target.desenhoUpdate.value
    }

    fetch(`http://localhost:3000/produtos/${form.target.codUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar produto!')
        }
        alert('Produto atualizado com sucesso!')
        form.target.reset()
        atualizarProdutos()
        document.getElementById('btnUpdate').disabled = true
    })
}