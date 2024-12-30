package cz.tomaskopulety.funeral_backend.service.general;

import java.time.Clock;
import jakarta.annotation.Nonnull;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProductCategoryRepository;
import cz.tomaskopulety.funeral_backend.db.product.ProductRepository;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;
import cz.tomaskopulety.funeral_backend.service.productcategory.ProductCategoryService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfiguration {

    @Bean
    public ProductService productService(@Nonnull ProductRepository productRepository, @Nonnull ProductCategoryService productCategoryService, @Nonnull DbMapper dbMapper) {
        return new ProductService(productRepository, productCategoryService, dbMapper);
    }

    @Bean
    public ProductCategoryService productCategoryService(@Nonnull ProductCategoryRepository productCategoryRepository, @Nonnull DbMapper dbMapper, @Nonnull ProductRepository productRepository) {
        return new ProductCategoryService(productCategoryRepository, productRepository, dbMapper);
    }

    @Bean
    public DbMapper dbMapper(@Nonnull Clock clock) {
        return new DbMapper(clock);
    }

    @Bean
    public ApiMapper apiMapper(@Nonnull ProductCategoryRepository productCategoryRepository) {
        return new ApiMapper(productCategoryRepository);
    }

    @Bean
    public Clock clock(){
        return Clock.systemDefaultZone();
    }

}
