import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; // AuthService'in doğru yolu
import { Router, RouterModule } from '@angular/router'; // Router'ı import et
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
    templateUrl: `./register.component.html`
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // backende gönderiyor
    this.authService.register(this.username, this.email, this.password).subscribe(
      response => {
        // Kayıt başarılı ise login sayfasına yönlendir
        console.log('Kullanıcı başarıyla oluşturuldu!', response);
        this.router.navigate(['/login']); // Yönlendirme
      },
      error => {
        console.error('Kayıt sırasında hata oluştu:', error);
      }
    );
  }
}
