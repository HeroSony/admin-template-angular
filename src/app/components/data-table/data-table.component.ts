import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() tableData: any;
  @Input() columnHeader: any;
  objectKeys = Object.keys;
  dataSource: any;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    console.log(this.tableData);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;

  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}

// import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { MatSort, Sort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { LiveAnnouncer } from '@angular/cdk/a11y';

// @Component({
//   selector: 'app-data-table',
//   templateUrl: './data-table.component.html',
//   styleUrls: ['./data-table.component.css']
// })
// export class DataTableComponent implements OnInit {
//   @Input() tableData: any;
//   @Input() columnHeader: any;
//   objectKeys = Object.keys;
//   dataSource: any;

//   constructor(
//     private _liveAnnouncer: LiveAnnouncer
//   ) { }

//   @ViewChild(MatSort) sort!: MatSort;

//   ngOnInit() {
//     console.log("this.tableData::", this.tableData);
//     console.log("this.columnHeader::", this.columnHeader);
//     this.dataSource = new MatTableDataSource(this.tableData);
//     this.dataSource.sort = this.sort;

//   }

//   // applyFilter(filterValue: string) {
//   //   this.dataSource.filter = filterValue.trim().toLowerCase();
//   // }

//   announceSortChange(sortState: Sort) {
//     // This example uses English messages. If your application supports
//     // multiple language, you would internationalize these strings.
//     // Furthermore, you can customize the message to add additional
//     // details about the values being sorted.

//     console.log("sortState: ", sortState)
//     if (sortState.direction) {
//       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
//     } else {
//       this._liveAnnouncer.announce('Sorting cleared');
//     }
//   }
// }