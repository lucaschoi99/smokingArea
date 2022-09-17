package projectsmokingArea.smokingArea.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import projectsmokingArea.smokingArea.dto.ISmokingAreaPreview;
import projectsmokingArea.smokingArea.service.FindService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
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

        System.out.println("******************************start*********************************");

        // Search - 지도 상의 흡연 부스
        List<ISmokingAreaPreview> result = findService.search(Double.parseDouble(northEastLat), Double.parseDouble(northEastLng), Double.parseDouble(southWestLat), Double.parseDouble(southWestLng));
//        model.addAttribute("result", result);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        String returnValue = objectMapper.writeValueAsString(result);
        response.getWriter().write(returnValue);

    }
//
//    // 현재위치 기준 가장 가까운 흡연 부스 안내
//    @GetMapping("/markers/nearest")
//    public String getNearest(String myLat, String myLng) {
//
//    }


    /*
    // 각 마커 클릭 -> 세부정보 표시
    @GetMapping("/makers/{id}")
    public ISmokingAreaDetails getMarkerDetail(@PathVariable String id) {

    }
     */




}
