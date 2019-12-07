import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

export const Loading = () => (
  <Box display="flex" justifyContent="center" m={1} p={1}>
    <CircularProgress />
  </Box>
)
