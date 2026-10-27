import { Alert } from '@mui/material'
import { getHebrewErrorMessage } from '../utils/errorMessages'
import { ApiRequestError } from '../api/client'
import { errorBox } from '../styles/ui.styles'

function ErrorMessage({ error }: { error: unknown }) {
    const code = error instanceof ApiRequestError ? error.code : 'UNKNOWN_ERROR'
    return <Alert severity="error" className="error" sx={errorBox}>{getHebrewErrorMessage(code)}</Alert>
}

export default ErrorMessage
