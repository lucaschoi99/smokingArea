package projectsmokingArea.smokingArea.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import projectsmokingArea.smokingArea.domain.Users;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class HomeController {
//
//    @GetMapping("/login")
//    public void loginPage() {
//        // 카카오 로그인 버튼 누르면 login
//        return "redirect:/user/social/kakao";
//    }


    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "locahost:3000/";
    }

    @GetMapping("/")
    public String homeLogin(@SessionAttribute(name = "loginUser", required = false) Users loginUser, Model model) {

        // Session에 회원 데이터가 없으면 그대로
        if (loginUser == null) {
            System.out.println("No user data in Session!");
            return "localhost:3000/";
        }

        // Session 정보 유지한 채로 홈 이동
        model.addAttribute("loginUser", loginUser);
        System.out.println("Session Exists: " + loginUser.getEmail());
        return "locahost:3000/";
    }

    @PostMapping("/")
    public void loginPost(@RequestParam("loginUser") Users loginUser) {
        System.out.println("loginUser.getEmail() = " + loginUser.getEmail());
    }
}
