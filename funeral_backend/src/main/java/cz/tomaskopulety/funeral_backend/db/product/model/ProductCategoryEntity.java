package cz.tomaskopulety.funeral_backend.db.product.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import cz.tomaskopulety.funeral_backend.db.company.model.CompanyEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "funeral", name = "product_category")
public class ProductCategoryEntity {

    /**
    * Database identifier of product category.
    */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product_category")
    @Nonnull
    private Long id;

    /**
     * Warehouse identifier of product category.
     */
    @Nonnull
    private Long productCategoryId;

    /**
     * Company which owns category.
     */
    @Nonnull
    @ManyToOne
    @JoinColumn(name = "id_company")
    private CompanyEntity company;

    /**
    * Name of category.
    */
    @Nonnull
    private String name;

}
