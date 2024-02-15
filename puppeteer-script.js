/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/signin');
  await page.type('#username', 'admin');
  await page.type('#password', 'password');
  await page.click('[type="submit"]');
  await page.waitForNavigation();
};
