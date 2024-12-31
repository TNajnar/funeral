package cz.tomaskopulety.funeral_backend.service.productcategory;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;
import cz.tomaskopulety.funeral_backend.service.general.IdGenerator;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.productcategory.domain.ProductCategory;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
public class ProductCategoryService {

    @Nonnull
    private final ProductCategoryRepository productCategoryRepository;

    @Nonnull
    private final ProductRepository productRepository;

    @Nonnull
    private final DbMapper dbMapper;

    /**
     * Adds new {@link ProductCategoryEntity} to database.
     *
     * @param productCategoryName name of product category
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
     * Get product category by given name.
     *
     * @param productCategoryName name of product category
     * @throws EntityNotFoundException when category not found
     * @return {@link ProductCategoryEntity}
     */
    @Nonnull
    public ProductCategoryEntity getProductCategoryEntity(@Nonnull String productCategoryName) {
        return this.productCategoryRepository.findByName(productCategoryName)
                .orElseThrow(() -> {
                    final List<String> categoryNames = this.productCategoryRepository.findAll().stream().map(ProductCategoryEntity::getName).toList();
                    return new EntityNotFoundException(String.format("Product category name: %s not found. Available categories: %s.", productCategoryName, categoryNames));
                });

    }

    /**
     * Get product category
     *
     * @param productCategoryId identifier of product category
     * @throws EntityNotFoundException when category not found
     * @return {@link ProductCategoryEntity}
     */
    @Nonnull
    public ProductCategoryEntity getProductCategoryEntity(long productCategoryId) {
        return this.productCategoryRepository.findByProductCategoryId(productCategoryId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Product category id: %s not found.", productCategoryId)));
    }

    /**
     * Delete category by given identifier and all products connected to this category.
     *
     * @param categoryId warehouse identifier of category
     * @throws EntityNotFoundException when category not found.
     */
    public void deleteCategory(long categoryId) {
        final ProductCategoryEntity productCategoryEntity = this.productCategoryRepository.findByProductCategoryId(categoryId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Product category: %s not found.", categoryId)));
        final List<ProductEntity> productEntities = this.productRepository.findAllByProductCategory(productCategoryEntity);
        this.productRepository.deleteAll(productEntities);
        this.productCategoryRepository.delete(productCategoryEntity);
    }

    /**
     * Set category name.
     *
     * @param categoryId identifier of category
     * @param value value to update name
     * @throws EntityNotFoundException when category not found.
     * @return {@link Product}
     */
    @Nonnull
    public ProductCategory setCategoryName(long categoryId, @Nullable String value) {
        if (value == null) {
            throw new IllegalArgumentException("Category name can not be null.");
        }
        final ProductCategoryEntity productCategoryEntity = this.productCategoryRepository.findByProductCategoryId(categoryId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Product category: %s not found.", categoryId)));
        productCategoryEntity.setName(value);
        this.productCategoryRepository.save(productCategoryEntity);
        return this.dbMapper.map(productCategoryEntity);
    }

}
