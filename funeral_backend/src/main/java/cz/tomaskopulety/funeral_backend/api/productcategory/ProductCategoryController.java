package cz.tomaskopulety.funeral_backend.api.productcategory;

import jakarta.annotation.Nonnull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import cz.tomaskopulety.funeral_backend.api.general.response.ErrorResponse;
import cz.tomaskopulety.funeral_backend.api.general.response.SimpleInfoResponse;
import cz.tomaskopulety.funeral_backend.api.product.request.ProductSetStringRequest;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @Operation(summary = "Set category name.", operationId = "setProductName", description = "Set product name.", responses = {
            @ApiResponse(responseCode = "200", description = "Product name set successfully.", content = {@Content(schema = @Schema(implementation = SimpleInfoResponse.class))}),
            @ApiResponse(responseCode = "422", description = "Product not found.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PatchMapping(path = "/{categoryId}/name", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleInfoResponse> setCategoryName(@PathVariable long categoryId, @RequestBody @Valid @NotNull ProductSetStringRequest request) {
        final ProductCategory productCategory = this.productCategoryService.setCategoryName(categoryId, request.getValue());
        return ResponseEntity.ok(new SimpleInfoResponse(productCategory.productCategoryId(), productCategory.name()));
    }

    @Operation(summary = "Delete category.", operationId = "deleteCategory", description = "Delete category.", responses = {
            @ApiResponse(responseCode = "204", description = "Category deleted successfully.", content = {@Content(schema = @Schema())}),
            @ApiResponse(responseCode = "422", description = "Category not found.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping(path = "/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteCategory(@PathVariable long categoryId) {
        this.productCategoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

}
