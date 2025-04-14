import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    
      <h2>Hoşgeldiniz, {{ username }}!</h2>

      <p style="color: red;">{{ errorMessage }}</p>

  `,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  username: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan alıyoruz
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Token'ı decode ediyoruz
        this.username = decodedToken.username; // Token'dan kullanıcı adını alıyoruz
        this.email = decodedToken.email; // Token'dan e-posta bilgisini alıyoruz
      } catch (error) {
        console.error('Token decode hatası:', error);
        this.errorMessage = 'Token geçersiz veya bozuk'; // Token hatası
      }
    } else {
      this.errorMessage = 'Kullanıcı bilgileri alınamadı, giriş yapmanız gerekiyor.';
    }
  }
}
