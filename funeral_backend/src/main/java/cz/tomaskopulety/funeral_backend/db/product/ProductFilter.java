package cz.tomaskopulety.funeral_backend.db.product;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.jpa.domain.Specification;

@AllArgsConstructor
@Getter
public class ProductFilter {

    private Specification<ProductEntity> databaseFilter;

    private final List<Function<ProductEntity, ProductEntity>> dataFilters = new ArrayList<>();

    public void setDatabaseFilter(Specification<ProductEntity> databaseFilter) {
        this.databaseFilter = this.databaseFilter.and(databaseFilter);
    }

}