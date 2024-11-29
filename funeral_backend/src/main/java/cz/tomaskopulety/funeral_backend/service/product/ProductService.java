package cz.tomaskopulety.funeral_backend.service.product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.EntityExistsException;

import cz.tomaskopulety.funeral_backend.api.product.response.product.ProductGetResponse;
import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProducerRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProducerEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductCategoryEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductEntity;
import cz.tomaskopulety.funeral_backend.db.product.model.ProductMovementEntity;
import cz.tomaskopulety.funeral_backend.service.general.IdGenerator;
import cz.tomaskopulety.funeral_backend.service.product.domain.Producer;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductCategory;
import cz.tomaskopulety.funeral_backend.db.product.ProductSpecification;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

@AllArgsConstructor
@Slf4j
public class ProductService {

    @Nonnull
    private final ProductRepository productRepository;

    @Nonnull
    private final ProducerRepository producerRepository;

    @Nonnull
    private final ProductCategoryRepository productCategoryRepository;

    @Nonnull
    private final DbMapper dbMapper;

    /**
     * Adds {@link ProductEntity} to database.
     *
     * @param product details of product
     * @throws IllegalArgumentException when product already exists
     */
    public Product createProduct(@Nonnull Product product) {
        if (this.productRepository.existsByNameAndProducer_ProducerId(product.getName(), product.getProducer().producerId())) {
            throw new EntityExistsException(String.format("Product: %s exists already.", product.getName()));
        } else {
            ProductEntity productEntity = this.dbMapper.map(product);
            final ProductMovementEntity productMovementEntity = this.dbMapper.map(0, product.getInStock());
            productEntity.getProductMovements().add(productMovementEntity);
            this.productRepository.save(productEntity);
            return this.dbMapper.map(productEntity);
        }
    }

    /**
     * Gets List of {@link Product} by given specification and filters.
     *
     * @return List of {@link Product}
     * @throws IllegalArgumentException when entities are not found
     */
    public List<Product> getProducts(@Nullable Long productCategoryId, @Nullable Long producerId, @Nullable String months, @Nullable Boolean sale) {
        Specification<ProductEntity> productSpecification = Specification.where(null);
        final List<Function<ProductEntity, ProductEntity>> filteringFunctions = new ArrayList<>();
        ProductCategoryEntity productCategoryEntity;
        ProducerEntity producerEntity;

        if (productCategoryId != null) {
            productCategoryEntity = this.productCategoryRepository.findByProductCategoryId(productCategoryId)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Product category id: %s not found.", productCategoryId)));
            productSpecification = productSpecification.and(ProductSpecification.byCategory(productCategoryEntity));
        }

        if (producerId != null) {
            producerEntity = this.producerRepository.findByProducerId(producerId)
                    .orElseThrow(() -> new IllegalArgumentException(String.format("Producer id: %s not found.", producerId)));
            productSpecification = productSpecification.and(ProductSpecification.byProducer(producerEntity));
        }

        if (months != null) {
            final Set<Integer> formattedMonths = getMonths(months);
            productSpecification = productSpecification.and(ProductSpecification.byMonths(formattedMonths));
            final Function<ProductEntity,ProductEntity> productMovementsSelectedMonths = pe -> {
                final List<ProductMovementEntity> list = pe.getProductMovements().stream()
                        .filter(pme -> formattedMonths.contains(pme.getCreated().getMonthValue()))
                        .toList();
                pe.setProductMovements(list);
                return pe;
            };
            filteringFunctions.add(productMovementsSelectedMonths);
        }

        if (sale != null && sale) {
            productSpecification = productSpecification.and(ProductSpecification.bySale());
            final Predicate<Integer> isSale = o -> o < 0;
            final Function<ProductEntity,ProductEntity> productMovementsSalesOnly = pe -> {
                final List<ProductMovementEntity> list = pe.getProductMovements().stream()
                        .filter(pme -> isSale.test(pme.getRequested()))
                        .toList();
                pe.setProductMovements(list);
                return pe;
            };
            filteringFunctions.add(productMovementsSalesOnly);
        }

        final List<ProductEntity> productEntities = this.productRepository.findAll(productSpecification);

        productEntities.forEach(pe -> filteringFunctions.forEach(ff -> ff.apply(pe)));

        return productEntities.stream()
                .map(this.dbMapper::map)
                .toList();
    }

