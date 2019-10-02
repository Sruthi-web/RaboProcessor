import { Component } from '@angular/core';

import { Record } from '../../../shared/models/record.model';

@Component({
    selector: 'record-validator',
    templateUrl: './record-validator.component.html',
    styleUrls: ['./record-validator.component.scss']
})

export class RecordValidatorComponent {

    convertCsvToJson() {
        const inputFile = <HTMLInputElement>document.getElementById('fileInput');
        const reader = new FileReader();
        reader.onload = () => {
            let customerRecords = this.csvToJson(reader.result);
            // customerRecords = this.validateEndBalance(customerRecords);
            this.validateRecords(customerRecords);
        };
        reader.readAsText(inputFile.files[0]);

    }

    csvToJson(csv: any) {
        let rows = csv.split("\n");
        let records = [];
        let recordHeaders = rows[0].split(",");
        recordHeaders = recordHeaders.map((recordHeader: string) => {
            return recordHeader.replace(/\s+/g, "").toLowerCase();
        })

        for (var i = 1; i < rows.length; i++) {
            var obj = {};
            var currentRecord = rows[i].split(",");
            for (var j = 0; j < recordHeaders.length; j++) {
                obj[recordHeaders[j]] = currentRecord[j];
            }
            records.push(obj);
        }
        return records;
    }

    validateRecords(records: any) {
        // const map = new Map();
        // const result:any = [];
        // for (const record of records) {
        //     if (map.has(record.Reference)) {
        //         map.set(record.Reference, true);    // set any value to Map
        //         result.push({
        //             Reference: record.Reference,
        //             Description: record.Description
        //         });
        //     }
        // }
        // console.log(result);

        const lookup = records.reduce((a: any, e: any) => {
            a[e.reference] = e.reference in a ? ++a[e.reference] : 0;
            return a;
        }, {});
        console.log(records.filter((e: any) => lookup[e.reference]));
    }

    validateEndBalance(records: any) {
        return records.filter(function (record: any) {
            if (+record.mutation > 0) {
                return (+(+record.startbalance + +record.mutation).toFixed(2)) === +record.endbalance;
            } else {
                return (+(record.startbalance - Math.abs(+record.mutation)).toFixed(2)) === +record.endbalance;
            }
        });
    }
}