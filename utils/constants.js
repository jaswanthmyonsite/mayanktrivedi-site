export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Ventures', href: '/ventures' },
  { name: 'Leadership', href: '/leadership' },
  { name: "Maker's Heart", href: '/makers-heart' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Contact', href: '/contact' },
];

export const AVATAR_MODES = {
  DEFAULT: 'default',
  SUIT: 'suit',
  CRAFTSMAN: 'craftsman',
  SPEAKER: 'speaker',
  MENTOR: 'mentor',
  PILOT: 'pilot',
};

export const AVATAR_PHRASES = {
  [AVATAR_MODES.DEFAULT]: [
    "Welcome! I'm excited to share my journey with you.",
    "Every challenge is an opportunity to innovate.",
    "Let's build something meaningful together.",
  ],
  [AVATAR_MODES.SUIT]: [
    "Leadership is about empowering others to achieve their best.",
    "In business, integrity is non-negotiable.",
    "Success is a team sport.",
  ],
  [AVATAR_MODES.CRAFTSMAN]: [
    "There's wisdom in working with your hands.",
    "Every piece tells a story of patience and precision.",
    "When you plane wood, you can't rush it.",
  ],
  [AVATAR_MODES.SPEAKER]: [
    "Sharing knowledge is how we all grow together.",
    "Every audience teaches me something new.",
    "The best talks are conversations, not monologues.",
  ],
  [AVATAR_MODES.MENTOR]: [
    "I see potential in you that you might not see yet.",
    "The greatest reward is seeing others succeed.",
    "Your growth is my success.",
  ],
  [AVATAR_MODES.PILOT]: [
    "Once you overcome fear, the sky is truly the limit.",
    "Flying taught me perspective - in life and business.",
    "Every flight starts with a careful pre-flight check.",
  ],
};
