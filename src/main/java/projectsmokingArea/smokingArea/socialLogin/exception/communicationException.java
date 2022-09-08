//package projectsmokingArea.smokingArea.socialLogin.exception;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//
//import javax.servlet.http.HttpServletRequest;
//
//@ExceptionHandler(CCommunicationException.class)
//@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//public class CommonResult communicationException(HttpServletRequest request, CCommunicationException e) {
//
//    @Value("${spring.communicationError.code}")
//    private String code;
//
//    @Value("${spring.communicationError.msg}")
//    private String msg;
//
//    return responseService.getFailResult(Integer.valueOf(getMessage(code)),getMessage(msg));
//
//}
