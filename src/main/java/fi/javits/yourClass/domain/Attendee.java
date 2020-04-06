package fi.javits.yourClass.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Attendee {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long attendeeId;
	private String paymentMethod;
	private int paymentAmmount;
	private LocalDateTime bookingDateTime;
	
	@ManyToOne (fetch = FetchType.EAGER)

	@JoinColumn(name = "classrecord")
	private ClassRecord classRecord;
	
	@ManyToOne (fetch = FetchType.EAGER)
	
	@JoinColumn(name = "customer")
	private Customer customer;
	
	public Attendee() {}

	public Attendee(String paymentMethod, int paymentAmmount, LocalDateTime bookingDateTime) {
		super();
		this.paymentMethod = paymentMethod;
		this.paymentAmmount = paymentAmmount;
		this.bookingDateTime = bookingDateTime;
		
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public int getPaymentAmmount() {
		return paymentAmmount;
	}

	public void setPaymentAmmount(int paymentAmmount) {
		this.paymentAmmount = paymentAmmount;
	}

	public String getClassRecordInfo() {
		return classRecord.getClassRecordInfo();
	}
	
	public LocalDateTime getBookingDateTime() {
		return bookingDateTime;
	}
	
	public String getBookingDate() {
		return DateTimeFormatter.ofPattern("d.M.").format(bookingDateTime);
	}
	
	public void setBookingDateTime(LocalDateTime bookingDateTime) {
		this.bookingDateTime = bookingDateTime;
	}
	
	public String getClassRecordName() {
		return classRecord.getName();
	}
	
	public String getCustomerFullName() {
		return customer.getFirstName() + " " + customer.getLastName();
	}
	
	public Long getCustomerId() {
		return customer.getCustomerId();
	}

	public void setClassRecord(ClassRecord classRecord) {
		this.classRecord = classRecord;
	}

	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	
	
}
