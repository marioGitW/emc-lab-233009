import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import type {Country} from '../../api/types/country.ts';

interface CountryCardProps {
    country: Country;
    onEdit?: () => void;
    onDelete?: () => void;
    canEdit?: boolean;
}

const CountryCard = ({country, onEdit, onDelete, canEdit = false}: CountryCardProps) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/countries/${country.id}`);
    };

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #ddd'}}>
            <CardContent sx={{flexGrow: 1}}>
                <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
                    {country.name}
                </Typography>
                <Box sx={{mb: 2}}>
                    <Typography variant="body2" sx={{mb: 1}}>
                        <strong>Continent:</strong> {country.continent}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{gap: 1, p: 2, flexDirection: 'column'}}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleViewDetails}
                    sx={{backgroundColor: '#1976d2', color: 'white'}}
                >
                    View Details
                </Button>
                {canEdit && (
                    <Box sx={{display: 'flex', gap: 1, width: '100%'}}>
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

export default CountryCard;

