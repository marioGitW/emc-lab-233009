package mk.ukim.finki.wp.lab2233009.listener;

import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.wp.lab2233009.model.events.AccommodationRentedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
public class AccommodationRentedEventListener {

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onAccommodationRented(AccommodationRentedEvent event) {
        log.info("Accommodation rented: id={}, name='{}'", event.accommodationId(), event.accommodationName());

        if (event.numRooms() != null && event.numRooms() == 0) {
            log.warn("Accommodation id={} is fully booked (numRooms=0).", event.accommodationId());
        }
    }
}

