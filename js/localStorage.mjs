

export default class StorageManager {
    static savePair(pair) {
        localStorage.setItem("comparePair", JSON.stringify(pair))
    }

    static getPair() {
        return JSON.parse(localStorage.getItem("comparePair"))
    }

    static saveWinner(winner) {
        localStorage.setItem("lastWinner", JSON.stringify(winner))
    }

    static getWinner() {
        return JSON.parse(localStorage.getItem("lastWinner"))
    }

    static saveHistory(history) {
        localStorage.setItem("history", JSON.stringify(history))
    }

    static getHistory() {
        return JSON.parse(localStorage.getItem("history")) || []
    }

    static incrementCompareCount() {
        const count = Number(localStorage.getItem("compareCount")) || 0
        localStorage.setItem("compareCount", count + 1)
    }

    static getCompareCount() {
        return Number(localStorage.getItem("compareCount")) || 0
    }
}