/**
 * 调用count次后禁用，用来封装表单提交函数，函数式组件需要另写钩子
 * @param callback 回调，支持同步和异步函数
 * @param count 调用次数
 * @param options 配置项，保留参数
 * 
 * `options:`
 * 
 * resetWhenFalse: callback返回false时重置
 */
function disableCounter(callback: () => any, count: number = 1, { resetWhenFalse = true } = {}) {
    let countToDisable: number = 0;

    return () => {
        let result: any;
        if(countToDisable < count) {
            countToDisable++;
            result = callback();
        }
        
        let dealRes = (result: any) => {
            if(resetWhenFalse && result === false) {
                // 用于模拟表单提交失败时重置disable
                countToDisable = 0;
            }
            return {
                result,
                disable: countToDisable === count,
                reset: () => countToDisable = 0
            };
        }
        if(result && result.then) {
            return result.then((res: any) => {
                return dealRes(res);
            })
        } else {
            return dealRes(result);
        }
    }
}