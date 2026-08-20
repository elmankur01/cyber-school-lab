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
    title: 'Хакер Знаний',
    description: 'Открой 3 секретных чип-модуля',
    icon: '💾',
    reward_xp: 150,
    unlocked: false
  }
];

export const MOCK_FRIENDS: Friend[] = [
  {
    friend_code: 'FOX-782',
    nickname: 'Кибер_Лис_42',
    avatar: 'fox',
    drone_id: 'cyber_cat',
    xp: 1420,
    selected_grade: 7,
    streak_days: 5,
    duel_wins: 8,
    status: 'online'
  },
  {
    friend_code: 'CAT-319',
    nickname: 'Нейро_Котик',
    avatar: 'cat',
    drone_id: 'neuro_bot',
    xp: 980,
    selected_grade: 5,
    streak_days: 2,
    duel_wins: 3,
    status: 'online'
  },
  {
    friend_code: 'OWL-905',
    nickname: 'Меха_Сова_IQ',
    avatar: 'owl',
    drone_id: 'mecha_owl',
    xp: 2350,
    selected_grade: 9,
    streak_days: 12,
    duel_wins: 15,
    status: 'offline'
  },
  {
    friend_code: 'BOT-104',
    nickname: 'Кванто_Бот',
    avatar: 'robot',
    drone_id: 'aero_drone',
    xp: 610,
    selected_grade: 4,
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
        title: 'Диалоги & Сленг Носителей',
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
        id: 'english_travel_shopping',
        subject_id: 'english_easy',
        title: 'Путешествия: Отель, Магазины & Цены',
        description: 'Покупки, вызов такси и заселение в отель',
        grade_level: 3,
        story_setting: 'Торговый Кибер-Квартал',
        secret_material: {
          title: 'Как спрашивать цену и скидку на английском',
          description: 'Полезные фразы для магазинов',
          fact: 'Фраза «How much is this?» (Сколько это стоит?) работает везде! А если хочешь вежливо спросить скидку, скажи: «Is there any discount on this?»',
          mini_lesson: 'При покупке одежды: «Can I try this on?» = «Могу я это примерить?». Размеры: S (Small), M (Medium), L (Large), XL (Extra Large).'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: В Магазине & Покупки',
            subtitle: 'Как узнать цену и расплатиться',
            required_correct: 2,
            questions: [
              {
                id: 'shop_1_1',
                degree_level: 1,
                story_context: 'Ты хочешь узнать стоимость крутого кибер-шлема.',
                question_text: 'Как спросить у продавца «Сколько это стоит?»',
                options: [
                  { id: 'a', text: 'How much does it cost?', is_correct: true },
                  { id: 'b', text: 'What is price now?', is_correct: false },
                  { id: 'c', text: 'Give me price list', is_correct: false },
                  { id: 'd', text: 'Money for this please', is_correct: false }
                ],
                hint: '«How much is it?» или «How much does it cost?».',
                explanation: '«How much does it cost?» — классический и грамотный вопрос о цене!',
                base_xp: 25
              },
              {
                id: 'shop_1_2',
                degree_level: 1,
                story_context: 'Кассир спрашивает: «Cash or card?»',
                question_text: 'Что у тебя спрашивают?',
                options: [
                  { id: 'a', text: 'Оплата наличными или картой?', is_correct: true },
                  { id: 'b', text: 'Вам нужен пакет или чек?', is_correct: false },
                  { id: 'c', text: 'Где вы живете?', is_correct: false },
                  { id: 'd', text: 'Сколько вам лет?', is_correct: false }
                ],
                hint: 'Cash = наличные, Card = банковская карта.',
                explanation: 'Cash = Наличные деньги, Card = Карта. Оплата принята!',
                base_xp: 25
              }
            ]
          },
          {
            level: 4,
            title: 'Вирус-Босс: Отельный Бот',
            subtitle: 'Заселись в отель за 75 секунд!',
            required_correct: 2,
            isBoss: true,
            questions: [
              {
                id: 'boss_hotel_1',
                degree_level: 4,
                story_context: '⚡ РЕСЕПШН 1/2: Администратор: «Do you have a reservation under your name?»',
                question_text: 'Что ответить, если номер был забронирован?',
                options: [
                  { id: 'a', text: 'Yes, I booked a single room for three nights.', is_correct: true },
                  { id: 'b', text: 'I like sleeping very much.', is_correct: false },
                  { id: 'c', text: 'No, give me free room.', is_correct: false },
                  { id: 'd', text: 'Where is breakfast?', is_correct: false }
                ],
                hint: '«I booked a room» = Я забронировал номер.',
                explanation: '«Yes, I booked a single room...» — правильный ответ! Ключ от номера получен!',
                base_xp: 60,
                time_limit_seconds: 75
              },
              {
                id: 'boss_hotel_2',
                degree_level: 4,
                story_context: '⚡ РЕСЕПШН 2/2: «What time is check-out tomorrow?»',
                question_text: 'Что означает слово «Check-out»?',
                options: [
                  { id: 'a', text: 'Время выезда из номера', is_correct: true },
                  { id: 'b', text: 'Время начала завтрака', is_correct: false },
                  { id: 'c', text: 'Время уборки комнат', is_correct: false },
                  { id: 'd', text: 'Закрытие дверей отеля', is_correct: false }
                ],
                hint: 'Check-in = заезд, Check-out = выезд.',
                explanation: 'Check-out — это время выселения из номера! БОСС ОТЕЛЯ ПРОЙДЕН!',
                base_xp: 70,
                time_limit_seconds: 75
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
        id: 'math_fractions_percents',
        subject_id: 'math_algebra',
        title: 'Дроби & Проценты: Квантовые Доли',
        description: 'Скидки, расчет процентов и сложение дробей с разными знаменателями',
        grade_level: 6,
        story_setting: 'Квантовый Распределитель Энергии',
        secret_material: {
          title: 'Как быстро считать 15% и 20% в уме',
          description: 'Супер-лайфхак для магазинов',
          fact: 'Чтобы найти 10% от любого числа, просто отбрось ноль (или сдвинь запятую влево на 1 знак). Пример: 10% от 480 = 48. Чтобы найти 20% — умножь 48 на 2 = 96!',
          mini_lesson: 'При сложении дробей 1/2 + 1/3 приводи к общему знаменателю 6: 3/6 + 2/6 = 5/6.'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Проценты в реальной жизни',
            subtitle: 'Расчет скидок и кэшбэка',
            required_correct: 2,
            questions: [
              {
                id: 'frc_1_1',
                degree_level: 1,
                story_context: 'Игровая консоль стоит 20 000 руб. На нее действует скидка 15%.',
                question_text: 'Сколько составит скидка в рублях?',
                options: [
                  { id: 'a', text: '3 000 руб.', is_correct: true },
                  { id: 'b', text: '1 500 руб.', is_correct: false },
                  { id: 'c', text: '2 500 руб.', is_correct: false },
                  { id: 'd', text: '4 000 руб.', is_correct: false }
                ],
                hint: '10% от 20000 = 2000. 5% = 1000. 2000 + 1000 = 3000 руб.',
                explanation: '15% от 20 000 = 3 000 руб. Новая цена консоли 17 000 руб!',
                base_xp: 25
              },
              {
                id: 'frc_1_2',
                degree_level: 1,
                story_context: 'Сложение долей энергетических ядер.',
                question_text: 'Чему равна сумма: 3/4 + 1/2 = ?',
                options: [
                  { id: 'a', text: '5/4 (или 1 ¼)', is_correct: true },
                  { id: 'b', text: '4/6', is_correct: false },
                  { id: 'c', text: '1/2', is_correct: false },
                  { id: 'd', text: '4/4', is_correct: false }
                ],
                hint: '1/2 = 2/4. 3/4 + 2/4 = 5/4 = 1 ¼.',
                explanation: '3/4 + 2/4 = 5/4 = 1.25. Реактор заряжен на 125%!',
                base_xp: 25
              }
            ]
          },
          {
            level: 4,
            title: 'Вирус-Босс: Процентный Сбой',
            subtitle: 'Реши 2 задачи на доли за 75 сек!',
            required_correct: 2,
            isBoss: true,
            questions: [
              {
                id: 'boss_frc_1',
                degree_level: 4,
                story_context: '⚡ ВИРУС 1/2: Батарея дрона разрядилась на 40%, осталось 1800 мАч.',
                question_text: 'Какова была полная емкость батареи?',
                options: [
                  { id: 'a', text: '3 000 мАч', is_correct: true },
                  { id: 'b', text: '2 500 мАч', is_correct: false },
                  { id: 'c', text: '3 600 мАч', is_correct: false },
                  { id: 'd', text: '2 200 мАч', is_correct: false }
                ],
                hint: 'Осталось 60% = 1800 мАч. 1% = 1800 / 60 = 30. 100% = 3000.',
                explanation: '1800 / 0.6 = 3000 мАч. Емкость восстановлена!',
                base_xp: 70,
                time_limit_seconds: 75
              },
              {
                id: 'boss_frc_2',
                degree_level: 4,
                story_context: '⚡ ВИРУС 2/2: Сократи квантовую дробь 42/56.',
                question_text: 'Какой несократимый вид имеет дробь 42/56?',
                options: [
                  { id: 'a', text: '3/4', is_correct: true },
                  { id: 'b', text: '2/3', is_correct: false },
                  { id: 'c', text: '6/8', is_correct: false },
                  { id: 'd', text: '7/9', is_correct: false }
                ],
                hint: 'Раздели числитель и знаменатель на 14 (или на 7, а потом на 2).',
                explanation: '42 / 14 = 3; 56 / 14 = 4 → 3/4. БОСС ДРОБЕЙ ПОБЕЖДЕН!',
                base_xp: 80,
                time_limit_seconds: 75
              }
            ]
          }
        ]
      },
      {
        id: 'math_geometry_pythagoras',
        subject_id: 'math_algebra',
        title: 'Геометрия & Теорема Пифагора',
        description: 'Гипотенуза, углы треугольника и расчет площадей',
        grade_level: 8,
        story_setting: 'Голографическая Сетка Полигонов',
        secret_material: {
          title: 'Египетский треугольник (3-4-5)',
          description: 'Секрет строителей пирамид',
          fact: 'Прямоугольный треугольник со сторонами 3, 4 и 5 называется египетским. Если стороны равны 6, 8 — гипотенуза ВСЕГДА будет 10 (3*2, 4*2, 5*2)!',
          mini_lesson: 'Теорема Пифагора: a² + b² = c². Сумма квадратов катетов равна квадрату гипотенузы!'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Углы и гипотенуза',
            subtitle: 'Основы прямоугольных фигур',
            required_correct: 2,
            questions: [
              {
                id: 'geom_1_1',
                degree_level: 1,
                story_context: 'Катеты антенны равны 6 м и 8 м.',
                question_text: 'Чему равна длина поддерживающего троса (гипотенузы)?',
                options: [
                  { id: 'a', text: '10 м', is_correct: true },
                  { id: 'b', text: '14 м', is_correct: false },
                  { id: 'c', text: '12 м', is_correct: false },
                  { id: 'd', text: '9 м', is_correct: false }
                ],
                hint: '6² + 8² = 36 + 64 = 100. √100 = 10 м.',
                explanation: 'a² + b² = 36 + 64 = 100 → c = 10 м. Антенна закреплена!',
                base_xp: 25
              },
              {
                id: 'geom_1_2',
                degree_level: 1,
                story_context: 'Сумма углов треугольника.',
                question_text: 'В треугольнике два угла равны 50° и 70°. Чему равен третий угол?',
                options: [
                  { id: 'a', text: '60°', is_correct: true },
                  { id: 'b', text: '50°', is_correct: false },
                  { id: 'c', text: '80°', is_correct: false },
                  { id: 'd', text: '70°', is_correct: false }
                ],
                hint: 'Сумма всех углов любого треугольника ВСЕГДА равна 180°. 180 - (50 + 70) = 60°.',
                explanation: '180° - 120° = 60°. Точный геометрический расчет!',
                base_xp: 25
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
    description: 'Двоичный код, алгоритмы Python, логические операторы И/ИЛИ/НЕ и кибербезопасность',
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
      },
      {
        id: 'cs_python_algorithms',
        subject_id: 'logic_informatics',
        title: 'Python: Переменные, Циклы & Условия',
        description: 'Чтение кода, условия if/else и циклы for/while',
        grade_level: 7,
        story_setting: 'Лаборатория Нейросетей',
        secret_material: {
          title: 'Почему Python нумерует списки с нуля',
          description: 'Тайна 0-индексации',
          fact: 'В программировании первый элемент списка имеет индекс 0, а не 1. Если у тебя список `fruits = ["яблоко", "банан"]`, то `fruits[0]` — это яблоко!',
          mini_lesson: 'Команда `print()` выводит текст на экран, а `input()` запрашивает ввод у пользователя.'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Анализ кода',
            subtitle: 'Что выведет программа?',
            required_correct: 2,
            questions: [
              {
                id: 'py_1_1',
                degree_level: 1,
                story_context: 'Анализ фрагмента кода на Python:\nx = 10\ny = 3\nprint(x % y)',
                question_text: 'Что выведет этот скрипт? (Оператор % — остаток от деления)',
                options: [
                  { id: 'a', text: '1', is_correct: true },
                  { id: 'b', text: '3', is_correct: false },
                  { id: 'c', text: '3.33', is_correct: false },
                  { id: 'd', text: '0', is_correct: false }
                ],
                hint: '10 делится на 3 с остатком: 10 = 3*3 + 1.',
                explanation: 'Оператор % возвращает остаток от деления. 10 % 3 = 1!',
                base_xp: 30
              },
              {
                id: 'py_1_2',
                degree_level: 1,
                story_context: 'Цикл for в Python:\ncount = 0\nfor i in range(4):\n    count += 2\nprint(count)',
                question_text: 'Чему будет равен count после завершения цикла?',
                options: [
                  { id: 'a', text: '8', is_correct: true },
                  { id: 'b', text: '4', is_correct: false },
                  { id: 'c', text: '6', is_correct: false },
                  { id: 'd', text: '10', is_correct: false }
                ],
                hint: 'Цикл повторится 4 раза (для 0, 1, 2, 3). Каждый раз прибавляется 2: 4 * 2 = 8.',
                explanation: 'Цикл range(4) выполняется 4 раза: 0 + 2 + 2 + 2 + 2 = 8!',
                base_xp: 30
              }
            ]
          },
          {
            level: 4,
            title: 'Вирус-Босс: Баг Переполнения Стэка',
            subtitle: 'Исправь 2 программные ошибки за 75 сек!',
            required_correct: 2,
            isBoss: true,
            questions: [
              {
                id: 'boss_py_1',
                degree_level: 4,
                story_context: '⚡ ДЕБАГ 1/2: Какой тип данных вернет выражение: type("42")?',
                question_text: 'Определи тип переменной в Python:',
                options: [
                  { id: 'a', text: 'str (строка)', is_correct: true },
                  { id: 'b', text: 'int (целое число)', is_correct: false },
                  { id: 'c', text: 'float (дробное)', is_correct: false },
                  { id: 'd', text: 'bool (логический)', is_correct: false }
                ],
                hint: 'Все, что заключено в кавычки "...", является строкой (str).',
                explanation: 'Кавычки "42" превращают число в строковый тип str!',
                base_xp: 70,
                time_limit_seconds: 75
              },
              {
                id: 'boss_py_2',
                degree_level: 4,
                story_context: '⚡ ДЕБАГ 2/2: Как проверить равенство двух переменных a и b в условии if?',
                question_text: 'Какой оператор сравнения используется в Python?',
                options: [
                  { id: 'a', text: 'a == b', is_correct: true },
                  { id: 'b', text: 'a = b', is_correct: false },
                  { id: 'c', text: 'a === b', is_correct: false },
                  { id: 'd', text: 'a eq b', is_correct: false }
                ],
                hint: 'Один знак = присваивает значение, а двойной == сравнивает!',
                explanation: '`a == b` — оператор проверки равенства. БОСС ПЕРЕПОЛНЕНИЯ УНИЧТОЖЕН!',
                base_xp: 80,
                time_limit_seconds: 75
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
      },
      {
        id: 'rus_roots_alternation',
        subject_id: 'russian_lang',
        title: 'Чередование корней: ЛАГ/ЛОЖ & РАСТ/РОС',
        description: 'Правила написания безударных гласных в корнях',
        grade_level: 6,
        story_setting: 'Архив Древних Рукописей',
        secret_material: {
          title: 'Лайфхак правила суффикса -А-',
          description: 'Суффикс-подсказка',
          fact: 'В корнях БЕР/БИР, ДЕР/ДИР, СТЕЛ/СТИЛ пишется И, только если после корня стоит суффикс А! Запомни имя: «ИвАн» (И пишется перед А): собИрАть, но собЕру!',
          mini_lesson: 'Перед Г пишется А (полАгать), перед Ж пишется О (полОжить).'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Корни с чередованием',
            subtitle: 'Выбери правильную букву',
            required_correct: 2,
            questions: [
              {
                id: 'rt_1_1',
                degree_level: 1,
                story_context: 'Дебаг текста отчета.',
                question_text: 'В каком слове на месте пропуска пишется буква А?',
                options: [
                  { id: 'a', text: 'Предл...гать решение', is_correct: true },
                  { id: 'b', text: 'Предл...жить помощь', is_correct: false },
                  { id: 'c', text: 'Возл...жить цветы', is_correct: false },
                  { id: 'd', text: 'Сл...жить числа', is_correct: false }
                ],
                hint: 'В корне ЛАГ/ЛОЖ перед буквой Г пишется А, перед Ж — буква О.',
                explanation: 'ПредлАгать — перед буквой Г пишется буква А!',
                base_xp: 25
              },
              {
                id: 'rt_1_2',
                degree_level: 1,
                story_context: 'Сканирование биологического описания.',
                question_text: 'В каком слове пишется буква О?',
                options: [
                  { id: 'a', text: 'Густые зар...сли', is_correct: true },
                  { id: 'b', text: 'Быстро взр...стать', is_correct: false },
                  { id: 'c', text: 'Юное р...стение', is_correct: false },
                  { id: 'd', text: 'Зеленый р...сток (исключение)', is_correct: false }
                ],
                hint: 'Перед СТ и Щ пишется А (растение, выращенный), перед С пишется О (заросли).',
                explanation: 'Заросли — перед буквой С пишется буква О!',
                base_xp: 25
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
      },
      {
        id: 'physics_electricity_circuits',
        subject_id: 'physics_nature',
        title: 'Электричество & Закон Ома',
        description: 'Сила тока, напряжение, сопротивление и электрические цепи',
        grade_level: 8,
        story_setting: 'Электростанция Кибер-Города',
        secret_material: {
          title: 'Треугольник Закона Ома',
          description: 'Как никогда не путать формулу',
          fact: 'Нарисуй треугольник: сверху U (напряжение), снизу I (ток) и R (сопротивление). Закрой пальцем то, что ищешь: U = I * R; I = U / R; R = U / I!',
          mini_lesson: 'В розетке дома переменное напряжение 220 Вольт. Сила тока измеряется в Амперах (А), а сопротивление в Омах (Ом).'
        },
        degrees: [
          {
            level: 1,
            title: 'Степень I: Ток и напряжение',
            subtitle: 'Расчет параметров цепи',
            required_correct: 2,
            questions: [
              {
                id: 'el_1_1',
                degree_level: 1,
                story_context: 'Напряжение на клеммах чипа 12 В, сопротивление 4 Ом.',
                question_text: 'Какова сила тока в проводнике?',
                options: [
                  { id: 'a', text: '3 Ампера (А)', is_correct: true },
                  { id: 'b', text: '48 Ампер (А)', is_correct: false },
                  { id: 'c', text: '8 Ампер (А)', is_correct: false },
                  { id: 'd', text: '16 Ампер (А)', is_correct: false }
                ],
                hint: 'По закону Ома: I = U / R = 12 / 4 = 3 А.',
                explanation: 'I = 12 В / 4 Ом = 3 А. Ток стабилен!',
                base_xp: 25
              },
              {
                id: 'el_1_2',
                degree_level: 1,
                story_context: 'Определение единиц измерения.',
                question_text: 'В каких единицах измеряется электрическое сопротивление?',
                options: [
                  { id: 'a', text: 'Омы (Ом)', is_correct: true },
                  { id: 'b', text: 'Вольты (В)', is_correct: false },
                  { id: 'c', text: 'Ватты (Вт)', is_correct: false },
                  { id: 'd', text: 'Кулоны (Кл)', is_correct: false }
                ],
                hint: 'В честь немецкого физика Георга Ома.',
                explanation: 'Электрическое сопротивление измеряется в Омах (Ом)!',
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
