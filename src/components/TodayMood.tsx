import veryHappyEmoji from "../assets/icon-very-happy-color.svg";
import happyEmoji from "../assets/icon-happy-color.svg";
import neutralEmoji from "../assets/icon-neutral-color.svg";
import sadEmoji from "../assets/icon-sad-color.svg";
import verySadEmoji from "../assets/icon-very-sad-color.svg";
import quote from "../assets/icon-quote.svg";
import moodPhrases from "../data/moodPhrases";
import { useEffect, useState } from "react";
import { useUserDataStore } from "../store/useUserDataStore";

type MoodType = "Very Happy" | "Happy" | "Neutral" | "Sad" | "Very Sad";

const TodayMood = () => {
  const userMoodRecord = useUserDataStore((state) => state.userMoodRecord);
  const [phrase, setPhrase] = useState("");

  // Se o array estiver vazio, não tenta acessar o último item
  const todayRecord =
    userMoodRecord.length > 0
      ? userMoodRecord[userMoodRecord.length - 1]
      : null;

  const moodMap: Record<string, string> = {
    "Very Happy": veryHappyEmoji,
    Happy: happyEmoji,
    Neutral: neutralEmoji,
    Sad: sadEmoji,
    "Very Sad": verySadEmoji,
  };

  const getRandomPhraseByMood = () => {
    const mood = todayRecord?.humor as MoodType; // 👈 afirma explicitamente o tipo

    if (!mood) return "No mood recorded today.";
    const phrases = moodPhrases[mood];
    if (!phrases || phrases.length === 0) return "No phrase available.";
    const index = Math.floor(Math.random() * phrases.length);
    return phrases[index];
  };

  useEffect(() => {
    if (todayRecord) {
      const selected = getRandomPhraseByMood();
      setPhrase(selected);
    }
  }, [todayRecord]);

  if (!todayRecord || phrase === "") {
    return null;
  }

  const moodEmoji = moodMap[todayRecord.humor as MoodType];

  return (
    <section className="px-4 py-8 md:px-8 flex flex-col gap-8 md:gap-[101px] overflow-hidden items-center md:items-start relative bg-white rounded-2xl border border-blue-100 w-full text-center md:text-start lg:max-w-[670px]">
      <div className="flex flex-col items-center md:items-start">
        <p className="font-RedditSans text-neutral-900/70 font-bold text-[2rem]/[140%] tracking-[-0.019rem]">
          I’m feeling
        </p>
        <h2 className="font-RedditSans text-neutral-900 font-bold text-[2.5rem]/[120%] tracking-[-0.019rem]">
          {todayRecord.humor}
        </h2>
      </div>
      <img
        className="w-[200px] h-[200px] md:absolute md:h-[320px] md:w-[320px] md:right-10 md:bottom-[-25px]"
        src={moodEmoji}
        alt="Mood Emoji"
      />
      <div className="flex flex-col gap-4 items-center md:items-start md:gap-3">
        <img className="w-6 h-[21px]" src={quote} alt="Quote icon" />
        <p className="font-RedditSans text-neutral-900 font-medium italic text-[1.125rem]/[130%] max-w-[280px]">
          "{phrase}"
        </p>
      </div>
    </section>
  );
};

export default TodayMood;
