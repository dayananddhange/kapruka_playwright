import {Page,Locator} from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';
import {expect} from '@playwright/test';


export class LoginPage_SOLID extends BasePage_SOLID {
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;

    constructor(page:Page) {
        super(page);
        this.emailInput = page.locator('#exampleInputEmail1');
        this.passwordInput= page.locator('#exampleInputPassword1');
        this.loginButton=page.getByRole('button',{name:'Login'});
    }

    async login(uname:string,password:string):Promise<void> {
        await this.emailInput.fill(uname);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLoaded():Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}