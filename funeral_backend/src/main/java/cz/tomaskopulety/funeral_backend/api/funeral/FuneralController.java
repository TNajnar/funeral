package cz.tomaskopulety.funeral_backend.api.funeral;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.util.List;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.api.funeral.response.FuneralGetResponse;
import cz.tomaskopulety.funeral_backend.api.funeral.response.FuneralGetResponses;
import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.api.general.response.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@Validated
@Tag(name = "Funeral")
@RequestMapping(path = FuneralController.BASE_URL)
public class FuneralController {

    public  static final String BASE_URL = "/api/v1/funerals";

    @Nonnull
    private final ApiMapper apiMapper;

    @Nonnull
    private final Clock clock;

    @Operation(summary = "Get list of funerals.", operationId = "getListOfFunerals", description = "Get list of funerals.", responses = {
            @ApiResponse(responseCode = "200", description = "Funerals loaded successfully.", content = {@Content(schema = @Schema(implementation = FuneralGetResponses.class))}),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FuneralGetResponses> getFunerals() {
        final OffsetDateTime now = OffsetDateTime.now(this.clock);
        return ResponseEntity.ok(
                new FuneralGetResponses(
                        List.of(
                                FuneralGetResponse.builder()
                                        .date(now.plusDays(5).withHour(9).withMinute(0).withSecond(0))
                                        .ceremonyVenue("Kostel sv. Jana")
                                        .orderId(2025001)
                                        .companyId(1)
                                        .deceased("Jan Novák")
                                        .build(),
                                FuneralGetResponse.builder()
                                        .date(now.plusDays(20).withHour(11).withMinute(30).withSecond(0))
                                        .ceremonyVenue("Krematorium Praha")
                                        .orderId(2025002)
                                        .companyId(1)
                                        .deceased("Thomas Angello")
                                        .build(),
                                FuneralGetResponse.builder()
                                        .date(now.plusDays(7).withHour(14).withMinute(0).withSecond(0))
                                        .ceremonyVenue("Hřbitov Olšany")
                                        .orderId(2025003)
                                        .companyId(1)
                                        .deceased("Miroslav Hrobek")
                                        .build()
                        )
                )
        );
    }

}
