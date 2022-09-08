package projectsmokingArea.smokingArea.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@RequiredArgsConstructor
public class RestApiController {

    @GetMapping("apitest")
    public String callapi() {
        StringBuffer result = new StringBuffer();
        try {
            String urlStr = "http://api.data.go.kr/openapi/tn_pubr_public_prhsmk_zn_api?" +
                    "ServiceKey=zCzx%2B1KT1%2BFFllK5H9TFDTTeA5di3PQNeqc0kseZ3VrNmj9zUnHi5LF3c8pxE8P06NBn%2FxdLfmGNX%2FgBsB1p%2BQ%3D%3D" +
                    "&type=json" +
                    "&pageNo=1" +
                    "&numOfRows=10" +
                    "&flag=Y";
            URL url = new URL(urlStr);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

            String returnLine;
            result.append("<xmp>");
            while ((returnLine = br.readLine()) != null) {
                result.append(returnLine + "\n");
            }
            urlConnection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result + "</xmp>";
    }







}
