package cz.tomaskopulety.funeral_backend.service.product.domain;

import java.time.OffsetDateTime;
import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

import cz.tomaskopulety.funeral_backend.service.productcategory.domain.ProductCategory;

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
    @Nullable
    private final String producer;

    /**
     * Type of product.
     */
    @Nullable
    private final String type;

    /**
    * Name of product.
    */
    @Nonnull
    private final String name;

    /**
    * Additional comment.
    */
    @Nullable
    private final String comment;

    /**
    * Amount of product stocked in warehouse.
    */
    private final int inStock;

    /**
     * If product is flagged.
     */
    private final boolean flagged;

    /**
     * When product was stocked up.
     */
    @Nullable
    private OffsetDateTime created;

    /**
     * Warehouse movements of product.
     */
    @Nonnull
    private final List<ProductMovement> productMovements;

}
