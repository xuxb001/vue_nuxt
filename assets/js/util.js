export const getPageViewWidth = () => {
    if (process.browser) {
        var d = document, a = d.compatMode == "BackCompat"
            ? d.body
            : d.documentElement;
        return a.clientWidth;
    }

}
export const getPageWidth = () => {
    if (process.browser) {
        var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
            ? a
            : g.documentElement;
        return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
    }

}
