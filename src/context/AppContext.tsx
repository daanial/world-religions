import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ACHIEVEMENTS, type Achievement } from "../data/achievements";

export type { Achievement };

interface AppState {
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  visited: Set<string>;
  visit: (id: string) => void;
  achievements: Achievement[];
  unlock: (id: string) => void;
  newlyUnlocked: Achievement | null;
  dismissToast: () => void;
  ambientOn: boolean;
  toggleAmbient: () => void;
}

const LS_KEYS = {
  visited: "wre.visited",
  unlocked: "wre.unlocked",
  compare: "wre.compare",
  compared: "wre.compared",
  ambient: "wre.ambient",
};

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveSet(key: string, set: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    /* ignore quota */
  }
}

const Ctx = createContext<AppState | null>(null);

type AchievementSnapshot = {
  visited: Set<string>;
  compareIds: string[];
  comparedEver: Set<string>;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.compare);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [comparedEver, setComparedEver] = useState<Set<string>>(() => loadSet(LS_KEYS.compared));
  const [visited, setVisited] = useState<Set<string>>(() => loadSet(LS_KEYS.visited));
  const [unlocked, setUnlocked] = useState<Set<string>>(() => {
    const stored = loadSet(LS_KEYS.unlocked);
    const visitedLoaded = loadSet(LS_KEYS.visited);
    const comparedLoaded = loadSet(LS_KEYS.compared);
    let compareLoaded: string[] = [];
    try {
      const raw = localStorage.getItem(LS_KEYS.compare);
      if (raw) compareLoaded = JSON.parse(raw);
    } catch {
      /* keep empty */
    }
    const snapshot = {
      visited: visitedLoaded,
      compareIds: compareLoaded,
      comparedEver: comparedLoaded,
    };
    const merged = new Set(stored);
    for (const a of ACHIEVEMENTS) {
      if (a.check(snapshot)) merged.add(a.id);
    }
    return merged;
  });
  const [ambientOn, setAmbientOn] = useState<boolean>(
    () => localStorage.getItem(LS_KEYS.ambient) === "1"
  );
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement | null>(null);
  const toastTimer = useRef<number | null>(null);
  const snapshotRef = useRef<AchievementSnapshot>({
    visited,
    compareIds,
    comparedEver,
  });

  useEffect(() => {
    snapshotRef.current = { visited, compareIds, comparedEver };
  }, [visited, compareIds, comparedEver]);

  const showUnlockToast = useCallback((achievement: Achievement) => {
    setNewlyUnlocked(achievement);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setNewlyUnlocked(null), 5200);
  }, []);

  const evaluateAchievements = useCallback(
    (snapshot: AchievementSnapshot) => {
      setUnlocked((prev) => {
        let next: Set<string> | null = null;
        for (const a of ACHIEVEMENTS) {
          if (prev.has(a.id)) continue;
          if (!a.check(snapshot)) continue;
          if (!next) next = new Set(prev);
          next.add(a.id);
          queueMicrotask(() => showUnlockToast(a));
        }
        return next ?? prev;
      });
    },
    [showUnlockToast]
  );

  const runAchievementChecks = useCallback(() => {
    evaluateAchievements(snapshotRef.current);
  }, [evaluateAchievements]);

  useEffect(() => saveSet(LS_KEYS.visited, visited), [visited]);
  useEffect(() => saveSet(LS_KEYS.unlocked, unlocked), [unlocked]);
  useEffect(() => saveSet(LS_KEYS.compared, comparedEver), [comparedEver]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.compare, JSON.stringify(compareIds));
  }, [compareIds]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.ambient, ambientOn ? "1" : "0");
  }, [ambientOn]);

  const toggleCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) {
          const next = prev.filter((x) => x !== id);
          snapshotRef.current = { ...snapshotRef.current, compareIds: next };
          queueMicrotask(runAchievementChecks);
          return next;
        }
        if (prev.length >= 4) return prev;
        const next = [...prev, id];
        setComparedEver((compared) => {
          const nextCompared = compared.has(id) ? compared : new Set(compared).add(id);
          snapshotRef.current = {
            ...snapshotRef.current,
            compareIds: next,
            comparedEver: nextCompared,
          };
          queueMicrotask(runAchievementChecks);
          return nextCompared;
        });
        snapshotRef.current = { ...snapshotRef.current, compareIds: next };
        return next;
      });
    },
    [runAchievementChecks]
  );

  const clearCompare = useCallback(() => setCompareIds([]), []);
  const isInCompare = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const visit = useCallback(
    (id: string) => {
      setVisited((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev).add(id);
        snapshotRef.current = { ...snapshotRef.current, visited: next };
        queueMicrotask(runAchievementChecks);
        return next;
      });
    },
    [runAchievementChecks]
  );

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => new Set(prev).add(id));
  }, []);

  const dismissToast = useCallback(() => setNewlyUnlocked(null), []);
  const toggleAmbient = useCallback(() => setAmbientOn((v) => !v), []);

  const value = useMemo<AppState>(
    () => ({
      compareIds,
      toggleCompare,
      clearCompare,
      isInCompare,
      visited,
      visit,
      achievements: ACHIEVEMENTS.filter((a) => unlocked.has(a.id)),
      unlock,
      newlyUnlocked,
      dismissToast,
      ambientOn,
      toggleAmbient,
    }),
    [
      compareIds,
      toggleCompare,
      clearCompare,
      isInCompare,
      visited,
      visit,
      unlocked,
      unlock,
      newlyUnlocked,
      dismissToast,
      ambientOn,
      toggleAmbient,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
