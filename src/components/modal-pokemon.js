import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Loading } from '.'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

const ModalPokemon = ({ currentPokemon, handleClose }) => {
  if (!currentPokemon) return null
  const {
    order,
    name,
    sprites,
    status,
    height,
    base_experience: baseExperience
  } = currentPokemon
  const renderLoadingDialog = () => (
    <Dialog onClose={handleClose} open={!!currentPokemon}>
      <Loading />
    </Dialog>
  )
  if (status === 'loading') return renderLoadingDialog()

  const { front_default: frontDefault } = sprites

  return (
    <Dialog onClose={handleClose} open={!!currentPokemon}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item md={5}>
          <BigAvatar alt={name} src={frontDefault} />
        </Grid>
        <FullGrid item md={7}>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary="Pokemon Number" secondary={`#${order}`} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Pokemon Name"
                secondary={name.toUpperCase()}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Pokemon Height" secondary={height} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Pokemon Base Experience"
                secondary={baseExperience}
              />
            </ListItem>
          </List>
        </FullGrid>
      </Grid>
      <Divider />
    </Dialog>
  )
}

export default React.memo(ModalPokemon)

const BigAvatar = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`
const FullGrid = styled(Grid)`
  width: 100%;
`

ModalPokemon.propTypes = {
  currentPokemon: PropTypes.object,
  handleClose: PropTypes.func,
  id: PropTypes.number
}
