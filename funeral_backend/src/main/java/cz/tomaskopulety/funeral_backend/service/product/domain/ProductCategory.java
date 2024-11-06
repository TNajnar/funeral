package cz.tomaskopulety.funeral_backend.service.product.domain;

import jakarta.annotation.Nonnull;

public record ProductCategory(long productCategoryId, @Nonnull String name) {
}
