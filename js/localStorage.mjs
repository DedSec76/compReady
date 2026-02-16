

export default class StorageManager {
    static savePair(pair) {
        localStorage.setItem("comparePair", JSON.stringify(pair))
    }

    static getPair() {
        return JSON.parse(localStorage.getItem("comparePair"))
    }

    static saveLastPair(pair) {
        let history = JSON.parse(localStorage.getItem("comparisonHistory")) || []

        history.push(pair);

        localStorage.setItem("comparisonHistory", JSON.stringify(history))
    }

    static getLastPair() {
        return JSON.parse(localStorage.getItem("comparisonHistory"))
    }

    static saveWinner(winner) {
        localStorage.setItem("lastWinner", JSON.stringify(winner))
    }

    static getWinner() {
        return JSON.parse(localStorage.getItem("lastWinner"))
    }

    static incrementCompareCount() {
        const count = Number(localStorage.getItem("compareCount")) || 0
        localStorage.setItem("compareCount", count + 1)
    }

    static getCompareCount() {
        return Number(localStorage.getItem("compareCount")) || 0
    }
}