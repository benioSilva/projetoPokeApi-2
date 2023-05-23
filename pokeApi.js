console.log("hello")
var pokeApiLink = 'https://pokeapi.co/api/v2/pokemon'
var bodyListPokeId = "list-all-poke"
var pokeTeamKey = "pokeTeam"
var previousPageLink
var nextPageLink
var lastLink
var tempKey = "pokemonTarget"
var teamPokeId = "team-poke"
var nameTeamdivId = "name-team-div"
var nameTeamId = "name-team"
var btnCriarTimeId = "btn-criar-time"
var btnSalvarId = "btn-salvar"
var btnExcluirId = "btn-excluir"
var listaKey = "pokeListaTimes"
var editarTimeKey = "editarTime"

initPage()

async function initPage() {

    teamSelect()
    limparStorageTeam()
    await loadPokeList(pokeApiLink)
    iniciarEditar()


}



function getElementById(id) {
    return document.getElementById(id)
}

function getEditarTimeStorage() {
    const storageEditarTime = localStorage.getItem(editarTimeKey)
    return JSON.parse(storageEditarTime)
}

function getPokeTeamStorage() {
    const storageTeamPoke = localStorage.getItem(pokeTeamKey)
    return JSON.parse(storageTeamPoke) || []
}

function getListaDeTimes() {
    const storageLista = localStorage.getItem(listaKey)
    return JSON.parse(storageLista) || []
}

function previousPage() {
    if (previousPageLink) {
        loadPokeList(previousPageLink)
    }
}

function nextPage() {
    if (nextPageLink)
        loadPokeList(nextPageLink)
}

async function getSprites(pokeNameLink) {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokeNameLink + "")
    response.data.sprites.front_default
    return response.data.sprites.front_default
}
async function loadPokeList(pokeapiParam) {
    lastLink = pokeapiParam
    toggleSpinner()
    toggleBtnAdd()
    const response = await axios.get(pokeapiParam)
    console.log(response.data)
    const listPoke = response.data.results
    console.log(listPoke)

    getElementById(bodyListPokeId).innerHTML = ""

    for (let index = 0; index < listPoke.length; index++) {
        const element = listPoke[index];
        console.log(element, index)
        pokeNameLink = element.name
        const linkImg = await getSprites(pokeNameLink)
        if (getPokeTeamStorage().length < 6) {
            getElementById(bodyListPokeId).innerHTML +=
                '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
                '<div value="' + index + '"><img src="' + linkImg + '" alt="' + element.name + '"></div>' +
                '<h6 value="' + index + '">' + element.name + '</h6>' +
                "<button class='btn btn-primary btn-sm'  onclick='pokeSelect(\"" + linkImg + "\",\"" + element.name + "\")'>Move set</button><br>" +
                "<button class='btn btn-success btn-add' style='display: none;' onclick='addToTeam(\"" + linkImg + "\",\"" + element.name + "\")'>Add to Team</button>" +
                '</div>'
        } else {
            getElementById(bodyListPokeId).innerHTML +=
                '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
                '<div value="' + index + '"><img src="' + linkImg + '" alt="' + element.name + '"></div>' +
                '<h6 value="' + index + '">' + element.name + '</h6>' +
                "<button class='btn btn-primary btn-sm' onclick='pokeSelect(\"" + linkImg + "\",\"" + element.name + "\")'>Move set</button>" +
                '</div>'
        }
    }
    toggleSpinner()
    toggleBtnAdd()
    previousPageLink = response.data.previous
    nextPageLink = response.data.next
}

function toggleSpinner() {
    var isSpinnerDisplayNone = document.getElementById("spinner").style.display == "none"
    if (isSpinnerDisplayNone) {
        document.getElementById("spinner").style.display = "inline-block"
        getElementById(bodyListPokeId).style.display = "none"
        document.querySelectorAll(".btn-change-page").forEach(element => {
            element.disabled = true
        });

    } else {
        document.getElementById("spinner").style.display = "none"
        getElementById(bodyListPokeId).style.display = "flex"
        document.querySelectorAll(".btn-change-page").forEach(element => {
            element.disabled = false
        });

    }
}
function getStoragePokeTemp() {
    const storageTemp = localStorage.getItem(tempKey)
    return JSON.parse(storageTemp)
}

