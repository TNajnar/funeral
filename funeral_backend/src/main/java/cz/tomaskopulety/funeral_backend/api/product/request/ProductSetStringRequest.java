package cz.tomaskopulety.funeral_backend.api.product.request;

import jakarta.annotation.Nullable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductSetStringRequest {

    /**
     * Vale to update string field in {@link cz.tomaskopulety.funeral_backend.service.product.domain.Product}.
     */
    @Nullable
    @Schema(description = "Value to update string field in product.", example = "8 svíček", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String value;

}
