import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UsersDataService } from 'src/app/users-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  selectedFile: string | null = null;
  
  
  technologies: string[] = ['C', 'C++', 'Java', 'Python', 'JavaScript'];
  formData: any; // Property to store form data
  selectedOrderIds:any=[];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  
    private userService: UsersDataService,
    private route: Router) {

    this.userForm = this.initForm();
    
  }
  
  
  openModal(content: any) {
    this.selectedOrderIds = this.userForm.value.technology
    .map((checked: any, i: any) => checked ? this.technologies[i] : null)
    .filter((v:string) => v !== null);
    
     this.formData = this.userForm.value; // Assign form data to formData property
     console.log(this.userForm.value)
     this.modalService.open(content);
     
 }
userdata:any;
 saveData(){
  this.userdata = this.userForm.value;
  this.userdata.tech = this.selectedOrderIds;
  this.userdata.url = this.selectedFile;
  console.log(this.userdata);
  this.userService.details = this.userdata;
  this.route.navigate(['/users/view']);
  this.modalService.dismissAll();
 }
  
  ngOnInit(): void {
    this.technologies.forEach(() => (this.userForm.get('technology') as FormArray).push(new FormControl(false)));
  }

  getControls(){
  
    return (this.userForm.get('technology') as FormArray).controls
  }
 

  initForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      category: ['', Validators.required],
      technology: this.formBuilder.array([]),
      profilePicture: ['']
    });
  }
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }
  get mobile() {
    return this.userForm.get('mobile');
  }

  get isProfilePictureInvalid(): boolean {
    const control = this.userForm.get('profilePicture');
    return control ? (control.invalid && (control.dirty || control.touched) && control.errors?.['invalidFileType']) || false : false;
  }
  
 

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
    if (file && allowedFileTypes.includes(file.type)) {
      this.selectedFile = URL.createObjectURL(file); // Set the selectedFile as the file URL
    } else {
      // File type is not supported
      this.selectedFile = null;
      this.userForm.patchValue({ profilePicture: '' }); // Reset the file input in the form
      this.userForm.get('profilePicture')?.setErrors({ invalidFileType: true });
    }
  }


cancel() {
  this.modalService.dismissAll();
}


}


