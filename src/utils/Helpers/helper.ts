export const letterInStringCheck = (text: string) => {
    const regExp = /^\d+$/;

    if (text === "") return
    if (!regExp.test(text.replaceAll(".", ""))) return true
}