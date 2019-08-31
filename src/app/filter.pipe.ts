import { Pipe, PipeTransform } from "@angular/core";
import { isNgTemplate } from "@angular/compiler";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, empdata: string): any {
    if (!empdata) {
      return value;
    }
    if (value.length === 0) {
      return;
    } else {
      var resultArray: any = [];
      for (let item of value) {
        if (
          item.first_name.toLowerCase().includes(empdata.toLowerCase()) ||
          item.email.toLowerCase().includes(empdata.toLowerCase()) ||
          item.last_name.toLowerCase().includes(empdata.toLowerCase()) ||
          item.id.toString().includes(empdata)
        ) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }
}
