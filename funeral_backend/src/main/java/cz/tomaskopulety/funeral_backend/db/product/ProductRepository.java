package cz.tomaskopulety.funeral_backend.db.product;

import java.util.Optional;
import jakarta.annotation.Nonnull;

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
     * Check if product with given producer and name exists already.
     *
     * @param name name of product
     * @param producerId identifier of producer
     * @return true if exists, otherwise false
     */
    boolean existsByNameAndProducer_ProducerId(@Nonnull String name, long producerId);

    /**
     * Check if product with given identifier exists already.
     *
     * @param productId identifier of product
     * @return true if exists, otherwise false
     */
    boolean existsByProductId(long productId);

    /**
     * Delete product with given identifier.
     *
     * @param productId identifier of product
     */
    void deleteByProductId(long productId);

}
