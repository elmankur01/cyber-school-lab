export type DegreeLevel = 1 | 2 | 3 | 4;

export interface Option {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  degree_level: DegreeLevel;
  story_context?: string;
  question_text: string;
  options: Option[];
  hint: string;
  explanation: string;
  base_xp: number;
  time_limit_seconds?: number;
}

export interface TopicDegree {
  level: DegreeLevel;
  title: string;
  subtitle: string;
  required_correct: number;
  questions: Question[];
  isBoss?: boolean;
}

export interface Topic {
  id: string;
  subject_id: string;
  title: string;
  description: string;
  grade_level: number;
  story_setting: string;
  degrees: TopicDegree[];
  secret_material: {
    title: string;
    description: string;
    fact: string;
    mini_lesson: string;
  };
}

export interface Subject {
  id: string;
  title: string;
  short_title: string;
  icon: string;
  color: string;
  border_color: string;
  description: string;
  topics: Topic[];
}

export interface CompanionDrone {
  id: string;
  name: string;
  emoji: string;
  specialty: string;
  bonus_text: string;
}

export interface Friend {
  friend_code: string;
  nickname: string;
  avatar: string;
  drone_id: string;
  selected_grade: number;
  xp: number;
  streak_days: number;
  duel_wins: number;
  status: 'online' | 'offline' | 'in_duel';
}

export interface DuelResult {
  player_score: number;
  player_time_spent: number;
  player_correct: number;
  rival_name: string;
  rival_avatar: string;
  rival_score: number;
  rival_time_spent: number;
  rival_correct: number;
  is_win: boolean;
  earned_xp: number;
}

export interface UserProfile {
  id: string;
  friend_code: string;
  nickname: string;
  avatar: string;
  drone_id: string;
  selected_grade: number; // 1 to 11
  xp: number;
  rank_title: string;
  degree_level: number;
  streak_days: number;
  streak_freeze_count: number;
  duel_wins: number;
  duel_losses: number;
  friends: string[]; // array of friend codes
  completed_topics: string[];
  defeated_bosses: string[];
  unlocked_secrets: string[];
  achievements: string[];
  inventory: string[];
  active_frame?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward_xp: number;
  unlocked: boolean;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  progress: number;
  reward_xp: number;
  completed: boolean;
  claimed: boolean;
  category: 'math' | 'english' | 'duel' | 'boss' | 'any';
}

export interface CyberShopItem {
  id: string;
  name: string;
  category: 'drone_skin' | 'avatar_frame' | 'title';
  description: string;
  price_xp: number;
  icon: string;
  preview_effect?: string;
}
