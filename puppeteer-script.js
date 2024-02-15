/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage();
  console.log('in');
  await page.goto('http://localhost:3000/signin');
  await page.type('#email', 'test123@codeit.com');
  await page.type('#password', 'test12345');
  await page.click('[type="submit"]');
  await page.waitForNavigation();
  await page.close();
};
