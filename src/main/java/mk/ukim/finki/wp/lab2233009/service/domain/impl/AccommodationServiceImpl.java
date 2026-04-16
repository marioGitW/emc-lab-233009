package mk.ukim.finki.wp.lab2233009.service.domain.impl;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationRepository;
import mk.ukim.finki.wp.lab2233009.service.domain.AccommodationService;
import org.springframework.stereotype.Service;

@Service
public class AccommodationServiceImpl implements AccommodationService {
    private final AccommodationRepository accommodationRepository;

    public AccommodationServiceImpl(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    @Override
    public Optional<Accommodation> findById(Long id) {
        return accommodationRepository.findById(id);
    }

    @Override
    public List<Accommodation> findAll() {
        return accommodationRepository.findAll();
    }

    @Override
    public Accommodation create(Accommodation accommodation) {
        return accommodationRepository.save(accommodation);
    }

    @Override
    public Optional<Accommodation> update(Long id, Accommodation accommodation) {
        return accommodationRepository
                .findById(id)
                .map((existingAccommodation) -> {
                    existingAccommodation.setName(accommodation.getName());
                    existingAccommodation.setCategory(accommodation.getCategory());
                    existingAccommodation.setCondition(accommodation.getCondition());
                    existingAccommodation.setHost(accommodation.getHost());
                    existingAccommodation.setNumRooms(accommodation.getNumRooms());
                    return accommodationRepository.save(existingAccommodation);
                });
    }

    @Override
    public Optional<Accommodation> deleteById(Long id) {
        Optional<Accommodation> accommodation = accommodationRepository.findById(id);
        accommodation.ifPresent(accommodationRepository::delete);
        return accommodation;
    }

    @Override
    public List<Accommodation> findByRented(Boolean rented) {
        return accommodationRepository.findByRented(rented);
    }

    @Override
    public Optional<Accommodation> setRented(Long id) {
        return accommodationRepository.findById(id).map(accommodation -> {
            accommodation.setRented(true);
            return accommodationRepository.save(accommodation);
        });
    }
}
