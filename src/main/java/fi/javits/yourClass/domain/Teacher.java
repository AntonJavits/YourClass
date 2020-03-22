package fi.javits.yourClass.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Teacher {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long teacherId;
	private String firstName, lastName, tel, email;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="teacher")
	@JsonBackReference
	private List<ClassRecord> classRecords;	
	
	public Teacher() {}

	public Teacher(String firstName, String lastName, String tel, String email) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.tel = tel;
		this.email = email;
	}

	public Long getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
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
	
	public List<ClassRecord> getClassRecords() {
		return classRecords;
	}
	public void setClassRecord(List<ClassRecord> classRecords) {
		this.classRecords = classRecords;
	}


	
	
}
