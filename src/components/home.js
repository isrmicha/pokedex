import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { CardGrid, ModalPokemon, Loading } from '.'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import pokedexLogo from '../assets/pokedex.png'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

export const Home = ({
  pokemon,
  fetchPokemons,
  fetchPokemon,
  clearCurrentPokemon
}) => {
  const { pokemons, next, status, offset, currentPokemon } = pokemon
  useEffect(() => {
    if (!status) {
      fetchPokemons()
    }
  }, [])
  const handlePokemonClick = url => fetchPokemon(url)
  const handleModalDismiss = () => clearCurrentPokemon()
  const renderCardContainer = () => (
    <Container maxWidth="lg">
      <CardContent>
        <CenteredDiv>
          <StyledImage src={pokedexLogo} />
        </CenteredDiv>
        <CardGrid
          pokemons={pokemons}
          offset={parseInt(offset)}
          handlePokemonClick={handlePokemonClick}
        />
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <Box p={1}>
            <Button
              disabled={!offset}
              onClick={() => fetchPokemons(next, true)}
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
          </Box>
          <Box p={1}>
            <Button
              onClick={() => fetchPokemons(next)}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </Box>
        </Box>
      </CardContent>
      {currentPokemon && (
        <ModalPokemon
          handleClose={handleModalDismiss}
          currentPokemon={currentPokemon}
        />
      )}
    </Container>
  )

  const renderError = () => (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <Typography variant="h4" component="h4" gutterBottom>
        Ooops, algo deu errado.
      </Typography>
    </Box>
  )
  if (!status || status === 'loading') return <Loading />
  if (status === 'error') return renderError()

  return renderCardContainer()
}

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`
const StyledImage = styled.img`
  margin: 25px 0;
  width: 70%;
  transition: all 0.1s ease-out !important;
  &:hover {
    transform: scale(1.05);
  }
  cursor: pointer;
`

Home.propTypes = {
  status: PropTypes.string,
  fetchPokemons: PropTypes.func,
  fetchPokemon: PropTypes.func,
  pokemons: PropTypes.arrayOf(Object),
  pokemon: PropTypes.object
}
