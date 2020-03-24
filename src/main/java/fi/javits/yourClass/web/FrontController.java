package fi.javits.yourClass.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FrontController {
	@GetMapping("/api/hello")
	public String hello() {
		return "Hello, it works!";
	}
}
