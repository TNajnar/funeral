package cz.tomaskopulety.funeral_backend.service;

import java.time.Clock;
import java.time.ZoneId;

import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProducerRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductRepository;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;

import org.junit.jupiter.api.BeforeEach;
import static org.mockito.Mockito.mock;

class ProductServiceTest {

    private ProductRepository productRepository = mock(ProductRepository.class);

    private ProducerRepository producerRepository = mock(ProducerRepository.class);

    private ProductCategoryRepository productCategoryRepository = mock(ProductCategoryRepository.class);

    private DbMapper dbMapper;

    private Clock clock;

    private ProductService productService;

//    @BeforeEach
//    void setUp() {
//        this.clock = Clock.system(ZoneId.of("Europe/Prague"));
//        this.dbMapper = new DbMapper(this.producerRepository, this.productCategoryRepository, this.clock);
//        this.productService = new ProductService(this.productRepository, this.producerRepository, this.productCategoryRepository, this.dbMapper);
//    }

//    @Test
//    void createProduct() {
//        final Product product = Product.builder()
//                .name("")
//                .productCategory(new ProductCategory(1, "Coffin"))
//                .productId(1234567890L)
//                .productMovements(Collections.emptyList())
//                .inStock(5)
//                .producer(new Producer(9837156897L,"Moser"))
//                .build();
//
//        when(this.productCategoryRepository.findByProductCategoryId(1)).thenReturn(Optional.empty());
//        this.productService.createProduct(product);
//        assertEquals(true, true);
//    }
//
//    @Test
//    void getProducts() {
//    }
//
//    @Test
//    void createProductCategory() {
//    }
//
//    @Test
//    void getProductCategories() {
//    }
//
//    @Test
//    void createProducer() {
//    }
//
//    @Test
//    void getProducers() {
//    }
//
//    @Test
//    void stockUpProduct() {
//    }
//
//    @Test
//    void sellProduct() {
//    }
}