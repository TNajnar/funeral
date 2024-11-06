package cz.tomaskopulety.funeral_backend.db.product.model;

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
@Table(schema = "funeral", name = "producer")
public class ProducerEntity {

    /**
    * Database identifier of product.
    */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producer")
    @Nonnull
    private Long id;

    /**
     * Warehouse identifier of product.
     */
    private long producerId;

    /**
    * Name of producer.
    */
    @Nonnull
    private String name;

}
