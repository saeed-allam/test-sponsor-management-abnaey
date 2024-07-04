import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedService } from '../../../core/service/fixed.service';
import { SponsersService } from '../../sponsers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../core/service/global.service';
import { ResponseEnum } from '../../../core/enums/response.enum';

@Component({
  selector: 'app-contact-operation',
  templateUrl: './contact-operation.component.html'
})
export class ContactOperationComponent implements OnInit{

  submitted = false;
  requestSent = false;
  contactForm: FormGroup;
  constructor(
    public fixed: FixedService,
    private formBuilder: FormBuilder,
    public sponsorSer: SponsersService,
    private activatedRoute: ActivatedRoute,
    private global: GlobalService,
    private router: Router
  ) {
    this.fixed.subheader="Contact Operation";
    this.sponsorSer.getSponsor();
  }
  ngOnInit(): void {
    this.initialModel();
    this.sponsorSer.getSponsor();
    this.getById();

  }

  initialModel() {
    this.contactForm = this.formBuilder.group({
      id: [null, []],
      sponsor_id: [null, [Validators.required]],
      contact_officer_name: [null, [Validators.required]],
      contact_officer_name_latin: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      active: [false, []],
      created_by: [null, []],
      updated_by: [null, []],
      deleted_at: [null, []],
      created_at: [null, []],
      updated_at: [null, []],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  getById(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id != null) {
        this.global.loading(true);
        this.f['id'].setValue(Number(id));
        this.sponsorSer.getContactById(this.f['id'].value).subscribe({
          next: (response: any) => {
            this.contactForm.setValue(response.data);
            this.global.loading(false);
          },
          error: (err) => {
            console.log(err);
            this.global.loading(false);
            this.global.notificationMessage(
              ResponseEnum.Failed,
              'contact info',
              err.message,
              err
            );
          },
        });
      }
    });
  }

  onSubmit() {
    if (!this.requestSent) {
      this.submitted = true;
      this.global.removeSpacesinFormControl(this.contactForm);
      this.requestSent = true;
      if(this.contactForm.invalid){
         this.requestSent=false;
         return;
      }
      this.global.loading(true);
      this.sponsorSer.contactOperation(this.contactForm.value).subscribe({
        next: (response) => {
         this.requestSent=false;
          this.global.loading(false);
          this.global.notificationMessage(ResponseEnum.Success,'contact operation',this.f['id'].value?'contact Added':'contact Edited');
          this.router.navigate(['sponsor/contact-operation']);
        },
        error: (err) => {
         this.requestSent=false;
          this.global.loading(false);
          this.global.notificationMessage(ResponseEnum.Failed, 'contact operation', null, err);
        },
      });
    }
  }
}
