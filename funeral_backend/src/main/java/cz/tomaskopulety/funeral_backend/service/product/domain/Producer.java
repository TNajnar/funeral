package cz.tomaskopulety.funeral_backend.service.product.domain;

import jakarta.annotation.Nonnull;

public record Producer(long producerId, @Nonnull String name) {
}
