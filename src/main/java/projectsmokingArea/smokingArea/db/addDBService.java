package projectsmokingArea.smokingArea.db;

import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projectsmokingArea.smokingArea.domain.Data;
import projectsmokingArea.smokingArea.repository.DataRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class addDBService {

    private final DataReader dataReader;
    private final DataRepository dataRepository;

    public void insertDB(String path) throws IOException, InvalidFormatException {
        List<Map<String, Object>> maps = dataReader.readExcel(path);

        List<SmokingInfo> listInfos = new ArrayList<SmokingInfo>();

        for (Map<String, Object> map : maps) {
            SmokingInfo smokingInfo = new SmokingInfo();

            smokingInfo.setXcoord(Double.parseDouble(map.get("0").toString()));
            smokingInfo.setYcoord(Double.parseDouble(map.get("1").toString()));
            smokingInfo.setPlace(map.get("2").toString());
            System.out.print("X = " + smokingInfo.getXcoord() + " ");
            System.out.print("Y = " + smokingInfo.getYcoord() + " ");
            System.out.println("Place = " + smokingInfo.getPlace());

            listInfos.add(smokingInfo);
        }

        // Data -> DB
        saveData(listInfos);
    }

    // DataRepository에 저장
    public void saveData(List<SmokingInfo> dataInfo) {
        for (SmokingInfo smokingInfo : dataInfo) {
            Data newData = new Data();

            newData.setXCoord(smokingInfo.getXcoord());
            newData.setYCoord(smokingInfo.getYcoord());
            newData.setPlace(smokingInfo.getPlace());

            dataRepository.save(newData);
        }
    }

}
