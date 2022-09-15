package projectsmokingArea.smokingArea.db;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter @Setter
@Component
public class SmokingInfo {

    public double xcoord;
    public double ycoord;
    public String place;

}
