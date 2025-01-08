package cz.tomaskopulety.funeral_backend.api.general;

import java.util.ArrayList;
import jakarta.annotation.Nonnull;
import jakarta.persistence.EntityNotFoundException;

import cz.tomaskopulety.funeral_backend.api.product.request.ProductRequest;
import cz.tomaskopulety.funeral_backend.api.product.response.ProductGetResponse;
import cz.tomaskopulety.funeral_backend.api.product.response.ProductStatisticsResponse;
import cz.tomaskopulety.funeral_backend.api.statistics.response.StatisticsItemResponse;
import cz.tomaskopulety.funeral_backend.api.statistics.response.StatisticsProductResponse;
import cz.tomaskopulety.funeral_backend.api.statistics.response.StatisticsResponse;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.service.general.IdGenerator;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.productcategory.domain.ProductCategory;
import cz.tomaskopulety.funeral_backend.service.statistics.domain.Statistics;
import cz.tomaskopulety.funeral_backend.service.statistics.domain.StatisticsItem;

import lombok.AllArgsConstructor;

/**
 * Maps api objects to domain objects and vice versa.
 */
@AllArgsConstructor
public class ApiMapper {

    @Nonnull
    private final ProductCategoryRepository productCategoryRepository;

    /**
     * Maps {@link ProductRequest} to {@link Product}
     *
     * @param request {@link ProductRequest}
     * @return {@link Product}
     */
    @Nonnull
    public Product map(@Nonnull ProductRequest request){
        return Product.builder()
                .type(request.getType())
                .producer(request.getProducer())
                .productCategory(getProductCategory(request.getProductCategoryId()))
                .productId(IdGenerator.generateNumericID())
                .name(request.getName())
                .comment(request.getComment())
                .created(request.getCreated())
                .inStock(request.getInStock())
                .productMovements(new ArrayList<>())
                .flagged(request.isFlagged())
                .build();
    }

    /**
     * Maps {@link Product} to {@link ProductGetResponse}
     *
     * @param product {@link Product}
     * @return {@link ProductGetResponse}
     */
    @Nonnull
    public ProductGetResponse map(@Nonnull Product product){
        final ProductStatisticsResponse productStatisticsResponse = new ProductStatisticsResponse(product.getSold(), product.getPurchased());

        return ProductGetResponse.builder()
                .productCategory(product.getProductCategory().name())
                .producer(product.getProducer())
                .productId(product.getProductId())
                .name(product.getName())
                .comment(product.getComment())
                .inStock(product.getInStock())
                .productCategoryId(product.getProductCategory().productCategoryId())
                .type(product.getType())
                .productMovements(productStatisticsResponse)
                .flagged(product.isFlagged())
                .build();
    }

    /**
     * Maps {@link Statistics} to {@link StatisticsResponse}
     *
     * @param statistics {@link Statistics}
     * @return {@link StatisticsResponse}
     */
    @Nonnull
    public StatisticsResponse map(@Nonnull Statistics statistics){
        return StatisticsResponse.builder()
                .category(statistics.getCategory())
                .statistics(
                        statistics.getStatistics()
                                .stream()
                                .map(this::map)
                                .toList()
                )
                .build();
    }

    /**
     * Maps {@link StatisticsItem} to {@link StatisticsItemResponse}
     *
     * @param statisticsItem {@link StatisticsItem}
     * @return {@link StatisticsItemResponse}
     */
    @Nonnull
    public StatisticsItemResponse map(@Nonnull StatisticsItem statisticsItem){
        return StatisticsItemResponse.builder()
                .type(statisticsItem.getType())
                .sold(statisticsItem.getSold())
                .purchased(statisticsItem.getPurchased())
                .inStock(statisticsItem.getInStock())
                .products(
                        statisticsItem.getProducts()
                                .stream()
                                .map(this::mapToStatisticsProductResponse)
                                .toList()
                )
                .build();
    }

    /**
     * Maps {@link Product} to {@link StatisticsProductResponse}
     *
     * @param product {@link Product}
     * @return {@link StatisticsProductResponse}
     */
    @Nonnull
    public StatisticsProductResponse mapToStatisticsProductResponse(@Nonnull Product product){
        return StatisticsProductResponse.builder()
                .name(product.getName())
                .sold(product.getSold())
                .purchased(product.getPurchased())
                .inStock(product.getInStock())
                .build();
    }

    /**
     * Gets {@link ProductCategory} by given identifier
     *
     * @param productCategoryId warehouse identifier
     * @throws EntityNotFoundException when category not found.
     * @return {@link ProductCategory}
     */
    @Nonnull
    private ProductCategory getProductCategory(@Nonnull Long productCategoryId){
        final ProductCategoryEntity productCategoryEntity = this.productCategoryRepository.findByProductCategoryId(productCategoryId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Product category with id: %d not found.", productCategoryId)));
        return new ProductCategory(productCategoryEntity.getProductCategoryId(), productCategoryEntity.getName());
    }

}
