package fi.javits.yourClass.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import fi.javits.yourClass.domain.Attendee;
import fi.javits.yourClass.domain.AttendeeRepository;
import fi.javits.yourClass.domain.ClassRecord;
import fi.javits.yourClass.domain.ClassRecordRepository;
import fi.javits.yourClass.domain.Customer;
import fi.javits.yourClass.domain.CustomerRepository;
import fi.javits.yourClass.domain.Teacher;
import fi.javits.yourClass.domain.TeacherRepository;


@Controller
public class CustomerController {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ClassRecordRepository classRecordRepository;
	
	@Autowired
	private AttendeeRepository attendeeRepository;
	
	@Autowired
	private TeacherRepository teacherRepository;
	
	
	// RESTful service to get all customers
    @RequestMapping(value="/customerlist", method = RequestMethod.GET)
    public @ResponseBody List<Customer> customerListRest() {	
        return (List<Customer>) customerRepository.findAll();
    }
    
    @RequestMapping(value = "/getclassrecords")
	public @ResponseBody List<ClassRecord> getClassRecords() {	
		return (List<ClassRecord>) classRecordRepository.findAll();
	}
    
    @RequestMapping(value = "/getteachers")
	public @ResponseBody List<Teacher> getTeachers() {	
		return (List<Teacher>) teacherRepository.findAll();
	}  
    
    @RequestMapping(value = "/getattendees")
	public @ResponseBody List<Attendee> getAttendees() {	
		return (List<Attendee>) attendeeRepository.findAll();
	}  
    
    
//
//    @RequestMapping(value="/customerlist/ > pvm {tänne parametrina", method = RequestMethod.GET)
//    public @ResponseBody List<Customer> customerListRest() {	
//        return (List<Customer>) customerRepository.findAll(pvm);
//    }    

    
    

}
