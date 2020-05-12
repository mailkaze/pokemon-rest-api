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
        const typesArr = []
        const abilitiesArr = []
        const statsArr = []

        pokemon.types.forEach(t => typesArr.push(t.type.name))
        pokemon.abilities.forEach(a => abilitiesArr.push(a.ability.name))
        pokemon.stats.forEach(s => statsArr.push(`${s.stat.name}: ${s.base_stat}`))

        const buildStatsList = arr => {
            let fragment = new DocumentFragment()
            fragment.innerHTML = 'Estadísticas: '
            arr.forEach(e => {
                const p = document.createElement('p')
                p.innerText = e
                fragment.appendChild(p)
            })
            return fragment
        }



        image.src = pokemon.sprites.front_default
        title.textContent = name
        types.textContent = 'Tipo(s): ' + typesArr.join(', ')
        abilities.textContent = 'habilidades: ' + abilitiesArr.join(', ')
        stats.textContent = 'Estadísticas:'
        stats.appendChild(buildStatsList(statsArr))
    } else {
        image.src = 'img/default.png'
        title.textContent = 'Pokemon no encontrado'
    }
}

searchField.addEventListener('keyup', e => {
    if ( e.keyCode === 13 ) {
        const searchTerm = searchField.value
        search(searchTerm)
    }
})