export const shortenAddress = (address, length = 4, start = 0) => {
    let res = ""
    if (address) {
        const first = address?.substring(start, start + length)
        const last = address?.substring(address?.length - length, address?.length)
        res = first + "..." + last
    }
    return res
}

export const remove0x = (e) => {
    if (e.slice(0, 2) === "0x") {
        return e.slice(2)
    }
    return e
}