import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";   // Importo los spinners del paquete


// En vez de traerlo por props...
function PokemonPage() {

  const params = useParams();
  const navigate = useNavigate()

  // cualquier componente que vaya a renderizar data:
  //* 1. Crear el estado que almacena la data externa
  const [pokemonDetails, setPokemonDetails] = useState(null)

  //* 2. El componentDidMount para llamar a la API
  useEffect(() => {
    getData();
  }, [params.pokeName])  // componentDidMount(cuando se crea) y componentDidUpdated de cambios en params. Si no se pone... hace la llamada todo el rato

  // Hacemos una función asíncrona, ya que el useEffect no lo permite (para el debe ser callback)
  const getData = async () => {
    setPokemonDetails(null) // Para forzar el spinner de loading
    //* 3. Llamada con FETCH a la API
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`)
      const data = await response.json()

      //* 4. Almacenar la data en el estado
      setPokemonDetails(data)
      
    } catch (error) {
      console.log(error); //  Esto solo lo ve el dev
      // Redireccionar con nuevo Hook -> useNavigate
      navigate("/error")
    }
  }

  //* 5. Gestión de loading (cláusula de guardia)
  if(pokemonDetails === null) {
    return <div><PropagateLoader color="#da2250" /></div>
  }

  return (
    <div>
      {/**! 6. Renderizar la data */}
      <h4>Detalles del pokemon</h4>
      <div>
        <h3>{pokemonDetails.name}</h3>
        <img src={pokemonDetails.sprites.front_default} alt="pokemon" />
      </div>
    </div>
  )
}

export default PokemonPage