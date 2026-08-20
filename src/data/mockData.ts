import { Subject, Achievement, CompanionDrone, Friend, Question } from '../types';

export const COMPANION_DRONES: CompanionDrone[] = [
  {
    id: 'neuro_bot',
    name: 'Нейро-Бот v1.0',
    emoji: '🤖',
    specialty: 'Логика & Код',
    bonus_text: 'Анализирует алгоритмы и ищет программные баги'
  },
  {
    id: 'cyber_cat',
    name: 'Кибер-Кот 9000',
    emoji: '🐱',
    specialty: 'Квантовая Математика',
    bonus_text: 'Мгновенно производит устные вычисления'
  },
  {
    id: 'mecha_owl',
    name: 'Меха-Сова Лингвист',
    emoji: '🦉',
    specialty: 'Языки & Шифры',
    bonus_text: 'Знает разговорный сленг, правила и озвучивает английские фразы'
  },
  {
    id: 'aero_drone',
    name: 'Аэро-Дрон Протон',
    emoji: '🛸',
    specialty: 'Физика & Природа',
    bonus_text: 'Сканирует законы энергии и физические явления'
  }
];

export const RANK_TIERS = [
  { level: 1, name: 'Стажер ИИ', minXp: 0, maxXp: 250, badge: '🟢' },
  { level: 2, name: 'Кодер-Оператор', minXp: 250, maxXp: 700, badge: '🔵' },
  { level: 3, name: 'Кибер-Инженер', minXp: 700, maxXp: 1600, badge: '🟣' },
  { level: 4, name: 'Архитектор Систем', minXp: 1600, maxXp: 3500, badge: '🟡' },
  { level: 5, name: 'Главный ИИ', minXp: 3500, maxXp: 99999, badge: '🔴' }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    title: 'Первый протокол',
    description: 'Пройди свой первый уровень в Кибер-Лаборатории',
    icon: '⚡',
    reward_xp: 50,
    unlocked: false
  },
  {
    id: 'streak_3',
    title: 'Непрерывный сигнал',
    description: 'Держи серию тренировок 3 дня подряд',
    icon: '🔥',
    reward_xp: 100,
    unlocked: false
  },
  {
    id: 'duel_winner',
    title: 'Победитель Дуэли',
    description: 'Одержи первую победу в PvP дуэли на время',
    icon: '⚔️',
    reward_xp: 150,
    unlocked: false
  },
  {
    id: 'native_speaker',
    title: 'Native Speaker',
    description: 'Пройди тему по разговорному английскому языку',
    icon: '🗣️',
    reward_xp: 150,
    unlocked: false
  },
  {
    id: 'speed_demon',
    title: 'Скоростной Демон',
    description: 'Реши дуэль за 30 секунд или быстрее',
    icon: '⚡',
    reward_xp: 180,
    unlocked: false
  },
  {
    id: 'friend_squad',
    title: 'Кибер-Команда',
    description: 'Добавь 3 друзей в свой список по коду',
    icon: '👥',
    reward_xp: 120,
    unlocked: false
  },
  {
    id: 'virus_cleaner',
    title: 'Истребитель Вирусов',
    description: 'Одолей Вируса-Босса в любой дисциплине',
    icon: '👑',
    reward_xp: 200,
    unlocked: false
  },
  {
    id: 'secret_chip',
    title: 'Хранитель Чипов',
    description: 'Открой свой первый секретный чип-модуль',
    icon: '💾',
    reward_xp: 120,
    unlocked: false
  }
];

export const MOCK_FRIENDS: Friend[] = [
  {
    friend_code: 'FOX-782',
    nickname: 'Звездный_Стриж',
    avatar: 'cat',
    drone_id: 'cyber_cat',
    selected_grade: 5,
    xp: 2450,
    streak_days: 12,
    duel_wins: 18,
    status: 'online'
  },
  {
    friend_code: 'OWL-910',
    nickname: 'Меха_Логик',
    avatar: 'owl',
    drone_id: 'mecha_owl',
    selected_grade: 5,
    xp: 1890,
    streak_days: 8,
    duel_wins: 9,
    status: 'online'
  },
  {
    friend_code: 'BOT-334',
    nickname: 'Властелин_Формул',
    avatar: 'robot',
    drone_id: 'neuro_bot',
    selected_grade: 6,
    xp: 1420,
    streak_days: 5,
    duel_wins: 7,
    status: 'in_duel'
  },
  {
    friend_code: 'NEO-555',
    nickname: 'Нано_Хакер',
    avatar: 'dragon',
    drone_id: 'aero_drone',
    selected_grade: 5,
    xp: 980,
    streak_days: 3,
    duel_wins: 4,
    status: 'offline'
  }
];

