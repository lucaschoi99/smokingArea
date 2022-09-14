package projectsmokingArea.smokingArea.socialLogin;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.apache.naming.factory.SendMailFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import projectsmokingArea.smokingArea.socialLogin.KakaoService;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

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
    @GetMapping
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
    public String getCI(@RequestParam String code, Model model) throws IOException {
        System.out.println("code = " + code);
        String access_token = kakaoService.getKakaoTokenInfo(code);
        Map<String, Object> userInfo = kakaoService.getUserInfo(access_token);
        System.out.println("userInfo = " + userInfo);
        model.addAttribute("code", code);
        model.addAttribute("access_token", access_token);
        model.addAttribute("userInfo", userInfo);

        // UserRepository 저장
        kakaoService.saveUsers(userInfo);

        // 로그인 된 페이지로 이동 (Logout 버튼 등)
        return "redirect:/";
    }



    //
//    /**
//     * 카카오 인증 완료 후 리다이렉트 화면
//     */
//    @GetMapping(value = "/finish")
//    public ModelAndView redirectKakao(ModelAndView mav, @RequestParam String code) {
//        mav.addObject("authInfo", kakaoService.getKakaoTokenInfo(code));
//        String token = mav.getModel().get("authInfo").toString();
//        System.out.println("token = " + token);
//
//        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(token);
//        System.out.println("kakaoProfile = " + kakaoProfile);
//        mav.setViewName("user/social/redirectKakao");
//        return mav;
//    }
//
}
