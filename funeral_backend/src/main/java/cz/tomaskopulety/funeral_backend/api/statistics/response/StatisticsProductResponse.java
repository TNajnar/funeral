package cz.tomaskopulety.funeral_backend.api.statistics.response;

import jakarta.annotation.Nonnull;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StatisticsProductResponse {

    /**
    * Name of product.
    */
    @Nonnull
    private final String name;

    /**
     * Amount of product purchased.
     */
    private final int purchased;

    /**
     * Amount of product sold.
     */
    private final int sold;

    /**
    * Amount of product stocked in warehouse.
    */
    private final int inStock;

}
