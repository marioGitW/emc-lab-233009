import { Box, Button, Typography } from '@mui/material';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    onAdd?: () => void;
    canAdd?: boolean;
    buttonLabel?: string;
}

const PageHeader = ({ title, subtitle, onAdd, canAdd = true, buttonLabel }: PageHeaderProps) => {
    const getSingularLabel = () => {
        if (buttonLabel) return buttonLabel;

        if (title === 'Countries') return 'Country';
        if (title === 'Accommodations') return 'Accommodation';

        return title.slice(0, -1);
    };

    return (
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: subtitle ? 1 : 0 }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body1" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>
            {onAdd && canAdd && (
                <Button variant="contained" onClick={onAdd}>
                    Add {getSingularLabel()}
                </Button>
            )}
        </Box>
    );
};

export default PageHeader;