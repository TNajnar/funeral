package cz.tomaskopulety.funeral_backend.service.product;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProductFilter;
import cz.tomaskopulety.funeral_backend.db.product.ProductRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductMovementEntity;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.db.product.ProductSpecification;
import cz.tomaskopulety.funeral_backend.service.productcategory.ProductCategoryService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

@AllArgsConstructor
@Slf4j
public class ProductService {

    @Nonnull
    private final ProductRepository productRepository;

    @Nonnull
    private final ProductCategoryService productCategoryService;

    @Nonnull
    private final DbMapper dbMapper;

    /**
     * Adds {@link ProductEntity} to database.
     *
     * @param product details of product
     * @throws EntityExistsException when product already exists
     */
    @Nonnull
    public Product createProduct(@Nonnull Product product) {
        if (this.productRepository.existsByName(product.getName())) {
            throw new EntityExistsException(String.format("Product: %s exists already.", product.getName()));
        }
        final ProductCategoryEntity productCategory = this.productCategoryService.getProductCategoryEntity(product.getProductCategory().name());

        final ProductEntity productEntity = this.dbMapper.map(product, productCategory);
        final ProductMovementEntity productMovementEntity = this.dbMapper.map(0, product.getInStock(), product.getCreated(), ProductMovementEntity.MOVEMENT_PURCHASE);
        productEntity.getProductMovements().add(productMovementEntity);
        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);

    }

    /**
     * Gets List of {@link Product} by given specification and filters.
     *
     * @param productCategoryName name of product category
     * @param months selection of months for filtering product movements
     * @param sale if sales from product movement should be selected only
     * @param productName full text for searching product by name
     * @return List of {@link Product}
     */
    @Nonnull
    public List<Product> getProducts(@Nullable String productCategoryName, @Nullable String months, @Nullable Boolean sale, @Nullable String productName) {
        final ProductFilter productFilter = setProductFilter(productCategoryName, months, sale, productName);
        final List<ProductEntity> productEntities = this.productRepository.findAll(productFilter.getDatabaseFilter());

        productEntities.forEach(pe -> productFilter.getDataFilters().forEach(df -> df.apply(pe)));
        return productEntities.stream()
                .map(this.dbMapper::map)
                .toList();
    }

    /**
     * Update number of products in database by given value.
     *
     * @param productId warehouse identifier of product
     * @param amount new state of product in warehouse
     * @return {@link Product}
     */
    @Nonnull
    public Product stockUpProduct(long productId, int amount) {
        final ProductEntity productEntity = getProductEntity(productId);

        final ProductMovementEntity productMovementEntity = this.dbMapper.map(productEntity.getInStock(), amount, null, ProductMovementEntity.MOVEMENT_PURCHASE);

        productEntity.setInStock(productEntity.getInStock() + amount);
        productEntity.getProductMovements().add(productMovementEntity);

        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Decrease number of products in database by one.
     *
     * @param productId warehouse identifier of product
     * @param quantity amount of sold products, must be positive value
     * @throws IllegalArgumentException when product is out of stock but is required for sale.
     * @return {@link Product}
     */
    @Nonnull
    public Product sellProduct(long productId, int quantity) {
        final ProductEntity productEntity = getProductEntity(productId);

        if (productEntity.getInStock() - quantity < 0) {
            throw new IllegalArgumentException(String.format("Product: %s, %s is not stocked in requested amount. Stocked: %s.", productEntity.getProducer(),  productEntity.getName(), productEntity.getInStock()));
        } else {
            final ProductMovementEntity productMovementEntity = this.dbMapper.map(productEntity.getInStock(), quantity, null, ProductMovementEntity.MOVEMENT_SALE);
            productEntity.setInStock(productEntity.getInStock() - quantity);
            productEntity.getProductMovements().add(productMovementEntity);

            this.productRepository.save(productEntity);
            return this.dbMapper.map(productEntity);
        }
    }

    /**
     * Set product as flagged.
     *
     * @param productId identifier of product
     * @return {@link Product}
     */
    @Nonnull
    public Product flagProduct(long productId) {
        final ProductEntity productEntity = getProductEntity(productId);
        productEntity.setFlagged(!productEntity.isFlagged());
        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Get product by given identifier.
     * @param productId identifier or product
     * @throws EntityNotFoundException when product not found.
     * @return {@link ProductEntity}
     */
    @Nonnull
    private ProductEntity getProductEntity(long productId) {
        return this.productRepository.findByProductId(productId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Product id: %s not found.", productId)));
    }

    /**
     * Set product comment.
     *
     * @param productId identifier of product
     * @param value value to update comment
     * @return {@link Product}
     */
    @Nonnull
    public Product setProductComment(long productId, @Nullable String value) {
        final ProductEntity productEntity = getProductEntity(productId);
        productEntity.setComment(value);
        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Set product category.
     *
     * @param productId identifier of product
     * @param productCategoryId identifier of category
     * @return {@link Product}
     */
    @Nonnull
    public Product setProductCategory(long productId, long productCategoryId) {
        final ProductEntity productEntity = getProductEntity(productId);
        final ProductCategoryEntity productCategoryEntity = this.productCategoryService.getProductCategoryEntity(productCategoryId);
        productEntity.setProductCategory(productCategoryEntity);
        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Set product inStock.
     *
     * @param productId identifier of product
     * @param value value to update inStock
     * @return {@link Product}
     */
    @Nonnull
    public Product setProductInStock(long productId, int value) {
        final ProductEntity productEntity = getProductEntity(productId);

        final int quantity = value - productEntity.getInStock();
        final ProductMovementEntity productMovementEntity = this.dbMapper.map(productEntity.getInStock(), quantity, null, ProductMovementEntity.MOVEMENT_MANUAL_CHANGE);
        productEntity.setInStock(productEntity.getInStock() + quantity);
        productEntity.getProductMovements().add(productMovementEntity);
        productEntity.setInStock(value);

        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Set product name.
     *
     * @param productId identifier of product
     * @param value value to update name
     * @return {@link Product}
     */
    @Nonnull
    public Product setProductName(long productId, @Nullable String value) {
        if (value == null) {
            throw new IllegalArgumentException("Product name can not be null.");
        }
        final ProductEntity productEntity = getProductEntity(productId);
        productEntity.setName(value);
        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Set producer name.
     *
     * @param productId identifier of product
     * @param value value to update name
     * @return {@link Product}
     */
    @Nonnull
    public Product setProducerName(long productId, @Nullable String value) {
        final ProductEntity productEntity = getProductEntity(productId);
        productEntity.setProducer(value);
        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Set type.
     *
     * @param productId identifier of product
     * @param value value to update type
     * @return {@link Product}
     */
    @Nonnull
    public Product setType(long productId, @Nullable String value) {
        final ProductEntity productEntity = getProductEntity(productId);
        productEntity.setType(value);
        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

    /**
     * Get product by given identifier.
     *
     * @param productId warehouse identifier
     * @throws EntityNotFoundException when product is not found.
     * @return {@link Product}
     */
    @Nonnull
    public Product getProduct(long productId, @Nullable String months, @Nullable Boolean sale) {
        final ProductFilter productFilter = setProductFilter(null, months, sale, null);
        final ProductEntity productEntity = getProductEntity(productId);
        productFilter.getDataFilters()
                .forEach(df -> df.apply(productEntity));
        return dbMapper.map(productEntity);
    }

    /**
     * Delete {@link ProductEntity}.
     *
     * @param productId identifier of product
     * @throws EntityNotFoundException when product not found
     */
    public void deleteProduct(long productId) {
        final ProductEntity productEntity = getProductEntity(productId);
        this.productRepository.delete(productEntity);
    }

    /**
     * Takes string of month numbers and create Set.
     * Months are formatted as numbers connected with dash(range of months) or comma(one month). For example "1-5,9,10".
     *
     * @param months string
     * @return Set of {@link Integer}
     */
    @Nonnull
    private Set<Integer> getMonths(@Nonnull String months){
        Set<Integer> monthSet = new HashSet<>();
        String[] splitMonths = months.split(",");

        for (String m : splitMonths) {
            if (m.contains("-")){
                String[] monthArray = m.split("-");
                final int firstNumber = Integer.parseInt(monthArray[0]);
                final int lastNumber = Integer.parseInt(monthArray[1]);
                for (int i = firstNumber; i <= lastNumber ; i++) {
                    monthSet.add(i);
                }
            } else {
                monthSet.add(Integer.parseInt(m));
            }
        }
        return monthSet.stream()
                .filter(m -> m > 0 && m < 13)
                .collect(Collectors.toSet());
    }

    /**
     * Set filters for product selection.
     *
     * @param productCategoryName identifier of product category
     * @param months selection of months for filtering product movements
     * @param sale if sales from product movement should be selected only
     * @param productName full text for searching product by name
     * @return {@link ProductFilter}
     */
    @Nonnull
    private ProductFilter setProductFilter(@Nullable String productCategoryName, @Nullable String months, @Nullable Boolean sale, @Nullable String productName){
        final ProductFilter productFilter = new ProductFilter(Specification.where(null));
        ProductCategoryEntity productCategoryEntity;

        if (productCategoryName != null) {
            productCategoryEntity = this.productCategoryService.getProductCategoryEntity(productCategoryName);
            productFilter.setDatabaseFilter(ProductSpecification.byCategory(productCategoryEntity));
        }


        if (months != null) {
            final Set<Integer> formattedMonths = getMonths(months);
            productFilter.setDatabaseFilter(ProductSpecification.byMonths(formattedMonths));
            final Function<ProductEntity,ProductEntity> productMovementsSelectedMonths = pe -> {
                final List<ProductMovementEntity> list = pe.getProductMovements().stream()
                        .filter(pme -> formattedMonths.contains(pme.getCreated().getMonthValue()))
                        .toList();
                pe.setProductMovements(list);
                return pe;
            };
            productFilter.getDataFilters().add(productMovementsSelectedMonths);
        }

        if (sale != null && sale) {
            productFilter.setDatabaseFilter(ProductSpecification.bySale());
            final Predicate<Integer> isSale = o -> o < 0;
            final Function<ProductEntity,ProductEntity> productMovementsSalesOnly = pe -> {
                final List<ProductMovementEntity> list = pe.getProductMovements().stream()
                        .filter(pme -> isSale.test(pme.getRequested()))
                        .toList();
                pe.setProductMovements(list);
                return pe;
            };
            productFilter.getDataFilters().add(productMovementsSalesOnly);
        }

        if (productName != null) {
            productFilter.setDatabaseFilter(ProductSpecification.byProductName(productName));
        }

        return productFilter;
    }

}
