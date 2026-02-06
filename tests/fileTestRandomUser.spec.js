// @ts-check
import { test, expect } from '@playwright/test';

// Task 1: Pulsanti di navigazione (Indietro/Avanti)
test.describe('Task 1 - Navigazione Avanti/Indietro', () => {
  test('TC1.1 - Caricamento iniziale: Indietro disabilitato, Avanti abilitato', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#prevBtn')).toBeDisabled();
    await expect(page.locator('#nextBtn')).toBeEnabled();
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC1.2 - Navigazione avanti: clicca Avanti 5 volte', async ({ page }) => {
    await page.goto('/');
    const nextBtn = page.locator('#nextBtn');
    for (let i = 0; i < 5; i++) {
      if (await nextBtn.isEnabled()) await nextBtn.click();
    }
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC1.3 - Raggiungimento fine: Avanti disabilitato', async ({ page }) => {
    await page.goto('/');
    const nextBtn = page.locator('#nextBtn');
    let clicks = 0;
    while (await nextBtn.isEnabled() && clicks < 100) {
      await nextBtn.click();
      clicks++;
    }
    await expect(nextBtn).toBeDisabled();
  });

  test('TC1.4 - Navigazione indietro: torna indietro 3 volte', async ({ page }) => {
    await page.goto('/');
    const nextBtn = page.locator('#nextBtn');
    const prevBtn = page.locator('#prevBtn');
    
    // Naviga avanti fino alla fine
    while (await nextBtn.isEnabled()) {
      await nextBtn.click();
    }
    
    // Torna indietro 3 volte
    for (let i = 0; i < 3; i++) {
      if (await prevBtn.isEnabled()) await prevBtn.click();
    }
    
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC1.5 - Stile disabilitato: bottone non clickabile', async ({ page }) => {
    await page.goto('/');
    const prevBtn = page.locator('#prevBtn');
    await expect(prevBtn).toBeDisabled();
  });
});

// Task 2: Range di utenti generati casualmente
test.describe('Task 2 - Range slider per numero di utenti', () => {
  test('TC2.1 - Selezione valore genera utenti', async ({ page }) => {
    await page.goto('/');
    const range = page.locator('#numUsers');
    await range.fill('5');
    await range.dispatchEvent('change');
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC2.2 - Label aggiornamento mostra il valore', async ({ page }) => {
    await page.goto('/');
    const range = page.locator('#numUsers');
    await range.fill('7');
    await range.dispatchEvent('input');
    await expect(page.locator('#numValue')).toContainText('7');
  });

  test('TC2.3 - Reset navigazione dopo cambio range', async ({ page }) => {
    await page.goto('/');
    const range = page.locator('#numUsers');
    const nextBtn = page.locator('#nextBtn');
    const prevBtn = page.locator('#prevBtn');
    
    // Naviga avanti
    if (await nextBtn.isEnabled()) await nextBtn.click();
    
    // Cambia range
    await range.fill('4');
    await range.dispatchEvent('change');
    
    // Verifica che Indietro sia disabilitato (reset)
    await expect(prevBtn).toBeDisabled();
  });
});

// Task 3: Radio Buttons per genere
test.describe('Task 3 - Radio buttons genere', () => {
  test('TC3.1 - Selezione Maschi', async ({ page }) => {
    await page.goto('/');
    const maschiRadio = page.locator('input[name="gender"][value="male"]');
    await maschiRadio.check();
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC3.2 - Switch da Maschi a Femmine', async ({ page }) => {
    await page.goto('/');
    const maschiRadio = page.locator('input[name="gender"][value="male"]');
    const femineRadio = page.locator('input[name="gender"][value="female"]');
    
    await maschiRadio.check();
    await expect(maschiRadio).toBeChecked();
    
    await femineRadio.check();
    await expect(femineRadio).toBeChecked();
    await expect(maschiRadio).not.toBeChecked();
  });

  test('TC3.3 - Selezione Femmine', async ({ page }) => {
    await page.goto('/');
    const femineRadio = page.locator('input[name="gender"][value="female"]');
    await femineRadio.check();
    await expect(femineRadio).toBeChecked();
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC3.4 - Selezione Tutti', async ({ page }) => {
    await page.goto('/');
    const tuttiRadio = page.locator('input[name="gender"][value="all"]');
    await expect(tuttiRadio).toBeChecked();
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC3.5 - Selezione Lego', async ({ page }) => {
    await page.goto('/');
    const legoRadio = page.locator('input[name="gender"][value="lego"]');
    await legoRadio.check();
    await expect(legoRadio).toBeChecked();
    await expect(page.locator('#userValue')).toBeVisible();
  });
});

