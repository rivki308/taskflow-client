import { Box, Pagination as MuiPagination, Typography } from '@mui/material'
import { pager } from '../styles/ui.styles'

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    return (
        <Box className="pagination" sx={pager.box}>
            <MuiPagination count={totalPages} page={page} onChange={(_, newPage) => onPageChange(newPage)} color="primary" shape="rounded" />
            <Typography sx={pager.text}>עמוד {page} מתוך {totalPages}</Typography>
        </Box>
    )
}
