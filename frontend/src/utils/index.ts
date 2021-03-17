/**
 * 分段获取异步请求结果
 * @param promises 
 * @param max 
 * @param maxError 
 */
function segment(promises: Array<() => Promise<any>>, max: number = 3, maxError: number = 10) {
    const races: any[] = []
    const anwser: any[] = []
    let errorCount: number = 0
    return new Promise((resolveFn, rejectFn) => {
        const nextPromise = (promise: () => Promise<any>, promiseIndex: number, raceIndex: number): Promise<any> => {
            return new Promise((resolve, reject) => {
                promise()
                    .then(res => {
                        anwser[promiseIndex] = res
                        resolve(raceIndex)
                    }).catch(e => {
                        errorCount++
                        if (errorCount >= maxError) {
                            rejectFn('maxError')
                            return
                        }
                        races[raceIndex] = nextPromise(promise, promiseIndex, raceIndex)
                        reject(raceIndex)
                    })
            })
        }
        const race = (promise: () => Promise<any>, promiseIndex: number): Promise<any> => {
            return Promise.race(races).then((index: number) => {
                races[index] = nextPromise(promise, promiseIndex, index)
            }).catch(index => {
                return race(promise, promiseIndex)
            })
        }
        const resolveAll = (): Promise<any[]> => {
            return Promise.all(races).catch(e => {
                return resolveAll()
            })
        }
        return promises.reduce((prev, curr, promiseIndex) => {
            return prev.then(() => {
                const length = races.length
                if (length < max) {
                    races.push(nextPromise(curr, promiseIndex, length))
                } else {
                    return race(curr, promiseIndex)
                }
            })
        }, Promise.resolve()).then(() => {
            return resolveAll()
        }).catch(rejectFn).then(() => resolveFn(anwser))
    })
}

export { segment }