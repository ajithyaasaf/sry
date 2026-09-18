export interface QuestionOption {
  id: string;
  label: string;
  response: string;
}

export const initialQuestion = {
  title: "First, be honest...",
  question: "How angry are you actually?",
  options: [
    {
      id: "little",
      label: "A little 😒",
      response: "Okay... I may still have a chance 😌",
    },
    {
      id: "very",
      label: "Very 😤",
      response: "Ah. So we're at THAT level. Good thing I built a whole website 😭",
    },
    {
      id: "maybe",
      label: "Maybe... 🥺",
      response: "That 'maybe' is suspicious... but I'll take it 👀",
    },
  ],
};

export const angerMeterConfig = {
  title: "Okay, be honest.",
  subtitle: "Drag the slider to your exact anger percentage — you can tell me honestly ❤️",
  ranges: [
    { min: 0, max: 20, emoji: "😇", text: "Wow. You're basically fine." },
    { min: 21, max: 40, emoji: "😐", text: "Okay... slightly annoyed." },
    { min: 41, max: 60, emoji: "😒", text: "We have entered dangerous territory." },
    { min: 61, max: 80, emoji: "😠", text: "Okay okay. I understand." },
    { min: 81, max: 100, emoji: "😤", text: "I should probably start apologising right now 😭" },
  ],
};

export const checkinQuestions = [
  {
    id: "smiling",
    title: "Quick check-in...",
    question: "Are you smiling yet?",
    options: [
      { id: "maybe", label: "Maybe 😏", response: "Ha! Caught you. Don't fight it 😂" },
      { id: "not", label: "Absolutely not 😤", response: "Staying strong I see. Respect 🫡" },
      { id: "dont_ask", label: "Don't ask.", response: "That definitely means a little smile 😂" },
    ],
  },
  {
    id: "deserved",
    title: "Be real with me...",
    question: "What do I deserve right now?",
    options: [
      { id: "lecture", label: "A lecture 🗣️", response: "Taking notes already 📝" },
      { id: "forgiveness", label: "Forgiveness 🥺", response: "Best answer ever ❤️" },
      { id: "snacks", label: "Snacks 🍫", response: "Deal! What do you want to eat?" },
      { id: "all", label: "All of the above 😂", response: "Fair enough, I brought this on myself." },
      { id: "something_else", label: "Something else... 🌙", response: "Tell me below what I deserve! 😇" },
    ],
  },
  {
    id: "keepSayingSorry",
    title: "Almost there...",
    question: "Should I keep saying sorry?",
    options: [
      { id: "obviously", label: "Obviously 💅", response: "At your service, boss." },
      { id: "enough", label: "Enough already 😂", response: "Mission accomplished!" },
      { id: "one_more", label: "Maybe one more 🥺", response: "Coming right up ❤️" },
    ],
  },
];

export const finalQuestionConfig = {
  title: "50 sorries have officially been delivered.",
  subtitle: "So... Are we good? ❤️",
  options: {
    okay: {
      label: "Okay ❤️",
      heading: "YESSS! 🎉",
      message: "Mission accomplished.",
      p1: "I'll try not to annoy you again.",
      p2: "...no promises though ❤️",
    },
    angry: {
      label: "Still angry 😤",
      heading: "Okay okay...",
      message: "I'll give you some time.",
      p1: "Take as long as you need.",
      p2: "But at least I completed your 50-sorry assignment 😂❤️",
    },
  },
};
