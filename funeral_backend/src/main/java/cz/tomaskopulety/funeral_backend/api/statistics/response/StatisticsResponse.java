package cz.tomaskopulety.funeral_backend.api.statistics.response;

import java.util.List;
import jakarta.annotation.Nonnull;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

@Builder
@Getter
public class StatisticsResponse {

    /**
     * Category name.
     */
    @Nonnull
    private final String category;

    /**
     * Statistics
     */
    @Singular
    private final List<StatisticsItemResponse> statistics;

}
