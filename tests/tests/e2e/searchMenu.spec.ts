import { test, expect } from '@playwright/test'
import { HomePage } from '../../pageObjects/homePage'
import { GlobalMenu } from '../../pageObjects/globalMenu'

test.describe(
  'Search Menu Tests',
  { tag: ['@e2e', '@regression', '@seachMenu'] },
  () => {
    let homePage: HomePage
    let globalMenu: GlobalMenu
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page)
      globalMenu = new GlobalMenu(page)
      await homePage.navigateTo()
      await homePage.login('Admin', 'admin123')
      await homePage.waitForLoginSuccess(10000)
      await globalMenu.waitForPageLoaded(30000)
    })

    // eslint-disable-next-line
    test('Should be able to filter all menu', async ({ page }) => {
      const menuNames = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Maintenance',
        'Claim',
        'Buzz',
      ]

      await globalMenu.waitForElementEditable(globalMenu.searchInput, 30000)

      menuNames.forEach(async (menuName) => {
        await globalMenu.search(menuName)
        const menu = globalMenu.getMenuByName(menuName)
        await menu.waitFor({ state: 'visible', timeout: 10000 })
        expect(await menu.isVisible()).toBeTruthy()
      })
    })
  }
)
