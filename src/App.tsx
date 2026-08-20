import { useState, useEffect } from 'react';
import { UserProfile, Topic, TopicDegree, Friend, DuelResult, DailyQuest, CyberShopItem } from './types';
import { INITIAL_ACHIEVEMENTS, INITIAL_DAILY_QUESTS } from './data/mockData';
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
import { DailyQuestsModal } from './components/DailyQuestsModal';
import { CyberShopModal } from './components/CyberShopModal';

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
  achievements: ['first_blood'],
  inventory: [],
  active_frame: undefined
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

  // Load daily quests
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = localStorage.getItem('cyber_lab_last_quest_date');
      const saved = localStorage.getItem('cyber_lab_daily_quests_v1');

      if (lastDate && lastDate !== today) {
        localStorage.setItem('cyber_lab_last_quest_date', today);
        return INITIAL_DAILY_QUESTS;
      }
      return saved ? JSON.parse(saved) : INITIAL_DAILY_QUESTS;
    } catch {
      return INITIAL_DAILY_QUESTS;
    }
  });

  // Daily Streak date sync
  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = localStorage.getItem('cyber_lab_last_active_date');
      
      if (lastActive && lastActive !== today) {
        const lastTime = new Date(lastActive).getTime();
        const nowTime = new Date(today).getTime();
        const diffDays = Math.round((nowTime - lastTime) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Consecutive active day
          setProfile(p => ({ ...p, streak_days: p.streak_days + 1 }));
        } else if (diffDays > 1) {
          // Missed days
          setProfile(p => {
            if (p.streak_freeze_count > 0) {
              return { ...p, streak_freeze_count: p.streak_freeze_count - 1 };
            }
            return { ...p, streak_days: 1 };
          });
        }
        localStorage.setItem('cyber_lab_last_active_date', today);
      } else if (!lastActive) {
        localStorage.setItem('cyber_lab_last_active_date', today);
      }
    } catch {
      // safe fallback
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cyber_lab_profile_v2', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('cyber_lab_achievements_v2', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('cyber_lab_daily_quests_v1', JSON.stringify(dailyQuests));
  }, [dailyQuests]);

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
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [selectedDuelFriend, setSelectedDuelFriend] = useState<Friend | null>(null);

  // Advance Quest Progress Helper
  const advanceQuest = (category: 'english' | 'duel' | 'math', amount: number = 1) => {
    setDailyQuests(prev =>
      prev.map(q => {
        if (q.category === category && !q.completed) {
          const newProgress = Math.min(q.target, q.progress + amount);
          const isDone = newProgress >= q.target;
          if (isDone) triggerHaptic('success');
          return {
            ...q,
            progress: newProgress,
            completed: isDone
          };
        }
        return q;
      })
    );
  };

  // Claim Quest Reward
  const handleClaimQuestReward = (questId: string) => {
    setDailyQuests(prev =>
      prev.map(q => {
        if (q.id === questId && q.completed && !q.claimed) {
          triggerHaptic('success');
          setProfile(p => ({ ...p, xp: p.xp + q.reward_xp }));
          return { ...q, claimed: true };
        }
        return q;
      })
    );
  };

  // Buy Shop Item
  const handleBuyShopItem = (item: CyberShopItem) => {
    if (profile.xp < item.price_xp) return;
    triggerHaptic('success');
    setProfile(prev => ({
      ...prev,
      xp: prev.xp - item.price_xp,
      inventory: [...(prev.inventory || []), item.id],
      active_frame: item.category === 'avatar_frame' ? item.preview_effect : prev.active_frame
    }));
  };

  // Equip Frame
  const handleEquipFrame = (frameClass?: string) => {
    triggerHaptic('light');
    setProfile(prev => ({ ...prev, active_frame: frameClass }));
  };

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
      setDailyQuests(INITIAL_DAILY_QUESTS);
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
    advanceQuest('duel', 1);

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

    if (activeTopic?.subject_id === 'english_easy') {
      advanceQuest('english', 1);
      unlockAchievement('native_speaker');
    } else if (activeTopic?.subject_id === 'math_algebra' || activeTopic?.subject_id === 'logic_informatics') {
      advanceQuest('math', 1);
    }

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

    if (activeTopic.subject_id === 'english_easy') {
      advanceQuest('english', 1);
      unlockAchievement('native_speaker');
    } else if (activeTopic.subject_id === 'math_algebra' || activeTopic.subject_id === 'logic_informatics') {
      advanceQuest('math', 1);
    }

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

  const pendingQuestsCount = dailyQuests.filter(q => q.completed && !q.claimed).length;

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
        onOpenQuests={() => setIsQuestsOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        dailyQuestsCount={pendingQuestsCount}
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

      <DailyQuestsModal
        isOpen={isQuestsOpen}
        onClose={() => setIsQuestsOpen(false)}
        quests={dailyQuests}
        onClaimReward={handleClaimQuestReward}
      />

      <CyberShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        profile={profile}
        onBuyItem={handleBuyShopItem}
        onEquipFrame={handleEquipFrame}
      />
    </div>
  );
}
