package cz.tomaskopulety.funeral_backend.service.product.domain;

import java.time.ZonedDateTime;
import jakarta.annotation.Nonnull;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductMovement {

    /**
     * When movement was executed.
     */
    @Nonnull
    private final ZonedDateTime created;

    /**
     * Old state of stocked products.
     */
    private final int oldState;

    /**
     * Requested change of stock.
     */
    private final int requested;

    /**
     * New state of stocked products.
     */
    private final int newState;

    /**
     * Type of movement.
     */
    @Nonnull
    private final String type;

}
