package mk.ukim.finki.wp.lab2233009.repository;

import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationCategoryStatsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationCategoryStatsViewRepository extends JpaRepository<AccommodationCategoryStatsView, Category> {
}

