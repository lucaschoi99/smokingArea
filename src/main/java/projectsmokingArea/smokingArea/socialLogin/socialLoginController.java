package projectsmokingArea.smokingArea.socialLogin;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import projectsmokingArea.smokingArea.domain.Users;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user/social/kakao")
public class socialLoginController {


    private final Environment env;
    private final RestTemplate restTemplate;
    private final Gson gson;
    private final KakaoService kakaoService;

    @Value("${spring.url.base}")
    private String baseUrl;

    @Value("${spring.social.kakao.client_id}")
    private String kakaoClientId;

    @Value("${spring.social.kakao.redirect}")
    private String kakaoRedirect;

    @Value("${spring.social.kakao.url.profile}")
    private String profile;

    /**
     * 카카오 로그인
     */
    @GetMapping("/start")
    public ModelAndView socialLogin(ModelAndView mav) {
        StringBuilder loginUrl = new StringBuilder()
                .append(env.getProperty("spring.social.kakao.url.login"))
                .append("?client_id=").append(kakaoClientId)
                .append("&response_type=code")
                .append("&redirect_uri=").append(baseUrl).append(kakaoRedirect);

        mav.addObject("loginUrl", loginUrl);
        mav.setViewName("redirect:" + loginUrl);

        return mav;
    }

    // Code -> Token & Get userInfo
    @GetMapping("/finish")
    public String getCI(@RequestParam String code, Model model, HttpServletRequest request) throws IOException {
        System.out.println("code = " + code);
        String access_token = kakaoService.getKakaoTokenInfo(code);
        Map<String, Object> userInfo = kakaoService.getUserInfo(access_token);
        System.out.println("userInfo = " + userInfo);
        model.addAttribute("code", code);
        model.addAttribute("access_token", access_token);
        model.addAttribute("userInfo", userInfo);

        // UserRepository 저장
        Users loginUser = kakaoService.saveUsers(userInfo);

        // Session에 저장
        //세션이 있으면 있는 세션 반환, 없으면 신규 세션 생성
        HttpSession session = request.getSession(); //세션에 로그인 회원 정보 보관
        session.setAttribute("loginUser", loginUser);

        // 홈으로 이동 (Logout 버튼 등이 있는)
        return "redirect:http://localhost:3000/";
    }

}
