package cz.tomaskopulety.funeral_backend.db.product;

import java.util.List;
import java.util.Optional;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {

    /**
     * Get product by identifier.
     *
     * @param productId identifier of product
     * @return Optional of {@link ProductEntity}
     */
    @Nonnull
    Optional<ProductEntity> findByProductId(long productId);

    /**
     * Check if product with given name exists already.
     *
     * @param name name of product
     * @return true if exists, otherwise false
     */
    boolean existsByName(@Nonnull String name);

    /**
     * Get List of products.
     *
     * @param productCategory product category
     * @return List of products
     */
    @Nonnull
    List<ProductEntity> findAllByProductCategory(ProductCategoryEntity productCategory);


}
