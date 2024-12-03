package cz.tomaskopulety.funeral_backend.api.product;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Negative;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.api.general.response.ErrorResponse;
import cz.tomaskopulety.funeral_backend.api.product.request.ProductRequest;
import cz.tomaskopulety.funeral_backend.api.product.response.product.ProducerResponses;
import cz.tomaskopulety.funeral_backend.api.product.response.product.ProductCategoryResponses;
import cz.tomaskopulety.funeral_backend.api.product.response.product.ProductGetResponse;
import cz.tomaskopulety.funeral_backend.api.general.response.SimpleInfoResponse;
import cz.tomaskopulety.funeral_backend.api.product.response.product.ProductResponses;
import cz.tomaskopulety.funeral_backend.service.product.ProductService;
import cz.tomaskopulety.funeral_backend.service.product.domain.Producer;
import cz.tomaskopulety.funeral_backend.service.product.domain.Product;
import cz.tomaskopulety.funeral_backend.service.product.domain.ProductCategory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@Validated
@Tag(name = "Products")
@RequestMapping(path = ProductController.BASE_URL)
public class ProductController {

    public  static final String BASE_URL = "/api/v1/products";

    @Nonnull
    private final ProductService productService;

    @Nonnull
    private final ApiMapper apiMapper;

    @Operation(summary = "Create new product.", operationId = "createProduct", description = "Create new product and return its data including new given identifier.", responses = {
            @ApiResponse(responseCode = "201", description = "Product created successfully.", content = {@Content(schema = @Schema(implementation = ProductGetResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Some of request parameters are wrong.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Product exists already.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "422", description = "Objects required for creating product were not found.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductGetResponse> createProduct(@Valid @NotNull @RequestBody ProductRequest request) {
        final Product product = this.productService.createProduct(this.apiMapper.map(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(this.apiMapper.map(product));
    }

    @Operation(summary = "Update an existing product.", operationId = "updateProduct", description = "Update data of existing product. All data in request must be filled.", responses = {
            @ApiResponse(responseCode = "200", description = "Product updated successfully.", content = {@Content(schema = @Schema(implementation = ProductGetResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Some of request parameters are wrong.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "422", description = "Objects required for updating product were not found.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PutMapping(path = "/{productId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductGetResponse> updateProduct(@PathVariable long productId, @RequestBody @Valid @NotNull ProductRequest request) {
        final Product product = this.productService.updateProduct(productId, this.apiMapper.map(request));
        return ResponseEntity.ok(this.apiMapper.map(product));
    }

    @Operation(summary = "Get list of products.", operationId = "getListOfProducts", description = "Get list of saved products. Filters can be added as path variables to have selection more specific.", responses = {
            @ApiResponse(responseCode = "200", description = "Products loaded successfully.", content = {@Content(schema = @Schema(implementation = ProductResponses.class))}),
            @ApiResponse(responseCode = "422", description = "Objects required for getting products were not found (product category, ....).", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductResponses> getProducts(
            @Parameter(description = "Identifier of product category. Select only products from given category.") @RequestParam(name = "productCategory", required = false) @Nullable Long productCategoryId,
            @Parameter(description = "Identifier of producer. Select only products from given producer.") @RequestParam(name = "producer", required = false) @Nullable Long producerId,
            @Parameter(description = "Months as numbers connected with dash(range of months) or comma(one month).", example = "1-5,9,10") @RequestParam(required = false) @Nullable String months,
            @Parameter(description = "Select only products which contain at least one sale.") @RequestParam(required = false) @Nullable Boolean sale
    ) {
        return ResponseEntity.ok(
                new ProductResponses(
                        this.productService.getProducts(productCategoryId, producerId, months, sale)
                                .stream()
                                .map(this.apiMapper::map)
                                .toList()
                )
        );
    }

    @Operation(summary = "Get one product.", operationId = "getOneProduct", description = "Get one product. Filters can be added as path variables to have selection more specific.", responses = {
            @ApiResponse(responseCode = "200", description = "Product loaded successfully.", content = {@Content(schema = @Schema(implementation = ProductGetResponse.class))}),
            @ApiResponse(responseCode = "422", description = "Product not found.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(path = "/{productId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductGetResponse> getProduct(
            @PathVariable long productId,
            @Parameter(description = "Months as numbers connected with dash(range of months) or comma(one month).", example = "1-5,9,10") @RequestParam(required = false) @Nullable String months,
            @Parameter(description = "Select only products which contain at least one sale.") @RequestParam(required = false) @Nullable Boolean sale
    ) {
        return ResponseEntity.ok(this.apiMapper.map(this.productService.getProduct(productId, months, sale)));
    }

    @Operation(summary = "Create new product category.", operationId = "createNewProductCategory", description = "Create new product category.", responses = {
            @ApiResponse(responseCode = "201", description = "Product category created successfully.", content = {@Content(schema = @Schema(implementation = ProductCategoryResponses.class))}),
            @ApiResponse(responseCode = "409", description = "Product category exists already.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(path = "/categories/{productCategoryName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleInfoResponse> createProductCategory(@PathVariable @NotEmpty String productCategoryName) {
        final ProductCategory productCategory = this.productService.createProductCategory(productCategoryName);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SimpleInfoResponse(productCategory.productCategoryId(), productCategory.name()));
    }

    @Operation(summary = "Get list of product categories.", operationId = "getListOfProductCategories", description = "Get list of product categories.", responses = {
            @ApiResponse(responseCode = "200", description = "Product categories loaded successfully.", content = {@Content(schema = @Schema(implementation = ProductCategoryResponses.class))}),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(path = "/categories", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductCategoryResponses> getProductCategories() {
        return ResponseEntity.ok(
                new ProductCategoryResponses(
                        this.productService.getProductCategories()
                                .stream()
                                .map(pc -> new SimpleInfoResponse(pc.productCategoryId(), pc.name()))
                                .toList()
                )
        );
    }

    @Operation(summary = "Create new producer.", operationId = "createNewProducer", description = "Create new producer.", responses = {
            @ApiResponse(responseCode = "201", description = "Producer created successfully.", content = {@Content(schema = @Schema(implementation = SimpleInfoResponse.class))}),
            @ApiResponse(responseCode = "409", description = "Producer exists already.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(path = "/producers/{producerName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleInfoResponse> createProducer(@PathVariable @NotEmpty String producerName) {
        final Producer producer = this.productService.createProducer(producerName);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SimpleInfoResponse(producer.producerId(), producer.name()));
    }

    @Operation(summary = "Sell product.", operationId = "sellProduct", description = "Sell product by given value.", responses = {
            @ApiResponse(responseCode = "200", description = "Products sold successfully.", content = {@Content(schema = @Schema(implementation = ProductGetResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Some of request parameters are wrong.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "422", description = "Product not found.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PatchMapping(path = "/{productId}/sell/{quantity}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductGetResponse> sellProduct(@PathVariable long productId, @Parameter(description = "Amount of product to be sold. Must be negative number.", example = "-3") @Negative @PathVariable int quantity) {
        final Product product = this.productService.sellProduct(productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.apiMapper.map(product));
    }

    @Operation(summary = "Buy product.", operationId = "buyProduct", description = "Buy product by given value.", responses = {
            @ApiResponse(responseCode = "200", description = "Products bought successfully.", content = {@Content(schema = @Schema(implementation = ProductGetResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Some of request parameters are wrong.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "422", description = "Product not found.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PatchMapping(path = "/{productId}/buy/{quantity}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductGetResponse> buyProduct(@PathVariable long productId, @Parameter(description = "Amount of product to be bought. Must be positive number.", example = "3") @Positive @PathVariable int quantity) {
        final Product product = this.productService.buyProduct(productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.apiMapper.map(product));
    }

    @Operation(summary = "Get list of producers.", operationId = "getListOfProducers", description = "Get list of producers.", responses = {
            @ApiResponse(responseCode = "200", description = "Producers loaded successfully.", content = {@Content(schema = @Schema(implementation = ProducerResponses.class))}),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(path = "/producers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProducerResponses> getProducers() {
        return ResponseEntity.ok(
                new ProducerResponses(
                        this.productService.getProducers()
                                .stream()
                                .map(pc -> new SimpleInfoResponse(pc.producerId(), pc.name()))
                                .toList()
                )
        );
    }

}
