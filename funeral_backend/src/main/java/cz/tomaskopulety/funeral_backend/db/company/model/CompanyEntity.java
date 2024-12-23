package cz.tomaskopulety.funeral_backend.db.company.model;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import cz.tomaskopulety.funeral_backend.db.user.model.UserEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "funeral", name = "company")
public class CompanyEntity {

    /**
     * Database identifier of company.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_company")
    @Nonnull
    private Long id;

    /**
     * System identifier of company.
     */
    private long companyId;

    /**
     * Company users.
     */
    @Nonnull
    @OneToMany
    private List<CompanyEntity> offices;

    /**
     * Company users.
     */
    @Nonnull
    @OneToMany
    private List<UserEntity> users;

    /**
     * Name of customer.
     */
    @Nonnull
    private String name;

    /**
     * Street.
     */
    @Nonnull
    private String street;

    /**
     * City.
     */
    @Nonnull
    private String city;

    /**
     * Country.
     */
    @Nullable
    private String country;

    /**
     * Postal code.
     */
    @Nonnull
    private String postalCode;

    /**
     * Phone number.
     */
    @Nonnull
    private String phone;

    /**
     * Email address.
     */
    @Nullable
    private String email;

    /**
     * Allows its offices to use warehouse.
     */
    private boolean warehouseShared;

    /**
     * Allows to create warehouse items.
     */
    private boolean warehouseEnabled;
}
