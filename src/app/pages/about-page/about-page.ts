import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container container">
      <div class="about-hero">
        <h1 class="page-title">Sobre <span class="brand-text">Nodux</span></h1>
        <p class="subtitle">Profesionalizando la gestión comercial y logística de Pymes y distribuidoras.</p>
      </div>
      
      <div class="about-content">
        <div class="about-text surface">
          <h2>¿Quiénes Somos?</h2>
          <p>En Nodux somos una iniciativa de consultoría operativa y soluciones digitales enfocada en profesionalizar la gestión comercial y logística de Pymes y distribuidoras.</p>
          <p>Conectamos la realidad física del negocio con la ingeniería de datos y la automatización. Entramos a la operación para ordenar inventarios, estandarizar flujos y reemplazar registros manuales o dispersos por herramientas digitales ligeras y tableros de control.</p>
        </div>
        
        <div class="about-text surface highlight-box">
          <h2>Nuestro Propósito</h2>
          <p class="purpose-text">"Ayudar a los dueños y gerentes a eliminar fugas de dinero por mermas o quiebres de stock, permitiéndoles tomar decisiones basadas en números y no en intuición."</p>
        </div>
      </div>
      
      <div class="values-grid">
        <div class="value-card surface">
          <div class="value-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <h3>Soluciones Digitales Ligeras</h3>
          <p>Sin implementaciones pesadas. Entregamos herramientas ágiles y a medida.</p>
        </div>
        <div class="value-card surface">
          <div class="value-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h3>Estandarización de Flujos</h3>
          <p>Ordenamos el caos operativo y reemplazamos registros dispersos.</p>
        </div>
        <div class="value-card surface">
          <div class="value-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <h3>Ingeniería de Datos</h3>
          <p>Decisiones basadas en el análisis riguroso y la realidad del negocio.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      padding-top: 4rem;
      padding-bottom: 6rem;
      animation: fadeIn 0.5s ease-out;
    }
    
    .about-hero {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .page-title {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }
    
    .brand-text {
      color: var(--brand-blue);
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: var(--text-body);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 4rem;
    }
    
    .about-text {
      padding: 2.5rem;
      border-radius: var(--radius-lg);
    }
    
    .about-text h2 {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
      color: var(--brand-blue);
    }
    
    .about-text p {
      font-size: 1.125rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }
    
    .about-text p:last-child {
      margin-bottom: 0;
    }
    
    .highlight-box {
      border: 2px solid var(--brand-blue);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .purpose-text {
      font-size: 1.5rem !important;
      font-weight: 600;
      color: var(--text-dark);
      font-style: italic;
    }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    
    .value-card {
      padding: 2.5rem 2rem;
      text-align: center;
      border-radius: var(--radius-lg);
      transition: var(--transition);
    }
    
    .value-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: var(--brand-blue);
    }
    
    .value-icon {
      width: 64px;
      height: 64px;
      background: rgba(37, 99, 235, 0.1);
      color: var(--brand-blue);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }
    
    .value-card h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    
    .value-card p {
      color: var(--text-body);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .about-content {
        grid-template-columns: 1fr;
      }
      .values-grid {
        grid-template-columns: 1fr;
      }
      .page-title {
        font-size: 2.5rem;
      }
    }
  `]
})
export class AboutPageComponent {}
