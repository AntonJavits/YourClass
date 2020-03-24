package fi.javits.yourClass.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AttendeeRepository extends CrudRepository<Attendee, Long> {
	// http://localhost:8080/api/attendees/search/findByClassRecordId?classRecord=15
	List<Attendee> findByClassRecordId(@Param("classRecord") Long id);
}
