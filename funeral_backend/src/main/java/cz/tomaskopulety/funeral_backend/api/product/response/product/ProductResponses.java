package cz.tomaskopulety.funeral_backend.api.product.response.product;

import java.util.List;
import jakarta.annotation.Nonnull;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductResponses {

    /**
     * Products.
     */
    @Nonnull
    @ArraySchema(schema = @Schema(implementation = ProductGetResponse.class))
    private final List<ProductGetResponse> products;


}
