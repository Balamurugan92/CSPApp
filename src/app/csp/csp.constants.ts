import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    static tokenDelimeter = ",";
    static isHeaderPresentFlag = true;
    static validateHeaderAndRecordLengthFlag = true;
    static valildateFileExtenstionFlag = true;
    static RowsPerPageList = [5,10,15];
    static DefaultRowsPerPage = 5;

   static FileHeaders = new Map<String, String>([
        ['reference', 'Reference'], 
        ['accountNumber', 'Account Number'],
        ['description', 'Description'],
        ['startBalance', 'Start Balance'],
        ['mutation', 'Mutation'],
        ['endBalance', 'End Balance']
    ]);
}