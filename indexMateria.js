function atualizarMaterias() {
    document.getElementById('listaMaterias').innerHTML = ''
    const materias = fetch('http://localhost:3000/materias-primas')
        .then(resposta => resposta.json())
        .then(materias => {   
            materias.forEach(materia => {
                const li = document.createElement('li')
                li.textContent = `${materia.desc} - ${materia.dimensoes}`

                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger m-1'
                botaoExcluir.addEventListener('click', () => deleteMateria(materia.cod))
                li.appendChild(botaoExcluir)

                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning m-1'
                botaoAtualizar.addEventListener('click', () => showMateria(materia))
                li.appendChild(botaoAtualizar)

                document.getElementById('listaMaterias').appendChild(li)
            })
        })
}

function showMateria(materia) {
    document.getElementById('descUpdate').value = materia.desc
    document.getElementById('dimensoesUpdate').value = materia.dimensoes
    document.getElementById('codUpdate').value = materia.cod
    document.getElementById('btnUpdate').disabled = false
}

function deleteMateria(cod) {
    fetch(`http://localhost:3000/materias-primas/${cod}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao excluir materia!')
        }
        alert('Materia excluída com sucesso!')
        atualizarMaterias()
    })
}

atualizarMaterias()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarMateria(event)
});

function cadastrarMateria(form) {
    const materia = {
        cod: 1,
        desc: form.target.desc.value,
        dimensoes: form.target.dimensoes.value
    }

    fetch('http://localhost:3000/materias-primas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(materia)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar materia!')
        }
        alert('Materia cadastrada com sucesso!')
        form.target.reset()
        atualizarMaterias()
    })
}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarMateria(event)
});

function atualizarMateria(form) {
    const materia = {
        desc: form.target.descUpdate.value,
        dimensoes: form.target.dimensoesUpdate.value
    }

    fetch(`http://localhost:3000/materias-primas/${form.target.codUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(materia)
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar materia!')
        }
        alert('Materia atualizada com sucesso!')
        form.target.reset()
        atualizarMaterias()
        document.getElementById('btnUpdate').disabled = true
    })
}