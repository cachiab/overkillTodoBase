import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { MatSlideToggle } from '@angular/material/slide-toggle';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MatIcon, MatToolbar, MatSlideToggle],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).not.toBeNull();
  });

  it('should render title', () => {
    expect(
      fixture.debugElement.query(By.css('mat-toolbar a')).nativeElement.innerText
    ).toContain('Overkill Todo App');
  });

  it('should display the light theme by default', async() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const themeButton = fixture.debugElement.query(By.css('mat-slide-toggle'));
      const body = fixture.debugElement.query(By.css('body'));
      expect(themeButton).not.toHaveClass('mat-checked');
      expect(body).not.toBeNull();
      expect(body).toHaveClass('theme-light');
    });
  });

  it('should switch dark or light mode theme when the nightToggle button is checked or unchecked', async() =>{
    const themeButton = fixture.debugElement.query(By.css('mat-slide-toggle'));
    const body = fixture.debugElement.query(By.css('body'));
    const onDarkModeSwitchedSpy = spyOn(fixture.componentInstance,'onDarkModeSwitched').and.callThrough();
    
    // Check a switch to dark mode...
    themeButton.triggerEventHandler('change',null);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(onDarkModeSwitchedSpy).toHaveBeenCalledWith(false);
        expect(themeButton).not.toBeNull();
        expect(themeButton).toHaveClass('mat-checked');
        expect(body).not.toBeNull();
        expect(body).toHaveClass('theme-dark');
      });
    });

    // ... Then check a switch to light mode...
    themeButton.triggerEventHandler('change',null);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(onDarkModeSwitchedSpy).toHaveBeenCalledWith(true);
        expect(themeButton).not.toBeNull();
        expect(themeButton).not.toHaveClass('mat-checked');
        expect(body).not.toBeNull();
        expect(body).toHaveClass('theme-light');
      });
    });
  });
});
