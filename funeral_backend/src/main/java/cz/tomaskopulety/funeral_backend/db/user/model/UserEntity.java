package cz.tomaskopulety.funeral_backend.db.user.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Setter;
import lombok.Getter;

@Setter
@Getter
@Entity
@Table(schema = "funeral", name = "user")
public class UserEntity {

    /**
     * Database identifier of user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_funeral")
    @Nonnull
    private Long id;

    /**
     * System identifier of user.
     */
    private long userId;

    /**
     * Name of user.
     */
    @Nonnull
    private String name;

    /**
     * Surname of user.
     */
    @Nonnull
    private String surname;

    /**
     * Password of user.
     */
    @Nonnull
    private String password;

    /**
     * Email of user.
     */
    @Nonnull
    private String email;

}
