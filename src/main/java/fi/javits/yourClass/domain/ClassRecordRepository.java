package fi.javits.yourClass.domain;



import org.springframework.data.repository.CrudRepository;


import org.springframework.data.rest.core.annotation.RestResource;

@RestResource
public interface ClassRecordRepository extends CrudRepository<ClassRecord, Long> {


}
