package cz.tomaskopulety.funeral_backend.api.product.request;

import java.time.OffsetDateTime;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    /**
     * Warehouse identifier of producer.
     */
    @Nullable
    @Schema(description = "Identifier of producer.", example = "4521803355", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private Long producerId;

    /**
     * Name of producer.
     */
    @Nullable
    @Schema(description = "Name of producer.", example = "Najnar a Kopulety s.r.o.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String producer;

    /**
     * Warehouse identifier of product category.
     */
    @Nullable
    @Schema(description = "Identifier of product category.", example = "4521803355", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long productCategoryId;

    /**
     * Name of product category.
     */
    @NotNull
    @Schema(description = "Name of product category.", example = "Rakev", requiredMode = Schema.RequiredMode.REQUIRED)
    private String productCategory;

    /**
     * Name of product.
     */
    @NotEmpty
    @Schema(description = "Name of product.", example = "Věnec březový", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    /**
     * Additional comment.
     */
    @Nullable
    @Schema(description = "Additional note.", example = "8 svíček", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String comment;

    /**
     * If product is flagged.
     */
    @Schema(description = "If product is flagged.", example = "false", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("isFlagged")
    private boolean flagged;

    /**
     * When product was stocked up.
     */
    @Nullable
    @Schema(description = "When product was stocked up.", example = "2024-11-14T14:28:00+02:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private OffsetDateTime created;

    /**
     * Amount of product to be stocked up in warehouse.
     */
    @Positive
    @Schema(description = "Amount of product to be stocked up in warehouse.", example = "24", requiredMode = Schema.RequiredMode.REQUIRED)
    private int stockUp;

}
