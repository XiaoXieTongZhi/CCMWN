export default function (runFun, time = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            runFun(...args)
        }, time)
    }
}