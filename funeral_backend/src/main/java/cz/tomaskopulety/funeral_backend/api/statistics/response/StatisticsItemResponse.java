package cz.tomaskopulety.funeral_backend.api.statistics.response;

import java.util.List;
import jakarta.annotation.Nullable;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

@Builder
@Getter
public class StatisticsItemResponse {

    /**
     * Product type.
     */
    @Nullable
    private final String type;

    /**
     * Total purchase.
     */
    private final int purchased;

    /**
     * Total sale.
     */
    private final int sold;

    /**
     * Product stocked.
     */
    private final int inStock;

    /**
     * Products.
     */
    @Singular
    private final List<StatisticsProductResponse> products;

}
