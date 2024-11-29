package cz.tomaskopulety.funeral_backend.api.product.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCreateRequest {

    /**
     * Warehouse identifier of producer.
     */
    @NotNull
    private Long producerId;

    /**
     * Warehouse identifier of product category.
     */
    @NotNull
    private Long productCategoryId;

    /**
     * Name of product.
     */
    @NotEmpty
    private String name;

    /**
     * Additional note.
     */
    @Nullable
    private String note;

    /**
     * If product is flagged.
     */
    private boolean flagged;

    /**
     * Products stocked in warehouse.
     */
    @Positive
    private int stockUp;

}
