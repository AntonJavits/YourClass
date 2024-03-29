package fi.javits.yourClass.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;


@RestResource
public interface CustomerRepository extends CrudRepository<Customer, Long> {

	List<Customer> findAllById(int i);

}

