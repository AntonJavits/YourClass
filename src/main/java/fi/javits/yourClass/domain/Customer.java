package fi.javits.yourClass.domain;

import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;





@Entity
public class Customer {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	// Or private UUID customerId
	private Long Id;
	private String firstName, lastName, tel, email;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy = "customer")
	@JsonBackReference
	private List<Attendee> attendees;
	
	public Customer() {}
	
	public Customer(String firstName, String lastName, String tel, String email) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.tel = tel;
		this.email = email;
	}
	
	public Long getCustomerId() {
		return Id;
	}
	
	public void setCustomerId(Long Id) {
		this.Id = Id;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<Attendee> getAttendees() {
		return attendees;
	}
	public void setAttendees(List<Attendee> attendees) {
		this.attendees = attendees;
	}



}
