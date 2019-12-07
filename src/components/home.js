import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { CardGrid, ModalPokemon, Loading } from '.'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import pokedexLogo from '../assets/pokedex.png'
import styled from 'styled-components'

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
    <CenteredDiv>
      <MaxWidthDiv>
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
              {!!offset && (
                <Button
                  onClick={() => fetchPokemons(next, true)}
                  variant="contained"
                  color="primary"
                >
                  Previous
                </Button>
              )}
            </Box>
            <Box p={1}>
              <Button onClick={() => fetchPokemons(next)} variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </MaxWidthDiv>
      <ModalPokemon
        handleClose={handleModalDismiss}
        currentPokemon={currentPokemon}
      />
    </CenteredDiv>
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
  width: 600px;
  height: 200px;
`
const MaxWidthDiv = styled.div`
  max-width: 1280px;
`

Home.propTypes = {
  status: PropTypes.string,
  fetchPokemons: PropTypes.func,
  fetchPokemon: PropTypes.func,
  pokemons: PropTypes.arrayOf(Object),
  pokemon: PropTypes.object
}
