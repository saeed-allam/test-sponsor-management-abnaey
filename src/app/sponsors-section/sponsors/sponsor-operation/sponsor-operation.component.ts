import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedService } from '../../../core/service/fixed.service';
import { SponsersService } from '../../sponsers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../core/service/global.service';
import { ResponseEnum } from '../../../core/enums/response.enum';

@Component({
  selector: 'app-sponsor-operation',
  templateUrl: './sponsor-operation.component.html',
})
export class SponsorOperationComponent {
  submitted = false;
  requestSent = false;
  sponsorForm: FormGroup;
  constructor(
    public fixed: FixedService,
    private formBuilder: FormBuilder,
    public sponsorSer: SponsersService,
    private activatedRoute: ActivatedRoute,
    private global: GlobalService,
    private router: Router
  ) {
    this.fixed.subheader="Sponsor Operation";
    this.initialModel();
    this.getById();
  }

  initialModel() {
    this.sponsorForm = this.formBuilder.group({
      id: [null, []],
      sponsor_code: [null, [Validators.required]],
      sponsor_name: [null, [Validators.required]],
      sponsor_name_latin: [null, [Validators.required]],
      sponsor_type: [null, [Validators.required]],
      address: [null, [Validators.required]],
      postal_code: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      max_limit: [null, [Validators.required]],
      financial_limit: [null, [Validators.required]],
      time_limit: [null, []],
      created_by: [null, []],
      updated_by: [null, []],
      deleted_at: [null, []],
      created_at: [null, []],
      updated_at: [null, []],
      active: [false, []],
    });
  }

  get f() {
    return this.sponsorForm.controls;
  }

  getById(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id != null) {
        this.global.loading(true);
        this.f['id'].setValue(Number(id));
        this.sponsorSer.getSponsorById(this.f['id'].value).subscribe({
          next: (response: any) => {
            this.sponsorForm.setValue(response.data);
            this.global.loading(false);
          },
          error: (err) => {
            console.log(err);
            this.global.loading(false);
            this.global.notificationMessage(
              ResponseEnum.Failed,
              'sponser info',
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
      this.global.removeSpacesinFormControl(this.sponsorForm);
      this.requestSent = true;
      if(this.sponsorForm.invalid){
         this.requestSent=false;
         return;
      }
      this.global.loading(true);
      this.sponsorSer.operation(this.sponsorForm.value).subscribe({
        next: (response) => {
         this.requestSent=false;
          this.global.loading(false);
          this.global.notificationMessage(ResponseEnum.Success,'sponsor operation',this.f['id']?'sponsor Added':'sponsor Edited');
          this.router.navigate(['sponsor/list']);
        },
        error: (err) => {
         this.requestSent=false;
          this.global.loading(false);
          this.global.notificationMessage(ResponseEnum.Failed, 'sponsor operation', err.message, err);
        },
      });
    }
  }
}
