"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export const ThemeSwitcher = ({ className }: { className: string }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={cn(
        "relative isolate flex h-8 rounded-full bg-foreground text-background p-1 ring-1 dark:ring-black/25 ring-white/25",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className={cn(
              "relative h-6 w-6 rounded-full transition-colors",
              isActive
                ? "dark:bg-black/15 bg-white/25"
                : "hover:bg-background/20"
            )}
            key={key}
            onClick={() => setTheme(key as "light" | "dark" | "system")}
            type="button"
          >
            {/* {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )} */}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4 transition-colors",
                isActive ? "text-background" : "text-background/70"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
