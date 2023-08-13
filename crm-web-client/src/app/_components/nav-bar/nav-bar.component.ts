import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthenticateResponse} from "@app/_helpers/crm-api-client";
import {Role} from "@app/_models";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
@Input() account?: AuthenticateResponse | null;
@Output() logout = new EventEmitter<any>();
  protected readonly Role = Role;
}