    /**
     * Adds new {@link ProductCategoryEntity} to database.
     *
     * @param productCategoryName name of product category
     * @throws EntityExistsException when product category exists already
     */
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
    public List<ProductCategory> getProductCategories() {
        return this.productCategoryRepository.findAll()
                .stream()
                .map(this.dbMapper::map)
                .toList();
    }

    /**
     * Adds new {@link ProducerEntity} to database.
     *
     * @param producerName name of producer
     * @throws EntityExistsException when producer exists already
     */
    public Producer createProducer(@Nonnull String producerName) {
        if (this.producerRepository.existsByName(producerName)) {
            throw new EntityExistsException(String.format("Producer: %s exists already.", producerName));
        } else {
            final ProducerEntity producerEntity = new ProducerEntity();
            producerEntity.setName(producerName);
            producerEntity.setProducerId(IdGenerator.generateNumericID());

            this.producerRepository.save(producerEntity);
            return this.dbMapper.map(producerEntity);
        }
    }

    /**
     * Gets all saved {@link Producer}.
     *
     * @return List of {@link Producer}
     */
    public List<Producer> getProducers() {
        return this.producerRepository.findAll()
                .stream()
                .map(this.dbMapper::map)
                .toList();
    }

    /**
     * Increase number of products in database by given value.
     *
     * @param productId warehouse identifier of product
     * @param quantity amount of products to be stocked up, must be positive value
     * @throws IllegalArgumentException when product not found
     */
    public Product buyProduct(long productId, int quantity) {
        final ProductEntity productEntity = this.productRepository.findByProductId(productId)
            .orElseThrow(() -> new IllegalArgumentException(String.format("Product id: %s not found.", productId)));

        final ProductMovementEntity productMovementEntity = this.dbMapper.map(productEntity.getInStock(), quantity);

        productEntity.setInStock(productEntity.getInStock() + quantity);
        productEntity.getProductMovements().add(productMovementEntity);

        this.productRepository.save(productEntity);
        return this.dbMapper.map(productEntity);
    }

  /**
   * Decrease number of products in database by one.
   *
   * @param productId warehouse identifier of product
   * @param quantity amount of sold products, must be negative value
   * @throws IllegalArgumentException when product not found
   * @throws IllegalStateException when product is out of stock but is required for sale.
   */
    public Product sellProduct(long productId, int quantity) {
        final ProductEntity productEntity = this.productRepository.findByProductId(productId)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Product id: %s not found.", productId)));

        if (productEntity.getInStock() + quantity < 0) {
            throw new IllegalStateException(String.format("Product: %s, %s is not stocked in requested amount. Stocked: %s.", productEntity.getProducer().getName(),  productEntity.getName(), productEntity.getInStock()));
        } else {
            final ProductMovementEntity productMovementEntity = this.dbMapper.map(productEntity.getInStock(), quantity);
            productEntity.setInStock(productEntity.getInStock() + quantity);
            productEntity.getProductMovements().add(productMovementEntity);

            this.productRepository.save(productEntity);
            return this.dbMapper.map(productEntity);
        }
    }

    /**
     * Get product by given identifier.
     *
     * @param productId warehouse identifier
     * @throws IllegalArgumentException when product is not found.
     * @return {@link Product}
     */
    public Product getProduct(long productId) {
        return this.dbMapper.map(this.productRepository.findByProductId(productId)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Product id: %s not found.", productId))));
    }

    /**
     * Takes string of month numbers and create Set.
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

}
