import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'cluster-detail.dialog.component',
  templateUrl: './cluster-detail.dialog.component.html',
})
export class ClusterDetailDialog {
  constructor(
    public dialogRef: MatDialogRef<ClusterDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}