function pokeSelect(pokeTempImg, pokeTempName) {

    let moveSet = {
        pokeImg: pokeTempImg,
        pokeName: pokeTempName
    }
    localStorage.setItem(tempKey, JSON.stringify(moveSet))
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon/coreui-free-bootstrap-admin-template-main/dist/base/move-list.html"
    loadPokeList(lastLink)
}

function addToTeam(pokeImgToTeam, pokeNameToTeam) {
    let toTeam = {
        pokemonImage: pokeImgToTeam,
        pokemonName: pokeNameToTeam
    }
    const realocandoStorage = getPokeTeamStorage()
    realocandoStorage.push(toTeam)
    localStorage.setItem(pokeTeamKey, JSON.stringify(realocandoStorage))
    teamSelect()
    toggleBtnAdd()
    loadPokeList(lastLink)


}

function teamSelect() {
    const realocandoStorage = getPokeTeamStorage()
    getElementById(teamPokeId).innerHTML = ""
    realocandoStorage.forEach(function (element, index) {
        getElementById(teamPokeId).innerHTML +=
            '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
            '<div value="' + index + '"><img src="' + element.pokemonImage + '" alt="' + element.pokemonName + '"></div>' +
            '<h6 value="' + index + '">' + element.pokemonName + '</h6>' +
            "<button class='btn btn-primary btn-sm' onclick='pokeSelect(\"" + element.pokemonImage + "\",\"" + element.pokemonName + "\")'>Move set</button><br>" +
            "<button class='btn btn-danger btn-remover' onclick='removerDoTime(" + index + ")'>Remove</button>" +
            '</div>'
    });

}

function removerDoTime(param) {
    toggleBtnCriarTime()
    toggleBtnAdd()
    let realocandoStorage = getPokeTeamStorage()
    realocandoStorage = realocandoStorage.filter(function (element, index) {
        return param != index
    })
    localStorage.setItem(pokeTeamKey, JSON.stringify(realocandoStorage))
    teamSelect()
    toggleBtnCriarTime()
    toggleBtnAdd()
    loadPokeList(lastLink)
}
function pokeSelectTeam(pokeTempImg, pokeTempName) {

    let moveSet = {
        pokeImg: pokeTempImg,
        pokeName: pokeTempName
    }
    localStorage.setItem(tempKey, JSON.stringify(moveSet))
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon/coreui-free-bootstrap-admin-template-main/dist/base/move-list.html"
}

function toggleBtnCriarTime() {
    var isBtnCriarTimeBlock = getElementById(btnCriarTimeId).style.display == "inline-block"
    if (isBtnCriarTimeBlock) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(nameTeamdivId).style.display = "flex"
        getElementById(teamPokeId).style.display = "flex"
        toggleBtnAdd()


    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(nameTeamdivId).style.display = "none"
        getElementById(teamPokeId).style.display = "none"


    }
}

function toggleBtnExcluir() {
    var isBtnExcluirBlock = getElementById(btnExcluirId).style.display == "inline-block"
    if (isBtnExcluirBlock) {

        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(nameTeamdivId).style.display = "none"
        getElementById(teamPokeId).style.display = "none"


    } else {

        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(nameTeamdivId).style.display = "flex"
        getElementById(teamPokeId).style.display = "flex"

    }
}

function toggleBtnAdd() {
    var isBtnCriarTimeNone = getElementById(btnCriarTimeId).style.display == "none"
    if (isBtnCriarTimeNone) {
        document.querySelectorAll(".btn-add").forEach(element => {
            element.style.display = "inline-block"
        })
    } else {
        document.querySelectorAll(".btn-add").forEach(element => {
            element.style.display = "none"
        })
    }
}

