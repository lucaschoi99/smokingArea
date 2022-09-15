package projectsmokingArea.smokingArea.db;

import lombok.Getter;
import lombok.Setter;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Getter @Setter
@Component
public class DataReader {

    public String getCellValue(Cell cell) {
        String value = "";

        if(cell == null){
            return value;
        }
        switch (cell.getCellType()) {
            case STRING:
                value = cell.getStringCellValue();
                break;
            case NUMERIC:
                value = (Double) cell.getNumericCellValue() + "";
                break;
            default:
                break;
        }
        return value;
    }


    public List<Map<String, Object>> readExcel(String path) throws IOException, InvalidFormatException {
        OPCPackage opcPackage = OPCPackage.open(new File(path));
        XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

        // 시트의 수
        Sheet sheet = workbook.getSheetAt(0);
        System.out.println("Sheet Name : " + sheet.getSheetName() + "\n");

        List<Map<String, Object>> excelList = new ArrayList<Map<String,Object>>();


        // 2. row 얻기 : iterator();
        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();
        int rowIndex = 1;
        while(rowIterator.hasNext()) {
            Row row = rowIterator.next();

            // 2. cell 얻기 : cellIterator();
            Iterator<Cell> cellIterator = row.cellIterator();
            Map<String, Object> map = new HashMap<String, Object>();
            int columnIndex = 0;

            while(cellIterator.hasNext()) {
                Cell cell = cellIterator.next();

                switch(cell.getCellType()) {
                    case BOOLEAN:
                    case NUMERIC:
                    case STRING:
                    case FORMULA:
//                        System.out.print(cell.getCellFormula() + "\t");
                        //                        System.out.print(cell.getStringCellValue() + "\t");
                        //                        System.out.print(cell.getNumericCellValue() + "\t");
                        //                        System.out.print(cell.getBooleanCellValue() + "\t");
                        map.put(String.valueOf(columnIndex), getCellValue(cell));
                        break;
                }
                columnIndex++;
            }
            excelList.add(map);
        }

        return excelList;
    }

}
