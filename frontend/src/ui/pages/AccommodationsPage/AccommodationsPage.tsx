import { useState } from 'react';
import { Container } from '@mui/material';
import useAccommodations from '../../../hooks/useAccommodations.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import AccommodationGrid from '../../components/AccommodationGrid.tsx';
import AccommodationAddDialog from '../../components/AccommodationAddDialog.tsx';
import AccommodationEditDialog from '../../components/AccommodationEditDialog.tsx';
import AccommodationDeleteDialog from '../../components/AccommodationDeleteDialog.tsx';
import type { Accommodation } from '../../../api/types/accommodation.ts';

const AccommodationsPage = () => {
    const { accommodations, loading, error, onAdd, onEdit, onDelete } = useAccommodations();
    const { isAdmin } = useAuth();
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleOpenEditDialog = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setSelectedAccommodation(null);
    };

    const handleOpenDeleteDialog = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedAccommodation(null);
    };

    if (loading) {
        return <LoadingState message="Loading accommodations..." />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PageHeader
                title="Accommodations"
                onAdd={isAdmin() ? handleOpenAddDialog : undefined}
                canAdd={isAdmin()}
            />
            {accommodations.length === 0 ? (
                <EmptyState message="No accommodations available" />
            ) : (
                <AccommodationGrid
                    accommodations={accommodations}
                    onEdit={handleOpenEditDialog}
                    onDelete={handleOpenDeleteDialog}
                    canEdit={isAdmin()}
                />
            )}

            <AccommodationAddDialog
                open={addDialogOpen}
                onClose={handleCloseAddDialog}
                onAdd={onAdd}
            />

            {selectedAccommodation && (
                <>
                    <AccommodationEditDialog
                        open={editDialogOpen}
                        accommodation={selectedAccommodation}
                        onClose={handleCloseEditDialog}
                        onEdit={onEdit}
                    />
                    <AccommodationDeleteDialog
                        open={deleteDialogOpen}
                        accommodation={selectedAccommodation}
                        onClose={handleCloseDeleteDialog}
                        onDelete={onDelete}
                    />
                </>
            )}
        </Container>
    );
};

export default AccommodationsPage;
