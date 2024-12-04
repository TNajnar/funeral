package cz.tomaskopulety.funeral_backend.service.producer;

import java.util.List;
import jakarta.annotation.Nonnull;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import cz.tomaskopulety.funeral_backend.db.general.DbMapper;
import cz.tomaskopulety.funeral_backend.db.product.ProducerRepository;
import cz.tomaskopulety.funeral_backend.db.product.model.ProducerEntity;
import cz.tomaskopulety.funeral_backend.service.general.IdGenerator;
import cz.tomaskopulety.funeral_backend.service.producer.domain.Producer;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
public class ProducerService {

    @Nonnull
    private final ProducerRepository producerRepository;

    @Nonnull
    private final DbMapper dbMapper;

    /**
     * Adds new {@link ProducerEntity} to database.
     *
     * @param producerName name of producer
     * @throws EntityExistsException when producer exists already
     */
    @Nonnull
    public Producer createProducer(@Nonnull String producerName) {
        if (this.producerRepository.existsByName(producerName)) {
            throw new EntityExistsException(String.format("Producer: %s exists already.", producerName));
        } else {
            final ProducerEntity producerEntity = new ProducerEntity();
            producerEntity.setName(producerName);
            producerEntity.setProducerId(IdGenerator.generateNumericID());

            this.producerRepository.save(producerEntity);
            return this.dbMapper.map(producerEntity);
        }
    }

    /**
     * Gets all saved {@link Producer}.
     *
     * @return List of {@link Producer}
     */
    @Nonnull
    public List<Producer> getProducers() {
        return this.producerRepository.findAll()
                .stream()
                .map(this.dbMapper::map)
                .toList();
    }

    /**
     * Get producer by given identifier.
     *
     * @param producerId identifier of producer
     * @return {@link ProducerEntity}
     */
    @Nonnull
    public ProducerEntity getProducerEntity(long producerId) {
        return this.producerRepository.findByProducerId(producerId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Producer id: %s not found.", producerId)));
    }

}
