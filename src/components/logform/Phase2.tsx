import FeelTags from "./FeelTags";
import type { Dispatch, SetStateAction } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";

type PhaseProps = {
  next: () => void;
  phase: number;
  setPhase?: Dispatch<SetStateAction<number>>;
  setLogIsVisible?: Dispatch<SetStateAction<boolean>>;
};

const Phase2 = ({ next, phase }: PhaseProps) => {
  const tagOptions = [
    "Joyful",
    "Down",
    "Anxious",
    "Calm",
    "Excited",
    "Frustrated",
    "Lonely",
    "Grateful",
    "Overwhelmed",
    "Motivated",
    "Irritable",
    "Peaceful",
    "Tired",
    "Hopeful",
    "Confident",
    "Stressed",
    "Content",
    "Disappointed",
    "Optimistic",
    "Restless",
  ];

  const { logData, setLogData, logError, setLogError } = useAuth();

  const phase2Function = (e: React.FormEvent) => {
    e.preventDefault();
    if (logData.tags.length === 0) {
      setLogError(true);
    } else {
      setLogError(false);
      next();
    }
  };

  return (
    <div
      className="flex-col gap-6 md:gap-8"
      style={phase === 1 ? { display: "flex" } : { display: "none" }}
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-bold font-RedditSans text-[1.75rem]/[130%] tracking-[-0.019rem] md:text-[2rem]/[140%] text-neutral-900">
          How did you feel?
        </h2>
        <p className="font-RedditSans font-medium text-[1.125rem]/[120%] text-neutral-600">
          Select up to three tags:
        </p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {tagOptions.map((tag) => (
          <div
            key={tag}
            onClick={() =>
              setLogData((prev) => {
                const tagMarked = prev.tags.includes(tag);
                const tagslimit = 3;

                if (tagMarked) {
                  return {
                    ...prev,
                    tags: prev.tags.filter((t) => t !== tag),
                  };
                } else if (prev.tags.length < tagslimit) {
                  return {
                    ...prev,
                    tags: [...prev.tags, tag],
                  };
                } else {
                  return prev;
                }
              })
            }
          >
            <FeelTags tag={tag} />
          </div>
        ))}
      </div>
      <form onSubmit={phase2Function} className="flex flex-col">
        <div
          className=" items-center gap-1.5 mb-4"
          style={logError ? { display: "flex" } : { display: "none" }}
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75 0.75C12 0.75 15.5 4.25 15.5 8.5C15.5 12.7812 12 16.25 7.75 16.25C3.46875 16.25 0 12.7812 0 8.5C0 4.25 3.46875 0.75 7.75 0.75ZM7.75 4.1875C7 4.1875 6.4375 4.78125 6.4375 5.5C6.4375 6.25 7 6.8125 7.75 6.8125C8.46875 6.8125 9.0625 6.25 9.0625 5.5C9.0625 4.78125 8.46875 4.1875 7.75 4.1875ZM9.5 12.125V11.375C9.5 11.1875 9.3125 11 9.125 11H8.75V7.875C8.75 7.6875 8.5625 7.5 8.375 7.5H6.375C6.15625 7.5 6 7.6875 6 7.875V8.625C6 8.84375 6.15625 9 6.375 9H6.75V11H6.375C6.15625 11 6 11.1875 6 11.375V12.125C6 12.3438 6.15625 12.5 6.375 12.5H9.125C9.3125 12.5 9.5 12.3438 9.5 12.125Z"
              fill="#E60013"
            />
          </svg>
          <p className="text-red-700 text-[0.938rem]/[140%] tracking-[-0.019rem]">
            Please select at least one tag.
          </p>
        </div>
        <Button
          buttonText="Continue"
          py="1rem"
          fontSize="1.5rem"
          lineHeight="140%"
          letterSpacing="0px"
        />
      </form>
    </div>
  );
};
export default Phase2;
