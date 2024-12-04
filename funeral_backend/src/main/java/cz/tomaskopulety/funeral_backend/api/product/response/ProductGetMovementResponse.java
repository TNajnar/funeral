package cz.tomaskopulety.funeral_backend.api.product.response;

import java.time.OffsetDateTime;
import jakarta.annotation.Nonnull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductGetMovementResponse {

    /**
     * When movement was executed.
     */
    @Nonnull
    @Schema(description = "When movement was executed.", example = "2024-11-14T13:55:00+02:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private final OffsetDateTime created;

    /**
     * Type of warehouse movement.
     */
    @Nonnull
    @Schema(description = "Type of warehouse movement.", example = "SALE", requiredMode = Schema.RequiredMode.REQUIRED)
    private final String productMovementType;

    /**
     * Old state of stocked products.
     */
    @Schema(description = "Old state of stocked products.", example = "20", requiredMode = Schema.RequiredMode.REQUIRED)
    private final int oldState;

    /**
     * Requested change of stock.
     */
    @Schema(description = "Requested change of stock.", example = "-5", requiredMode = Schema.RequiredMode.REQUIRED)
    private final int requested;

    /**
     * New state of stocked products.
     */
    @Schema(description = "New state of stocked products.", example = "15", requiredMode = Schema.RequiredMode.REQUIRED)
    private final int newState;

}
