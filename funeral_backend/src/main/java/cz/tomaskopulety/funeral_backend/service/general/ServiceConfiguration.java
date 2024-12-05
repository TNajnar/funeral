package cz.tomaskopulety.funeral_backend.service.general;

import java.time.Clock;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProducerRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductRepository;
import cz.tomaskopulety.funeral_backend.service.producer.ProducerService;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;
import cz.tomaskopulety.funeral_backend.service.productcategory.ProductCategoryService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfiguration {

    @Bean
    public ProductService productService(@Nonnull ProductRepository productRepository, @Nonnull ProducerService producerService, @Nonnull ProductCategoryService productCategoryService, @Nonnull DbMapper dbMapper) {
        return new ProductService(productRepository, producerService, productCategoryService, dbMapper);
    }

    @Bean
    public ProducerService producerService(@Nonnull ProducerRepository producerRepository, @Nonnull DbMapper dbMapper) {
        return new ProducerService(producerRepository, dbMapper);
    }

    @Bean
    public ProductCategoryService productCategoryService(@Nonnull ProductCategoryRepository productCategoryRepository, @Nonnull DbMapper dbMapper) {
        return new ProductCategoryService(productCategoryRepository, dbMapper);
    }

    @Bean
    public DbMapper dbMapper(@Nonnull ProducerRepository producerRepository, @Nonnull ProductCategoryRepository productCategoryRepository, @Nonnull Clock clock) {
        return new DbMapper(producerRepository, productCategoryRepository, clock);
    }

    @Bean
    public ApiMapper apiMapper(@Nonnull ProducerRepository producerRepository) {
        return new ApiMapper(producerRepository);
    }

    @Bean
    public Clock clock(){
        return Clock.systemDefaultZone();
    }

}
