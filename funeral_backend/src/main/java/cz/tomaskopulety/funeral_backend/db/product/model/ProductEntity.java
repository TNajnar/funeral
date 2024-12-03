package cz.tomaskopulety.funeral_backend.db.product.model;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "funeral", name = "product")
public class ProductEntity {

    /**
    * Database identifier of product.
    */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    @Nonnull
    private Long id;

    /**
    * Category of product.
    */
    @Nonnull
    @OneToOne
    @JoinColumn(name = "id_product_category")
    private ProductCategoryEntity productCategory;

    /**
    * Producer of product.
    */
    @Nonnull
    @OneToOne
    @JoinColumn(name = "id_producer")
    private ProducerEntity producer;

    /**
    * Identifier of  product.
    */
    private long productId;

    /**
    * Name of product.
    */
    @Nonnull
    private String name;

    /**
    * Additional note.
    */
    @Nullable
    private String note;

    /**
    * Amount of product stocked in warehouse.
    */
    private int inStock;

    /**
     * If product is flagged.
     */
    private boolean flagged;

    /**
     * Warehouse movements of product.
     */
    @Nonnull
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_product", nullable = false)
    private List<ProductMovementEntity> productMovements;

}
