export function randomEmoji(i: number) {
  const emojis = [
    "👨",
    "😘",
    "👷",
    "🍬",
    "☝",
    "👍",
    "😍",
    "😮",
    "😱",
    "👌",
    "😣",
    "😽",
    "🙉",
    "🐋",
    "👪",
    "🐑",
    "🔥",
    "👯",
    "🐇",
    "🙈",
    "😔",
    "👫",
    "😳",
    "🐛",
    "😲",
    "🐯",
    "🐧",
    "🏃",
    "🐘",
    "😬",
    "💫",
    "🐪",
    "👭",
    "🌱",
    "🐶",
    "🐽",
    "🐐",
    "🎩",
    "🍀",
    "🌟",
    "🌼",
    "🍄",
    "💁",
    "💎",
    "🌁",
    "🌴",
    "🃏",
    "🌈",
    "👏",
    "😚",
    "🎼",
    "🌸",
    "🐩",
    "💜",
    "🀄",
    "🙊",
    "✌",
    "🙎",
    "👵",
    "👩",
    "🔬",
    "🔭",
    "🐢",
    "👦",
    "🐏",
    "🌺",
    "💭",
    "🐎",
    "😻",
    "💙",
    "🌹",
    "🎒",
    "😶",
    "🎑",
    "🐴",
    "🍁",
    "🐲",
    "🎉",
    "🐈",
    "👴",
    "💐",
    "📖",
    "🎺",
    "👾",
    "🐌",
    "🙏",
    "🍃",
    "😂",
    "🌾",
    "🎧",
    "😌",
    "😒",
    "👬",
    "🌿",
    "🎆",
    "🐕",
    "💪",
    "🐾",
    "😼",
    "🎲",
    "🎊",
    "🌰",
    "🎁",
    "📚",
    "👲",
    "🐓",
    "🍂",
    "🎤",
    "🎓",
    "🌲",
    "💝",
    "👰",
    "😀",
    "👊",
    "🐰",
    "🐭",
    "🎐",
    "👮",
    "🐫",
    "💏",
    "🐂",
    "👸",
    "🎅",
    "🍔",
    "🍢",
    "🐵",
    "🍱",
    "🎿",
    "👼",
    "💂",
    "👋",
    "🏊",
    "👀",
    "😄",
    "✨",
    "🏈",
    "🍓",
    "🐱",
    "🍆",
    "🙆",
    "👧",
    "💅",
    "🍙",
    "🎎",
    "🐤",
    "😹",
    "🍘",
    "🎏",
    "🙌",
    "🙀",
    "✊",
    "🎨",
    "🐗",
    "🍅",
    "👐",
    "🌷",
    "🍩",
    "👶",
    "👱",
    "🍮",
    "🚵",
    "👻",
    "🎄",
    "🍦",
    "🍛",
    "💛",
    "😺",
    "🎻",
    "🍏",
    "🐁",
    "😸",
    "🎹",
    "😁",
    "🐆",
    "🐊",
    "👽",
    "🐖",
    "⚾",
    "🍇",
    "🍖",
    "🍰",
    "🍜",
    "☺",
    "🍌",
    "🚴",
    "🍣",
    "😈",
    "🏄",
    "😉",
    "❤",
    "🎯",
    "🏀",
    "😗",
    "🍨",
    "👳",
    "🍭",
    "🏉",
    "🎳",
    "🏇",
    "🍥",
    "👑",
    "⚽",
    "💆",
    "🎂",
    "😯",
    "🍸",
    "😑",
    "🍚",
    "🍒",
    "😇",
    "😞",
    "😛",
    "😏",
    "🍟",
    "🍍",
    "🙅",
    "🐍",
    "😝",
    "🐥",
    "💇",
    "😎",
    "💃",
    "😴",
    "🍻",
    "😙",
    "🍺",
    "😋",
    "🐚",
    "😅",
    "😜",
    "🏂",
    "🍝",
    "🐬",
    "🐞",
    "🍠",
    "🐹",
    "🙍",
    "😊",
    "🗿",
    "🍗",
    "😐",
    "🐸",
    "🍧",
    "🚶",
    "💚",
    "🍊",
    "🐙",
    "🐝",
    "🍯",
    "🐣",
    "🍕",
    "🍎",
    "🙋",
    "🍈",
    "🙇",
    "💑",
    "🌽",
    "🐀",
    "🍡",
    "🍑",
    "🎾",
    "🐨",
    "🏆",
    "🌳",
    "🍷",
    "🍫",
    "🐒",
    "🍹",
    "🐡",
    "🍳",
    "🍪",
    "⛄",
    "🐜",
    "🌻",
    "🐮",
    "🍞",
    "🎇",
    "🐳",
    "🐠",
    "🎃",
    "🌀",
    "🐼",
    "🎱",
    "🐉",
    "🐟",
    "🐄",
    "🎍",
    "🌊",
    "🍉",
    "🍲",
    "🐷",
    "🐔",
    "🐻",
    "🐦",
    "🎸",
    "🐅",
    "🎷",
    "🍋",
    "🐃",
    "🐺",
    "🎮",
    "😆",
    "🍤",
    "🍐",
    "🎬",
    "🌵",
  ];

  return emojis[i % emojis.length];
}
