package cz.tomaskopulety.funeral_backend.db.product;

import java.text.Normalizer;
import java.time.YearMonth;
import java.util.regex.Pattern;
import jakarta.annotation.Nonnull;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;

import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductMovementEntity;

import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    /**
     * Create database specification for selecting products by product category.
     *
     * @param category product category
     * @return {@link Specification}
     */
    @Nonnull
    public static Specification<ProductEntity> byCategory(final ProductCategoryEntity category) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("productCategory"), category);
    }

    /**
     * Create database specification for selecting products with movements which were created in chosen months.
     *
     * @param yearMonth selection of month and year
     * @return {@link Specification}
     */
    @Nonnull
    public static Specification<ProductEntity> byYearMonth(final YearMonth yearMonth) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Join<ProductEntity, ProductMovementEntity> movementEntityJoin = root.joinList("productMovements");
            final Expression<Integer> monthExpression = criteriaBuilder.function("date_part", Integer.class, criteriaBuilder.literal("month"), movementEntityJoin.get("created"));
            final Expression<Integer> yearExpression = criteriaBuilder.function("date_part", Integer.class, criteriaBuilder.literal("year"), movementEntityJoin.get("created"));
            final Predicate yearPredicate = criteriaBuilder.equal(yearExpression, yearMonth.getYear());
            final Predicate monthPredicate = criteriaBuilder.equal(monthExpression, yearMonth.getMonth().getValue());

            return criteriaBuilder.and(monthPredicate, yearPredicate);
        };
    }

    /**
     * Create database specification for selecting products with sale movements only.
     *
     * @return {@link Specification}
     */
    @Nonnull
    public static Specification<ProductEntity> bySale() {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Join<ProductEntity, ProductMovementEntity> movementEntityJoin = root.joinList("productMovements");
            return criteriaBuilder.lessThan(movementEntityJoin.get("requested"), 0);
        };
    }

    /**
     * Create database specification for selecting products by name.
     *
     * @param productName name of product
     * @return {@link Specification}
     */
    @Nonnull
    public static Specification<ProductEntity> byProductName(@Nonnull String productName) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final String normalized = Normalizer.normalize(productName, Normalizer.Form.NFD);
            final Pattern pattern = Pattern.compile("[escrzyaiu]|\\p{M}+");
            String formattedProductName = "%" + pattern.matcher(normalized).replaceAll("_").toLowerCase() + "%";
            formattedProductName = formattedProductName.replaceAll("_{2,}","%");
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), formattedProductName);
        };
    }

}