export const DUEL_BLITZ_QUESTIONS: Question[] = [
  {
    id: 'duel_q1',
    degree_level: 2,
    story_context: '⚡ ДУЭЛЬ 1/3: Экспресс-счет!',
    question_text: 'Чему равно: 45 + 55 * 2 ?',
    options: [
      { id: 'a', text: '155', is_correct: true },
      { id: 'b', text: '200', is_correct: false },
      { id: 'c', text: '145', is_correct: false },
      { id: 'd', text: '165', is_correct: false }
    ],
    hint: 'Сначала умножение: 55 * 2 = 110, затем 110 + 45 = 155.',
    explanation: '55 * 2 = 110 → 110 + 45 = 155.',
    base_xp: 40
  },
  {
    id: 'duel_q2',
    degree_level: 2,
    story_context: '⚡ ДУЭЛЬ 2/3: Разговорный английский!',
    question_text: 'Как носитель ответит на вопрос: «How is it going?»',
    options: [
      { id: 'a', text: 'Pretty good, thanks!', is_correct: true },
      { id: 'b', text: 'I am going to school', is_correct: false },
      { id: 'c', text: 'Yes, it goes', is_correct: false },
      { id: 'd', text: 'I am 12 years old', is_correct: false }
    ],
    hint: '«How is it going?» означает «Как дела / как поживаешь?».',
    explanation: '«Pretty good, thanks!» = «Все довольно хорошо, спасибо!».',
    base_xp: 40
  },
  {
    id: 'duel_q3',
    degree_level: 2,
    story_context: '⚡ ДУЭЛЬ 3/3: Лингвистический баг!',
    question_text: 'В каком слове пишется мягкий знак (Ь)?',
    options: [
      { id: 'a', text: 'Хочет сдат...ся', is_correct: true },
      { id: 'b', text: 'Он смеет...ся', is_correct: false },
      { id: 'c', text: 'Поезд мчит...ся', is_correct: false },
      { id: 'd', text: 'Звезда светит...ся', is_correct: false }
    ],
    hint: 'Что сделатЬ? СдатЬся (есть Ь в вопросе).',
    explanation: 'Что сделатЬ? Сдаться — пишется с Ь!',
    base_xp: 40
  }
];

