package projectsmokingArea.smokingArea.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Users")
@Getter @Setter
public class Users {

    @Id // pk
    @GeneratedValue
    private long id;

    @Column(name = "uid", nullable = false, unique = true, length = 50)
    private String uid;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "provider", length = 100)
    private String provider;

    @Column(name = "snsLogin")
    private Boolean snsLogin;
}
