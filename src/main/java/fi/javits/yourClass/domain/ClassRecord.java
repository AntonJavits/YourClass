package fi.javits.yourClass.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "classRecord")
//@SecondaryTable(name = "attendee")
public class ClassRecord {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(updatable = false, nullable = false)
	private long classRecordId;
	private String name;
	@Column(columnDefinition = "DATETIME")
	private LocalDateTime startDateTime;
//	private Date startTime;
	private int duration;

	@ManyToOne (fetch = FetchType.EAGER) // LAZY didn't work
	@JsonIgnore
	@JoinColumn(name = "teacher")
	private Teacher teacher;
	
//	@Column(name = "attendee_count", table = "attendee")
//    private int attendeeCount;

	public ClassRecord() {}

	public ClassRecord(String name, LocalDateTime startDateTime, int duration, Teacher teacher) {
		super();
		this.name = name;
		this.startDateTime = startDateTime;
		this.duration = duration;
		this.teacher = teacher;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getStartDateTime() {
		return startDateTime;
	}

	public void setStartDateTime(LocalDateTime startDateTime) {
		this.startDateTime = startDateTime;
	}
	
//	public Date getStartTime() {
//		return startTime;
//	}
//
//	public void setStartTime(Date startTime) {
//		this.startTime = startTime;
//	}

	public int getDuration() {
		return duration;
	}
	public Long getClassRecordId() {
		return classRecordId;
	}

	public void setClassRecordId(Long classRecordId) {
		this.classRecordId = classRecordId;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public Teacher getTeacher() {
		return teacher;
	}

	public String getTeacherFullName() {
		return (teacher.getFirstName() + " " + teacher.getLastName());
	}
	
	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}
	
	
}
