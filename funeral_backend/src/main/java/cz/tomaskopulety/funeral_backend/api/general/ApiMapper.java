package cz.tomaskopulety.funeral_backend.api.general;

import java.util.ArrayList;
import java.util.stream.Collectors;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.api.product.request.ProductCreateRequest;
import cz.tomaskopulety.funeral_backend.api.product.response.product.ProductGetMovementResponse;
import cz.tomaskopulety.funeral_backend.api.product.response.product.ProductGetResponse;
import cz.tomaskopulety.funeral_backend.db.product.ProducerRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProducerEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.service.general.IdGenerator;
import cz.tomaskopulety.funeral_backend.service.product.domain.Producer;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductCategory;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductMovement;

import lombok.AllArgsConstructor;

/**
 * Maps api objects to domain objects and vice versa.
 */
@AllArgsConstructor
public class ApiMapper {

    @Nonnull
    private final ProducerRepository producerRepository;

    @Nonnull
    private final ProductCategoryRepository productCategoryRepository;

    /**
     * Maps {@link ProductCreateRequest} to {@link Product}
     *
     * @param request {@link ProductCreateRequest}
     * @return {@link Product}
     */
    public Product map(@Nonnull ProductCreateRequest request){
        return Product.builder()
                .productCategory(getProductCategory(request.getProductCategoryId()))
                .producer(getProducer(request.getProducerId()))
                .productId(IdGenerator.generateNumericID())
                .name(request.getName())
                .note(request.getNote())
                .inStock(request.getStockUp())
                .productMovements(new ArrayList<>())
                .build();
    }

    /**
     * Maps {@link Product} to {@link ProductGetResponse}
     *
     * @param product {@link Product}
     * @return {@link ProductGetResponse}
     */
    public ProductGetResponse map(@Nonnull Product product){
        return ProductGetResponse.builder()
                .productCategory(product.getProductCategory().name())
                .producer(product.getProducer().name())
                .productId(product.getProductId())
                .name(product.getName())
                .note(product.getNote())
                .inStock(product.getInStock())
                .productMovements(
                        product.getProductMovements()
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList())
                )
                .build();
    }

    /**
     * Gets {@link Producer} by given identifier
     *
     * @param producerId warehouse identifier
     * @return {@link Producer}
     * @throws IllegalArgumentException
     */
    private Producer getProducer(long producerId){
        final ProducerEntity producerEntity = this.producerRepository.findByProducerId(producerId)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Producer with id: %d not found.", producerId)));
        return new Producer(producerId, producerEntity.getName());
    }

    /**
     * Gets {@link ProductCategory} by given identifier
     *
     * @param productCategoryId warehouse identifier
     * @return {@link ProductCategory}
     * @throws IllegalArgumentException
     */
    private ProductCategory getProductCategory(long productCategoryId){
        final ProductCategoryEntity productCategoryEntity = this.productCategoryRepository.findByProductCategoryId(productCategoryId)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Product category with id: %d not found.", productCategoryId)));
        return new ProductCategory(productCategoryId, productCategoryEntity.getName());
    }

    /**
     * Maps {@link ProductMovement} to {@link ProductGetMovementResponse}
     *
     * @param productMovement {@link ProductMovement}
     * @return {@link ProductGetMovementResponse}
     */
    private ProductGetMovementResponse map(@Nonnull ProductMovement productMovement){
        return ProductGetMovementResponse.builder()
                .created(productMovement.getCreated().toOffsetDateTime())
                .productMovementType(productMovement.getRequested() < 0 ? "SALE" : "PURCHASE")
                .oldState(productMovement.getOldState())
                .requested(productMovement.getRequested())
                .newState(productMovement.getNewState())
                .build();
    }

}
