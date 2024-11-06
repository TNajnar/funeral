package cz.tomaskopulety.funeral_backend.db.product;

import java.util.Optional;

import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategoryEntity, Long> {

    @Nonnull
    Optional<ProductCategoryEntity> findByProductCategoryId(long productCategoryId);

    boolean existsByName(@Nonnull String name);

}
