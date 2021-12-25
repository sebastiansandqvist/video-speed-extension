"use strict";
const foo = 'foo';
console.log(foo);
chrome.runtime.onInstalled.addListener(() => {
    console.log('installed!!');
});
