package projectsmokingArea.smokingArea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class SmokingAreaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmokingAreaApplication.class, args);
	}

	@Bean
	public RestTemplate getRestTemplate() { return new RestTemplate(); }


}
