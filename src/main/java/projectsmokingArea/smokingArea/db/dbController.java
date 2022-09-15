package projectsmokingArea.smokingArea.db;

import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class dbController {
//
    private final addDBService service;


    @GetMapping("/addExcel")
    public void getExcel() throws IOException, InvalidFormatException {
        service.insertDB("/Users/choi/Desktop/smokingArea-project/smokingArea/위경도데이터.xlsx");
    }

//
//    @PostMapping(value = "/addExcel")
//    public ResponseEntity<? extends BasicResponse> addExcel(HttpServletRequest request, HttpServletResponse response, MultipartFile file) {
//        return ResponseEntity.ok().body(service.addExcel(file));
//    };




}
