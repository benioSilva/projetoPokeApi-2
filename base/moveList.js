console.log("hello")

var pokemonTargetId = "Pokemon-target"
var tempKey = "pokemonTarget"
var preencherTabelaId = "preencher-tabela"

function getElementById(id) {
    return document.getElementById(id)
}
function getStoragePokeTemp() {
    const storageTemp = localStorage.getItem(tempKey)
    return JSON.parse(storageTemp)
}


console.log(getStoragePokeTemp())
pokeImgName()
function pokeImgName() {
    getElementById(pokemonTargetId).innerHTML = ""
    const realocandoStorage = getStoragePokeTemp()
    getElementById(pokemonTargetId).innerHTML +=
        '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
        '<div><img src="' + realocandoStorage.pokeImg + '" alt="' + realocandoStorage.pokeName + '"></div>' +
        '<h6>' + realocandoStorage.pokeName + '</h6>' +
        '</div>'
}
getMoveList()
async function getMoveList() {
    const realocandoStorage = getStoragePokeTemp()
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + realocandoStorage.pokeName + "")
    response.data.moves
    getElementById(preencherTabelaId).innerHTML = ""
    response.data.moves.forEach(function (element, index) {
        console.log(element, index)
        getElementById(preencherTabelaId).innerHTML += '<tr>' +
        '<th scope="row">'+(index+1)+'</th>' +
        '<td>'+element.move.name+'</td>' +
        '</tr>'
    });
}

function returnToPokeList(){
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon/coreui-free-bootstrap-admin-template-main/dist/poke-list.html"
}

function returnToPokeTime(){
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon/coreui-free-bootstrap-admin-template-main/dist/base/lista-time.html"
}