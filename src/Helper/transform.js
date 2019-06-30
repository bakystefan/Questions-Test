export const transform = ( data = []) => {
  return data.map(item => {
    const transfromedItem = {
      ...item,
      question: decodeURIComponent(item.question),
      correct_answer: item.correct_answer === 'True' ? true : false,
      isCheckedTrue: false,
      isCheckedFalse: false,
      isAnswered: false,
    }
    return transfromedItem;
  })
}