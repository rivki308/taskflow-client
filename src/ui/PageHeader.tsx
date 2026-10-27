import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { pageHeader as styles } from '../styles/ui.styles'

interface PageHeaderProps {
    title: ReactNode
    subtitle?: ReactNode
    icon?: ReactNode
    action?: ReactNode
}

// כותרת עמוד אחידה: אייקון, כותרת, תת-כותרת וכפתור פעולה
export default function PageHeader({ title, subtitle, icon, action }: PageHeaderProps) {
    return (
        <Box sx={styles.box}>
            <Box sx={styles.start}>
                {icon && <Box sx={styles.icon}>{icon}</Box>}
                <Box>
                    <Typography component="h1" sx={styles.title}>{title}</Typography>
                    {subtitle && <Typography sx={styles.subtitle}>{subtitle}</Typography>}
                </Box>
            </Box>
            {action}
        </Box>
    )
}
