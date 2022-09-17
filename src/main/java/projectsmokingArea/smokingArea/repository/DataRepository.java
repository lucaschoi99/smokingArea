package projectsmokingArea.smokingArea.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import projectsmokingArea.smokingArea.domain.Data;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class DataRepository {

    private final EntityManager em;

    // 저장
    public Long save(Data data) {
        em.persist(data);
        return data.getId();
    }

    // 단건 조회
    public Data findDataById(Long id) {
        return em.find(Data.class, id);
    }

    // 모두 조회
    public List<Data> findAll() {
        return em.createQuery("select d from Data d", Data.class)
                .getResultList();
    }

    // 위경도 데이터로 조회
    public List<Data> findByLongLat(Double northEastLat, Double northEastLng, Double southWestLat, Double southWestLng) {
        return em.createQuery("select d from Data d where d.xCoords >= :swlat and d.xCoords <= :nelat and d.yCoords >= :swlng and d.yCoords <= :nelng", Data.class)
                .setParameter("swlat", southWestLat)
                .setParameter("nelat", northEastLat)
                .setParameter("swlng", southWestLng)
                .setParameter("nelng", northEastLng)
                .getResultList();
    }


}
