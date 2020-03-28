package fi.javits.yourClass.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "teacher")
public class Teacher {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long Id;
	private String firstName, lastName, tel, email;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="teacher")
//	@PrimaryKeyJoinColumn(name = "class_record_id")
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
		return Id;
	}

	public void setTeacherId(Long Id) {
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
	
	public List<ClassRecord> getClassRecords() {
		return classRecords;
	}
	public void setClassRecord(List<ClassRecord> classRecords) {
		this.classRecords = classRecords;
	}


	
	
}
