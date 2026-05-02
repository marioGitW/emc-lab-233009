import { Grid, Box } from '@mui/material';
import useCountries from '../../../hooks/useCountries.ts';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import CountryCard from '../../components/CountryCard.tsx';

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();

    if (loading) {
        return <LoadingState message="Loading countries..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <Box>
            <PageHeader
                title="Countries"
                subtitle="Explore accommodations by country"
            />
            {countries.length === 0 ? (
                <EmptyState message="No countries available at the moment." />
            ) : (
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {countries.map((country) => (
                        <Grid key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <CountryCard country={country} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default CountriesPage;




