package mk.ukim.finki.wp.lab2233009.service.application;

import mk.ukim.finki.wp.lab2233009.model.dto.CreateAccommodationDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayAccommodationDto;
import java.util.List;
import java.util.Optional;


public interface AccommodationApplicationService {

    Optional<DisplayAccommodationDto> findById(Long id);

    List<DisplayAccommodationDto> findAll();

    DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto);

    Optional<DisplayAccommodationDto> update(Long id, CreateAccommodationDto createAccommodationDto);

    Optional<DisplayAccommodationDto> deleteById(Long id);

    List<DisplayAccommodationDto> findByRented(Boolean rented);

    Optional<DisplayAccommodationDto> setRented(Long id);
}
