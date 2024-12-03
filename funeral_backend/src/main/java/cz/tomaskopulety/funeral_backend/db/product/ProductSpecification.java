package cz.tomaskopulety.funeral_backend.db.product;

import java.util.Set;

import jakarta.annotation.Nonnull;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;

import cz.tomaskopulety.funeral_backend.db.product.model.ProducerEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductMovementEntity;

import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    @Nonnull
    public static Specification<ProductEntity> byCategory(final ProductCategoryEntity category) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("productCategory"), category);
    }

    @Nonnull
    public static Specification<ProductEntity> byProducer(final ProducerEntity producer) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("producer"), producer);
    }

    @Nonnull
    public static Specification<ProductEntity> byMonths(final Set<Integer> months) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Join<ProductEntity, ProductMovementEntity> movementEntityJoin = root.joinList("productMovements");
            final Expression<Double> monthExpression = criteriaBuilder.function("date_part", Double.class, criteriaBuilder.literal("month"), movementEntityJoin.get("created"));
            return monthExpression.in(months);
        };
    }

    @Nonnull
    public static Specification<ProductEntity> bySale() {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Join<ProductEntity, ProductMovementEntity> movementEntityJoin = root.joinList("productMovements");
            return criteriaBuilder.lessThan(movementEntityJoin.get("requested"), 0);
        };
    }

}