function toggleBtnSalvarTime() {
    var isBtnSalvarNone = getElementById(btnSalvarId).style.display == "none"
    if (isBtnSalvarNone) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(nameTeamdivId).style.display = "flex"
        getElementById(teamPokeId).style.display = "flex"
        toggleBtnAdd()


    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(nameTeamdivId).style.display = "none"
        getElementById(teamPokeId).style.display = "none"
        localStorage.removeItem(pokeTeamKey)
        loadPokeList(lastLink)


    }
}

getElementById(btnSalvarId).addEventListener('click', function (event) {
    event.preventDefault();
    const realocandoStorage = getPokeTeamStorage()

    if (getElementById(nameTeamId).value != "") {
        let timeDados = {
            nomeDotime: getElementById(nameTeamId).value,
            pokeOne: realocandoStorage[0],
            pokeTwo: realocandoStorage[1],
            pokeThree: realocandoStorage[2],
            pokeFour: realocandoStorage[3],
            pokeFive: realocandoStorage[4],
            pokeSix: realocandoStorage[5]
        }
        const realocandoStorageLista = getListaDeTimes()
        const indexEditarTime = localStorage.getItem(editarTimeKey)
        if (indexEditarTime) {
            realocandoStorageLista[indexEditarTime] = timeDados
            localStorage.removeItem(editarTimeKey)
        } else {
            realocandoStorageLista.push(timeDados)
        }

        localStorage.setItem(listaKey, JSON.stringify(realocandoStorageLista))
        toggleBtnSalvarTime()
        getElementById(nameTeamId).value = ""
        getElementById(teamPokeId).innerHTML = ""
        localStorage.removeItem(pokeTeamKey)
        teamSelect()
        
    } else {
        return alert("preencher nome do time")
    }

})

function limparStorageTeam() {
    if (getElementById(btnCriarTimeId).style.display = "inline-block") {
        localStorage.removeItem(pokeTeamKey)
        getElementById(teamPokeId).innerHTML = ""
    }
}

function iniciarEditar() {
    let index = getEditarTimeStorage()
    const timeSelecionado = getListaDeTimes()[index]
    console.log(timeSelecionado)
    const timeSelecionadoArray = []
    if (timeSelecionado.pokeOne) {
        timeSelecionadoArray.push(timeSelecionado.pokeOne)
    }
    if (timeSelecionado.pokeTwo) {
        timeSelecionadoArray.push(timeSelecionado.pokeTwo)
    }
    if (timeSelecionado.pokeThree) {
        timeSelecionadoArray.push(timeSelecionado.pokeThree)
    }
    if (timeSelecionado.pokeFour) {
        timeSelecionadoArray.push(timeSelecionado.pokeFour)
    }
    if (timeSelecionado.pokeFive) {
        timeSelecionadoArray.push(timeSelecionado.pokeFive)
    }
    if (timeSelecionado.pokeSix) {
        timeSelecionadoArray.push(timeSelecionado.pokeSix)
    }
    localStorage.setItem(pokeTeamKey, JSON.stringify(timeSelecionadoArray))
    getElementById(nameTeamId).value = timeSelecionado.nomeDotime
    teamSelect()
    toggleBtnCriarTime()
    loadPokeList(pokeApiLink)
}

function excluirSelecao() {
    const indexEditarTime = localStorage.getItem(editarTimeKey)
    if (indexEditarTime) {
        const listaTime = getListaDeTimes().filter(function (element, index) {
            return indexEditarTime != index
        })
        localStorage.setItem(listaKey, JSON.stringify(listaTime))
        localStorage.removeItem(editarTimeKey)
    }
    let realocandoStorage = getListaDeTimes()
    realocandoStorage = realocandoStorage.filter(function (element, index) {
        return index == null
    })
    getElementById(nameTeamId).value = ""
    localStorage.setItem(pokeTeamKey, JSON.stringify(realocandoStorage))
    toggleBtnExcluir()
    limparStorageTeam()
    toggleBtnAdd()




}