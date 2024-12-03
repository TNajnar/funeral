package cz.tomaskopulety.funeral_backend.db.product;

import java.util.Optional;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {

    @Nonnull
    Optional<ProductEntity> findByProductId(long productId);

    boolean existsByNameAndProducer_ProducerId(@Nonnull String name, long producerId);

}
