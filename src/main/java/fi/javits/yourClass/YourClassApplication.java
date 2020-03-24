
package fi.javits.yourClass;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fi.javits.yourClass.domain.Attendee;
import fi.javits.yourClass.domain.AttendeeRepository;
import fi.javits.yourClass.domain.ClassRecord;
import fi.javits.yourClass.domain.ClassRecordRepository;
import fi.javits.yourClass.domain.Customer;
import fi.javits.yourClass.domain.CustomerRepository;
import fi.javits.yourClass.domain.Teacher;
import fi.javits.yourClass.domain.TeacherRepository;


@SpringBootApplication
public class YourClassApplication {
	
	// Inject repositories
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private TeacherRepository teacherRepository;
	
	@Autowired
	private ClassRecordRepository classRecordRepository;
	
	@Autowired
	private AttendeeRepository attendeeRepository;

	public static void main(String[] args) {
		SpringApplication.run(YourClassApplication.class, args);
	}
	
	@Bean
	CommandLineRunner runner(){
		return args -> {
			// Save demo data to database
			
			// Add customer objects and save these to db
			Customer customer1 = new Customer("Antti", "Jääskeläinen", "04012345678", "antti.jaaskelainen@gmial.com");
			customerRepository.save(customer1);
			Customer customer2 = new Customer("Anna", "Jauhianen", "04012345671", "anna.jaauhiainen@gmial.com");
			customerRepository.save(customer2);
			Customer customer3 = new Customer("Niilo", "Pasanen", "05012345678", "niilo.pasanen@gmial.com");
			customerRepository.save(customer3);
			Customer customer4 = new Customer("Veera", "Andersson", "04012345673", "veera.andersson@gmial.com");
			customerRepository.save(customer4);
			Customer customer5 = new Customer("Kalle", "Päätalo", "05012345675", "kalle.päätalo@gmial.com");
			customerRepository.save(customer5);
			Customer customer6 = new Customer("Niina", "Virtanen", "04012345672", "niina.virtanen@gmial.com");
			customerRepository.save(customer6);
			Customer customer7 = new Customer("Noora", "Koistinen", "04012234532", "noora.koistinen@gmial.com");
			customerRepository.save(customer7);
			Customer customer8 = new Customer("Janet", "Jones", "04012234533", "janet.jones@gmial.com");
			customerRepository.save(customer8);
			Customer customer9 = new Customer("Mark", "Robinson", "05012234532", "mark.robinson@gmial.com");
			customerRepository.save(customer9);
			Customer customer10 = new Customer("Tero", "Tukianien", "0501223495", "tero.tukianinen@gmial.com");
			customerRepository.save(customer10);
			Customer customer11 = new Customer("Minna", "Therman", "05012234539", "minna.therman@gmial.com");
			customerRepository.save(customer11);
			Customer customer12 = new Customer("Riitta", "Latva", "04012234532", "riitta.latva@gmial.com");
			customerRepository.save(customer12);
			
			// Add teacher objects and save these to db
			
			Teacher teacher1 = new Teacher("Ville", "Martikainen", "0401233345", "ville.martikainen@gmial.com");
			teacherRepository.save(teacher1);
			
			Teacher teacher2 = new Teacher("Viljami", "Mehiläinen", "0401677571", "viljami.mehilainen@gmial.com");
			teacherRepository.save(teacher2);
			
			// Add class records objects and save these to db
			ClassRecord classRecord1 = new ClassRecord("Salsa Technique",
					LocalDateTime.of(2020, 03, 25, 17, 00), 60, teacher1);
			classRecordRepository.save(classRecord1);
			
			ClassRecord classRecord2 = new ClassRecord("Couple Salsa 1",
					LocalDateTime.of(2020, 03, 25, 18, 00), 60, teacher1);
			classRecordRepository.save(classRecord2);
			
			ClassRecord classRecord3 = new ClassRecord("Rumba 1",
					LocalDateTime.of(2020, 03, 26, 17, 00), 60, teacher2);
			classRecordRepository.save(classRecord3);
			
			ClassRecord classRecord4 = new ClassRecord("Couple Bachata",
					LocalDateTime.of(2020, 03, 26, 18, 00), 60, teacher2);
			classRecordRepository.save(classRecord4);
			
			
			// Add attendees with objects Customer and ClassRecords
			
			
			// Customers 1-6 attending "Salsa Technique" at 17
			
			Attendee attendee1 = new Attendee(customer1, classRecord1, "Credit Card", 14);
			attendeeRepository.save(attendee1);
		
			Attendee attendee2 = new Attendee(customer2, classRecord1, "Credit Card", 14);
			attendeeRepository.save(attendee2);
			
			Attendee attendee3 = new Attendee(customer3, classRecord1, "Credit Card", 14);
			attendeeRepository.save(attendee3);
			
			Attendee attendee4 = new Attendee(customer4, classRecord1, "Credit Card", 14);
			attendeeRepository.save(attendee4);
			
			Attendee attendee5 = new Attendee(customer5, classRecord1, "Credit Card", 14);
			attendeeRepository.save(attendee5);
			
			Attendee attendee6 = new Attendee(customer6, classRecord1, "Credit Card", 14);
			attendeeRepository.save(attendee6);
			
			// Customers 1-6 attending "Couple Salsa" at 18
			
			Attendee attendee7 = new Attendee(customer1, classRecord2, "Credit Card", 14);
			attendeeRepository.save(attendee7);
		
			Attendee attendee8 = new Attendee(customer2, classRecord2, "Credit Card", 14);
			attendeeRepository.save(attendee8);
			
			Attendee attendee9 = new Attendee(customer3, classRecord2, "Credit Card", 14);
			attendeeRepository.save(attendee9);
			
			Attendee attendee10 = new Attendee(customer4, classRecord2, "Credit Card", 14);
			attendeeRepository.save(attendee10);
			
			Attendee attendee11 = new Attendee(customer5, classRecord2, "Credit Card", 14);
			attendeeRepository.save(attendee11);
			
			Attendee attendee12 = new Attendee(customer6, classRecord2, "Credit Card", 14);
			attendeeRepository.save(attendee12);
			
			// Customers 7-12 attending "Rumba 1" at 17
			
			Attendee attendee13 = new Attendee(customer7, classRecord3, "Credit Card", 14);
			attendeeRepository.save(attendee13);
		
			Attendee attendee14 = new Attendee(customer8, classRecord3, "Credit Card", 14);
			attendeeRepository.save(attendee14);
			
			Attendee attendee15 = new Attendee(customer9, classRecord3, "Credit Card", 14);
			attendeeRepository.save(attendee15);
			
			Attendee attendee16 = new Attendee(customer10, classRecord3, "Credit Card", 14);
			attendeeRepository.save(attendee16);
			
			Attendee attendee17 = new Attendee(customer11, classRecord3, "Credit Card", 14);
			attendeeRepository.save(attendee17);
			
			Attendee attendee18 = new Attendee(customer12, classRecord3, "Credit Card", 14);
			attendeeRepository.save(attendee18);
			
			// Some customers attending "Couple Bachata" at 18
			
			Attendee attendee19 = new Attendee(customer1, classRecord4, "Credit Card", 14);
			attendeeRepository.save(attendee19);
		
			Attendee attendee20 = new Attendee(customer2, classRecord4, "Credit Card", 14);
			attendeeRepository.save(attendee20);
			
			Attendee attendee21 = new Attendee(customer5, classRecord4, "Credit Card", 14);
			attendeeRepository.save(attendee21);
			
			Attendee attendee22 = new Attendee(customer8, classRecord4, "Credit Card", 14);
			attendeeRepository.save(attendee22);
			
			Attendee attendee23 = new Attendee(customer10, classRecord4, "Credit Card", 14);
			attendeeRepository.save(attendee23);
			
			Attendee attendee24 = new Attendee(customer12, classRecord4, "Credit Card", 14);
			attendeeRepository.save(attendee24);
			

			
	
			
			
			
			
	
		};
	}

}