export const SUBJECTS: Subject[] = [
  {
    id: 'english_easy',
    title: 'Английский: Spoken & Cyber-English',
    short_title: 'English 🗣️',
    icon: '🌐',
    color: 'from-cyan-600 to-blue-700',
    border_color: 'border-cyan-500/40',
    description: 'Разговорная речь, диалоги, заказ еды, геймерский сленг и правильное произношение',
    topics: [
      {
        id: 'spoken_english_travel',
        subject_id: 'english_easy',
        title: 'Разговорный английский: Диалоги & Сленг',
        description: 'Живые фразы носителей для общения, кафе и путешествий',
        grade_level: 5,
        story_setting: 'Международный Космопорт',
        secret_material: {
          title: 'Топ-4 сокращения, которые обожают носители',
          description: 'Как звучать свободно и бегло',
          fact: 'Носители языка редко говорят «I am going to eat». Они говорят «I am gonna eat»! Вот главные сокращения: Gonna = going to (собираюсь), Wanna = want to (хочу), Gotta = have got to (должен), Dunno = don\'t know (не знаю)!',
          mini_lesson: 'Чтобы вежливо попросить что-то в кафе, никогда не говори «I want...» — это звучит грубо. Всегда используй: «Can I get a burger, please?» или «I\'d like an apple juice, please».'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Знакомство & Small Talk',
            subtitle: 'Как здороваться и отвечать как профи',
            required_correct: 2,
            questions: [
              {
                id: 'spk_1_1',
                degree_level: 1,
                story_context: 'Иностранный агент приветствует тебя: «What’s up, mate?»',
                question_text: 'Что означает фраза «What’s up?» и как на нее ответить?',
                options: [
                  { id: 'a', text: '«Что нового / как дела?» → «Not much! / All good!»', is_correct: true },
                  { id: 'b', text: '«Что наверху?» → «Look at the sky»', is_correct: false },
                  { id: 'c', text: '«Где выход?» → «Turn left»', is_correct: false },
                  { id: 'd', text: '«Сколько времени?» → «It is 5 PM»', is_correct: false }
                ],
                hint: '«What’s up?» — это неформальное приветствие среди друзей.',
                explanation: '«What’s up?» переводится как «Как дела / что нового?». Классический ответ: «Not much» (Ничего особенного) или «All good» (Все супер)!',
                base_xp: 25
              },
              {
                id: 'spk_1_2',
                degree_level: 1,
                story_context: 'Тебе сделали комплимент: «You are awesome!»',
                question_text: 'Какой самый естественный и вежливый ответ?',
                options: [
                  { id: 'a', text: 'Thanks! You too!', is_correct: true },
                  { id: 'b', text: 'Yes, I am awesome', is_correct: false },
                  { id: 'c', text: 'I don’t know', is_correct: false },
                  { id: 'd', text: 'Please', is_correct: false }
                ],
                hint: '«You too!» означает «И ты тоже / взаимно!».',
                explanation: '«Thanks! You too!» — идеальный дружелюбный ответ на комплимент.',
                base_xp: 25
              }
            ]
          },
          {
            level: 2,
            title: 'Степень II: В Кафе & На Улице',
            subtitle: 'Реальные ситуации и заказ еды',
            required_correct: 2,
            questions: [
              {
                id: 'spk_2_1',
                degree_level: 2,
                story_context: 'Ты в кибер-кафе хочешь заказать пиццу и воду.',
                question_text: 'Как вежливо сделать заказ?',
                options: [
                  { id: 'a', text: 'Can I have a slice of pizza and still water, please?', is_correct: true },
                  { id: 'b', text: 'Give me pizza now!', is_correct: false },
                  { id: 'c', text: 'I want eat pizza', is_correct: false },
                  { id: 'd', text: 'Pizza please quickly', is_correct: false }
                ],
                hint: 'Конструкция «Can I have... please?» — золотой стандарт вежливого заказа.',
                explanation: '«Can I have [еда], please?» — самая естественная фраза в любом кафе или ресторане мира!',
                base_xp: 35
              },
              {
                id: 'spk_2_2',
                degree_level: 2,
                story_context: 'Ты потерялся в мегаполисе и ищешь метро.',
                question_text: 'Как спросить дорогу у прохожего?',
                options: [
                  { id: 'a', text: 'Excuse me, could you tell me how to get to the subway station?', is_correct: true },
                  { id: 'b', text: 'Where subway?!', is_correct: false },
                  { id: 'c', text: 'Show me road to metro', is_correct: false },
                  { id: 'd', text: 'I go to station now', is_correct: false }
                ],
                hint: 'Всегда начинай обращение к незнакомцу со слова «Excuse me».',
                explanation: '«Excuse me, could you tell me how to get to...?» — вежливо и грамотно!',
                base_xp: 35
              }
            ]
          },
          {
            level: 3,
            title: 'Степень III: Сленг & Эмоции',
            subtitle: 'Идиомы и реакции носителей',
            required_correct: 2,
            questions: [
              {
                id: 'spk_3_1',
                degree_level: 3,
                story_context: 'Друг предлагает тебе супер-сложную задачу, но для тебя она очень легкая.',
                question_text: 'Какую английскую идиому ты скажешь?',
                options: [
                  { id: 'a', text: 'It’s a piece of cake!', is_correct: true },
                  { id: 'b', text: 'It’s a cup of tea!', is_correct: false },
                  { id: 'c', text: 'It’s an apple pie!', is_correct: false },
                  { id: 'd', text: 'It’s a big problem!', is_correct: false }
                ],
                hint: '«Piece of cake» (кусочек торта) — значит «проще простого / пустяк»!',
                explanation: '«It’s a piece of cake!» — популярнейшая идиома, означающая «легкотня / элементарно»!',
                base_xp: 50
              },
              {
                id: 'spk_3_2',
                degree_level: 3,
                story_context: 'Друг извиняется за мелкую оплошность.',
                question_text: 'Как сказать «Не бери в голову / забей / ерунда»?',
                options: [
                  { id: 'a', text: 'Never mind! / No worries!', is_correct: true },
                  { id: 'b', text: 'Don\'t think my head', is_correct: false },
                  { id: 'c', text: 'Stop saying', is_correct: false },
                  { id: 'd', text: 'You are bad', is_correct: false }
                ],
                hint: '«No worries» (без проблем) и «Never mind» (пустяки).',
                explanation: '«No worries!» или «Never mind!» — лучшие разговорные фразы для ответа на извинения.',
                base_xp: 50
              }
            ]
          },
          {
            level: 4,
            title: 'Вирус-Босс: Кибер-Таможня',
            subtitle: 'Пройди экспресс-интервью на английском за 75 сек!',
            required_correct: 3,
            isBoss: true,
            questions: [
              {
                id: 'boss_spk_1',
                degree_level: 4,
                story_context: '⚡ ТАМОЖНЯ 1/3: Офицер спрашивает: «What is the purpose of your visit?»',
                question_text: 'Что ответить на вопрос о цели визита?',
                options: [
                  { id: 'a', text: 'I am here for tourism and cyber competitions.', is_correct: true },
                  { id: 'b', text: 'I have 2 bags with me.', is_correct: false },
                  { id: 'c', text: 'My name is Alex.', is_correct: false },
                  { id: 'd', text: 'It is 12 o\'clock.', is_correct: false }
                ],
                hint: '«Purpose of visit» = цель визита (туризм, учеба, отдых).',
                explanation: '«I am here for tourism...» — точный и правильный ответ на вопрос офицера!',
                base_xp: 60,
                time_limit_seconds: 75
              },
              {
                id: 'boss_spk_2',
                degree_level: 4,
                story_context: '⚡ ТАМОЖНЯ 2/3: Офицер: «How long are you planning to stay?»',
                question_text: 'Какой ответ правильный по смыслу?',
                options: [
                  { id: 'a', text: 'For two weeks.', is_correct: true },
                  { id: 'b', text: 'In a hotel.', is_correct: false },
                  { id: 'c', text: 'By airplane.', is_correct: false },
                  { id: 'd', text: 'With my friend.', is_correct: false }
                ],
                hint: '«How long...?» спрашивает о продолжительности времени.',
                explanation: '«For two weeks» (на две недели) — четкий ответ по времени!',
                base_xp: 60,
                time_limit_seconds: 75
              },
              {
                id: 'boss_spk_3',
                degree_level: 4,
                story_context: '⚡ ТАМОЖНЯ 3/3: Робот-гид: «Do you need a hand with your luggage?»',
                question_text: 'Что означает фраза «Need a hand»?',
                options: [
                  { id: 'a', text: 'Вам нужна помощь с багажом?', is_correct: true },
                  { id: 'b', text: 'Покажите вашу руку?', is_correct: false },
                  { id: 'c', text: 'Где ваш билет?', is_correct: false },
                  { id: 'd', text: 'Вы потеряли сумку?', is_correct: false }
                ],
                hint: '«Give a hand / Need a hand» — это идиома «помочь / подсобить».',
                explanation: '«Need a hand?» = «Нужна помощь?». БОСС ПРОЙДЕН! Доступ в город открыт!',
                base_xp: 80,
                time_limit_seconds: 75
              }
            ]
          }
        ]
      },
      {
        id: 'cyber_vocab',
        subject_id: 'english_easy',
        title: 'Cyber Words: Базовые команды',
        description: 'Слова, которые знает каждый кибер-агент',
        grade_level: 4,
        story_setting: 'Международный модуль связи',
        secret_material: {
          title: 'Лайфхак запоминания английских глаголов',
          description: 'Ассоциации и связка с играми',
          fact: 'Большинство компьютерных терминов — это простые английские слова: Save (сохранить/спасти), Delete (стереть), Upgrade (улучшить), Bug (жук/ошибка)!',
          mini_lesson: 'Чтобы составить простое предложение на английском, используй порядок: Кто + Что делает + Что/Где (I speak English).'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Сканирование',
            subtitle: 'Расшифровка команд робота',
            required_correct: 2,
            questions: [
              {
                id: 'eng_1_1',
                degree_level: 1,
                story_context: 'Робот передает статус системы: «The system is READY».',
                question_text: 'Что означает слово «READY»?',
                options: [
                  { id: 'a', text: 'Готова', is_correct: true },
                  { id: 'b', text: 'Сломана', is_correct: false },
                  { id: 'c', text: 'Заблокирована', is_correct: false },
                  { id: 'd', text: 'Перегружена', is_correct: false }
                ],
                hint: '«Ready, steady, go!» — На старт, внимание, марш!',
                explanation: 'Ready = Готов / Готова. Система в боевой готовности!',
                base_xp: 20
              },
              {
                id: 'eng_1_2',
                degree_level: 1,
                story_context: 'Выбери правильную форму глагола to be.',
                question_text: 'Вставь пропущенное слово: «We ___ cyber agents.»',
                options: [
                  { id: 'a', text: 'are', is_correct: true },
                  { id: 'b', text: 'is', is_correct: false },
                  { id: 'c', text: 'am', is_correct: false },
                  { id: 'd', text: 'be', is_correct: false }
                ],
                hint: 'I am, He/She/It is, We/You/They are.',
                explanation: 'С местоимением We используется форма ARE: «We are cyber agents»!',
                base_xp: 20
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'math_algebra',
    title: 'Математика & Алгебра',
    short_title: 'Математика',
    icon: '📐',
    color: 'from-blue-600 to-indigo-700',
    border_color: 'border-blue-500/40',
    description: 'Квантовые уравнения, быстрый счет, геометрия и стабилизация формул',
    topics: [
      {
        id: 'math_primary_speed',
        subject_id: 'math_algebra',
        title: 'Устный счет: Кибер-Ускоритель',
        description: 'Быстрое сложение и таблица умножения без калькулятора',
        grade_level: 3,
        story_setting: 'Энергоблок №1',
        secret_material: {
          title: 'Трюк умножения на 9 на пальцах',
          description: 'Мгновенный способ умножать на 9',
          fact: 'Положи руки на стол. Чтобы умножить 9 на 4, загни 4-й палец слева. Слева осталось 3 пальца (десятки), справа 6 пальцев (единицы) — ответ 36!',
          mini_lesson: 'Всегда ищи круглые числа: например, 28 + 47 = (28 + 2) + (47 - 2) = 30 + 45 = 75!'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Сканирование',
            subtitle: 'Разминка вычислительного ядра',
            required_correct: 2,
            questions: [
              {
                id: 'm3_1_1',
                degree_level: 1,
                story_context: 'Дрон-помощник калибрует батарею питания.',
                question_text: 'Посчитай молниеносно: 6 * 8 = ?',
                options: [
                  { id: 'a', text: '48', is_correct: true },
                  { id: 'b', text: '46', is_correct: false },
                  { id: 'c', text: '54', is_correct: false },
                  { id: 'd', text: '42', is_correct: false }
                ],
                hint: '6 * 8 = 6 * 4 * 2 = 24 * 2 = 48.',
                explanation: '6 * 8 = 48. Калибровка завершена успешно!',
                base_xp: 20
              },
              {
                id: 'm3_1_2',
                degree_level: 1,
                story_context: 'Подсчет пакетов данных.',
                question_text: 'Чему равна сумма: 45 + 39 = ?',
                options: [
                  { id: 'a', text: '84', is_correct: true },
                  { id: 'b', text: '85', is_correct: false },
                  { id: 'c', text: '74', is_correct: false },
                  { id: 'd', text: '83', is_correct: false }
                ],
                hint: 'Сложи 45 + 40 = 85 и вычти 1 = 84.',
                explanation: '45 + 40 - 1 = 84. Пакеты данных упакованы!',
                base_xp: 20
              }
            ]
          },
          {
            level: 2,
            title: 'Степень II: Поиск багов',
            subtitle: 'Проверка вычислений робота',
            required_correct: 2,
            questions: [
              {
                id: 'm3_2_1',
                degree_level: 2,
                story_context: 'Робот ошибся в порядке действий.',
                question_text: 'Чему равно значение выражения: 20 + 5 * 4 ?',
                options: [
                  { id: 'a', text: '40', is_correct: true },
                  { id: 'b', text: '100', is_correct: false },
                  { id: 'c', text: '45', is_correct: false },
                  { id: 'd', text: '60', is_correct: false }
                ],
                hint: 'Сначала выполняется умножение: 5 * 4 = 20, а затем сложение: 20 + 20.',
                explanation: 'Умножение главнее сложения! 5 * 4 = 20, 20 + 20 = 40. Не попадись в ловушку 25 * 4!',
                base_xp: 35
              },
              {
                id: 'm3_2_2',
                degree_level: 2,
                story_context: 'Защитный барьер требует точный остаток.',
                question_text: 'Какой остаток получится при делении 38 на 5?',
                options: [
                  { id: 'a', text: '3', is_correct: true },
                  { id: 'b', text: '2', is_correct: false },
                  { id: 'c', text: '4', is_correct: false },
                  { id: 'd', text: '1', is_correct: false }
                ],
                hint: 'Ближайшее число, которое делится на 5 — это 35. 38 - 35 = 3.',
                explanation: '38 = 5 * 7 + 3. Остаток равен 3!',
                base_xp: 35
              }
            ]
          },
          {
            level: 3,
            title: 'Степень III: Кибер-Эксперт',
            subtitle: 'Сложные цепочки вычислений',
            required_correct: 2,
            questions: [
              {
                id: 'm3_3_1',
                degree_level: 3,
                story_context: 'Синхронизация трех серверов.',
                question_text: 'Если на первом сервере 15 файлов, на втором в 3 раза больше, а на третьем на 10 меньше, чем на втором. Сколько всего файлов?',
                options: [
                  { id: 'a', text: '95', is_correct: true },
                  { id: 'b', text: '85', is_correct: false },
                  { id: 'c', text: '105', is_correct: false },
                  { id: 'd', text: '75', is_correct: false }
                ],
                hint: '1-й = 15; 2-й = 15 * 3 = 45; 3-й = 45 - 10 = 35. Сумма: 15 + 45 + 35 = 95.',
                explanation: '15 + 45 + 35 = 95 файлов. Серверы полностью синхронизированы!',
                base_xp: 50
              },
              {
                id: 'm3_3_2',
                degree_level: 3,
                story_context: 'Квантовый таймер защиты.',
                question_text: 'Сколько минут в 3 часах и 25 минутах?',
                options: [
                  { id: 'a', text: '205 минут', is_correct: true },
                  { id: 'b', text: '195 минут', is_correct: false },
                  { id: 'c', text: '215 минут', is_correct: false },
                  { id: 'd', text: '185 минут', is_correct: false }
                ],
                hint: 'В 1 часе 60 минут. 3 * 60 = 180 минут. 180 + 25 = 205 минут.',
                explanation: '3 * 60 + 25 = 205 минут. Точный расчет времени!',
                base_xp: 50
              }
            ]
          },
          {
            level: 4,
            title: 'Вирус-Босс: Глитч-Калькулятор',
            subtitle: '3 задачи за 75 секунд до сбоя системы!',
            required_correct: 3,
            isBoss: true,
            questions: [
              {
                id: 'boss_m3_1',
                degree_level: 4,
                story_context: '⚡ ВИРУС 1/3: Попытка взлома памяти!',
                question_text: 'Вычисли: 250 - (40 * 3) + 70 = ?',
                options: [
                  { id: 'a', text: '200', is_correct: true },
                  { id: 'b', text: '210', is_correct: false },
                  { id: 'c', text: '180', is_correct: false },
                  { id: 'd', text: '190', is_correct: false }
                ],
                hint: '40 * 3 = 120 → 250 - 120 = 130 → 130 + 70 = 200.',
                explanation: '250 - 120 + 70 = 200. Первая атака отбита!',
                base_xp: 60,
                time_limit_seconds: 75
              },
              {
                id: 'boss_m3_2',
                degree_level: 4,
                story_context: '⚡ ВИРУС 2/3: Шифрование файлов!',
                question_text: 'Периметр квадратного чипа равен 36 см. Чему равна его площадь?',
                options: [
                  { id: 'a', text: '81 см²', is_correct: true },
                  { id: 'b', text: '64 см²', is_correct: false },
                  { id: 'c', text: '36 см²', is_correct: false },
                  { id: 'd', text: '72 см²', is_correct: false }
                ],
                hint: 'Сторона = 36 / 4 = 9 см. Площадь = 9 * 9 = 81 см².',
                explanation: 'Сторона квадрата 9 см, площадь 9 * 9 = 81 см²!',
                base_xp: 60,
                time_limit_seconds: 75
              },
              {
                id: 'boss_m3_3',
                degree_level: 4,
                story_context: '⚡ ВИРУС 3/3: Финальное ядро вируса!',
                question_text: 'Умножь в уме: 48 * 5 = ?',
                options: [
                  { id: 'a', text: '240', is_correct: true },
                  { id: 'b', text: '250', is_correct: false },
                  { id: 'c', text: '220', is_correct: false },
                  { id: 'd', text: '260', is_correct: false }
                ],
                hint: 'Трюк: 48 / 2 = 24, и припиши ноль → 240.',
                explanation: 'Умножить на 5 = разделить пополам и умножить на 10! 48 / 2 * 10 = 240. БОСС УНИЧТОЖЕН!',
                base_xp: 80,
                time_limit_seconds: 75
              }
            ]
          }
        ]
      },
      {
        id: 'math_linear_eq',
        subject_id: 'math_algebra',
        title: 'Уравнения & Неизвестные X',
        description: 'Линейные уравнения, перенос слагаемых и скобки',
        grade_level: 7,
        story_setting: 'Квантовый Сервер №7',
        secret_material: {
          title: 'Секрет быстрого решения пропорций',
          description: 'Правило бабочки / крест-накрест',
          fact: 'Если a/b = c/d, то a*d = b*c. Перемножай крест-накрест — и никаких дробей!',
          mini_lesson: 'Всегда держи переменные слева, а числа справа. При переносе через знак равенства знак ВСЕГДА меняется на противоположный!'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Сканирование',
            subtitle: 'Простые линейные уравнения',
            required_correct: 2,
            questions: [
              {
                id: 'eq_7_1',
                degree_level: 1,
                story_context: 'Калибровка частоты процессора.',
                question_text: 'Чему равен x: 4x - 16 = 24?',
                options: [
                  { id: 'a', text: 'x = 10', is_correct: true },
                  { id: 'b', text: 'x = 2', is_correct: false },
                  { id: 'c', text: 'x = 8', is_correct: false },
                  { id: 'd', text: 'x = 6', is_correct: false }
                ],
                hint: '4x = 24 + 16 → 4x = 40 → x = 10.',
                explanation: '4x = 40 → x = 10. Частота стабилизирована!',
                base_xp: 20
              },
              {
                id: 'eq_7_2',
                degree_level: 1,
                story_context: 'Сбалансируй нагрузку.',
                question_text: 'Реши уравнение: 7x + 5 = 3x + 25',
                options: [
                  { id: 'a', text: 'x = 5', is_correct: true },
                  { id: 'b', text: 'x = 4', is_correct: false },
                  { id: 'c', text: 'x = 6', is_correct: false },
                  { id: 'd', text: 'x = 3', is_correct: false }
                ],
                hint: '7x - 3x = 25 - 5 → 4x = 20 → x = 5.',
                explanation: '4x = 20 → x = 5. Балансировка завершена!',
                base_xp: 20
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'logic_informatics',
    title: 'Логика & Информатика',
    short_title: 'Информатика',
    icon: '💻',
    color: 'from-emerald-600 to-teal-700',
    border_color: 'border-emerald-500/40',
    description: 'Двоичный код, алгоритмы, логические операторы И/ИЛИ/НЕ и шифры',
    topics: [
      {
        id: 'binary_and_logic',
        subject_id: 'logic_informatics',
        title: 'Двоичный код & Логические Вентили',
        description: 'Как компьютер думает нулями и единицами',
        grade_level: 6,
        story_setting: 'Шифровальный отсек',
        secret_material: {
          title: 'Как считать в двоичной системе на пальцах до 1023',
          description: 'Каждый палец — это степень двойки (1, 2, 4, 8, 16...)',
          fact: 'На 10 пальцах в обычной системе можно показать только число 10, а в двоичной — от 0 до 1023!',
          mini_lesson: 'Оператор И (AND) дает 1, только если ВСЕ условия верны. Оператор ИЛИ (OR) дает 1, если ХОТЯ БЫ ОДНО условие верно.'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Сканирование',
            subtitle: 'Перевод чисел в двоичный код',
            required_correct: 2,
            questions: [
              {
                id: 'bin_1_1',
                degree_level: 1,
                story_context: 'Расшифровка двоичного пакета.',
                question_text: 'Какое десятичное число записано в двоичном коде как 1010₂?',
                options: [
                  { id: 'a', text: '10', is_correct: true },
                  { id: 'b', text: '12', is_correct: false },
                  { id: 'c', text: '8', is_correct: false },
                  { id: 'd', text: '14', is_correct: false }
                ],
                hint: '1*8 + 0*4 + 1*2 + 0*1 = 8 + 2 = 10.',
                explanation: '1010₂ = 8 + 2 = 10. Пакет успешно расшифрован!',
                base_xp: 25
              },
              {
                id: 'bin_1_2',
                degree_level: 1,
                story_context: 'Логический шлюз безопасности.',
                question_text: 'Чему равно логическое выражение: (НЕ 0) И (1 ИЛИ 0)?',
                options: [
                  { id: 'a', text: '1 (ИСТИНА)', is_correct: true },
                  { id: 'b', text: '0 (ЛОЖЬ)', is_correct: false },
                  { id: 'c', text: 'Ошибка синтаксиса', is_correct: false },
                  { id: 'd', text: 'Неопределенность', is_correct: false }
                ],
                hint: 'НЕ 0 = 1. (1 ИЛИ 0) = 1. 1 И 1 = 1.',
                explanation: '1 И 1 = 1 (ИСТИНА). Шлюз открыт!',
                base_xp: 25
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'russian_lang',
    title: 'Русский язык & Грамотность',
    short_title: 'Русский язык',
    icon: '📖',
    color: 'from-amber-600 to-orange-700',
    border_color: 'border-amber-500/40',
    description: 'Орфографический дебаг, синтаксис, исправление багов в текстах',
    topics: [
      {
        id: 'orthography_debug',
        subject_id: 'russian_lang',
        title: 'Орфографический Дебаг: -ТСЯ и -ТЬСЯ',
        description: 'Устранение самых частых багов в коде родного языка',
        grade_level: 5,
        story_setting: 'Текстовый генератор ИИ',
        secret_material: {
          title: 'Лайфхак с мягким знаком в вопросе',
          description: 'Железное правило для глаголов',
          fact: 'Задай вопрос к глаголу: если в вопросе есть мягкий знак (что делатЬ?), то и в глаголе он пишется (учитЬся). Если в вопросе нет Ь (что делает?), то и в слове нет (учится)!',
          mini_lesson: 'Пример: Он (что делает?) надеется. Он хочет (что сделатЬ?) научитЬся.'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Сканирование',
            subtitle: 'Поиск грамматических сбоев',
            required_correct: 2,
            questions: [
              {
                id: 'rus_1_1',
                degree_level: 1,
                story_context: 'В системном логе обнаружена опечатка.',
                question_text: 'В каком слове пишется ТСЯ (без мягкого знака)?',
                options: [
                  { id: 'a', text: 'Программа запускает...ся', is_correct: true },
                  { id: 'b', text: 'Нужно подготовит...ся', is_correct: false },
                  { id: 'c', text: 'Хватит ленит...ся', is_correct: false },
                  { id: 'd', text: 'Он хочет выспат...ся', is_correct: false }
                ],
                hint: 'Программа (что делает?) запускается — в вопросе нет Ь, значит пишем ТСЯ.',
                explanation: 'Что делает? Запускается (без Ь). Баг успешно исправлен!',
                base_xp: 20
              },
              {
                id: 'rus_1_2',
                degree_level: 1,
                story_context: 'Проверка словарного запаса ИИ.',
                question_text: 'В каком слове пишется буква О?',
                options: [
                  { id: 'a', text: 'Ш...рох листьев', is_correct: true },
                  { id: 'b', text: 'Ж...лтый экран', is_correct: false },
                  { id: 'c', text: 'Ч...рный провод', is_correct: false },
                  { id: 'd', text: 'Ш...пот робота', is_correct: false }
                ],
                hint: 'Шорох, капюшон, крыжовник, шов — слова-исключения, пишутся с буквой О.',
                explanation: 'Шорох — слово-исключение с буквой О под ударением!',
                base_xp: 20
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'physics_nature',
    title: 'Физика & Окружающий мир',
    short_title: 'Физика',
    icon: '⚡',
    color: 'from-purple-600 to-pink-700',
    border_color: 'border-purple-500/40',
    description: 'Законы движения, электричество, оптика, космос и силы природы',
    topics: [
      {
        id: 'energy_and_forces',
        subject_id: 'physics_nature',
        title: 'Силы Природы & Законы Ньютона',
        description: 'Инерция, гравитация, трение и реактивное движение',
        grade_level: 7,
        story_setting: 'Гравитационный отсек',
        secret_material: {
          title: 'Почему космонавты невесомы на МКС',
          description: 'Секрет орбитального полета',
          fact: 'На высоте МКС (400 км) гравитация Земли почти такая же (90% от земной)! Космонавты в невесомости не потому что там нет гравитации, а потому что станция непрерывно «падает» вокруг Земли с первой космической скоростью (7.9 км/с)!',
          mini_lesson: 'Сила тяжести F = mg. На Луне ускорение свободного падения в 6 раз меньше, поэтому там можно прыгать в 6 раз выше!'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Сканирование',
            subtitle: 'Анализ сил и движения',
            required_correct: 2,
            questions: [
              {
                id: 'phy_1_1',
                degree_level: 1,
                story_context: 'Дрон летит в глубоком космосе с выключенными двигателями.',
                question_text: 'Что будет происходить с дроном, если на него не действуют никакие силы?',
                options: [
                  { id: 'a', text: 'Будет двигаться прямолинейно и равномерно с постоянной скоростью', is_correct: true },
                  { id: 'b', text: 'Мгновенно остановится', is_correct: false },
                  { id: 'c', text: 'Начнет бесконечно ускоряться', is_correct: false },
                  { id: 'd', text: 'Начнет вращаться по кругу', is_correct: false }
                ],
                hint: 'Первый закон Ньютона (закон инерции): тело сохраняет покой или равномерное движение, пока на него не подействует сила.',
                explanation: 'По 1-му закону Ньютона тело по инерции продолжает двигаться с постоянной скоростью!',
                base_xp: 25
              },
              {
                id: 'phy_1_2',
                degree_level: 1,
                story_context: 'Измерение давления в гидравлике.',
                question_text: 'В каких единицах измеряется давление в Международной системе СИ?',
                options: [
                  { id: 'a', text: 'Паскали (Па)', is_correct: true },
                  { id: 'b', text: 'Ньютоны (Н)', is_correct: false },
                  { id: 'c', text: 'Джоули (Дж)', is_correct: false },
                  { id: 'd', text: 'Ватты (Вт)', is_correct: false }
                ],
                hint: '1 Паскаль = 1 Ньютон на 1 квадратный метр (Н/м²).',
                explanation: 'Давление измеряется в Паскалях (Па) в честь Блеза Паскаля!',
                base_xp: 25
              }
            ]
          }
        ]
      }
    ]
  }
];

export const ANONYMOUS_NICKNAMES = [
  'Кибер_Лис',
  'Нейро_Кот',
  'Звездный_Сокол',
  'Квантовый_Енот',
  'Матрикс_Барс',
  'Нано_Хакер',
  'Архитектор_Знаний',
  'Протон_Дракон',
  'Властелин_Алгоритмов',
  'Астро_Гений'
];

export const AVATARS = [
  { id: 'fox', emoji: '🦊', name: 'Кибер Лис' },
  { id: 'cat', emoji: '🐱', name: 'Нейро Кот' },
  { id: 'owl', emoji: '🦉', name: 'Меха Сова' },
  { id: 'robot', emoji: '🤖', name: 'Кванто Бот' },
  { id: 'dragon', emoji: '🐲', name: 'Кибер Дракон' },
  { id: 'astronaut', emoji: '👨‍🚀', name: 'Нано Агент' }
];
