/*
 *  nano Browser plugin v1.0
 *  http://nanojs.org/plugins/browser
 *
 *  Copyright (c) 2008-2015 James Watts
 *  https://github.com/jameswatts
 *
 *  This is FREE software, licensed under the GPL
 *  http://www.gnu.org/licenses/gpl.html
 */

if (nano) {
	nano.plugin({}, function() {
		this.browser = {
			agent: null,
			engine: null,
			version: null,
			script: 0,
			cookie: false,
			platform: null,
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			page: {
				x: 0,
				y: 0,
				w: 0,
				h: 0
			},
			event: null,
			button: null,
			key: null,
			mouse: function _mouse(e) {
				e = window.event || e;
				nano.browser.event = e;
				nano.browser.x = e.clientX;
				nano.browser.y = e.clientY;
				if ((nano.isset(e.which) && e.which === 1) || e.button === 0) {
					nano.browser.button = 'left';
				} else if ((nano.isset(e.which) && e.which === 2) || e.button === 2) {
					nano.browser.button = 'right';
				} else if ((nano.isset(e.which) && e.which === 4) || e.button === 1) {
					nano.browser.button = 'middle';
				} else {
					nano.browser.button = 'other';
				}
			},
			keyboard: function _keyboard(e) {
				e = window.event || e;
				nano.browser.event = e;
				nano.browser.key = (nano.isset(e.which))? e.which : e.keyCode;
			},
			screen: function _screen() {
				if (typeof window.innerWidth === 'number') {
					nano.browser.w = window.innerWidth;
					nano.browser.h = window.innerHeight;
				} else if (nano.isset(document.documentElement) && typeof document.documentElement.clientWidth === 'number') {
					nano.browser.w = document.documentElement.clientWidth;
					nano.browser.h = document.documentElement.clientHeight;
				}
				nano.browser.page.w = document.body.scrollWidth;
				nano.browser.page.h = document.body.scrollHeight;
			},
			scroll: function _scroll() {
				if (typeof window.pageYOffset == 'number') {
					nano.browser.page.x = window.pageXOffset;
					nano.browser.page.y = window.pageYOffset;
				} else if (document.body && typeof document.body.scrollTop === 'number') {
					nano.browser.page.x = document.body.scrollLeft;
					nano.browser.page.y = document.body.scrollTop;
				} else if (document.documentElement && typeof document.documentElement.scrollTop === 'number') {
					nano.browser.page.x = document.documentElement.scrollLeft;
					nano.browser.page.y = document.documentElement.scrollTop;
				}
			},
			detect: function _detect() {
				if (/firefox/i.test(navigator.userAgent)) {
					this.agent = 'firefox';
					this.engine = 'gecko';
				} else if (/seamonkey/i.test(navigator.userAgent)) {
					this.agent = 'seamonkey';
					this.engine = 'gecko';
				} else if (/flock/i.test(navigator.userAgent)) {
					this.agent = 'flock';
					this.engine = 'gecko';
				} else if (/chrome/i.test(navigator.userAgent)) {
					this.agent = 'chrome';
					this.engine = 'webkit';
				} else if (/camino/i.test(navigator.userAgent)) {
					this.agent = 'camino';
					this.engine = 'gecko';
				} else if (/apple/i.test(navigator.vendor)) {
					this.agent = 'safari';
					this.engine = 'webkit';
				} else if (window.opera) {
					this.agent = 'opera';
					this.engine = 'presto';
				} else if (/kde/i.test(navigator.vendor)) {
					this.agent = 'konqueror';
					this.engine = 'khtml';
				} else if (/MSIE/i.test(navigator.userAgent)) {
					this.agent = 'msie';
					this.engine = 'trident';
				}
				if (this.engine === 'gecko') {
					/firefox[\/\s](\d+\.\d+)/i.test(navigator.userAgent);
					this.version = RegExp.$1;
				} else if (this.engine === 'presto') {
					/opera[\/\s](\d+\.\d+)/i.test(navigator.userAgent);
					this.version = RegExp.$1;
				} else if (this.agent === 'chrome') {
					/chrome[\/\s](\d+\.\d+)/i.test(navigator.userAgent);
					this.version = RegExp.$1;
				} else if (this.agent === 'safari') {
					/version[\/\s](\d+\.\d+)/i.test(navigator.userAgent);
					this.version = RegExp.$1;
				} else if (this.engine === 'khtml') {
					/khtml[\/\s](\d+\.\d+)/i.test(navigator.userAgent);
					this.version = RegExp.$1;
				} else if (this.engine === 'trident') {
					/msie(\d+\.\d+)/i.test(navigator.userAgent);
					this.version = RegExp.$1;
				}
				if (/linux/i.test(navigator.platform)) {
					this.platform = 'linux';
				} else if (/freebsd/i.test(navigator.platform)) {
					this.platform = 'freebsd';
				} else if (/openbsd/i.test(navigator.platform)) {
					this.platform = 'openbsd';
				} else if (/openvms/i.test(navigator.platform)) {
					this.platform = 'openvms';
				} else if (/irix/i.test(navigator.platform)) {
					this.platform = 'irix';
				} else if (/hp\-ux/i.test(navigator.platform)) {
					this.platform = 'hp-ux';
				} else if (/unix/i.test(navigator.platform) || /x11/i.test(navigator.platform)) {
					this.platform = 'unix';
				} else if (/mac/i.test(navigator.platform)) {
					this.platform = 'mac';
				} else if (/sunos/i.test(navigator.platform)) {
					this.platform = 'sunos';
				} else if (/win/i.test(navigator.platform)) {
					this.platform = 'windows';
				} else if (/palmos/i.test(navigator.platform)) {
					this.platform = 'palm';
				} else if (/symbian/i.test(navigator.platform)) {
					this.platform = 'symbian';
				}
				if (this.agent === 'msie' && (this.version > 2 && this.version < 4)) {
					this.script = 1.0;
				} else if (this.agent === 'msie' && (this.version > 3 && this.version < 5)) {
					this.script = 1.2;
				} else if (this.agent === 'msie' && this.platform !== 'mac' && this.version > 4) {
					this.script = 1.3;
				} else if (this.agent === 'msie' && this.platform === 'mac' && this.version > 4) {
					this.script = 1.4;
				} else if (this.agent === 'opera' && this.version < 5) {
					this.script = 1.1;
				} else if (this.agent === 'opera' && (this.version > 4 || this.version < 7)) {
					this.script = 1.3;
				} else if (this.agent === 'opera' && this.version > 6) {
					this.script = 1.5;
				} else if (this.engine === 'khtml') {
					this.script = 1.5;
				} else if (this.engine === 'gecko' && this.version < 1.5) {
					this.script = 1.5;
				} else if (this.engine === 'gecko' && (this.version > 1 && this.version < 2)) {
					this.script = 1.6;
				} else if (this.engine === 'gecko' && (this.version > 1.5 && this.version < 3)) {
					this.script = 1.7;
				} else if (this.engine === 'gecko' && (this.version > 2 && this.version < 4)) {
					this.script = 1.8;
				} else if (this.agent === 'chrome') {
					this.script = 1.7;
				} else if (this.agent === 'safari' && (this.version > 2 && this.version < 3.2)) {
					this.script = 1.6;
				} else if (this.agent === 'safari' && this.version > 3.1) {
					this.script = 1.7;
				}
				if (navigator.cookieEnabled) this.cookie = true;
				if (document.addEventListener) {
					document.addEventListener('mousemove', nano.browser.mouse, true);
					document.addEventListener('mousedown', nano.browser.mouse, true);
					document.addEventListener('keydown', nano.browser.keyboard, true);
					window.addEventListener('resize', nano.browser.screen, true);
					window.addEventListener('scroll', nano.browser.scroll, true);
				} else if (document.attachEvent) {
					document.attachEvent('onmousemove', nano.browser.mouse);
					document.attachEvent('onmousedown', nano.browser.mouse);
					document.attachEvent('onkeydown', nano.browser.keyboard);
					window.attachEvent('onresize', nano.browser.screen);
					window.attachEvent('onscroll', nano.browser.scroll);
				} else {
					document.onmousemove = function(e) {
						nano.browser.mouse(e);
					};
					document.onmousedown = function(e) {
						nano.browser.mouse(e);
					};
					document.onkeydown = function(e) {
						nano.browser.keyboard(e);
					};
					window.onresize = function(e) {
						nano.browser.screen(e);
					};
					window.onscroll = function(e) {
						nano.browser.scroll(e);
					};
				}
			}
		};
		this.browser.detect();
		nano(function() {
			nano.browser.screen();
			nano.browser.scroll();
		});
	});
}
