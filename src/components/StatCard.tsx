import type { ReactNode } from 'react'
import { Paper, Box, Typography } from '@mui/material'
import { card, cardColor, iconColor } from '../styles/dashboard.styles'

interface StatCardProps {
    title: string
    value: number
    icon?: ReactNode
    color?: string
}

export default function StatCard({ title, value, icon, color = '#1f6feb' }: StatCardProps) {
    return (
        <Paper sx={[card.box, cardColor(color)]}>
            {icon && <Box sx={[card.icon, iconColor(color)]}>{icon}</Box>}
            <Box>
                <Typography component="h3" sx={card.title}>{title}</Typography>
                <Typography sx={card.value}>{value}</Typography>
            </Box>
        </Paper>
    )
}
