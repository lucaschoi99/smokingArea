package projectsmokingArea.smokingArea.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Data")
@Getter @Setter
public class Data {

    @Id // pk
    @GeneratedValue
    private long id;

    @Column(name = "xCoords")
    private Double xCoords;

    @Column(name = "yCoords")
    private Double yCoords;

    @Column(name = "place")
    private String place;

}
