export function getRandomElements(arr, num) {

    const maxNum = Math.min(num, arr.length);
    const result = [];
    const tempArray = [...arr];

    for (let i = 0; i < maxNum; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        result.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }

    return result;
}