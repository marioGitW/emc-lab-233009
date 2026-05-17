import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Host } from '../../api/types/host.ts';

interface HostCardProps {
    host: Host;
    onEdit?: () => void;
    onDelete?: () => void;
    canEdit?: boolean;
}

const HostCard = ({ host, onEdit, onDelete, canEdit = false }: HostCardProps) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/hosts/${host.id}`);
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #ddd' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {host.name} {host.surname}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Country ID:</strong> {host.countryId}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ gap: 1, p: 2, flexDirection: 'column' }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleViewDetails}
                    sx={{ backgroundColor: '#1976d2', color: 'white' }}
                >
                    View Details
                </Button>
                {canEdit && (
                    <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                        <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
};

export default HostCard;

