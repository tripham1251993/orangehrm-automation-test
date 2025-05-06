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
      await homePage.waitForLoginSuccess(60000)
    })

    // eslint-disable-next-line
    test('Should be able to filter all menu', async ({ page }) => {
      await globalMenu.search('Admin')
      await globalMenu.adminMenu.waitFor({ state: 'visible', timeout: 10000 })
      expect(await globalMenu.adminMenu.isVisible()).toBeTruthy()

      await globalMenu.search('PIM')
      await globalMenu.pimMenu.waitFor({ state: 'visible', timeout: 10000 })
      expect(await globalMenu.pimMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Leave')
      await globalMenu.leaveMenu.waitFor({ state: 'visible', timeout: 10000 })
      expect(await globalMenu.leaveMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Time')
      await globalMenu.timeMenu.waitFor({ state: 'visible', timeout: 10000 })
      expect(await globalMenu.timeMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Recruitment')
      await globalMenu.recruitmentMenu.waitFor({
        state: 'visible',
        timeout: 10000,
      })
      expect(await globalMenu.recruitmentMenu.isVisible()).toBeTruthy()

      await globalMenu.search('My Info')
      await globalMenu.myInfoMenu.waitFor({ state: 'visible', timeout: 10000 })
      expect(await globalMenu.myInfoMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Performance')
      await globalMenu.performanceMenu.waitFor({
        state: 'visible',
        timeout: 10000,
      })
      expect(await globalMenu.performanceMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Dashboard')
      await globalMenu.dashboardMenu.waitFor({
        state: 'visible',
        timeout: 10000,
      })
      expect(await globalMenu.dashboardMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Maintenance')
      await globalMenu.maintenanceMenu.waitFor({
        state: 'visible',
        timeout: 10000,
      })
      expect(await globalMenu.maintenanceMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Claim')
      await globalMenu.claimMenu.waitFor({ state: 'visible', timeout: 10000 })
      expect(await globalMenu.claimMenu.isVisible()).toBeTruthy()

      await globalMenu.search('Buzz')
      await globalMenu.buzzMenu.waitFor({ state: 'visible', timeout: 10000 })
      expect(await globalMenu.buzzMenu.isVisible()).toBeTruthy()
    })
  }
)
