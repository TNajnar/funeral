package cz.tomaskopulety.funeral_backend.api.product.response;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductGetResponse {

    /**
     * Warehouse identifier of product category.
     */
    @Schema(description = "Warehouse identifier of product category.", example = "6491643754", requiredMode = Schema.RequiredMode.REQUIRED)
    private long productCategoryId;

    /**
     * Category of product.
     */
    @Nonnull
    @Schema(description = "Category of product.", example = "Věnce", requiredMode = Schema.RequiredMode.REQUIRED)
    private final String productCategory;


    /**
     * Producer of product.
     */
    @Nullable
    @Schema(description = "Producer of product.", example = "Gardena", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private final String producer;

    /**
     * Type of product.
     */
    @Nullable
    @Schema(description = "Type of product.", example = "Zimní", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private final String type;

    /**
     * Warehouse identifier of product.
     */
    @Schema(description = "Category name of product.", example = "2397940629", requiredMode = Schema.RequiredMode.REQUIRED)
    private final long productId;

    /**
     * Name of product.
     */
    @Nonnull
    @Schema(description = "Name of product.", example = "Věnec březový", requiredMode = Schema.RequiredMode.REQUIRED)
    private final String name;

    /**
     * Additional comment.
     */
    @Nullable
    @Schema(description = "Additional comment.", example = "8 svíček", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private final String comment;

    /**
     * Amount of product stocked in warehouse.
     */
    @Schema(description = "Amount of product stocked in warehouse.", example = "24", requiredMode = Schema.RequiredMode.REQUIRED)
    private final int inStock;

    /**
     * If product is flagged.
     */
    @Schema(description = "If product is flagged.", example = "false", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("isFlagged")
    private final boolean flagged;

    /**
     * Warehouse movements of product.
     */
    @Nonnull
    @Schema(description = "Warehouse movements of product.", requiredMode = Schema.RequiredMode.REQUIRED)
    private final ProductStatisticsResponse productMovements;

}
