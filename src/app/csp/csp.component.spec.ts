import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUtil } from './file.util';
import { CSPComponent } from './csp.component';

describe('CSPComponent', () => {
  let component: CSPComponent;
  let fixture: ComponentFixture<CSPComponent>;
  let csvFiles = Array<File>();
  let xmlFiles = Array<File>();
  //set sample csv files for testing
  let CSV = [
    'Reference,AccountNumber,Description,Start Balance,Mutation,End Balance',
    '167875,NL93ABNA0585619023,Tickets from Erik de Vries,5429,-939,6368',
    '147674,NL93ABNA0585619023,Subscription from Peter Dekker,74.69,-44.91,29.78'
  ].join('\n');
  let contentTypeCSV = 'text/csv';
  let dataCSV = new Blob([CSV], { type: contentTypeCSV });
  let arrayOfBlobCSV = new Array<Blob>();
  arrayOfBlobCSV.push(dataCSV);
  let csvData = new File(arrayOfBlobCSV, "Mock.csv");
  csvFiles.push(csvData);

  //set sample xml data for testing

  let XML = [
    '<records>                                                               ',
    '  <record reference="167875">                                           ',
    '    <accountNumber>NL93ABNA0585619023</accountNumber>                   ',
    '    <description>Tickets from Erik de Vries</description>                  ',
    '    <startBalance>5429</startBalance>                                   ',
    '    <mutation>-939</mutation>                                         ',
    '    <endBalance>6368</endBalance>                                       ',
    '  </record>                                                             ',
    '  <record reference="147674">                                           ',
    '    <accountNumber>NL93ABNA0585619023</accountNumber>                   ',
    '    <description>Subscription from Peter Dekker</description>                    ',
    '    <startBalance>74.69</startBalance>                                  ',
    '    <mutation>+43.09</mutation>                                         ',
    '    <endBalance>59.61</endBalance>                                      ',
    '  </record>                                                             ',
    '</records>                                                              '
  ].join('\n');

  let contentType = 'text/xml';
  let data = new Blob([XML], { type: contentType });
  let arrayOfBlob = new Array<Blob>();
  arrayOfBlob.push(data);
  let xmlData = new File(arrayOfBlob, "Mock.xml");
  xmlFiles.push(xmlData);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CSPComponent],
      providers: [FileUtil]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('check input file type CSV or not', () => {
    expect(component._fileUtil.isCSVFile(csvFiles[0])).toBe(true);
  });

  it('check input file type XML or not', () => {
    expect(component._fileUtil.isXMLFile(xmlFiles[0])).toBe(true);
  });

  it('Process the Header Statements from csv File', () => {
    let reader = new FileReader();
    reader.readAsText(csvFiles[0]);
    reader.onload = (data) => {
      let csvData = reader.result;
      let headerLength = -1;
      let csvRecordsArray = csvData.split(/\r\n|\n/);
      
      expect(component._fileUtil.getHeaderArray(csvRecordsArray, ',')).toBeTruthy();
    };
  });

    it('Process the records Statements from csv File', () => {
      let reader = new FileReader();
      reader.readAsText(csvFiles[0]);
      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = csvData.split(/\r\n|\n/);
        let headerLength = -1;
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, ',');
        headerLength = headersRow.length;
        this.csvRecords = component._fileUtil.getCsRecordsArrayFromCSVFile(csvRecordsArray, headerLength,true,',');
       
        expect(component._fileUtil.getCsRecordsArrayFromCSVFile(csvRecordsArray, headerLength,true,',')).toBeTruthy();
        
      };
    });
});
