import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import { empty as styles } from '../styles/ui.styles'

// הודעה יפה כשאין תוצאות להצגה
export default function Empty({ children }: { children: ReactNode }) {
    return (
        <Box sx={styles.box}>
            <InboxOutlinedIcon sx={styles.icon} />
            <Typography sx={styles.text}>{children}</Typography>
        </Box>
    )
}
