package cz.tomaskopulety.funeral_backend.service.producer.domain;

import jakarta.annotation.Nonnull;

public record Producer(long producerId, @Nonnull String name) {
}
