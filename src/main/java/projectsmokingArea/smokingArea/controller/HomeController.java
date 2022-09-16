package projectsmokingArea.smokingArea.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import projectsmokingArea.smokingArea.domain.Users;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class HomeController {
//
//    @GetMapping("http://localhost:3000/user/social/kakao/start")
//    public void loginPage() {
//        // 카카오 로그인 버튼 누르면 redirect
//        return "redirect:/user/social/kakao";
//    }


    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/";
    }

    @GetMapping("/")
    public String  homeLogin(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession(false);
        if (session == null) {
            System.out.println("No session found!");
            return "redirect:localhost:3000/login";
        }

        Users loginUser = (Users)session.getAttribute("loginUser");

        // Session에 회원 데이터가 없으면 home
        if (loginUser == null) {
            System.out.println("No user data in Session!");
            return "redirect:localhost:3000/login";
        }

        // Session 유지되면 로그인 이동
        model.addAttribute("user", loginUser);
        System.out.println("Session Exists: " + loginUser.getEmail());
        return "locahost:3000/";
    }


}
