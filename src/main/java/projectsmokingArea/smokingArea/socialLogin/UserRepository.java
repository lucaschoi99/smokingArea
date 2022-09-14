package projectsmokingArea.smokingArea.socialLogin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import projectsmokingArea.smokingArea.domain.Users;
import projectsmokingArea.smokingArea.repository.UserRepositoryInterface;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepository implements UserRepositoryInterface {

    private final EntityManager em;

    // 멤버 저장
    public Long save(Users users) {
        em.persist(users);
        return users.getId();
    }

    // 멤버 단건 조회
    public Optional<Users> findUserByEmail(String email) {
        return findAll().stream()
                .filter(m -> m.getEmail().equals(email))
                .findFirst();
//        return em.find(Users.class, email);
    }

    // 멤버 모두 조회
    public List<Users> findAll() {
        return em.createQuery("select m from Users m", Users.class)
                .getResultList();
    }

    // Uid와 provider로 조회
    public Optional<Users> findByUidAndProvider(String uid, String provider) {
        return findAll().stream()
                .filter(m -> m.getUid().equals(uid))
                .filter(m -> m.getProvider().equals(provider))
                .findFirst();
    }








}
