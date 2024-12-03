package cz.tomaskopulety.funeral_backend.service.general;

import java.util.Random;
import jakarta.annotation.Nonnull;

public class IdGenerator {

    @Nonnull
    public static Long generateNumericID() {
        long timestamp = System.currentTimeMillis() % 1000000;
        int randomSuffix = new Random().nextInt(9999);
        String id = String.format("%06d", timestamp) + String.format("%04d", randomSuffix);
        return Long.parseLong(id);
    }

}
