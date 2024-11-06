package cz.tomaskopulety.funeral_backend.db.product;

import java.util.Optional;

import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.db.product.model.ProducerEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProducerRepository extends JpaRepository<ProducerEntity, Long> {

    @Nonnull
    Optional<ProducerEntity> findByProducerId(long producerId);

    boolean existsByName(@Nonnull String name);

}
