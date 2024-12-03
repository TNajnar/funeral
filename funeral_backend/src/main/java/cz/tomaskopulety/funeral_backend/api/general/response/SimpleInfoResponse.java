package cz.tomaskopulety.funeral_backend.api.general.response;

import jakarta.annotation.Nonnull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SimpleInfoResponse {

    /**
     * Warehouse identifier.
     */
    @Schema(description = "Warehouse identifier.", example = "1474812741", requiredMode = Schema.RequiredMode.REQUIRED)
    private final long id;

    /**
     * Name of item.
     */
    @Nonnull
    @Schema(description = "Name of item.", example = "Svíčky Prašivec s.r.o.", requiredMode = Schema.RequiredMode.REQUIRED)
    private final String name;

}
