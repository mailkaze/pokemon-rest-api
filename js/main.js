const searchField = document.getElementById('search')
const card = document.getElementById('card')
const image = document.getElementById('image')
const title = document.getElementById('title')
const type = document.getElementById('type')
const abilities = document.getElementById('abilities')
const stats = document.getElementById('stats')

const search = async searchTerm => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.trim().toLowerCase()}`)
    if ( res.ok ) {
        const pokemon = await res.json()
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

        image.src = pokemon.sprites.front_default
        title.textContent = name
        types.textContent = 'Tipo(s): ' + pokemon.types[0].type.name
        abilities.textContent = 'habilidades: ' + pokemon.abilities[0].ability.name
        stats.textContent = 'Estadísticas: ' + pokemon.stats[0].stat.name

        console.log(pokemon)
    } else {
        image.src = '/img/default.png'
        title.textContent = 'Pokemon no encontrado'
    }
}

searchField.addEventListener('keyup', e => {
    if ( e.keyCode === 13 ) {
        const searchTerm = searchField.value
        search(searchTerm)
    }
})