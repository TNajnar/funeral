package cz.tomaskopulety.funeral_backend.service.statistics.domain;

import java.util.List;
import jakarta.annotation.Nonnull;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

@Builder
@Getter
public class Statistics {

    /**
     * Category name.
     */
    @Nonnull
    private final String category;

    /**
     * Statistics
     */
    @Singular
    private final List<StatisticsItem> statistics;

}
