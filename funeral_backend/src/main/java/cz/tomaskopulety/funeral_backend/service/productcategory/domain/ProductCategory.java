package cz.tomaskopulety.funeral_backend.service.productcategory.domain;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

public record ProductCategory(@Nullable Long productCategoryId, @Nonnull String name) {
}
