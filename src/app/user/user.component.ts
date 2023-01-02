import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from '../user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcelExportService } from '../excel-export.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private excelService: ExcelExportService
  ) {}
  page = 1;
  pageSize = 10;
  collectionSize = this.userService.userData.length;

  isHiddenExpiresAtField: boolean = false;
  isHiddenValidForDays: boolean = false;

  userCreationForm = this.formBuilder.group({
    id: new FormControl<number | undefined>(undefined),
    username: new FormControl(''),
    password: new FormControl<string | undefined>(''),
    valid_for_days: new FormControl<number | undefined>(undefined),
    expires_at: new FormControl<string | undefined>(undefined),
    created_at: new FormControl<string | undefined>(undefined),
  });
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log(reason);
        }
      );
  }

  getusers(): User[] {
    return this.userService.userData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  onChange() {
    console.log(this.userCreationForm.value);
  }

  addAndUpdateUser(): void {
    let data = {
      username: this.userCreationForm.get('username')?.value,
      password: this.userCreationForm.get('password')?.value,
      valid_for_days: this.userCreationForm.get('valid_for_days')?.value,
      expires_at: this.userCreationForm.get('expires_at')?.value,
    };
    if (this.userCreationForm.get('id')?.value) {
      this.userService.updateUser(data).subscribe({
        next: (response) => {
          this.toastr.success('User updated successfully');
          this.userService.getUsers();
          this.modalService.dismissAll();
          this.userCreationForm.reset();
          this.isHiddenExpiresAtField = false;
          this.isHiddenValidForDays = false;
        },
      });
    } else {
      this.userService.addUser(data).subscribe({
        next: (response) => {
          this.userService.userData.push(response.user);
          console.log(this.userService.userData);
          this.toastr.success('User added successfully');
          this.modalService.dismissAll();
          this.userCreationForm.reset();
          this.isHiddenExpiresAtField = false;
          this.isHiddenValidForDays = false;
          this.excelService.exportAsExcelFile(
            [
              {
                username: data.username,
                password: data.password,
              },
            ],
            `${data.username}_credentials`
          );
        },
      });
    }
  }
  ngOnInit(): void {
    this.userService.getUsers();
  }

  changeExpiresAt(): void {
    if (this.userCreationForm.get('expires_at')?.value == '' || null) {
      this.isHiddenValidForDays = false;
      this.isHiddenExpiresAtField = false;
    } else {
      this.isHiddenExpiresAtField = false;
      this.isHiddenValidForDays = true;
      this.userCreationForm.get('valid_for_days')?.setValue(0);
    }
    console.log('called', this.isHiddenValidForDays);
  }

  changeValidForDays(): void {
    console.log('called valid days', this.isHiddenValidForDays);
    if (this.userCreationForm.get('valid_for_days')?.value == 0 || null) {
      this.isHiddenValidForDays = false;
      this.isHiddenExpiresAtField = false;
    } else {
      this.isHiddenExpiresAtField = true;
      this.isHiddenValidForDays = false;
      this.userCreationForm.get('expires_at')?.setValue('');
    }
  }

  editUser(user: User, templateRef: any): void {
    this.isHiddenValidForDays = true;
    this.userCreationForm.setValue({
      id: user.id,
      username: user.username,
      password: '',
      valid_for_days: user.valid_for_days || 0,
      expires_at: user.expires_at,
      created_at: user.created_at,
    });
    this.open(templateRef);
  }

  getNumberOfUsers(): number {
    return this.userService.userData.length;
  }
}
