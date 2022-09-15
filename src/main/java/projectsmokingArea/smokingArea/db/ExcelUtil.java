package projectsmokingArea.smokingArea.db;

import org.apache.commons.compress.archivers.dump.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//@Component
//public class ExcelUtil {
//
//    private static final String EXT_XLS = "XLS";
//    private static final String EXT_XLSX = "XLSX";
//
//    public static void main(String[] args) {
//
//        File file = new File("D:\\sample.xlsx");
//
//        if( file.exists() ) {
//            System.out.println( "파일이 있습니다." );
//        }
//
//        try {
//            readExcel("D:\\sample.xlsx");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    public static List<Map<String, String>> readExcel( String filePath ) throws IOException {
//
//        File file = new File(filePath);
//
//        String ext = FilenameUtils.getExtension( file.getName() );
//
//        List<Map<String, String>> resultMap = null;
//
//        if( EXT_XLS.equalsIgnoreCase( ext ) ) {
//            resultMap = readExcelForXls(filePath);
//        }
//        else if( EXT_XLSX.equalsIgnoreCase( ext ) ) {
//            resultMap = readExcelForXlsx(filePath);
//        }
//
//        return resultMap;
//
//    }
//
//    @SuppressWarnings("resource")
//    private static List<Map<String, String>> readExcelForXls( String filePath ) throws IOException {
//
//        FileInputStream fileInputStream = new FileInputStream(filePath);
//
//        HSSFWorkbook workbook = new HSSFWorkbook( fileInputStream );
//
//        HSSFSheet sheet = workbook.getSheetAt(0);
//
//        int rows = sheet.getPhysicalNumberOfRows();
//
//        List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
//
//        for( int rowIndex = 1; rowIndex < rows; rowIndex++ ) {
//
//            HSSFRow row = sheet.getRow(rowIndex);
//
//            if( row == null ) {
//                continue;
//            }
//
//            int cells = row.getPhysicalNumberOfCells();
//
//            Map<String, String> resultMap = new HashMap<String, String>();
//
//            for( int columnindex = 0; columnindex <= cells; columnindex++ ) {
//
//                HSSFCell cell = row.getCell(columnindex);
//                String value = "";
//
//                if( cell == null ) {
//                    continue;
//                }
//                else {
//
//                    switch ( cell.getCellType() ) {
//
//                        case CellType.FORMULA:
//                            value = cell.getCellFormula();
//                            break;
//
//                        case CellType.NUMERIC:
//                            value = String.valueOf(cell.getNumericCellValue());
//                            break;
//
//                        case CellType.STRING:
//                            value = cell.getStringCellValue();
//                            break;
//
//                        case CellType.BLANK:
//                            value = String.valueOf(cell.getBooleanCellValue());
//
//                        case CellType.ERROR:
//                            value = String.valueOf(cell.getErrorCellValue());
//
//                    }
//
//                }
//
//                resultMap.put( String.valueOf( columnindex ) , value );
//
//                System.out.println("value : " + value);
//
//            }
//
//            resultList.add(resultMap);
//
//        }
//
//
//        return resultList;
//
//    }
//
//    @SuppressWarnings("resource")
//    private static List<Map<String, String>> readExcelForXlsx( String filePath ) throws IOException {
//
//        FileInputStream fileInputStream = new FileInputStream(filePath);
//
//        XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream);
//
//        XSSFSheet sheet = workbook.getSheetAt(0);
//
//        int rows = sheet.getPhysicalNumberOfRows();
//
//        List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
//
//        for( int rowindex = 1; rowindex < rows; rowindex++ ) {
//
//            XSSFRow row = sheet.getRow(rowindex);
//
//            if( row == null ) {
//                continue;
//            }
//
//            int cells = row.getPhysicalNumberOfCells();
//
//            Map<String, String> resultMap = new HashMap<String, String>();
//
//            for( int columnindex = 0; columnindex <= cells; columnindex++ ) {
//
//                XSSFCell cell = row.getCell(columnindex);
//
//                String value = "";
//
//                if( cell == null ) {
//                    continue;
//                }
//                else {
//
//                    switch (cell.getCellType()) {
//
//                        case CellType.FORMULA:
//                            value = cell.getCellFormula();
//                            break;
//
//                        case CellType.NUMERIC:
//                            value = String.valueOf(cell.getNumericCellValue());
//                            break;
//
//                        case CellType.STRING:
//                            value = cell.getStringCellValue();
//                            break;
//
//                        case CellType.BLANK:
//                            value = String.valueOf(cell.getBooleanCellValue());
//                            break;
//
//                        case CellType.ERROR:
//                            value = String.valueOf(cell.getErrorCellValue());
//
//                    }
//
//                }
//
//                resultMap.put( String.valueOf( columnindex ) , value );
//
//                System.out.println("value : " + value);
//
//            }
//
//            resultList.add(resultMap);
//
//        }
//
//        return resultList;
//    }
//
//}

@Component
public class ExcelUtil {

    // 각 셀의 데이터타입에 맞게 값 가져오기
    public String getCellValue(XSSFCell cell) {

        String value = "";

        if(cell == null){
            return value;
        }

        switch (cell.getCellType()) {
            case STRING:
                value = cell.getStringCellValue();
                break;
            case NUMERIC:
                value = (int) cell.getNumericCellValue() + "";
                break;
            default:
                break;
        }
        return value;
    }

    // 엑셀파일의 데이터 목록 가져오기 (파라미터들은 위에서 설명함)
    public List<Map<String, Object>> getListData(MultipartFile file, int startRowNum, int columnLength) {

        List<Map<String, Object>> excelList = new ArrayList<Map<String,Object>>();

        try {
            OPCPackage opcPackage = OPCPackage.open(file.getInputStream());

            @SuppressWarnings("resource")
            XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

            // 첫번째 시트
            XSSFSheet sheet = workbook.getSheetAt(0);

            int rowIndex = 0;
            int columnIndex = 0;

            // 첫번째 행(0)은 컬럼 명이기 때문에 두번째 행(1) 부터 검색
            for (rowIndex = startRowNum; rowIndex < sheet.getLastRowNum() + 1; rowIndex++) {
                XSSFRow row = sheet.getRow(rowIndex);

                // 빈 행은 Skip
                if (row.getCell(0) != null && !row.getCell(0).toString().isBlank()) {

                    Map<String, Object> map = new HashMap<String, Object>();

                    int cells = columnLength;

                    for (columnIndex = 0; columnIndex <= cells; columnIndex++) {
                        XSSFCell cell = row.getCell(columnIndex);
                        map.put(String.valueOf(columnIndex), getCellValue(cell));
//                        logger.info(rowIndex + " 행 : " + columnIndex+ " 열 = " + getCellValue(cell));
                    }

                    excelList.add(map);
                }
            }

        } catch (InvalidFormatException e) {
            e.printStackTrace();
        } catch (IOException | org.apache.poi.openxml4j.exceptions.InvalidFormatException e) {
            e.printStackTrace();
        }

        return excelList;
    }
}