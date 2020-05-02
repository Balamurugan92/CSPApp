import { Component, OnInit, ViewChild } from "@angular/core";
import { FileUtil } from './file.util';
import { Constants } from './csp.constants';
import * as $ from 'jquery';
@Component({
  selector: 'app-statement-processor',
  templateUrl: './csp.component.html',
  styleUrls: ['./csp.component.css']
})
export class CSPComponent implements OnInit {

  headersRow: any[];
  failedRecords: any[];
  @ViewChild('fileImportInput')
  fileImportInput: any;
  isRecordsAvailable: boolean = false;
  isFailedRecords: boolean = false;
  csvRecords = [];
  rowsPerPageList: Number[] = Constants.RowsPerPageList;
  defaultRowsPerPage: Number = Constants.DefaultRowsPerPage;

  constructor(public _fileUtil: FileUtil
  ) {   }

  ngOnInit() { }

  fileChangeListener($event): void {
    this.isFailedRecords = false;
    this.isRecordsAvailable = false;
    let text = [];
    let target = $event.target || $event.srcElement;
    let files = target.files;
    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (this._fileUtil.isCSVFile(files[0])) {
        this.parseCSVData($event);
      }
      if (this._fileUtil.isXMLFile(files[0])) {
        this.parseXMLData($event);
      }
    }
  };

  parseXMLData($event) {
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = (data) => {
      parseFile(reader.result);
    };
    let fileHeaders = Constants.FileHeaders;
    var parseFile = (text) => {
      var finalRecords = [];
      var xmlDoc = $.parseXML(text),
        $xml = $(xmlDoc),
        $options = $xml.find("record");
      $.each($options, function (index) {
        let record = [];
        for (var i = 0; i < $(this).children().length; i++) {
          if (index == '0') {
            if (i == 0) {
              record.push(fileHeaders.get($(this)[0].attributes[i].localName));
            }
            record.push(fileHeaders.get($(this).children()[i].localName))
          } else {
            if (i == 0) {
              record.push($(this)[0].attributes[i].value);
            }
            record.push($(this).children()[i].innerHTML);
          }
        }
        finalRecords.push(record);
      });
      this.csvRecords = finalRecords;
      if (this.csvRecords == null) {
        this.fileReset();
      } else {
        this.isRecordsAvailable = true;
      }
    };
  }

  parseCSVData($event) {
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = (data) => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.split(/\r\n|\n/);
      let headerLength = -1;
      if (Constants.isHeaderPresentFlag) {
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length;
      }
      this.csvRecords = this._fileUtil.getCsRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);
      if (this.csvRecords == null) {
        this.fileReset();
      } else {
        this.isRecordsAvailable = true;
      }
    }

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
    this.isFailedRecords = false;
    this.isRecordsAvailable = false;
  }
}