export const truncateSentence = (
  sentence: string,
  maxLength: number
): string => {
  if (sentence.length <= maxLength) {
    return sentence;
  } else {
    return sentence.slice(0, maxLength) + "...";
  }
};
