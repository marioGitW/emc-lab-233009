import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Accommodation } from '../../api/types/accommodation.ts';

interface AccommodationCardProps {
    accommodation: Accommodation;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const AccommodationCard = ({ accommodation, onEdit, onDelete }: AccommodationCardProps) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/accommodations/${accommodation.id}`);
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #ddd' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {accommodation.name}
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Category:</strong> {accommodation.category}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Rooms:</strong> {accommodation.numRooms}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Condition:</strong> {accommodation.condition}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: accommodation.rented ? 'red' : 'green',
                            fontWeight: 'bold'
                        }}
                    >
                        Status: {accommodation.rented ? 'Rented' : 'Available'}
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
                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        onClick={() => onEdit?.(accommodation.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => onDelete?.(accommodation.id)}
                    >
                        Delete
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default AccommodationCard;
