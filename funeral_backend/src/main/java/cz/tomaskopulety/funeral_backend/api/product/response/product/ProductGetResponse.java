package cz.tomaskopulety.funeral_backend.api.product.response.product;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductGetResponse {

    /**
     * Category name of product.
     */
    @Nonnull
    private final String productCategory;

    /**
     * Producer name of product.
     */
    @Nonnull
    private final String producer;

    /**
     * Warehouse identifier of product.
     */
    private final long productId;

    /**
     * Name of product.
     */
    @Nonnull
    private final String name;

    /**
     * Additional note.
     */
    @Nullable
    private final String note;

    /**
     * Products stocked in warehouse.
     */
    private final int inStock;

    /**
     * Warehouse movements of product.
     */
    @Nonnull
    private final List<ProductGetMovementResponse> productMovements;

}
