package cz.tomaskopulety.funeral_backend.db.general;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.EntityNotFoundException;

import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductMovementEntity;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.productcategory.domain.ProductCategory;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductMovement;

import lombok.AllArgsConstructor;

/**
 * Maps domain objects to database objects and vice versa.
 */
@AllArgsConstructor
public class DbMapper {

    @Nonnull
    private final Clock clock;


    /**
     * Maps {@link Product} to {@link ProductEntity}.
     *
     * @param product {@link Product}
     * @return {@link ProductEntity}
     * @throws EntityNotFoundException when entity not found
     */
    @Nonnull
    public ProductEntity map(@Nonnull Product product, @Nonnull ProductCategoryEntity productCategoryEntity){
        final ProductEntity productEntity = new ProductEntity();
        productEntity.setName(product.getName());
        productEntity.setComment(product.getComment());
        productEntity.setType(product.getType());
        productEntity.setProducer(product.getProducer());
        productEntity.setInStock(product.getInStock());
        productEntity.setProductId(product.getProductId());
        productEntity.setProductCategory(productCategoryEntity);
        productEntity.setFlagged(product.isFlagged());
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
                .type(productEntity.getType())
                .comment(productEntity.getComment())
                .type(productEntity.getType())
                .producer(productEntity.getProducer())
                .inStock(productEntity.getInStock())
                .productId(productEntity.getProductId())
                .productCategory(new ProductCategory(productEntity.getProductCategory().getProductCategoryId(), productEntity.getProductCategory().getName()))
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
        productMovementEntity.setType(productMovement.getType());
        return productMovementEntity;
    }

    /**
     * Maps {@link ProductMovement} to {@link ProductMovementEntity}.
     *
     * @param oldState Old state of stocked products.
     * @param requested Requested change of stock.
     * @return {@link ProductMovementEntity}
     */
    @Nonnull
    public ProductMovementEntity map(int oldState, int requested, @Nullable OffsetDateTime created, @Nonnull String type){
        final ProductMovementEntity productMovementEntity = new ProductMovementEntity();
        productMovementEntity.setCreated(created == null ? ZonedDateTime.now(this.clock) : created.toZonedDateTime());
        productMovementEntity.setOldState(oldState);
        productMovementEntity.setRequested(requested);
        productMovementEntity.setNewState(oldState + requested);
        productMovementEntity.setType(type);
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
                .type(productMovementEntity.getType())
                .build();

    }

}
