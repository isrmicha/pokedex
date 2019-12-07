import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Loading } from '.'

const BigAvatar = styled.img`
  width: 200px;
  height: 200px;
`

export const ModalPokemon = ({ currentPokemon, handleClose }) => {
  if (!currentPokemon) return null
  const { order, name, sprites, status } = currentPokemon
  const renderLoadingDialog = () => (
    <Dialog onClose={handleClose} open={!!currentPokemon}>
      <Loading />
    </Dialog>
  )
  if (status === 'loading') return renderLoadingDialog()

  const { front_default: frontDefault } = sprites
  return (
    <Dialog onClose={handleClose} open={!!currentPokemon}>
      <DialogTitle>{`#${order} ${name.toUpperCase()}`}</DialogTitle>
      <BigAvatar alt={name} src={frontDefault} />
    </Dialog>
  )
}

ModalPokemon.propTypes = {
  currentPokemon: PropTypes.object,
  handleClose: PropTypes.func,
  id: PropTypes.number
}
