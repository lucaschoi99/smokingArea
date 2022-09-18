package projectsmokingArea.smokingArea.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import projectsmokingArea.smokingArea.dto.ISmokingAreaPreview;
import projectsmokingArea.smokingArea.service.FindService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FindController {

    private final FindService findService;
    private ObjectMapper objectMapper = new ObjectMapper();

    // 이 지역 다시 검색
    @GetMapping("/markers/search")
    public void search(@RequestParam("northEastLat") String northEastLat,
                       @RequestParam("northEastLng") String northEastLng,
                       @RequestParam("southWestLat") String southWestLat,
                       @RequestParam("southWestLng") String southWestLng,
                       HttpServletResponse response,
                       Model model) throws IOException {

        // Search - 지도 상의 흡연 부스
        List<ISmokingAreaPreview> result = findService.search(Double.parseDouble(northEastLat), Double.parseDouble(northEastLng), Double.parseDouble(southWestLat), Double.parseDouble(southWestLng));
//        model.addAttribute("result", result);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        String returnValue = objectMapper.writeValueAsString(result);
        response.getWriter().write(returnValue);

    }

    // 현재위치 기준 가장 가까운 흡연 부스 안내
    @GetMapping("/markers/nearest")
    public void getNearest(@RequestParam("myLat") String myLat,
                           @RequestParam("myLng") String myLng,
                           HttpServletResponse response) throws IOException {

        ISmokingAreaPreview result = findService.calDist(myLat, myLng);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
//
//        response.setHeader("Access-Control-Allow-origin", "http://localhost:3000");
//        response.setHeader("Access-Control-Allow-Credentials", "true");

        String returnValue = objectMapper.writeValueAsString(result);
        response.getWriter().write(returnValue);


    }


    // 각 마커 클릭 -> 세부정보 표시
    @GetMapping("/markers/{id}")
    public void getMarkerDetail(@PathVariable("id") String id,
                                               HttpServletResponse response) throws IOException {

        ISmokingAreaPreview detail = findService.findDetail(id);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        String returnValue = objectMapper.writeValueAsString(detail);
        response.getWriter().write(returnValue);

    }





}
