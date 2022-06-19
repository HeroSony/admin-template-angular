import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SweetAlert {
  constructor() { }
  static loading() {
    return Swal.fire({
      title: 'Please wait!',
      html: 'Loading...',
      timer: 0,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

  }
  static close() {
    return Swal.close();

  }

  static message(status: number, name: string, message: string,) {
    if (status == 1) {
      return Swal.fire({
        icon: 'success',
        title: name,
        text: message,
        confirmButtonColor: '#7c1d4e',
      })
    } else {
      return Swal.fire({
        icon: 'error',
        title: name,
        text: message,
        confirmButtonColor: '#7c1d4e',
      })
    }
  }

  static error(err:any) {
    console.log(err)
    return Swal.fire({
      icon: 'error',
      title: err.error.code,
      text: err.error.message,
      confirmButtonColor: '#7c1d4e',
    })
  }

  static warningConfirm() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7c1d4e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sure!'
    })

  }

}
