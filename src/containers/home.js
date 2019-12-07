import { connect } from 'react-redux'
import { Home as HomeComponent } from '../components'
import { fetchPokemons, fetchPokemon, clearCurrentPokemon } from '../actions'

const mapStateToProps = ({ pokemon }) => ({
  pokemon
})

export const Home = connect(mapStateToProps, { fetchPokemons, fetchPokemon, clearCurrentPokemon }
)(HomeComponent)
