package cz.tomaskopulety.funeral_backend.api.funeral.response;

import java.util.List;
import jakarta.annotation.Nonnull;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class FuneralGetResponses {

    /**
     * Funerals.
     */
    @Nonnull
    @ArraySchema(schema = @Schema(description = "List of funerals.", implementation = FuneralGetResponse.class))
    private final List<FuneralGetResponse> funerals;

}
