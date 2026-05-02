import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';

interface PageHeaderProps extends BoxProps {
    title: string;
    subtitle?: string;
}

const PageHeader = ({ title, subtitle, sx, ...props }: PageHeaderProps) => {
    return (
        <Box sx={{ mb: 4, ...sx }} {...props}>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontWeight: 'bold',
                    mb: subtitle ? 1 : 0
                }}
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body1" color="text.secondary">
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default PageHeader;


