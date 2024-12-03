package cz.tomaskopulety.funeral_backend.api.general;

import jakarta.annotation.Nonnull;
import jakarta.persistence.EntityExistsException;

import cz.tomaskopulety.funeral_backend.api.general.response.ErrorResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

    @Nonnull
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleException(@Nonnull final IllegalArgumentException ex) {
       return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }

    @Nonnull
    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<ErrorResponse> handleException(@Nonnull final EntityExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(HttpStatus.CONFLICT, ex.getMessage()));
    }

    @Nonnull
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleException(@Nonnull final IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage()));
    }

    @Nonnull
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handle(@Nonnull final MethodArgumentNotValidException ex) {
    final FieldError fieldError = ex.getBindingResult().getFieldError();
    final String message = fieldError != null
      ? "Field " + fieldError.getField() + " " + fieldError.getDefaultMessage()
      : ex.getMessage();

    final ErrorResponse response = new ErrorResponse(HttpStatus.BAD_REQUEST, message);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
      .contentType(MediaType.APPLICATION_JSON)
      .body(response);
  }

}
