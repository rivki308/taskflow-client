import { Box, CircularProgress, Typography } from '@mui/material'
import { loading } from '../styles/ui.styles'

export default function Loading() {

    return (
        <Box className="loading" sx={loading.box}>
            <CircularProgress size={36} />
            <Typography sx={loading.text}>טוען...</Typography>
        </Box>
    )
}
