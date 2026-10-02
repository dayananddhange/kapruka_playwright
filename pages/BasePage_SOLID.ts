import {Page,Locator} from '@playwright/test';
export abstract class BasePage_SOLID {
    readonly page:Page;
    constructor(page:Page) {
        this.page=page;
    }
    async navigate(url:string):Promise<void> {
        await this.page.goto(url);
    }
    async click(locator:Locator):Promise<void> {
        await locator.click();
    }

    async fill(locator:Locator,value:string):Promise<void> {
        await locator.fill(value);
    }

    abstract isLoaded():Promise<void>;
}