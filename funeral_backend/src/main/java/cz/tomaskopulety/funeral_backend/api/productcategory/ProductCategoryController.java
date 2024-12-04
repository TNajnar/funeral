package cz.tomaskopulety.funeral_backend.api.productcategory;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotEmpty;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.api.general.response.ErrorResponse;
import cz.tomaskopulety.funeral_backend.api.general.response.SimpleInfoResponse;
import cz.tomaskopulety.funeral_backend.api.productcategory.response.ProductCategoryResponses;
import cz.tomaskopulety.funeral_backend.service.productcategory.domain.ProductCategory;
import cz.tomaskopulety.funeral_backend.service.productcategory.ProductCategoryService;

import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@Validated
@Tag(name = "Product category")
@RequestMapping(path = ProductCategoryController.BASE_URL)
public class ProductCategoryController {

    public  static final String BASE_URL = "/api/v1/product-categories";

    @Nonnull
    private final ProductCategoryService productCategoryService;

    @Operation(summary = "Create new product category.", operationId = "createNewProductCategory", description = "Create new product category.", responses = {
            @ApiResponse(responseCode = "201", description = "Product category created successfully.", content = {@Content(schema = @Schema(implementation = ProductCategoryResponses.class))}),
            @ApiResponse(responseCode = "409", description = "Product category exists already.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(path = "/{productCategoryName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleInfoResponse> createProductCategory(@PathVariable @NotEmpty String productCategoryName) {
        final ProductCategory productCategory = this.productCategoryService.createProductCategory(productCategoryName);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SimpleInfoResponse(productCategory.productCategoryId(), productCategory.name()));
    }

    @Operation(summary = "Get list of product categories.", operationId = "getListOfProductCategories", description = "Get list of product categories.", responses = {
            @ApiResponse(responseCode = "200", description = "Product categories loaded successfully.", content = {@Content(schema = @Schema(implementation = ProductCategoryResponses.class))}),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductCategoryResponses> getProductCategories() {
        return ResponseEntity.ok(
                new ProductCategoryResponses(
                        this.productCategoryService.getProductCategories()
                                .stream()
                                .map(pc -> new SimpleInfoResponse(pc.productCategoryId(), pc.name()))
                                .toList()
                )
        );
    }

}
