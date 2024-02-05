import { Box, Skeleton } from '@mui/material'
import React from 'react'

export const Loading: React.FC = () => <Box sx={{ display: 'flex' }}>
    <Skeleton width={50} height={50} animation="wave" />
</Box>

