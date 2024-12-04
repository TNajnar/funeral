package cz.tomaskopulety.funeral_backend.api.producer;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotEmpty;

import cz.tomaskopulety.funeral_backend.api.general.ApiMapper;
import cz.tomaskopulety.funeral_backend.api.general.response.ErrorResponse;
import cz.tomaskopulety.funeral_backend.api.general.response.SimpleInfoResponse;
import cz.tomaskopulety.funeral_backend.api.producer.response.ProducerResponses;
import cz.tomaskopulety.funeral_backend.service.producer.ProducerService;
import cz.tomaskopulety.funeral_backend.service.producer.domain.Producer;

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
@Tag(name = "Producer")
@RequestMapping(path = ProducerController.BASE_URL)
public class ProducerController {

    public  static final String BASE_URL = "/api/v1/producers";

    @Nonnull
    private final ProducerService producerService;

    @Operation(summary = "Create new producer.", operationId = "createNewProducer", description = "Create new producer.", responses = {
            @ApiResponse(responseCode = "201", description = "Producer created successfully.", content = {@Content(schema = @Schema(implementation = SimpleInfoResponse.class))}),
            @ApiResponse(responseCode = "409", description = "Producer exists already.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(path = "/{producerName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleInfoResponse> createProducer(@PathVariable @NotEmpty String producerName) {
        final Producer producer = this.producerService.createProducer(producerName);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SimpleInfoResponse(producer.producerId(), producer.name()));
    }

    @Operation(summary = "Get list of producers.", operationId = "getListOfProducers", description = "Get list of producers.", responses = {
            @ApiResponse(responseCode = "200", description = "Producers loaded successfully.", content = {@Content(schema = @Schema(implementation = ProducerResponses.class))}),
            @ApiResponse(responseCode = "500", description = "Internal system error.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProducerResponses> getProducers() {
        return ResponseEntity.ok(
                new ProducerResponses(
                        this.producerService.getProducers()
                                .stream()
                                .map(pc -> new SimpleInfoResponse(pc.producerId(), pc.name()))
                                .toList()
                )
        );
    }

}
