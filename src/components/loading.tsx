import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export const Loading: React.FC = () => <Box sx={{ display: 'flex' }}>
    <CircularProgress />
</Box>

