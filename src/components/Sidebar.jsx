import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


// En este componente hacemos la llamada externa a la API para buscar la data
//* 1. Como conseguimos esa data? 
//! FETCH

//* 2. En que momento hacemos la operación? 
// No en la base del componente... porque cada vez que lo renderizamos se realizaría la llamada //! Con un useEffect (componentDidMount). Que se haga una  vez
// Si únicamente quieres visualizar los datos, si los quisiera modificar si que sería creando un estado ¿en el app?

//* 3. Una vez que recibimos la data... que hacemos con ella?
// Necesitamos almacenarla en un estado (se hace una copia) pero podré 'pintarla' cuando quiera

function Sidebar() {
//* 3:
//! 1º
  const [allPokemon, setAllPokemon] = useState(null);

  useEffect(() => {
//! 3º
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151") // Devuelve una promesa
    .then((response) => response.json())     // Cuando usamos Fetch no podemos leer la data. debemos transformarla con el .json() //* Otra llamada, interna, para traducir la data
    // return response.json() -- Lo hacemos en la misma línea porque queda mejor 

    .then((data) => {
      // console.log(data.results);    // Accedo a la propiedad results de la data
      setAllPokemon(data.results)   // La almaceno en el estado, que es lo que quiero pintar
    })
    .catch((error) => {
      console.log(error);
    })

  }, [])

  // Cláusula de guardia para las llamadas externas
  //* Porque estaba intentando hacer el map del undefined (no lo había iniciado antes, ahora pone null en el estado), por el estado iniciado en 0
//! 2º
  if(allPokemon === null) {
    return <h3>... buscando pokemons</h3>
  } // Tb puedes hacerla con ternario en la renderización del .map
  
  return (
    <nav className="sidebar">

      <h5>Elige un pokemon</h5>
      {
        allPokemon.map((eachPokemon) => {
          return (
            // Tiene que redirigir
            <Link to={`/pokemon-details/${eachPokemon.name}`} key={eachPokemon.name}>{eachPokemon.name}</Link>
          )
        })
      }

    </nav>
  )
}

export default Sidebar