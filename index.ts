/// <reference path="./typings/node/node.d.ts"/>

/// <reference path="./typings/selenium-webdriver/selenium-webdriver.d.ts"/>


import wd = require('selenium-webdriver');

module SeleniumMeridian {
    var By = wd.By;
    var until = wd.until;

    var sfd = new wd.Builder()
        .forBrowser('firefox')
        .build();

    console.log("Loading page");
    var alwaysReject = new wd.promise.Promise(() => (res, rej) => rej());

    sfd.get('http://localhost:3001/').then(
        () => {
            console.log("page loaded");

            console.log("enter user name");

            sfd.findElement(By.id('login_username')).then((ele) => {


                ele.sendKeys('hwindhoff');
                console.log("enter password");
                sfd.findElement(By.id('login_password')).sendKeys('xxxxx');
                sfd.findElement(By.id('landing-login')).click();
                console.log("clicked login");
                //sfd.sleep(2000);
                console.log("waiting for modal payment");

                sfd
                    .wait(until.elementLocated(By.id('modal_payment_update_snooze')), 5 * 1000)
                    .then(function(elm) {
                        console.log("closing payment modal");

                        //elm.sendKeys(username);
                        elm.click();


                    })
                    .thenCatch(
                    (reason) => {
                        console.log("payment modal not found");

                        console.log("finding user user-menu-trigger");

                        sfd
                            .wait(until.elementsLocated(By.id('user-menu-trigger')), 5000)
                            .then(
                            (elements) => {
                                console.log("found user-menu-triggers");
                                elements.forEach((ele) => {
                                    if (ele) {
                                        ele.click();
                                        console.log("clicked user-menu-triggers");
                                        //sfd.wait(until.titleIs('wewillnotfindthis'), 5000);

                                        sfd.wait(until.elementLocated(By.className('user-popup-item')), 4000)
                                            .then(
                                            (upiEles) => {
                                                //  upiEles.forEach((upiEl) => {
                                                upiEles.click();

                                                console.log("clicked user-popup-item");
                                                sfd.wait(alwaysReject, 500)
                                                    .thenCatch(
                                                    () => {
                                                        sfd.wait(until.elementLocated(By.id('admin_switch_username')), 4000)
                                                            .then(
                                                            (adminUNInput) => {
                                                                adminUNInput.sendKeys('lwalter');
                                                                sfd.findElement(By.id('btn-switch-user')).click();

                                                                sfd.wait(alwaysReject, 7000);
                                                                sfd.quit();
                                                                console.log("quit");
                                                            }
                                                            )
                                                            .thenCatch(
                                                            (reason) => {
                                                                console.log(reason);
                                                            }
                                                            );
                                                    });
                                                //  });
                                            }
                                            );

                                        // ele.getAttribute('data-item').then(
                                        //     (attr) => {
                                        //         if (attr === 'userswitch') {
                                        //             ele.click();
                                        //             // sfd.quit();
                                        //             // console.log("quit");
                                        //
                                        //         }
                                        //     }  );
                                    }
                                });
                            });
                    });
                //sfd.findElement(By.id('modal_payment_update_snooze')).click();
                //. getAttribute("data-item")  .click();
                // sfd.findElement(By.name('q')).sendKeys('webdriver');
                // sfd.findElement(By.name('btnG')).click();
                // sfd.wait(until.titleIs('webdriver - Google Search'), 1000);


            });
        }
    );

}
