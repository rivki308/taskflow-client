import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { styles } from "../styles/notFound.styles";

export default function NotFoundPage() {
    return (
        <Box component="main" dir="rtl" sx={styles.page}>
            <SearchOffIcon sx={styles.icon} />
            <Typography sx={styles.code}>404</Typography>
            <Typography component="h1" sx={styles.title}>העמוד לא נמצא </Typography>
            <Button component={Link} to="/" variant="contained" startIcon={<HomeOutlinedIcon />} sx={styles.button}>חזרה ללוח הבקרה</Button>        </Box>
    );
}
