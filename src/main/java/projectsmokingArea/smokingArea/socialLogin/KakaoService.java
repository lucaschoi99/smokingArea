package projectsmokingArea.smokingArea.socialLogin;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import projectsmokingArea.smokingArea.domain.Users;
import projectsmokingArea.smokingArea.socialLogin.exception.CCommunicationException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoService {

    private final RestTemplate restTemplate;
    private final Environment env;
    private final Gson gson;
    private final UserRepository userRepository;

    @Value("${spring.url.base}")
    private String baseUrl;

    @Value("${spring.social.kakao.client_id}")
    private String kakaoClientId;

    @Value("${spring.social.kakao.redirect}")
    private String kakaoRedirect;

    /*
    // Kakao Profile 등록
    // UserRepository에 존재 -> session
    public Users checkUser(String email) {

        if (userRepository.findUserByEmail(email) != null) {
            // Spring session 이용해서 처리


        }
        // Kakao Profile 등록



    }
    */

    // UserRepository에 User 저장
    public void saveUsers(Map<String, Object> userInfo) {
        String email = userInfo.get("email").toString();
        Optional<Users> userByEmail = userRepository.findUserByEmail(email);

        if (!userByEmail.isPresent()) { // 최초 등록
            Users newUser = new Users();
            newUser.setUid(userInfo.get("id").toString());
            newUser.setEmail(email);
            newUser.setName("Default: name");
            newUser.setProvider("kakao");
            newUser.setSnsLogin(true);
            userRepository.save(newUser);

        }else{ // sns login 정보 업데이트
            userByEmail.get().setSnsLogin(true);
            userByEmail.get().setProvider("kakao");
        }
    }



    public Map<String, Object> getUserInfo(String access_token) throws IOException {
        String host = "https://kapi.kakao.com/v2/user/me";
        Map<String, Object> result = new HashMap<>();
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);


            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while ((line = br.readLine()) != null) {
                res += line;
            }

            System.out.println("res = " + res);


            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            JSONObject kakao_account = (JSONObject) obj.get("kakao_account");
            JSONObject properties = (JSONObject) obj.get("properties");


            String id = obj.get("id").toString();
//            String nickname = properties.get("nickname").toString();
//            String age_range = kakao_account.get("age_range").toString();
            String email = kakao_account.get("email").toString();
//            String name = kakao_account.get("nickname").toString();

            result.put("id", id);
//            result.put("nickname", nickname);
//            result.put("age_range", age_range);
            result.put("email", email);
//            result.put("nickname", name);

            br.close();


        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        return result;
    }



    public KakaoProfile getKakaoProfile(String accessToken) {
        // Set header : Content-type: application/x-www-form-urlencoded
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        // Set http entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);
        try {
            // Request profile
            ResponseEntity<String> response = restTemplate.postForEntity(env.getProperty("spring.social.kakao.url.profile"), request, String.class);
            if (response.getStatusCode() == HttpStatus.OK)
                return gson.fromJson(response.getBody(), KakaoProfile.class);
        } catch (Exception e) {
            throw new CCommunicationException();
        }
        throw new CCommunicationException();
    }

    public String getKakaoTokenInfo(String code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=4ec3421d3173c920f23dbc015e54f91d"); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:8080/user/social/kakao/finish"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            System.out.println("sb = " + sb);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

//    public RetKakaoAuth getKakaoTokenInfo(String code) {
//        System.out.println("code = " + code);
//
//        // Set header : Content-type: application/x-www-form-urlencoded
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        // Set parameter
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", kakaoClientId);
//        params.add("redirect_uri", baseUrl + kakaoRedirect);
//        params.add("code", code);
//
//        // Set http entity
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
//        ResponseEntity<String> response = restTemplate.postForEntity(env.getProperty("spring.social.kakao.url.token"), request, String.class);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            return gson.fromJson(response.getBody(), RetKakaoAuth.class);
//        }
//        return null;
//    }
}
