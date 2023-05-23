var preencherListaId = "preencherLista"
var listaKey = "pokeListaTimes"
var tempKey = "pokemonTarget"
var editarTimeKey = "editarTime"

function getElementById(id) {
    return document.getElementById(id)
}

function getListaDeTimes() {
    const storageLista = localStorage.getItem(listaKey)
    return JSON.parse(storageLista) || []
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
}


function preencherListaTime() {
    let realocandoStorage = getListaDeTimes()
    getElementById(preencherListaId).innerHTML = ""
    realocandoStorage.forEach(function (element, index) {
        console.log(element, index)
        if (element.pokeOne == undefined) {
            element.pokeOne = {
                pokemonImage: "",
                pokemonName: ""
            }
        }
        if (element.pokeTwo == undefined) {
            element.pokeTwo = {
                pokemonImage: "",
                pokemonName: ""
            }
        }
        if (element.pokeThree == undefined) {
            element.pokeThree = {
                pokemonImage: "",
                pokemonName: ""
            }
        }
        if (element.pokeFour == undefined) {
            element.pokeFour = {
                pokemonImage: "",
                pokemonName: ""
            }
        }
        if (element.pokeFive == undefined) {
            element.pokeFive = {
                pokemonImage: "",
                pokemonName: ""
            }
        }
        if (element.pokeSix == undefined) {
            element.pokeSix = {
                pokemonImage: "",
                pokemonName: ""
            }
        }

        getElementById(preencherListaId).innerHTML += '<tr>' +
            '<th scope="row">' + (index + 1) + '</th>' +
            '<td>' + element.nomeDotime + '</td>' +
            '<td>' +
            '<div><img class="imgOne" style="width: 3rem; height: 3rem; display: none;" src="' + element.pokeOne.pokemonImage + '" alt="' + element.pokeOne.pokemonName + '"></div>' +
            '<h6 style="font-size: 14px">' + element.pokeOne.pokemonName + '</h6>' +
            "<button class='btn btn-primary btn-sm move-set-one' style='display: none' onclick='pokeSelect(\"" + element.pokeOne.pokemonImage + "\",\"" + element.pokeOne.pokemonName + "\")'>Move set</button>" +
            '</td>' +
            '<td>' +
            '<div><img class="imgTwo" style="width: 3rem; height: 3rem; display: none;" src="' + element.pokeTwo.pokemonImage + '" alt="' + element.pokeTwo.pokemonName + '"></div>' +
            '<h6 style="font-size: 14px">' + element.pokeTwo.pokemonName + '</h6>' +
            "<button class='btn btn-primary btn-sm move-set-two' style='display: none' onclick='pokeSelect(\"" + element.pokeTwo.pokemonImage + "\",\"" + element.pokeTwo.pokemonName + "\")'>Move set</button>" +
            '</td>' +
            '<td>' +
            '<div><img class="imgThree" style="width: 3rem; height: 3rem; display: none;" src="' + element.pokeThree.pokemonImage + '" alt="' + element.pokeThree.pokemonName + '"></div>' +
            '<h6 style="font-size: 14px">' + element.pokeThree.pokemonName + '</h6>' +
            "<button class='btn btn-primary btn-sm move-set-three' style='display: none' onclick='pokeSelect(\"" + element.pokeThree.pokemonImage + "\",\"" + element.pokeThree.pokemonName + "\")'>Move set</button>" +
            '</td>' +
            '<td>' +
            '<div><img class="imgFour" style="width: 3rem; height: 3rem; display: none;" src="' + element.pokeFour.pokemonImage + '" alt="' + element.pokeFour.pokemonName + '"></div>' +
            '<h6 style="font-size: 14px">' + element.pokeFour.pokemonName + '</h6>' +
            "<button class='btn btn-primary btn-sm move-set-four' style='display: none' onclick='pokeSelect(\"" + element.pokeFour.pokemonImage + "\",\"" + element.pokeFour.pokemonName + "\")'>Move set</button>" +
            '</td>' +
            '<td>' +
            '<div><img class="imgFive" style="width: 3rem; height: 3rem; display: none;" src="' + element.pokeFive.pokemonImage + '" alt="' + element.pokeFive.pokemonName + '"></div>' +
            '<h6 style="font-size: 14px">' + element.pokeFive.pokemonName + '</h6>' +
            "<button class='btn btn-primary btn-sm move-set-five' style='display: none' onclick='pokeSelect(\"" + element.pokeFive.pokemonImage + "\",\"" + element.pokeFive.pokemonName + "\")'>Move set</button>" +
            '</td>' +
            '<td>' +
            '<div><img class="imgSix" style="width: 3rem; height: 3rem; display: none;" src="' + element.pokeSix.pokemonImage + '" alt="' + element.pokeSix.pokemonName + '"></div>' +
            '<h6 style="font-size: 14px">' + element.pokeSix.pokemonName + '</h6>' +
            "<button class='btn btn-primary btn-sm move-set-six' style='display: none' onclick='pokeSelect(\"" + element.pokeSix.pokemonImage + "\",\"" + element.pokeSix.pokemonName + "\")'>Move set</button>" +
            '</td>' +
            '<td>' +
            '<button class="btn btn-warning" onclick="editarTime('+index+')">Editar</button><br>' +
            '<button class="btn btn-danger" onclick="excluirTime('+index+')">Excluir</button>' +
            '</td>'
        '</tr>'

        if (element.pokeOne.pokemonImage) {
            document.querySelectorAll('.imgOne')[index].style.display = "flex"
            document.querySelectorAll('.move-set-one')[index].style.display = "inline-block"
        }
        if (element.pokeTwo.pokemonImage) {
            document.querySelectorAll('.imgTwo')[index].style.display = "flex"
            document.querySelectorAll('.move-set-two')[index].style.display = "inline-block"
        }
        if (element.pokeThree.pokemonImage) {
            document.querySelectorAll('.imgThree')[index].style.display = "flex"
            document.querySelectorAll('.move-set-three')[index].style.display = "inline-block"
        }
        if (element.pokeFour.pokemonImage) {
            document.querySelectorAll('.imgFour')[index].style.display = "flex"
            document.querySelectorAll('.move-set-four')[index].style.display = "inline-block"
        }
        if (element.pokeFive.pokemonImage) {
            document.querySelectorAll('.imgFive')[index].style.display = "flex"
            document.querySelectorAll('.move-set-five')[index].style.display = "inline-block"
        }
        if (element.pokeSix.pokemonImage) {
            document.querySelectorAll('.imgSix')[index].style.display = "flex"
            document.querySelectorAll('.move-set-six')[index].style.display = "inline-block"
        }

    });

}
preencherListaTime()

function excluirTime(param) {
    let realocandoStorage = getListaDeTimes()
    realocandoStorage = realocandoStorage.filter(function (element, index) {
        return param != index
    })
    localStorage.setItem(listaKey, JSON.stringify(realocandoStorage))
    preencherListaTime()
}

function editarTime(index){
    localStorage.setItem(editarTimeKey, index)
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon/coreui-free-bootstrap-admin-template-main/dist/poke-list.html"

}
