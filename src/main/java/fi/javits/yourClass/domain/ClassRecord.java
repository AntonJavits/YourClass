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
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ClassRecord {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String name;
//	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy", timezone = "UTC")
//	@Temporal(TemporalType.DATE)
	@Column(columnDefinition = "DATETIME")
	private LocalDateTime startDateTime;
//	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="HH:mm:ss", timezone = "UTC")
//	@Temporal(TemporalType.TIME)
//	private Date startTime;
	private int duration;

	@ManyToOne (fetch = FetchType.EAGER) // LAZY didn't work
	@JsonIgnore
	@JoinColumn(name = "teacher")
	private Teacher teacher;

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

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public Teacher getTeacher() {
		return teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}
	
	
}
