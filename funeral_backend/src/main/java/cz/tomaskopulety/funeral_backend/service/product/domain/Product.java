package cz.tomaskopulety.funeral_backend.service.product.domain;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Product {

    /**
     * Warehouse identifier of product.
     */
    @Nonnull
    private final Long productId;

    /**
    * Category of product.
    */
    @Nonnull
    private final ProductCategory productCategory;

    /**
    * Producer of product.
    */
    @Nonnull
    private final Producer producer;

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
    * Amount of product stocked in warehouse.
    */
    private final int inStock;

    /**
     * If product is flagged.
     */
    private final boolean flagged;

    /**
     * Warehouse movements of product.
     */
    @Nonnull
    private final List<ProductMovement> productMovements;

}
