import { useQuery } from '@tanstack/react-query'
import { Box, Paper, Avatar, Typography } from '@mui/material'
import { getTaskComments } from '../api/comments'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import Empty from '../ui/Empty'
import { comments as styles } from '../styles/task.styles'
import { common } from '../styles/common.styles'

interface CommentListProps {
    taskId: number
}

export default function CommentList({ taskId }: CommentListProps) {
    const { data: comments, isLoading, error } = useQuery({
        queryKey: ['comments', taskId],
        queryFn: () => getTaskComments(taskId),
    })

    if (isLoading) return <Loading />
    if (error) return <ErrorMessage error={error} />
    if (!comments || comments.length === 0) return <Paper><Empty>אין הערות עדיין</Empty></Paper>

    return (
        <Box component="ul" className="comments" sx={styles.list}>
            {comments.map((comment) => (
                <Paper component="li" key={comment.id} className="card" sx={styles.item}>
                    <Avatar sx={common.avatar}>{comment.user.name.charAt(0)}</Avatar>
                    <Box>
                        <Box sx={styles.top}>
                            <Typography component="strong" sx={styles.name}>{comment.user.name}</Typography>
                            <Typography component="span" sx={styles.date}>{new Date(comment.createdAt).toLocaleString('he-IL')}</Typography>
                        </Box>
                        <Typography sx={styles.text}>{comment.content}</Typography>
                    </Box>
                </Paper>
            ))}
        </Box>
    )
}
