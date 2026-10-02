import { Page,Locator } from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';

export abstract class CurrencyPage extends BasePage_SOLID {
    readonly dropdownCurrency:Locator;
    constructor(page: Page) {
        super(page);
        this.dropdownCurrency=page.getByRole('combobox',{name:'Select Currency'});
    }

    async selectCurrency(currency:string):Promise<void> {
        await this.dropdownCurrency.selectOption(currency);
    }
}