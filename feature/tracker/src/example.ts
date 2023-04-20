// import { init }from '../dist/tracker.js'
import { init }from '../lib/main'
import Vue from 'vue/dist/vue.esm.js';

init({
  api: 'http://192.168.9.95/bp',
  appId: '______PIG_______',
  maxTraceLength: 8,
  debug: true,
  // uninstall: ['XHR'],
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1>Hello Tracker</h1>
`
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#script-error').addEventListener('click', () => {
    const script = document.createElement('script');
    script.src = 'https://test-lib.js'
    document.body.append(script)
  });

  document.querySelector('#link-error').addEventListener('click', () => {
    var head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link');
    link.href = 'daskjfhasljkfasf.css'
    link.setAttribute('rel','stylesheet');
    link.setAttribute('media','all');
    link.setAttribute('type','text/css');
    head.appendChild(link)
  });

  document.querySelector('#js-error-RangeError').addEventListener('click', () => {
    new Array(Number.MAX_SAFE_INTEGER)
  });

  document.querySelector('#js-error-ReferenceError').addEventListener('click', () => {
    let foo;
    foo.test()
  });

  document.querySelector('#console-log-test').addEventListener('click', () => {
    console.log('log.test')
  });

  document.querySelector('#unhandledrejection-test').addEventListener('click', () => {
    new Promise((resolve, reject) => {
      reject('without rejection');
    }).then(() => {});
  });

  document.querySelector('#history-test').addEventListener('click', () => {
    history.pushState(null, null, `/history-test?d=${Math.random()}`);
  });

  document.querySelector('#hashChange-test').addEventListener('click', () => {
    location.hash = `#/hash-test?d=${Math.random()}`
  });

  document.querySelector('#get-success').addEventListener('click', () => {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 3000;
    xhr.open('get', 'https://developwmsc.lcsc.com/wmsc/home/index?name=test');
    xhr.send();
  });

  document.querySelector('#post-error').addEventListener('click', () => {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 3000;
    const data = JSON.stringify({
      name: 'xxxxxxxxxx',
      age: 30
    })
    xhr.open('post', 'http://www.test.com:8000/login');
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    xhr.send(data);
  });

  document.querySelector('#exception-hint').addEventListener('click', () => {
    class CustomError extends Error {
      constructor(...args) {
        super(...args);
        this.name = 'CustomError';
      }
      someMethodAttachedToOurCustomError() {
        return new Promise(resolve => {
          resolve('some data, who knows what exactly');
        });
      }
    }

    throw new CustomError('Hey there');
  });

  document.querySelector('#breadcrumb-hint').addEventListener('click', () => {});
});


import { VueTracker } from '../lib/vue/index'
Vue.use(VueTracker)
var app = new Vue({
  el: '#vue-ele',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    doIt() {
      return x;
    }
  },
})