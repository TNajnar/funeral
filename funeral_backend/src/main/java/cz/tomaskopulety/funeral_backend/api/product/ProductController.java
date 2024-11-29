package cz.tomaskopulety.funeral_backend.api.product;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.api.product.request.ProductCreateRequest;
import cz.tomaskopulety.funeral_backend.api.product.response.product.ProductGetResponse;
import cz.tomaskopulety.funeral_backend.api.general.response.SimpleInfoResponse;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;
import cz.tomaskopulety.funeral_backend.service.product.domain.Producer;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductCategory;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@Validated
@RequestMapping(path = ProductController.BASE_URL)
public class ProductController {

    public  static final String BASE_URL = "/api/v1/products";

    @Nonnull
    private final ProductService productService;

    @Nonnull
    private final ApiMapper apiMapper;

    @PostMapping
    public ResponseEntity<ProductGetResponse> createProduct(@RequestBody @Valid @NotNull ProductCreateRequest request) {
        final Product product = this.productService.createProduct(this.apiMapper.map(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(this.apiMapper.map(product));
    }

    @GetMapping
    public ResponseEntity<List<ProductGetResponse>> getProducts(
            @RequestParam(name = "productCategory", required = false) @Nullable Long productCategoryId,
            @RequestParam(name = "producer", required = false) @Nullable Long producerId,
            @RequestParam(required = false) @Nullable String months,
            @RequestParam(required = false) @Nullable Boolean sale
    ) {
        return ResponseEntity.ok(
                this.productService.getProducts(productCategoryId, producerId, months, sale)
                        .stream()
                        .map(this.apiMapper::map)
                        .toList()
        );
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductGetResponse> getProduct(@PathVariable long productId) {
        return ResponseEntity.ok(this.apiMapper.map(this.productService.getProduct(productId)));
    }

    @PostMapping("/categories/{productCategoryName}")
    public ResponseEntity<SimpleInfoResponse> createProductCategory(@PathVariable @NotEmpty String productCategoryName) {
        final ProductCategory productCategory = this.productService.createProductCategory(productCategoryName);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SimpleInfoResponse(productCategory.productCategoryId(), productCategory.name()));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<SimpleInfoResponse>> getProductCategories() {
        return ResponseEntity.ok(
                this.productService.getProductCategories()
                        .stream()
                        .map(pc -> new SimpleInfoResponse(pc.productCategoryId(), pc.name()))
                        .toList()
        );
    }

    @PostMapping("/producers/{producerName}")
    public ResponseEntity<SimpleInfoResponse> createProducer(@PathVariable @NotEmpty String producerName) {
        final Producer producer = this.productService.createProducer(producerName);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SimpleInfoResponse(producer.producerId(), producer.name()));
    }

    @PatchMapping("/{productId}/sell/{quantity}")
    public ResponseEntity<ProductGetResponse> sellProduct(@PathVariable long productId, @PathVariable int quantity) {
        if (quantity > -1) {
            throw new IllegalArgumentException("Product quantity must be negative value.");
        }
        final Product product = this.productService.sellProduct(productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.apiMapper.map(product));
    }

    @PatchMapping("/{productId}/buy/{quantity}")
    public ResponseEntity<ProductGetResponse> buyProduct(@PathVariable long productId, @PathVariable int quantity) {
        if (quantity < 1) {
            throw new IllegalArgumentException("Product quantity must be positive value.");
        }
        final Product product = this.productService.buyProduct(productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.apiMapper.map(product));
    }

    @GetMapping("/producers")
    public ResponseEntity<List<SimpleInfoResponse>> getProducers() {
        return ResponseEntity.ok(
                this.productService.getProducers()
                        .stream()
                        .map(pc -> new SimpleInfoResponse(pc.producerId(), pc.name()))
                        .toList()
        );
    }

}
