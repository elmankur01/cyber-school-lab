import { useState, useEffect } from 'react';
import { UserProfile, Topic, TopicDegree, Friend, DuelResult } from './types';
import { INITIAL_ACHIEVEMENTS } from './data/mockData';
import { useTelegram } from './hooks/useTelegram';
import { Header } from './components/Header';
import { SubjectCatalog } from './components/SubjectCatalog';
import { QuizPlayer } from './components/QuizPlayer';
import { BossBattle } from './components/BossBattle';
import { SecretModal } from './components/SecretModal';
import { ProfileModal } from './components/ProfileModal';
import { AchievementsModal } from './components/AchievementsModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { FriendsModal } from './components/FriendsModal';
import { DuelModal } from './components/DuelModal';

const DEFAULT_PROFILE: UserProfile = {
  id: 'cyber_user_' + Math.random().toString(36).substring(2, 9),
  friend_code: 'CYBER-' + Math.floor(100 + Math.random() * 900),
  nickname: 'Кибер_Лис_42',
  avatar: 'fox',
  drone_id: 'neuro_bot',
  selected_grade: 5,
  xp: 280,
  rank_title: 'Кодер-Оператор',
  degree_level: 1,
  streak_days: 3,
  streak_freeze_count: 1,
  duel_wins: 3,
  duel_losses: 1,
  friends: ['FOX-782', 'OWL-910'],
  completed_topics: [],
  defeated_bosses: [],
  unlocked_secrets: [],
  achievements: ['first_blood']
};