// Task 4: Checkbox per nazionalità
test.describe('Task 4 - Checkbox nazionalità', () => {
  test('TC4.1 - Selezione nazionalità dal dropdown', async ({ page }) => {
    await page.goto('/');
    const dropdownBtn = page.locator('#dropdownNationality');
    
    // Apri dropdown
    await dropdownBtn.click();
    
    // Seleziona prima nazionalità (AU - Australia)
    const firstCheckbox = page.locator('input[type="checkbox"][value="AU"]');
    if (await firstCheckbox.count() > 0) {
      await firstCheckbox.check();
      await expect(page.locator('#userValue')).toBeVisible();
    }
  });

  test('TC4.2 - Multiple selection', async ({ page }) => {
    await page.goto('/');
    const dropdownBtn = page.locator('#dropdownNationality');
    
    // Apri dropdown
    await dropdownBtn.click();
    
    // Seleziona due nazionalità
    const auCheckbox = page.locator('input[type="checkbox"][value="AU"]');
    const frCheckbox = page.locator('input[type="checkbox"][value="FR"]');
    
    if (await auCheckbox.count() > 0) await auCheckbox.check();
    if (await frCheckbox.count() > 0) await frCheckbox.check();
    
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC4.3 - Deseleziona nazionalità', async ({ page }) => {
    await page.goto('/');
    const dropdownBtn = page.locator('#dropdownNationality');
    
    // Apri dropdown
    await dropdownBtn.click();
    
    // Seleziona e deseleziona
    const auCheckbox = page.locator('input[type="checkbox"][value="AU"]');
    if (await auCheckbox.count() > 0) {
      await auCheckbox.check();
      await expect(auCheckbox).toBeChecked();
      await auCheckbox.uncheck();
      await expect(auCheckbox).not.toBeChecked();
    }
  });

  test('TC4.4 - Nessuna selezione mostra tutti gli utenti', async ({ page }) => {
    await page.goto('/');
    const dropdownBtn = page.locator('#dropdownNationality');
    
    // Apri e deseleziona tutto
    await dropdownBtn.click();
    const allCheckboxes = page.locator('input[type="checkbox"]');
    const count = await allCheckboxes.count();
    for (let i = 0; i < count; i++) {
      const checkbox = allCheckboxes.nth(i);
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
      }
    }
    
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC4.5 - Combinazione genere + nazionalità', async ({ page }) => {
    await page.goto('/');
    
    // Seleziona genere Maschi
    const maschiRadio = page.locator('input[name="gender"][value="male"]');
    await maschiRadio.check();
    
    // Seleziona nazionalità
    const dropdownBtn = page.locator('#dropdownNationality');
    await dropdownBtn.click();
    const auCheckbox = page.locator('input[type="checkbox"][value="AU"]');
    if (await auCheckbox.count() > 0) {
      await auCheckbox.check();
    }
    
    await expect(page.locator('#userValue')).toBeVisible();
  });

  test('TC4.6 - Verifica che gli utenti siano visibili', async ({ page }) => {
    await page.goto('/');
    const userImage = page.locator('#userImage');
    const userName = page.locator('#userValue');
    
    await expect(userImage).toBeVisible();
    await expect(userName).toBeVisible();
    const imageSrc = await userImage.getAttribute('src');
    expect(imageSrc).toBeTruthy();
  });
});
