package cz.tomaskopulety.funeral_backend.service.general;

import java.time.Clock;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProducerRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductRepository;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfiguration {

    @Bean
    public ProductService productService(@Nonnull ProductRepository productRepository, @Nonnull ProducerRepository producerRepository, @Nonnull ProductCategoryRepository productCategoryRepository, @Nonnull DbMapper dbMapper) {
        return new ProductService(productRepository, producerRepository, productCategoryRepository, dbMapper);
    }

    @Bean
    public DbMapper dbMapper(@Nonnull ProducerRepository producerRepository, @Nonnull ProductCategoryRepository productCategoryRepository, @Nonnull Clock clock) {
        return new DbMapper(producerRepository, productCategoryRepository, clock);
    }

    @Bean
    public ApiMapper apiMapper(@Nonnull ProducerRepository producerRepository, @Nonnull ProductCategoryRepository productCategoryRepository) {
        return new ApiMapper(producerRepository, productCategoryRepository);
    }

    @Bean
    public Clock clock(){
        return Clock.systemDefaultZone();
    }

}
