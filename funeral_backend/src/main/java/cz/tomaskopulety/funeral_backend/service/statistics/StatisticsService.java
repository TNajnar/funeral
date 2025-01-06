package cz.tomaskopulety.funeral_backend.service.statistics;

import java.time.YearMonth;
import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.productcategory.ProductCategoryService;
import cz.tomaskopulety.funeral_backend.service.statistics.domain.Statistics;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
public class StatisticsService {

    @Nonnull
    private final ProductService productService;

    @Nonnull
    private final ProductCategoryService productCategoryService;

    @Nonnull
    private final DbMapper dbMapper;

    /**
     * Adds new {@link ProductCategoryEntity} to database.
     *
     * @param productCategoryId identifier of product category
     * @param yearMonth given month
     */
    @Nonnull
    public Statistics getStatistics(long productCategoryId, @Nullable YearMonth yearMonth) {
        final ProductCategoryEntity productCategoryEntity = this.productCategoryService.getProductCategoryEntity(productCategoryId);
        final List<Product> products = this.productService.getProducts(productCategoryId, yearMonth, null, null);
        return dbMapper.map(products, yearMonth, productCategoryEntity.getName());
    }

}
