import { Box, CircularProgress, Skeleton } from "@mui/material";

export default function Loading({ full }: { full?: boolean}) {
    return full ?
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', padding: 50 }}>
            <CircularProgress />
        </Box>
        : <Skeleton />
}