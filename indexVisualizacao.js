atualizarSelect()

function atualizarMaterias(cod) {
    document.getElementById('listaMaterias').innerHTML = ''
    const produtos = fetch(`http://localhost:3000/prod-mp/${cod}`)
        .then(resposta => resposta.json())
        .then(produtos => {   
            produtos.forEach(produto => {
                const codm = produto.produto_materiaPrima.materiumCod
                const quant = produto.produto_materiaPrima.quantidade
                const materias = fetch(`http://localhost:3000/materias-primas/${codm}`)
                    then(resposta => resposta.json())
                    .then(materias => {   
                    materias.forEach(materia => {
                    const li = document.createElement('li')
                    li.textContent = `${materia.desc} - ${materia.dimensoes}: ${quant}`

                document.getElementById('listaMaterias').appendChild(li)
            })})
        })
})}

function atualizarSelect() {
    document.getElementById('selectProduto').innerHTML = ''
    const produtos = fetch('http://localhost:3000/produtos')
        .then(resposta => resposta.json())
        .then(produtos => {   
            produtos.forEach(produto => {
                const option = document.createElement('option')
                option.textContent = `${produto.desc} - ${produto.desenho}`
                option.value = produto.cod

                document.getElementById('selectProduto').appendChild(option)
            })
        })
}

function printarProduto(selected) {
    const prod = document.getElementById("prod")
    prod.textContent = `${selected}`
}

document.querySelector("#formConfirmar").addEventListener("submit", function (event) {
    event.preventDefault()
    confirmar(event)
})
    function confirmar(form) {
        const selectP = document.querySelector('#selectProduto')
        const optionValueP = selectP.options[selectP.selectedIndex]
        printarProduto(optionValueP.textContent)  
        atualizarMaterias(optionValueP.value) 
}

