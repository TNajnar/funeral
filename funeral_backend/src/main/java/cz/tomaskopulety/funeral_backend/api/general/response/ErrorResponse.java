package cz.tomaskopulety.funeral_backend.api.general.response;

import jakarta.annotation.Nonnull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {

  private HttpStatus status;

  @Nonnull
  private String message;

}
