package cz.tomaskopulety.funeral_backend.db.general;

import java.time.Clock;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.db.product.ProducerRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProducerEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductMovementEntity;
import cz.tomaskopulety.funeral_backend.service.product.domain.Producer;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductCategory;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductMovement;

import lombok.AllArgsConstructor;

/**
 * Maps domain objects to database objects and vice versa.
 */
@AllArgsConstructor
public class DbMapper {

    @Nonnull
    private final ProducerRepository producerRepository;

    @Nonnull
    private final ProductCategoryRepository productCategoryRepository;

    @Nonnull
    private final Clock clock;


    /**
     * Maps {@link Product} to {@link ProductEntity}.
     *
     * @param product {@link Product}
     * @return {@link ProductEntity}
     * @throws IllegalArgumentException
     */
    @Nonnull
    public ProductEntity map(@Nonnull Product product){
        final ProductEntity productEntity = new ProductEntity();
        productEntity.setName(product.getName());
        productEntity.setNote(product.getNote());
        productEntity.setInStock(product.getInStock());
        productEntity.setProductId(product.getProductId());

        productEntity.setProductCategory(
                this.productCategoryRepository.findByProductCategoryId(product.getProductCategory().productCategoryId())
                        .orElseThrow(() -> new IllegalArgumentException(String.format("Product category: %s not found.", productEntity.getName())))
        );

        productEntity.setProducer(
                this.producerRepository.findByProducerId(product.getProducer().producerId())
                        .orElseThrow(() -> new IllegalArgumentException(String.format("Product category: %s not found.", productEntity.getName())))
        );
        productEntity.setProductMovements(
                product.getProductMovements()
                        .stream()
                        .map(this::map)
                        .collect(Collectors.toList())
        );

        return productEntity;
    }

    /**
     * Maps {@link ProductEntity} to {@link Product}.
     *
     * @param productEntity {@link ProductEntity}
     * @return {@link Product}
     */
    @Nonnull
    public Product map(@Nonnull ProductEntity productEntity){
        return Product.builder()
                .name(productEntity.getName())
                .note(productEntity.getNote())
                .inStock(productEntity.getInStock())
                .productId(productEntity.getProductId())
                .productCategory(new ProductCategory(productEntity.getProductCategory().getProductCategoryId(), productEntity.getProductCategory().getName()))
                .producer(new Producer(productEntity.getProducer().getProducerId(), productEntity.getProducer().getName()))
                .productMovements(
                        productEntity.getProductMovements()
                        .stream()
                        .map(this::map)
                        .toList()
                )
                .flagged(productEntity.isFlagged())
                .build();
    }

    /**
     * Maps {@link ProductCategoryEntity} to {@link ProductCategory}.
     *
     * @param productCategoryEntity {@link ProductCategoryEntity}
     * @return {@link ProductCategory}
     */
    @Nonnull
    public ProductCategory map(@Nonnull ProductCategoryEntity productCategoryEntity){
        return new ProductCategory(productCategoryEntity.getProductCategoryId(), productCategoryEntity.getName());
    }

    /**
     * Maps {@link ProductMovement} to {@link ProductMovementEntity}.
     *
     * @param productMovement {@link ProductMovement}
     * @return {@link ProductMovementEntity}
     */
    @Nonnull
    public ProductMovementEntity map(@Nonnull ProductMovement productMovement){
        final ProductMovementEntity productMovementEntity = new ProductMovementEntity();
        productMovementEntity.setCreated(productMovement.getCreated());
        productMovementEntity.setOldState(productMovement.getOldState());
        productMovementEntity.setRequested(productMovement.getRequested());
        productMovementEntity.setNewState(productMovement.getNewState());
        return productMovementEntity;
    }

    /**
     * Maps {@link ProductMovement} to {@link ProductMovementEntity}.
     *
     * @param oldState
     * @param requested
     * @return
     */
    @Nonnull
    public ProductMovementEntity map(int oldState, int requested){
        final ProductMovementEntity productMovementEntity = new ProductMovementEntity();
        productMovementEntity.setCreated(ZonedDateTime.now(this.clock));
        productMovementEntity.setOldState(oldState);
        productMovementEntity.setRequested(requested);
        productMovementEntity.setNewState(oldState + requested);
        return productMovementEntity;
    }

    /**
     * Maps {@link ProductMovementEntity} to {@link ProductMovement}.
     *
     * @param productMovementEntity {@link ProductMovementEntity}
     * @return {@link ProductMovement}
     */
    @Nonnull
    public ProductMovement map(@Nonnull ProductMovementEntity productMovementEntity){
        return ProductMovement.builder()
                .created(productMovementEntity.getCreated())
                .oldState(productMovementEntity.getOldState())
                .requested(productMovementEntity.getRequested())
                .newState(productMovementEntity.getNewState())
                .build();

    }

    /**
     * Maps {@link ProducerEntity} to {@link Producer}.
     *
     * @param producerEntity {@link ProducerEntity}
     * @return {@link Producer}
     */
    @Nonnull
    public Producer map(@Nonnull ProducerEntity producerEntity){
        return new Producer(producerEntity.getProducerId(), producerEntity.getName());
    }

}
