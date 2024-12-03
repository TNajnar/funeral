package cz.tomaskopulety.funeral_backend.api.general.response;

import jakarta.annotation.Nonnull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {

  /**
   * Error status code.
   */
  @Nonnull
  @Schema(description = "Error status code.", example = "BAD REQUEST", requiredMode = Schema.RequiredMode.REQUIRED)
  private HttpStatus status;

  /**
   * Message with description of error.
   */
  @Nonnull
  @Schema(description = "Message with description of error.", example = "Field name must not be empty.", requiredMode = Schema.RequiredMode.REQUIRED)
  private String message;

}
