package cz.tomaskopulety.funeral_backend.api.funeral.response;

import java.time.OffsetDateTime;
import jakarta.annotation.Nonnull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FuneralGetResponse {

    /**
     * System identifier of order.
     */
    @Schema(description = "System identifier of order.", example = "2025001", requiredMode = Schema.RequiredMode.REQUIRED)
    private final long orderId;

    /**
     * System identifier of company.
     */
    @Schema(description = "System identifier of company.", example = "1234567891", requiredMode = Schema.RequiredMode.REQUIRED)
    private final long companyId;

    /**
     * When order was created.
     */
    @Nonnull
    @Schema(description = "When order was created.", example = "2025-01-01T8:46:00+02:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private final OffsetDateTime created;

    /**
     * Name of deceased.
     */
    @Nonnull
    @Schema(description = "Name of deceased.", example = "Jan Novák", requiredMode = Schema.RequiredMode.REQUIRED)
    private final String deceased;

    /**
     * Place of ceremony.
     */
    @Nonnull
    @Schema(description = "Ceremony address.", example = "Kostel Sv. Bartoloměje", requiredMode = Schema.RequiredMode.REQUIRED)
    private final String placeCeremony;

    /**
     * Beginning of ceremony.
     */
    @Nonnull
    @Schema(description = "Beginning of ceremony.", example = "2025-01-05T08:00:00+01:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private final OffsetDateTime timeCeremony;

}
