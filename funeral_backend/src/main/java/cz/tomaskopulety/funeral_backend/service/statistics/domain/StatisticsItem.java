package cz.tomaskopulety.funeral_backend.service.statistics.domain;

import java.util.List;
import jakarta.annotation.Nullable;

import cz.tomaskopulety.funeral_backend.service.product.domain.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

@Builder
@Getter
public class StatisticsItem {

    /**
     * Product type.
     */
    @Nullable
    private final String type;

    /**
     * Total sale.
     */
    private final int sold;

    /**
     * Total purchase.
     */
    private final int purchased;

    /**
     * Product stocked.
     */
    private final int inStock;

    /**
     * Products.
     */
    @Singular
    private final List<Product> products;

}
