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

import fi.javits.yourClass.domain.Customer;
import fi.javits.yourClass.domain.CustomerRepository;


@Controller
public class CustomerController {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	
	// RESTful service to get all customers
    @RequestMapping(value="/customerlist", method = RequestMethod.GET)
    public @ResponseBody List<Customer> customerListRest() {	
        return (List<Customer>) customerRepository.findAll();
    }    

	
    
    

}
