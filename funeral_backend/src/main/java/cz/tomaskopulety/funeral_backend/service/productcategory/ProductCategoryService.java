package cz.tomaskopulety.funeral_backend.service.productcategory;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProducerEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.service.general.IdGenerator;
import cz.tomaskopulety.funeral_backend.service.productcategory.domain.ProductCategory;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
public class ProductCategoryService {

    @Nonnull
    private final ProductCategoryRepository productCategoryRepository;

    @Nonnull
    private final DbMapper dbMapper;

    /**
     * Adds new {@link ProductCategoryEntity} to database.
     *
     * @param productCategoryName name of product category
     * @throws EntityExistsException when product category exists already
     */
    @Nonnull
    public ProductCategory createProductCategory(@Nonnull String productCategoryName) {
        if (this.productCategoryRepository.existsByName(productCategoryName)) {
            throw new EntityExistsException(String.format("Product category: %s exists already.", productCategoryName));
        } else {
            final ProductCategoryEntity productCategoryEntity = new ProductCategoryEntity();
            productCategoryEntity.setName(productCategoryName);
            productCategoryEntity.setProductCategoryId(IdGenerator.generateNumericID());

            this.productCategoryRepository.save(productCategoryEntity);
            return this.dbMapper.map(productCategoryEntity);
        }
    }

    /**
     * Gets all saved {@link ProductCategory}.
     *
     * @return List of {@link ProductCategory}
     */
    @Nonnull
    public List<ProductCategory> getProductCategories() {
        return this.productCategoryRepository.findAll()
                .stream()
                .map(this.dbMapper::map)
                .toList();
    }

    /**
     * Get product category by given identifier.
     *
     * @param productCategoryId identifier of producer
     * @return {@link ProducerEntity}
     */
    @Nonnull
    public ProductCategoryEntity getProductCategoryEntity(long productCategoryId) {
        return this.productCategoryRepository.findByProductCategoryId(productCategoryId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Product category id: %s not found.", productCategoryId)));
    }

}
