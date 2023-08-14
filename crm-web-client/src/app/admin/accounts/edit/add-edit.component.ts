import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService, AlertService} from '@app/_services';
import {MustMatch} from '@app/_helpers';
import {Account} from "@app/_models";
import * as AccountActions from "@app/state/account/account.actions";
import {Store} from "@ngrx/store";
import {selectAccountError, selectAccountStatus} from "@app/state/account/account.selectors";

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  status$ = this.store.select(selectAccountStatus);
  error$ = this.store.select(selectAccountError);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private accountService: AccountService,
    private store: Store
  ) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      // password only required in add mode
      password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]],
      confirmPassword: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.error$.subscribe(error => {
      if (error)
        this.alertService.error(error);
    })

    this.status$.subscribe(status => {
      debugger
      this.loading = status == 'loading';
    })

    this.title = 'Create Account';
    if (this.id) {
      // edit mode
      this.title = 'Edit Account';
      this.loading = true;
      this.accountService.getById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.form.patchValue(x);
        this.loading = false;
      });
    }
  }

  updateAccount(id: string, account: Account) {
    this.store.dispatch(AccountActions.updateAccount({id: id, account: account}));
  }

  addAccount(account: Account) {
    this.store.dispatch(AccountActions.addAccount({account: account}));
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;

    // create or update account based on id param
    let saveAccount;
    let message: string;
    if (this.id) {
      this.updateAccount(this.id!, this.form.value);
      message = 'Account updated';
    } else {
      this.addAccount(this.form.value);
      message = 'Account created';
    }

    // saveAccount()
    // .pipe(first())
    // .subscribe({
    //   next: () => {
    //     this.alertService.success(message, {keepAfterRouteChange: true});
    //     this.router.navigateByUrl('/admin/accounts');
    //   },
    //   error: error => {
    //     this.alertService.error(error);
    this.submitting = false;
    //   }
    // });
  }
}