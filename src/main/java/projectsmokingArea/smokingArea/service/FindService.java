package projectsmokingArea.smokingArea.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projectsmokingArea.smokingArea.domain.Data;
import projectsmokingArea.smokingArea.dto.ISmokingAreaPreview;
import projectsmokingArea.smokingArea.repository.DataRepository;
import projectsmokingArea.smokingArea.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FindService {

    private final UserRepository userRepository;
    private final DataRepository dataRepository;

    public List<ISmokingAreaPreview> search(Double northEastLat, Double northEastLng, Double southWestLat, Double southWestLng) {
        List<Data> dataList = dataRepository.findByLongLat(northEastLat, northEastLng, southWestLat, southWestLng);

        List<ISmokingAreaPreview> result = new ArrayList<>();
        for (Data data : dataList) {
            ISmokingAreaPreview newData = new ISmokingAreaPreview();
            setInfos(data, newData);
            result.add(newData);
        }
        return result;
    }

    private void setInfos(Data data, ISmokingAreaPreview newData) {
        newData.setId(data.getId());
        newData.setXCoords(data.getXCoords().toString());
        newData.setYCoords(data.getYCoords().toString());
        newData.setTitle(data.getPlace());
    }





}
