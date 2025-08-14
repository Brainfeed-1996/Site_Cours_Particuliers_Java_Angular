import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Cours Particuliers</h3>
          <p>La plateforme de référence pour trouver des cours particuliers dans tous les domaines.</p>
        </div>
        
        <div class="footer-section">
          <h4>Liens utiles</h4>
          <ul>
            <li><a href="/courses">Cours</a></li>
            <li><a href="/teachers">Professeurs</a></li>
            <li><a href="/register">Devenir professeur</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Aide</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">CGU</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Suivez-nous</h4>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Cours Particuliers. Tous droits réservés.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background-color: #f5f5f5; border-top: 1px solid #e0e0e0; margin-top: auto; }
    .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
    .footer-section h3 { color: #333; margin-bottom: 15px; font-size: 1.2rem; }
    .footer-section h4 { color: #555; margin-bottom: 15px; font-size: 1rem; }
    .footer-section p { color: #666; line-height: 1.6; }
    .footer-section ul { list-style: none; padding: 0; }
    .footer-section ul li { margin-bottom: 8px; }
    .footer-section ul li a { color: #666; text-decoration: none; transition: color 0.3s; }
    .footer-section ul li a:hover { color: #1976d2; }
    .social-links { display: flex; gap: 15px; }
    .social-link { color: #666; text-decoration: none; transition: color 0.3s; }
    .social-link:hover { color: #1976d2; }
    .footer-bottom { border-top: 1px solid #e0e0e0; padding: 20px; text-align: center; background-color: #e8e8e8; }
    .footer-bottom p { color: #666; margin: 0; }
    @media (max-width: 768px) { .footer-content { grid-template-columns: 1fr; gap: 20px; padding: 20px; } }
  `]
})
export class FooterComponent {}
