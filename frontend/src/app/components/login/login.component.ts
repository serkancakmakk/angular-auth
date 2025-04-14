import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Giriş sonrası yönlendirme için
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: `./login.component.html`
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Giriş başarılı!', response);
        localStorage.setItem('token', response.token); // Tokenı sakla
        this.router.navigate(['/home']); // Başarılı giriş sonrası yönlendir
      },
      error => {
        console.error('Giriş hatası:', error);
        alert('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    );
  }
}
