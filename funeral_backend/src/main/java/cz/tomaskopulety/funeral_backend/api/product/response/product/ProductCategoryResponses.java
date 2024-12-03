package cz.tomaskopulety.funeral_backend.api.product.response.product;

import java.util.List;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.api.general.response.SimpleInfoResponse;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductCategoryResponses {

    /**
     * Product categories.
     */
    @Nonnull
    @ArraySchema(schema = @Schema(implementation = SimpleInfoResponse.class))
    private final List<SimpleInfoResponse> productCategories;


}
