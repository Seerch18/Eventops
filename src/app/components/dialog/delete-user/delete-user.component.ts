import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin/admin.service';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  borrar() {
    if (this.data) {
      if (this.data['isAdmin']) {
        this.adminService
          .deleteUser(this.data['usuarioId'].id)
          .subscribe((resp) => console.log(resp));
      }
    }
  }
}
