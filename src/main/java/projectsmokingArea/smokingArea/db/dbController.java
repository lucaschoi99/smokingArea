package projectsmokingArea.smokingArea.db;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequiredArgsConstructor
public class dbController {

    private final addDBService service;

    @GetMapping("/addExcel")
    public String getExcel() {
        
    }


    @PostMapping(value = "/addExcel")
    public ResponseEntity<? extends BasicResponse> addExcel(HttpServletRequest request, HttpServletResponse response, MultipartFile file) {
        return ResponseEntity.ok().body(service.addExcel(file));
    };
}
