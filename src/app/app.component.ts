import { Component } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  protected title = 'CRUD Form';
}
