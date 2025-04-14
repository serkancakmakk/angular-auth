import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],  // HttpClientModule'u buraya ekliyoruz
  template:`<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Uygulama açıldığında token kontrolü yapıyoruz

  }
}