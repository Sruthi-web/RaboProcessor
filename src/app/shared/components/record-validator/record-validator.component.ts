import { Component } from '@angular/core';

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
            this.validateRecords(customerRecords);
        };
        reader.readAsText(inputFile.files[0]);

    }

    csvToJson(csv: any) {
        let rows = csv.split("\n");
        let records = [];
        var headers = rows[0].split(",");

        for (var i = 1; i < rows.length; i++) {
            var obj = {};
            var currentline = rows[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
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

        const lookup = records.reduce((a:any, e:any) => {
  a[e.Reference] = e.Reference in a ? ++a[e.Reference] : 0;
  return a;
}, {});
console.log(records.filter((e:any) => lookup[e.Reference]));
    }
}