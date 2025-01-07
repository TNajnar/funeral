package cz.tomaskopulety.funeral_backend.api.statistics;

import java.time.YearMonth;
import java.time.format.DateTimeParseException;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.api.general.response.ErrorResponse;
import cz.tomaskopulety.funeral_backend.api.statistics.response.StatisticsResponse;
import cz.tomaskopulety.funeral_backend.service.statistics.StatisticsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@Validated
@Tag(name = "Statistics")
@RequestMapping(path = StatisticsController.BASE_URL)
public class StatisticsController {

    public  static final String BASE_URL = "/api/v1/statistics";

    @Nonnull
    private final StatisticsService statisticsService;

    @Nonnull
    private final ApiMapper apiMapper;

    @Operation(summary = "Get statistics by category.", operationId = "getStatisticsByCategory", description = "Get statistics by category.", responses = {
            @ApiResponse(responseCode = "200", description = "Statistics loaded successfully.", content = {@Content(schema = @Schema(implementation = StatisticsResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StatisticsResponse> getStatistics(
            @Parameter(description = "Identifier of product category. Select only products from given category.") @RequestParam @NotNull Long categoryId,
            @Parameter(description = "Month and year.", example = "2025-01") @RequestParam(name = "yearMonth", required = false) @Nullable String yearMonth
    ) {
        YearMonth yearMonthObject = null;
        try {
            yearMonthObject = yearMonth == null ? null : YearMonth.parse(yearMonth);
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Invalid yearMonth: " + yearMonth + ". Must be in yyyy-MM format.");
        }
        return ResponseEntity.ok(
                this.apiMapper.map(this.statisticsService.getStatistics(categoryId, yearMonthObject))
        );
    }

}
