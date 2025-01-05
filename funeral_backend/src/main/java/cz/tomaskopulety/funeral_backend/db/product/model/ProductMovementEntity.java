package cz.tomaskopulety.funeral_backend.db.product.model;

import java.time.ZonedDateTime;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "funeral", name = "product_movement")
public class ProductMovementEntity {

    public static final String MOVEMENT_PURCHASE = "PURCHASE";

    public static final String MOVEMENT_SALE = "SALE";

    public static final String MOVEMENT_MANUAL_CHANGE = "MANUAL_CHANGE";

    /**
     * Database identifier of product movement.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product_movement")
    @Nonnull
    private Long id;

    /**
     * When movement was executed.
     */
    @Nonnull
    private ZonedDateTime created;

    /**
     * Old state of stocked products.
     */
    private int oldState;

    /**
     * Requested change of stock.
     */
    private int requested;

    /**
     * New state of stocked products.
     */
    private int newState;

    /**
     * Type of movement.
     */
    @Nonnull
    private String type;

}
