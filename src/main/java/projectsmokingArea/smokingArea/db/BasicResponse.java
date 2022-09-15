package projectsmokingArea.smokingArea.db;

import org.springframework.http.HttpStatus;

import java.util.List;

public class BasicResponse {

    private Integer code;
    private HttpStatus httpStatus;
    private String message;
    private Integer count;
    private List<Object> result;

}
