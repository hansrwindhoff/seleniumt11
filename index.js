/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/selenium-webdriver/selenium-webdriver.d.ts"/>
var wd = require('selenium-webdriver');
var By = wd.By;
var until = wd.until;
var sfd = new wd.Builder()
    .forBrowser('firefox')
    .build();
sfd.get('http://localhost:3000/');
sfd.findElement(By.id('login_username')).sendKeys('xxxxxxxx');
sfd.findElement(By.id('login_password')).sendKeys('xxxxxxxx');
sfd.findElement(By.id('landing-login')).click();
sfd.sleep(2000);
sfd.findElement(By.id('modal_payment_update_snooze')).click();
sfd.findElements(By.className('user-popup-item')).then(function (elements) {
    elements.forEach(function (ele) {
        if (ele) {
            ele.getAttribute('data-item').then(function (attr) {
                if (attr === 'userswitch') {
                    ele.click();
                }
            });
        }
    });
});
//. getAttribute("data-item")  .click();
// sfd.findElement(By.name('q')).sendKeys('webdriver');
// sfd.findElement(By.name('btnG')).click();
// sfd.wait(until.titleIs('webdriver - Google Search'), 1000);
sfd.sleep(40000);
sfd.quit();
