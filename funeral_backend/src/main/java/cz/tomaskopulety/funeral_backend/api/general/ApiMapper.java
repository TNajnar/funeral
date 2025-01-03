package cz.tomaskopulety.funeral_backend.api.general;

import java.util.ArrayList;
import java.util.stream.Collectors;
import jakarta.annotation.Nonnull;
import jakarta.persistence.EntityNotFoundException;

import cz.tomaskopulety.funeral_backend.api.product.request.ProductRequest;
import cz.tomaskopulety.funeral_backend.api.product.response.ProductGetMovementResponse;
import cz.tomaskopulety.funeral_backend.api.product.response.ProductGetResponse;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.service.general.IdGenerator;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.productcategory.domain.ProductCategory;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductMovement;

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
        return ProductGetResponse.builder()
                .productCategory(product.getProductCategory().name())
                .producer(product.getProducer())
                .productId(product.getProductId())
                .name(product.getName())
                .comment(product.getComment())
                .inStock(product.getInStock())
                .productCategoryId(product.getProductCategory().productCategoryId())
                .type(product.getType())
                .productMovements(
                        product.getProductMovements()
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList())
                )
                .flagged(product.isFlagged())
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

    /**
     * Maps {@link ProductMovement} to {@link ProductGetMovementResponse}
     *
     * @param productMovement {@link ProductMovement}
     * @return {@link ProductGetMovementResponse}
     */
    @Nonnull
    private ProductGetMovementResponse map(@Nonnull ProductMovement productMovement){
        return ProductGetMovementResponse.builder()
                .created(productMovement.getCreated().toOffsetDateTime())
                .productMovementType(productMovement.getType())
                .oldState(productMovement.getOldState())
                .requested(productMovement.getRequested())
                .newState(productMovement.getNewState())
                .build();
    }

}
