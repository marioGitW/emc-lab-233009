package mk.ukim.finki.wp.lab2233009.service.domain.impl;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationExtendedView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationShortView;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationExtendedViewRepository;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationRepository;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationShortViewRepository;
import mk.ukim.finki.wp.lab2233009.service.domain.AccommodationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AccommodationServiceImpl implements AccommodationService {
    private final AccommodationRepository accommodationRepository;
    private final AccommodationShortViewRepository accommodationShortViewRepository;
    private final AccommodationExtendedViewRepository accommodationExtendedViewRepository;

    public AccommodationServiceImpl(
            AccommodationRepository accommodationRepository,
            AccommodationShortViewRepository accommodationShortViewRepository,
            AccommodationExtendedViewRepository accommodationExtendedViewRepository
    ) {
        this.accommodationRepository = accommodationRepository;
        this.accommodationShortViewRepository = accommodationShortViewRepository;
        this.accommodationExtendedViewRepository = accommodationExtendedViewRepository;
    }

    @Override
    public Optional<Accommodation> findById(Long id) {
        return accommodationRepository.findById(id);
    }

    @Override
    public Page<Accommodation> findAll(
            Pageable pageable,
            Category category,
            Long hostId,
            Long countryId,
            Integer numRooms,
            Boolean roomsAvailable
    ) {
        Pageable sanitizedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sanitizeSort(pageable.getSort())
        );
        return accommodationRepository.findAllWithFilters(
                category,
                hostId,
                countryId,
                numRooms,
                roomsAvailable,
                sanitizedPageable
        );
    }

    private Sort sanitizeSort(Sort sort) {
        if (sort == null || sort.isUnsorted()) {
            return Sort.by(Sort.Direction.DESC, "createdAt");
        }

        List<Sort.Order> allowedOrders = sort.stream()
                .filter(order -> "name".equals(order.getProperty()) || "createdAt".equals(order.getProperty()))
                .toList();

        if (allowedOrders.isEmpty()) {
            return Sort.by(Sort.Direction.DESC, "createdAt");
        }

        return Sort.by(allowedOrders);
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
    public List<AccommodationShortView> findAllShortViews() {
        return accommodationShortViewRepository.findAll(Sort.by("id"));
    }

    @Override
    public List<AccommodationExtendedView> findAllExtendedViews() {
        return accommodationExtendedViewRepository.findAll(Sort.by("id"));
    }

    @Override
    public Optional<Accommodation> setRented(Long id) {
        return accommodationRepository.findById(id).map(accommodation -> {
            accommodation.setRented(true);
            return accommodationRepository.save(accommodation);
        });
    }
}
