package cz.tomaskopulety.funeral_backend.api.product.response.product;

import java.time.OffsetDateTime;
import jakarta.annotation.Nonnull;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductGetMovementResponse {

    /**
     * When movement was executed.
     */
    @Nonnull
    private final OffsetDateTime created;

    /**
     * Type of product warehouse movement.
     */
    @Nonnull
    private final String productMovementType;

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

}
