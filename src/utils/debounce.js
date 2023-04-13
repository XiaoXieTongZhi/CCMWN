export default function (runFun, time = 500) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            runFun(...args)
        }, time)
    }
}