import { ADD_NOVEL_WORD, SUBTRACT_NOVEL_WORD } from '@/redux/actionTypes/novel';

const initialState = {
  wordsNumber: 0,
};

interface Action {
  type: string;
  payload: number;
}

interface NovelState {
  wordsNumber: number;
}

export default function changeWordsNumber (state = initialState, action: Action): NovelState {
  let { wordsNumber } = state;  
  const { type, payload } = action;
  switch (true) {
    case type === ADD_NOVEL_WORD:
      wordsNumber += payload;
      break;
    case type === SUBTRACT_NOVEL_WORD:
      wordsNumber = wordsNumber - payload > 0 ? wordsNumber - payload : 0;
      break;
  }
  return {
    ...state,
    wordsNumber,
  };
}