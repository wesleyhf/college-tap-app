import { Pipe } from '@angular/core';

@Pipe({
    name: 'filter',
})

export class FilterArrayPipe {
    transform(value, args) {
        if (!args[0]) {
            return value;
        } else if (value) {
            return value.filter(item => {
                for (let key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                        (item[key].indexOf(args[0]) !== -1)) {
                            return true;
                        }
                }
            });
        }
    }
}

// import {Pipe} from 'angular2/core';
//
// @Pipe({
//     name: 'sortByName',
//     pure: false,
// })
// export class SortByNamePipe {
//     tmp = [];
//
//     transform (value, [queryString]) {
//         this.tmp.length = 0;
//
//         console.log('transform:', value, queryString);
//
//         let arr = value.filter((student)=>new RegExp(queryString).test(student.name));
//
//         this.tmp.push(...arr);
//
//         return this.tmp;
//     }
// }
