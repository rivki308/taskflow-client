import { NavLink, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Box, Typography, Avatar, IconButton, Tooltip } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'
import { styles } from '../styles/header.styles'

function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    async function handleLogout() {
        await logout();
        navigate('/login')
    }
    if (!user) return null
    return (
        <AppBar position="sticky" color="secondary">
            <Toolbar sx={styles.bar}>
                <Box sx={styles.brand}>
                    <Box sx={styles.logoBox}><Box component="img" src={logo} alt="TaskFlow Pro" sx={styles.logo} /></Box>
                    <Typography component="span" sx={styles.brandName}>TaskFlow <Box component="span" sx={styles.brandPro}>Pro</Box></Typography>
                </Box>
                {( user&&

                    <Box component="nav" sx={styles.nav}>
                    <Box component={NavLink} to='/' end sx={styles.link}><DashboardOutlinedIcon /><Box component="span" sx={styles.linkText}>לוח הבקרה</Box></Box>
                    <Box component={NavLink} to='/tasks' sx={styles.link}><AssignmentOutlinedIcon /><Box component="span" sx={styles.linkText}>משימות</Box></Box>
                    <Box component={NavLink} to='/projects' sx={styles.link}><FolderOutlinedIcon /><Box component="span" sx={styles.linkText}>פרויקטים</Box></Box>
                    {user?.role === 'Admin' && <Box component={NavLink} to='/employees' sx={styles.link}><PeopleOutlinedIcon /><Box component="span" sx={styles.linkText}>עובדים</Box></Box>}


            </Box>
                )}
                { user && (<Box sx={styles.user}>
                    <Avatar sx={styles.avatar}>{user.name.charAt(0)}</Avatar>
                    <Box sx={styles.userText}>
                        <Typography sx={styles.userName}>{user.name}</Typography>
                        <Typography sx={styles.userRole}>{user.role === 'Admin' ? 'מנהלת' : 'עובדת'}</Typography>
                    </Box>
                    <Tooltip title="התנתקות">
                        <IconButton onClick={handleLogout} aria-label="התנתקות" sx={styles.logout}><LogoutIcon fontSize="small" sx={styles.logoutIcon} /></IconButton>
                    </Tooltip>
                </Box>) }
            </Toolbar>
        </AppBar>
    )
}
export default Header
