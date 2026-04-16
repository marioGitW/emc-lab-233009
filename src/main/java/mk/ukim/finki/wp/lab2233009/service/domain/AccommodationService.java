package mk.ukim.finki.wp.lab2233009.service.domain;

import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import java.util.List;
import java.util.Optional;

public interface AccommodationService {
    Optional<Accommodation> findById(Long id);

    List<Accommodation> findAll();

    Accommodation create(Accommodation accommodation);

    Optional<Accommodation> update(Long id, Accommodation accommodation);

    Optional<Accommodation> deleteById(Long id);

    List<Accommodation> findByRented(Boolean rented);

    Optional<Accommodation> setRented(Long id);
}
