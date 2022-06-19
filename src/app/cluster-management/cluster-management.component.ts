import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ClusterModel } from '../models/cluster.model';
import { LoaderService } from '../services';
import { ClusterService } from '../services/cluster.service';
import { SweetAlert } from '../utils/sweet-alert';
import { ClusterDetailDialog } from './shared/dialog/detail/cluster-detail.dialog.component';
import { CLusterFormDialog } from './shared/dialog/form/cluster-form.dialog.component';

@Component({
  selector: 'app-cluster-management',
  templateUrl: './cluster-management.component.html',
  styleUrls: ['./cluster-management.component.css']
})
export class ClusterManagementComponent implements OnInit {

  // ### Pagination
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 15;
  totalCount!: number;
  totalPage!: number;

  // ### List Params
  currency = 'USD';

  // ### Loader
  loaderList = false;
  loaderDetail = false;

  tabIndex = 0;


  displayedColumns: string[] = ['id', 'cluster_name', 'trigger_rate', 'trigger_switch', 'start_time', 'game_1', 'game_2', 'game_3', 'game_4', 'created_at', 'actions'];
  objectKeys = Object.keys;

  dataSource = new MatTableDataSource<ClusterModel>([]);

  constructor(
    private service: ClusterService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    public loaderService: LoaderService,
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('tabs') tabGroup!: MatTabGroup;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.dataSource = ELEMENT_DATA
    this._list();
  }

  private _list(): void {
    // ### start Loader
    this.loaderList = true;

    let page = this.pageIndex + 1;
    const params = {
      currency: this.currency,
      page,
      size: this.pageSize
    }

    console.log("params: ", params)

    this.service.list(params).subscribe(
      (res: any) => {
        console.log("Rse: ", res)
        const { data, pagination } = res;

        this.dataSource = new MatTableDataSource<ClusterModel>(data);
        // this.dataSource = new MatTableDataSource<ClusterModel>(ELEMENT_DATA);

        console.log("this.dataSource: ", this.dataSource)

        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 500);

        // this.pageIndex = pagination.page - 1;
        // this.pageSize = pagination.size;
        // this.totalCount = pagination.total_counts;
        // this.totalPage = pagination.total_pages;

        // ### stop loader
        this.loaderList = false;
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  handlePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    console.log("Event: ", event)

    this._list();

    return event;
  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.

    console.log("sortState: ", sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDetailDialog(id: any) {

    SweetAlert.loading();

    this.service.get(id).subscribe(
      (res: any) => {
        SweetAlert.close();
        console.log("rese:: ", res)
        this.dialog.open(ClusterDetailDialog, {
          data: res.data,
        });
      },
      (err: any) => {
        SweetAlert.close();
        SweetAlert.message(0, err.name, err.message);
      },
    );
  }

  openFormDialog(data = null) {
    console.log("data: ", data)

    const dialogRef = this.dialog.open(CLusterFormDialog, {
      data,
      // autoFocus: false,
      width: '600px',
      // maxHeight: '90vh',
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        console.log("Dialog output:", data)
        if (data) {

          if (data.id) {

            this.service.put(data.id, data).subscribe(
              (res: any) => {
                console.log("Response: ", res)

                // Reload Search
                this._list()
              },
              (err: any) => {
                console.log(err);
              },
            );
          } else {
            this.service.post(data).subscribe(
              (res: any) => {
                console.log("Response: ", res)

                // Reload Search
                this._list()
              },
              (err: any) => {
                console.log(err);
              },
            );
          }

        }
      }
    );
  }
}

// @Component({
//   selector: 'dialog-detail',
//   templateUrl: './dialog-detail.html',
// })
// export class DialogDetail {
//   constructor(
//     public dialogRef: MatDialogRef<DialogDetail>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }




const ELEMENT_DATA: any = [
  { id: 1, cluster_name: 'H', trigger_rate: '5', trigger_switch: false, start_time: '2022-06-01 05:13:03', game_1: false, game_2: false, game_3: false, game_4: false, created_at: "2022-06-02T05:07:43.117848Z"  },
  { id: 2, cluster_name: 'H', trigger_rate: '5', trigger_switch: false, start_time: '2022-06-01 05:13:03', game_1: false, game_2: false, game_3: false, game_4: false,created_at: "2022-06-02T05:07:43.117848Z"  },
  { id: 3, cluster_name: 'H', trigger_rate: '5', trigger_switch: false, start_time: '2022-06-01 05:13:03', game_1: false, game_2: false, game_3: false, game_4: false, created_at: "2022-06-02T05:07:43.117848Z"  },
  { id: 4, cluster_name: 'H', trigger_rate: '5', trigger_switch: false, start_time: '2022-06-01 05:13:03', game_1: false, game_2: false, game_3: false, game_4: false, created_at: "2022-06-02T05:07:43.117848Z"  },
];