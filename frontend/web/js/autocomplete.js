var t, e;
t = this, e = function () {
    "use strict";

    function t(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function e(e) {
        for (var n = 1; n < arguments.length; n++) {
            var i = null != arguments[n] ? arguments[n] : {};
            n % 2 ? t(Object(i), !0).forEach((function (t) {
                r(e, t, i[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : t(Object(i)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
            }))
        }
        return e
    }

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function r(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function i(t) {
        return function (t) {
            if (Array.isArray(t)) return s(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || o(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function o(t, e) {
        if (t) {
            if ("string" == typeof t) return s(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(t, e) : void 0
        }
    }

    function s(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    var u = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t()
    }, a = function (t, e) {
        var n = "string" == typeof t ? document.createElement(t) : t;
        for (var r in e) {
            var i = e[r];
            if ("inside" === r) i.append(n); else if ("dest" === r) u(i[0]).insertAdjacentElement(i[1], n); else if ("around" === r) {
                var o = i;
                o.parentNode.insertBefore(n, o), n.append(o), null != o.getAttribute("autofocus") && o.focus()
            } else r in n ? n[r] = i : n.setAttribute(r, i)
        }
        return n
    }, c = function (t, e) {
        return t = t.toString().toLowerCase(), e ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : t
    }, l = function (t, n) {
        return a("mark", e({innerHTML: t}, "string" == typeof n && {class: n})).outerHTML
    }, f = function (t, e) {
        e.input.dispatchEvent(new CustomEvent(t, {bubbles: !0, detail: e.feedback, cancelable: !0}))
    }, p = function (t, e, n) {
        var r = n || {}, i = r.mode, o = r.diacritics, s = r.highlight, u = c(e, o);
        if (e = e.toString(), t = c(t, o), "loose" === i) {
            var a = (t = t.replace(/ /g, "")).length, f = 0, p = Array.from(e).map((function (e, n) {
                return f < a && u[n] === t[f] && (e = s ? l(e, s) : e, f++), e
            })).join("");
            if (f === a) return p
        } else {
            var d = u.indexOf(t);
            if (~d) return t = e.substring(d, d + t.length), d = s ? e.replace(t, l(t, s)) : e
        }
    }, d = function (t, e) {
        return new Promise((function (n, r) {
            var i;
            return (i = t.data).cache && i.store ? n() : new Promise((function (t, n) {
                return "function" == typeof i.src ? i.src(e).then(t, n) : t(i.src)
            })).then((function (e) {
                try {
                    return t.feedback = i.store = e, f("response", t), n()
                } catch (t) {
                    return r(t)
                }
            }), r)
        }))
    }, h = function (t, e) {
        var n = e.data, r = e.searchEngine, i = [];
        n.store.forEach((function (s, u) {
            var a = function (n) {
                var o = n ? s[n] : s, u = "function" == typeof r ? r(t, o) : p(t, o, {
                    mode: r,
                    diacritics: e.diacritics,
                    highlight: e.resultItem.highlight
                });
                if (u) {
                    var a = {match: u, value: s};
                    n && (a.key = n), i.push(a)
                }
            };
            if (n.keys) {
                var c, l = function (t, e) {
                    var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (!n) {
                        if (Array.isArray(t) || (n = o(t)) || e && t && "number" == typeof t.length) {
                            n && (t = n);
                            var r = 0, i = function () {
                            };
                            return {
                                s: i, n: function () {
                                    return r >= t.length ? {done: !0} : {done: !1, value: t[r++]}
                                }, e: function (t) {
                                    throw t
                                }, f: i
                            }
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }
                    var s, u = !0, a = !1;
                    return {
                        s: function () {
                            n = n.call(t)
                        }, n: function () {
                            var t = n.next();
                            return u = t.done, t
                        }, e: function (t) {
                            a = !0, s = t
                        }, f: function () {
                            try {
                                u || null == n.return || n.return()
                            } finally {
                                if (a) throw s
                            }
                        }
                    }
                }(n.keys);
                try {
                    for (l.s(); !(c = l.n()).done;) a(c.value)
                } catch (t) {
                    l.e(t)
                } finally {
                    l.f()
                }
            } else a()
        })), n.filter && (i = n.filter(i));
        var s = i.slice(0, e.resultsList.maxResults);
        e.feedback = {query: t, matches: i, results: s}, f("results", e)
    }, m = "aria-expanded", b = "aria-activedescendant", y = "aria-selected", v = function (t, n) {
        t.feedback.selection = e({index: n}, t.feedback.results[n])
    }, g = function (t) {
        t.isOpen || ((t.wrapper || t.input).setAttribute(m, !0), t.list.removeAttribute("hidden"), t.isOpen = !0, f("open", t))
    }, w = function (t) {
        t.isOpen && ((t.wrapper || t.input).setAttribute(m, !1), t.input.setAttribute(b, ""), t.list.setAttribute("hidden", ""), t.isOpen = !1, f("close", t))
    }, O = function (t, e) {
        var n = e.resultItem, r = e.list.getElementsByTagName(n.tag), o = !!n.selected && n.selected.split(" ");
        if (e.isOpen && r.length) {
            var s, u, a = e.cursor;
            t >= r.length && (t = 0), t < 0 && (t = r.length - 1), e.cursor = t, a > -1 && (r[a].removeAttribute(y), o && (u = r[a].classList).remove.apply(u, i(o))), r[t].setAttribute(y, !0), o && (s = r[t].classList).add.apply(s, i(o)), e.input.setAttribute(b, r[e.cursor].id), e.list.scrollTop = r[t].offsetTop - e.list.clientHeight + r[t].clientHeight + 5, e.feedback.cursor = e.cursor, v(e, t), f("navigate", e)
        }
    }, A = function (t) {
        O(t.cursor + 1, t)
    }, k = function (t) {
        O(t.cursor - 1, t)
    }, L = function (t, e, n) {
        (n = n >= 0 ? n : t.cursor) < 0 || (t.feedback.event = e, v(t, n), f("selection", t), w(t))
    };

    function j(t, n) {
        var r = this;
        return new Promise((function (i, o) {
            var s, u;
            return s = n || ((u = t.input) instanceof HTMLInputElement || u instanceof HTMLTextAreaElement ? u.value : u.innerHTML), function (t, e, n) {
                return e ? e(t) : t.length >= n
            }(s = t.query ? t.query(s) : s, t.trigger, t.threshold) ? d(t, s).then((function (n) {
                try {
                    return t.feedback instanceof Error ? i() : (h(s, t), t.resultsList && function (t) {
                        var n = t.resultsList, r = t.list, i = t.resultItem, o = t.feedback, s = o.matches,
                            u = o.results;
                        if (t.cursor = -1, r.innerHTML = "", s.length || n.noResults) {
                            var c = new DocumentFragment;
                            u.forEach((function (t, n) {
                                var r = a(i.tag, e({
                                    id: "".concat(i.id, "_").concat(n),
                                    role: "option",
                                    innerHTML: t.match,
                                    inside: c
                                }, i.class && {class: i.class}));
                                i.element && i.element(r, t)
                            })), r.append(c), n.element && n.element(r, o), g(t)
                        } else w(t)
                    }(t), c.call(r))
                } catch (t) {
                    return o(t)
                }
            }), o) : (w(t), c.call(r));

            function c() {
                return i()
            }
        }))
    }

    var S = function (t, e) {
        for (var n in t) for (var r in t[n]) e(n, r)
    }, T = function (t) {
        var n, r, i, o = t.events, s = (n = function () {
            return j(t)
        }, r = t.debounce, function () {
            clearTimeout(i), i = setTimeout((function () {
                return n()
            }), r)
        }), u = t.events = e({input: e({}, o && o.input)}, t.resultsList && {list: o ? e({}, o.list) : {}}), a = {
            input: {
                input: function () {
                    s()
                }, keydown: function (e) {
                    !function (t, e) {
                        switch (t.keyCode) {
                            case 40:
                            case 38:
                                t.preventDefault(), 40 === t.keyCode ? A(e) : k(e);
                                break;
                            case 13:
                                e.submit || t.preventDefault(), e.cursor >= 0 && L(e, t);
                                break;
                            case 9:
                                e.resultsList.tabSelect && e.cursor >= 0 && L(e, t);
                                break;
                            case 27:
                                e.input.value = "", w(e)
                        }
                    }(e, t)
                }, blur: function () {
                    w(t)
                }
            }, list: {
                mousedown: function (t) {
                    t.preventDefault()
                }, click: function (e) {
                    !function (t, e) {
                        var n = e.resultItem.tag.toUpperCase(), r = Array.from(e.list.querySelectorAll(n)),
                            i = t.target.closest(n);
                        i && i.nodeName === n && L(e, t, r.indexOf(i))
                    }(e, t)
                }
            }
        };
        S(a, (function (e, n) {
            (t.resultsList || "input" === n) && (u[e][n] || (u[e][n] = a[e][n]))
        })), S(u, (function (e, n) {
            t[e].addEventListener(n, u[e][n])
        }))
    };

    function E(t) {
        var n = this;
        return new Promise((function (r, i) {
            var o, s, u;
            if (o = t.placeHolder, u = {
                role: "combobox",
                "aria-owns": (s = t.resultsList).id,
                "aria-haspopup": !0,
                "aria-expanded": !1
            }, a(t.input, e(e({
                "aria-controls": s.id,
                "aria-autocomplete": "both"
            }, o && {placeholder: o}), !t.wrapper && e({}, u))), t.wrapper && (t.wrapper = a("div", e({
                around: t.input,
                class: t.name + "_wrapper"
            }, u))), s && (t.list = a(s.tag, e({
                dest: [s.destination, s.position],
                id: s.id,
                role: "listbox",
                hidden: "hidden"
            }, s.class && {class: s.class}))), T(t), t.data.cache) return d(t).then((function (t) {
                try {
                    return c.call(n)
                } catch (t) {
                    return i(t)
                }
            }), i);

            function c() {
                return f("init", t), r()
            }

            return c.call(n)
        }))
    }

    function x(t) {
        var e = t.prototype;
        e.init = function () {
            E(this)
        }, e.start = function (t) {
            j(this, t)
        }, e.unInit = function () {
            if (this.wrapper) {
                var t = this.wrapper.parentNode;
                t.insertBefore(this.input, this.wrapper), t.removeChild(this.wrapper)
            }
            var e;
            S((e = this).events, (function (t, n) {
                e[t].removeEventListener(n, e.events[t][n])
            }))
        }, e.open = function () {
            g(this)
        }, e.close = function () {
            w(this)
        }, e.goTo = function (t) {
            O(t, this)
        }, e.next = function () {
            A(this)
        }, e.previous = function () {
            k(this)
        }, e.select = function (t) {
            L(this, null, t)
        }, e.search = function (t, e, n) {
            return p(t, e, n)
        }
    }

    return function t(e) {
        this.options = e, this.id = t.instances = (t.instances || 0) + 1, this.name = "autoComplete", this.wrapper = 1, this.threshold = 1, this.debounce = 0, this.resultsList = {
            position: "afterend",
            tag: "ul",
            maxResults: 5
        }, this.resultItem = {tag: "li"}, function (t) {
            var e = t.name, r = t.options, i = t.resultsList, o = t.resultItem;
            for (var s in r) if ("object" === n(r[s])) for (var a in t[s] || (t[s] = {}), r[s]) t[s][a] = r[s][a]; else t[s] = r[s];
            t.selector = t.selector || "#" + e, i.destination = i.destination || t.selector, i.id = i.id || e + "_list_" + t.id, o.id = o.id || e + "_result", t.input = u(t.selector)
        }(this), x.call(this, t), E(this)
    }
}, "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).autoComplete = e();