//Vue 图片懒加载
export default {
    bind(el, binding) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                let lazyImage = entry.target;
                // 相交率，默认是相对于浏览器视窗
                if(entry.intersectionRatio > 0) {
                    lazyImage.src = binding.value;
                    // 当前图片加载完之后需要去掉监听
                    lazyImageObserver.unobserve(lazyImage);
                }

            })
        })
        lazyImageObserver.observe(el);
    },
}

