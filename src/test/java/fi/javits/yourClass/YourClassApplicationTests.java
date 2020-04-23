package fi.javits.yourClass;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;



@RunWith(SpringRunner.class)
@SpringBootTest
class ApplicationTests {

	@Autowired
	private fi.javits.yourClass.web.CustomerController CustomerController;

	@Test
	public void contextLoads() throws Exception {
		assertThat(CustomerController).isNotNull();
	}

	@Autowired
	private fi.javits.yourClass.web.FrontController FrontController;

	@Test
	public void contextLoadsF() throws Exception {
		assertThat(FrontController).isNotNull();
	}
}