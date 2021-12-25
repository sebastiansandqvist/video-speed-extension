const foo: string = 'foo';
console.log(foo);


chrome.runtime.onInstalled.addListener(() => {
  console.log('installed!!');
});
