import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Paper, Typography, TextField, InputAdornment, Avatar, Chip, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import SearchIcon from '@mui/icons-material/Search'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { getUsers } from '../api/users'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import EmployeeForm from '../components/EmployeeForm'
import PageHeader from '../ui/PageHeader'
import Empty from '../ui/Empty'
import { common } from '../styles/common.styles'
import { formStyles } from '../styles/form.styles'
import { roleChip } from '../styles/ui.styles'
import { styles } from '../styles/employees.styles'

export default function EmployeesPage() {
    const [search, setSearch] = useState('')

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users', 'search', search],
        queryFn: () => getUsers({ search }),
    })

    return (
        <main>
            <PageHeader title="עובדים" icon={<PeopleOutlinedIcon />} />

            <Box sx={styles.layout}>
            <Box sx={styles.list}>
            <TextField
                type="text"
                size="small"
                fullWidth
                placeholder="חיפוש לפי שם או אימייל..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={styles.search}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
            />

            {isLoading && <Loading />}
            {error && <ErrorMessage error={error} />}
            {users && users.length === 0 && <Paper><Empty>לא נמצאו משתמשים</Empty></Paper>}
            {users && users.length > 0 && (
                <TableContainer component={Paper} sx={common.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>שם</TableCell>
                            <TableCell>אימייל</TableCell>
                            <TableCell>תפקיד</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow hover key={user.id} sx={common.row}>
                                <TableCell><Box sx={styles.person}><Avatar sx={common.avatar}>{user.name.charAt(0)}</Avatar>{user.name}</Box></TableCell>
                                <TableCell><Box sx={common.cellIcon}><EmailOutlinedIcon />{user.email}</Box></TableCell>
                                <TableCell><Chip size="small" label={user.role === 'Admin' ? 'מנהלת' : 'עובדת'} sx={roleChip[user.role]} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            )}
            </Box>

            <Paper sx={formStyles.side}>
            <Typography component="h2" sx={formStyles.title}><PersonAddAlt1OutlinedIcon color="primary" />הוספת עובד</Typography>
            <EmployeeForm />
            </Paper>
            </Box>
        </main>
    )
}