export default function App() {
  const { triggerHaptic } = useTelegram();

  // Load profile from localStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('cyber_lab_profile_v2');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Load achievements
  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('cyber_lab_achievements_v2');
      if (saved) return JSON.parse(saved);
      return INITIAL_ACHIEVEMENTS.map(a => ({
        ...a,
        unlocked: profile.achievements.includes(a.id)
      }));
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cyber_lab_profile_v2', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('cyber_lab_achievements_v2', JSON.stringify(achievements));
  }, [achievements]);

  // Navigation State
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [bossModeDegree, setBossModeDegree] = useState<TopicDegree | null>(null);
  const [activeSecretTopic, setActiveSecretTopic] = useState<Topic | null>(null);

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isDuelOpen, setIsDuelOpen] = useState(false);
  const [selectedDuelFriend, setSelectedDuelFriend] = useState<Friend | null>(null);

  // Update profile handler
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Grade selection handler
  const handleSelectGrade = (grade: number) => {
    triggerHaptic('light');
    setProfile(prev => ({ ...prev, selected_grade: grade }));
  };

  // Reset progress handler
  const handleResetProgress = () => {
    if (window.confirm('Сбросить весь игровой прогресс?')) {
      setProfile(DEFAULT_PROFILE);
      setAchievements(INITIAL_ACHIEVEMENTS);
      setActiveTopic(null);
      setBossModeDegree(null);
      setIsProfileOpen(false);
    }
  };

  // Unlock achievement helper
  const unlockAchievement = (id: string) => {
    setAchievements((prev: typeof INITIAL_ACHIEVEMENTS) =>
      prev.map(a => {
        if (a.id === id && !a.unlocked) {
          triggerHaptic('success');
          setProfile(p => ({
            ...p,
            xp: p.xp + a.reward_xp,
            achievements: [...p.achievements, a.id]
          }));
          return { ...a, unlocked: true };
        }
        return a;
      })
    );
  };

  // Start Duel with a specific friend or random rival
  const handleStartDuelWithFriend = (friend: Friend | null) => {
    setSelectedDuelFriend(friend);
    setIsFriendsOpen(false);
    setIsDuelOpen(true);
  };

  // Add friend by code
  const handleAddFriend = (code: string) => {
    setProfile(prev => {
      if (prev.friends.includes(code)) return prev;
      const newFriends = [...prev.friends, code];
      if (newFriends.length >= 3) {
        unlockAchievement('friend_squad');
      }
      return { ...prev, friends: newFriends };
    });
  };

  // On Duel finished
  const handleDuelFinish = (result: DuelResult) => {
    if (result.is_win) {
      unlockAchievement('duel_winner');
      if (result.player_time_spent <= 30) {
        unlockAchievement('speed_demon');
      }
    }

    setProfile(prev => ({
      ...prev,
      xp: prev.xp + result.earned_xp,
      duel_wins: result.is_win ? prev.duel_wins + 1 : prev.duel_wins,
      duel_losses: !result.is_win ? prev.duel_losses + 1 : prev.duel_losses
    }));
  };

  // On Degree completed in regular quiz
  const handleDegreeComplete = (degreeLevel: number, earnedXp: number) => {
    unlockAchievement('first_blood');
    setProfile(prev => ({
      ...prev,
      xp: prev.xp + earnedXp,
      degree_level: Math.max(prev.degree_level, degreeLevel)
    }));
  };

  // Start Boss
  const handleStartBoss = (degree: TopicDegree) => {
    setBossModeDegree(degree);
  };

  // On Boss Victory
  const handleBossVictory = (earnedXp: number) => {
    if (!activeTopic) return;

    unlockAchievement('virus_cleaner');
    unlockAchievement('secret_chip');

    setProfile(prev => ({
      ...prev,
      xp: prev.xp + earnedXp,
      defeated_bosses: Array.from(new Set([...prev.defeated_bosses, activeTopic.id])),
      completed_topics: Array.from(new Set([...prev.completed_topics, activeTopic.id])),
      unlocked_secrets: Array.from(new Set([...prev.unlocked_secrets, activeTopic.id]))
    }));

    const currentTopicRef = activeTopic;
    setBossModeDegree(null);
    setActiveTopic(null);
    setActiveSecretTopic(currentTopicRef);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        profile={profile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenFriends={() => setIsFriendsOpen(true)}
        onOpenDuels={() => handleStartDuelWithFriend(null)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {bossModeDegree && activeTopic ? (
          <BossBattle
            bossDegree={bossModeDegree}
            topicTitle={activeTopic.title}
            onVictory={handleBossVictory}
            onDefeat={() => {
              setBossModeDegree(null);
              setActiveTopic(null);
            }}
            triggerHaptic={triggerHaptic}
          />
        ) : activeTopic ? (
          <QuizPlayer
            topic={activeTopic}
            profile={profile}
            onBack={() => setActiveTopic(null)}
            onDegreeComplete={handleDegreeComplete}
            onStartBoss={handleStartBoss}
            triggerHaptic={triggerHaptic}
          />
        ) : (
          <SubjectCatalog
            profile={profile}
            onSelectTopic={(topic) => setActiveTopic(topic)}
            onOpenSecret={(topic) => setActiveSecretTopic(topic)}
            onSelectGrade={handleSelectGrade}
          />
        )}
      </main>

      {/* Modals */}
      <SecretModal
        topic={activeSecretTopic}
        onClose={() => setActiveSecretTopic(null)}
      />

      <ProfileModal
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onUpdateProfile={handleUpdateProfile}
        onResetProgress={handleResetProgress}
      />

      <AchievementsModal
        achievements={achievements}
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />

      <LeaderboardModal
        profile={profile}
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <FriendsModal
        profile={profile}
        isOpen={isFriendsOpen}
        onClose={() => setIsFriendsOpen(false)}
        onStartDuelWithFriend={handleStartDuelWithFriend}
        onAddFriend={handleAddFriend}
      />

      <DuelModal
        profile={profile}
        rivalFriend={selectedDuelFriend}
        isOpen={isDuelOpen}
        onClose={() => setIsDuelOpen(false)}
        onDuelFinish={handleDuelFinish}
        triggerHaptic={triggerHaptic}
      />
    </div>
  );
}
