atualizarMaterias()
atualizarProdutos()

function atualizarProdutos() {
    document.getElementById('listaProdutos').innerHTML = ''
    const produtos = fetch('http://localhost:3000/produtos')
        .then(resposta => resposta.json())
        .then(produtos => {   
            produtos.forEach(produto => {
                const option = document.createElement('option')
                option.textContent = `${produto.desc} - ${produto.desenho}`
                option.value = produto.cod

                document.getElementById('listaProdutos').appendChild(option)
            })
        })
}

function atualizarMaterias() {
    document.getElementById('listaMaterias').innerHTML = ''
    const materias = fetch('http://localhost:3000/materias-primas')
        .then(resposta => resposta.json())
        .then(materias => {   
            materias.forEach(materia => {
                const option = document.createElement('option')
                option.textContent = `${materia.desc} - ${materia.dimensoes}`
                option.value = materia.cod


                document.getElementById('listaMaterias').appendChild(option)
            })
        })
}

document.querySelector("#formConfirmar").addEventListener("submit", function (event) {
    event.preventDefault()
    confirmar(event)
})
    function confirmar(form) {
        const selectP = document.querySelector('#listaProdutos')
        const optionValueP = selectP.options[selectP.selectedIndex]
        const valueP = optionValueP.value

        const selectM = document.querySelector('#listaMaterias')
        const optionValueM = selectM.options[selectM.selectedIndex]
        const valueM = optionValueM.value
        const q =  document.getElementById('quantidade').value
        vincular(q, valueM, valueP)
        document.getElementById('quantidade').value = ""
}

function vincular(q, valueM, valueP) {
    const vinculo = {
        quantidade: q,
        materiumCod: valueM,
        produtoCod: valueP
    }

    fetch('http://localhost:3000/prod-mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vinculo)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao vincular materia e produto!')
        }
        alert('Materia e produto vinculados com sucesso!')
    })
}