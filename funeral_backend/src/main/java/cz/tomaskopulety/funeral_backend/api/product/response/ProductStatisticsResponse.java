package cz.tomaskopulety.funeral_backend.api.product.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductStatisticsResponse {

    /**
     * Sold amount of product.
     */
    @Schema(description = "Sold amount of product.", example = "24", requiredMode = Schema.RequiredMode.REQUIRED)
    private final int sold;

    /**
     * Purchased amount of product.
     */
    @Schema(description = "Purchased amount of product.", example = "24", requiredMode = Schema.RequiredMode.REQUIRED)
    private final int purchased;

}
