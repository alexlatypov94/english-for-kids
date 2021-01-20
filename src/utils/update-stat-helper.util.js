export function updateStatHelper(arr, audioSrc, property, isAudioSrcArray, counterAudio) {
    const updatedArr = arr.reduce((acc, item) => {
        const [category, cards] = item;
        let indexOfCard;
        if (isAudioSrcArray) {
            indexOfCard = cards.findIndex((card) => audioSrc[counterAudio] === card.audio);
        } else {
            indexOfCard = cards.findIndex((card) => audioSrc === card.audio);
        }
        let newCards = [];

        if (indexOfCard > -1) {
            newCards = [
                ...cards.slice(0, indexOfCard),
                { ...cards[indexOfCard], [property]: cards[indexOfCard][property] + 1 },
                ...cards.slice(indexOfCard + 1)
            ];
        } else {
            newCards = cards;
        }

        return [...acc, [category, newCards]];
    }, []);

    return updatedArr;
}
