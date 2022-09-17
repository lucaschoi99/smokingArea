package projectsmokingArea.smokingArea.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
public class ISmokingAreaPreview {

    public String title;
    public String xCoords;
    public String yCoords;
    public Long id;

}
