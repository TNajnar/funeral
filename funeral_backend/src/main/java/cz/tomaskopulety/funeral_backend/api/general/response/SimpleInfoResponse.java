package cz.tomaskopulety.funeral_backend.api.general.response;

import jakarta.annotation.Nonnull;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SimpleInfoResponse {

    /**
     * Warehouse identifier.
     */
    private final long id;

    /**
     * Name of item.
     */
    @Nonnull
    private final String name;

}
