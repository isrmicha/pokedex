import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'

export const CardGrid = ({ pokemons, offset, handlePokemonClick }) => (
  <Grid container spacing={3}>
    {pokemons.map(({ name, url }, index) => {
      const pokemonNumber = offset ? offset + index + 1 : index + 1
      return (
        <Grid item xs={12} md={3} key={name}>
          <StyledCard onClick={() => handlePokemonClick(url)}>
            <StyledCardContent>
              <Box display="flex" justifyContent="center">
                <Typography color="textSecondary" display="inline">
                  #{`${pokemonNumber} `}
                  <StyledTypography color="primary" display="inline">
                    {toCamelCase(name)}
                  </StyledTypography>
                </Typography>
              </Box>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      )
    })}
  </Grid>
)
const StyledCard = styled(Card)`
  transition: all 0.1s ease-out !important;
  &:hover {
    transform: scale(1.10);
    border: 1px solid blue;
  }
  cursor: pointer;
`
const StyledCardContent = styled(CardContent)`
  padding-bottom: 16px !important;
`
const StyledTypography = styled(Typography)`
  font-weight: bolder !important;
`

const toCamelCase = text => `${text[0].toUpperCase()}${text.slice(1)}`

CardGrid.propTypes = {
  pokemons: PropTypes.arrayOf(Object),
  offset: PropTypes.number,
  handlePokemonClick: PropTypes.func
}
