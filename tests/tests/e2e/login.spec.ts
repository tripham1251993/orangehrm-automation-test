import { test, expect } from '@playwright/test'
import { HomePage } from '../../pageObjects/homePage'
import { GlobalMenu } from '../../pageObjects/globalMenu'

test.describe(
  'Login Page Tests',
  { tag: ['@e2e', '@regression', '@login'] },
  () => {
    let homePage: HomePage
    let globalMenu: GlobalMenu
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page)
      globalMenu = new GlobalMenu(page)
      await homePage.navigateTo()
    })

    test('Should login successfully with valid credential', async ({
      page,
    }) => {
      await homePage.login('Admin', 'admin123')
      await homePage.waitForLoginSuccess(30000)
      const url = page.url()
      expect(url).toContain('/dashboard/index')
      await globalMenu.verifyMenuIsActive(globalMenu.dashboardMenu)
    })
  }
)
