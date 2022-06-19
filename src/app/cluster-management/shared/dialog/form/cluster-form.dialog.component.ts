import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { TransferFeeModel } from 'src/app/models/system-configuration/fee-charge.model';
import { SwitchOption, switchOptions } from 'src/app/utils/constants';

@Component({
  selector: 'cluster-form.dialog.component',
  templateUrl: 'cluster-form.dialog.component.html',
  styleUrls: ['../../../cluster-management.component.css']
})

export class CLusterFormDialog implements OnInit {

  submitForm: FormGroup;
  submitted = false;
  submitResponse!: TransferFeeModel;

  @ViewChild('t1') matTimepicker!: HTMLFormElement;

  id!: FormGroup;
  cluster_name!: FormGroup;
  trigger_rate!: FormGroup;
  trigger_switch!: FormGroup;
  game_1!: FormGroup;
  game_2!: FormGroup;
  game_3!: FormGroup;
  game_4!: FormGroup;
  date!: Date;
  time!: Date;

  triggerSwitchOptions: SwitchOption[] = switchOptions;

  constructor(
    public dialogRef: MatDialogRef<CLusterFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.submitForm = fb.group({});
  }

  ngOnInit(): void {
    console.log("INIT", this.data)

    if (this.data) {
      const start_time = new Date(this.data.start_time);

      this.submitForm = this.fb.group({
        id: [this.data?.id, Validators.required],
        cluster_name: [this.data?.cluster_name, Validators.required],
        trigger_rate: [this.data?.trigger_rate, Validators.required],
        trigger_switch: [this.data?.trigger_switch, Validators.required],
        game_1: [this.data?.game_1, Validators.required],
        game_2: [this.data?.game_2, Validators.required],
        game_3: [this.data?.game_3, Validators.required],
        game_4: [this.data?.game_4, Validators.required],
        date: [start_time, Validators.nullValidator],
        time: [start_time, Validators.nullValidator],
      });
    } else {
      this.submitForm = this.fb.group({
        cluster_name: ['', Validators.required],
        trigger_rate: ['', Validators.required],
        trigger_switch: ['', Validators.required],
        game_1: ['', Validators.required],
        game_2: ['', Validators.required],
        game_3: ['', Validators.required],
        game_4: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
      });
    }

  }

  get submitFormControl() {
    return this.submitForm.controls;
  }

  onSubmit() {
    console.log("SUBMIT", this.submitForm)
    this.submitted = true
    if (this.submitForm.invalid) {
      return;
    }

    const data = this.submitForm.value;

    // ### Format openDate
    // let date = moment(data.date).format("DD-MM-YYYY")
    let date = moment(data.date).format("YYYY-MM-DD")
    let time = moment(data.time).format("HH:mm:ss")
    data.start_time = `${date}T${time}`

    console.log("DATA: >>>>>>>> ", data)

    this.dialogRef.close(data);

  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}