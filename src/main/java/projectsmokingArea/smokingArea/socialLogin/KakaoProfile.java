package projectsmokingArea.smokingArea.socialLogin;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class KakaoProfile {

    private Long id;
    private Properties properties;

    @Getter
    @Setter
    @ToString
    private static class Properties {
        private String name;
        private String account_email;
        private String phone_number;
    }

}
