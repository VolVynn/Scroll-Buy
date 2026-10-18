import { AppLanguage } from '../types';

export const translations = {
  uk: {
    // Nav bar
    navFeed: 'Стрічка',
    navSearch: 'Пошук',
    navAdd: '+ Додати',
    navChats: 'Чати',
    navProfile: 'Кабінет',

    // Cabinets
    cabinetTitle: 'ОСОБИСТИЙ КАБІНЕТ',
    buyerCabinet: 'Кабінет покупця',
    sellerCabinet: 'Кабінет продавця',
    buyerModeLabel: 'Режим: Наталія (Покупець)',
    sellerModeLabel: 'Режим: Lviv Leather Craft',
    buyerRoleBadge: 'Покупець',
    sellerRoleBadge: 'Продавець',
    editBtn: 'Редагувати',
    settingsBtn: 'Налаштування',
    appSettingsTitle: 'Налаштування додатку',
    
    // Buyer subtabs
    ordersTab: 'Замовлення',
    savedTab: 'Збережені',
    bookingsTab: 'Бронювання',
    
    // Settings view
    languageLabel: 'Мова інтерфейсу:',
    themeLabel: 'Тема оформлення:',
    lightTheme: 'Світла',
    darkTheme: 'Темна',
    notificationsLabel: 'Сповіщення про картки-трейди',
    settingsApplied: '✓ Налаштування застосовано успішно!',
    backToProfile: 'Повернутися до кабінету',

    // Seller view
    publicationsCount: 'Публікацій',
    followersCount: 'Читачі',
    likesCount: 'Вподобайки',
    addPublication: 'Додати публікацію',
    sellerPostsTab: 'Публікації (Відео & Оголошення)',
    sellerVitrineTab: 'Управління асортиментом та датами',
    goodsSubtab: 'Управління товарами',
    slotsSubtab: 'Календар вільних дат',
    addProductBtn: 'Додати товар на продаж',
    addSlotBtn: 'Додати вільну дату',
    occupiedText: 'зайнято',
    freeText: 'вільно для запису',
    removeSlotBtn: 'Зняти слот',
    deleteProductBtn: 'Видалити',

    // Search view
    searchPlaceholder: 'Пошук товарів або авторів...',
    filterBtn: 'Фільтри',
    allCategories: 'Усі рубрики',
    applyFilters: 'Застосувати',
    resetFilters: 'Скинути',
    foundResults: 'Знайдено',
    productsLabel: 'Товари',
    servicesLabel: 'Послуги',
    videoLabel: 'Відео',
    listingLabel: 'Оголошення',

    // Chats view
    chatsTitle: 'Чати',
    chatsSubtitle: 'Тут знаходяться Ваші листування.',
    chatsWithSellers: 'Чати з продавцями',
    chatsWithBuyers: 'Чати з покупцями',
    confirmDealBtn: 'Підтвердити угоду',
    cancelDealBtn: 'Скасувати',
    viewTermsBtn: 'Переглянути умови',
    messagePlaceholder: 'Напишіть повідомлення продавцю...',
    tradeSecurityBadge: 'Secured Scroll & Buy Protection',

    // Scenario header
    scenario1: 'Сценарій 1: Покупка',
    scenario2: 'Сценарій 2: Публікація',
    figmaComponents: 'Компоненти Figma',
    wcagTokens: 'WCAG Токени',
    resetDemo: 'Скинути демо',
  },
  en: {
    // Nav bar
    navFeed: 'Feed',
    navSearch: 'Search',
    navAdd: 'Create',
    navChats: 'Chats',
    navProfile: 'Cabinet',

    // Cabinets
    cabinetTitle: 'USER CABINET',
    buyerCabinet: 'Buyer Cabinet',
    sellerCabinet: 'Seller Cabinet',
    buyerModeLabel: 'Mode: Natalia (Buyer)',
    sellerModeLabel: 'Mode: Lviv Leather Craft',
    buyerRoleBadge: 'Buyer',
    sellerRoleBadge: 'Seller',
    editBtn: 'Edit',
    settingsBtn: 'Settings',
    appSettingsTitle: 'Application Settings',

    // Buyer subtabs
    ordersTab: 'Orders',
    savedTab: 'Saved',
    bookingsTab: 'Bookings',

    // Settings view
    languageLabel: 'Interface Language:',
    themeLabel: 'Appearance Theme:',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    notificationsLabel: 'Trade Card Notifications',
    settingsApplied: '✓ Settings applied successfully!',
    backToProfile: 'Back to Cabinet',

    // Seller view
    publicationsCount: 'Posts',
    followersCount: 'Followers',
    likesCount: 'Likes',
    addPublication: 'Add publication',
    sellerPostsTab: 'Publications (Videos & Ads)',
    sellerVitrineTab: 'Goods & Calendar Management',
    goodsSubtab: 'Goods Management',
    slotsSubtab: 'Open Booking Dates',
    addProductBtn: 'Add Product for Sale',
    addSlotBtn: 'Add Available Slot',
    occupiedText: 'occupied',
    freeText: 'available to book',
    removeSlotBtn: 'Remove slot',
    deleteProductBtn: 'Delete',

    // Search view
    searchPlaceholder: 'Search products or creators...',
    filterBtn: 'Filters',
    allCategories: 'All Categories',
    applyFilters: 'Apply',
    resetFilters: 'Reset',
    foundResults: 'Found',
    productsLabel: 'Products',
    servicesLabel: 'Services',
    videoLabel: 'Videos',
    listingLabel: 'Listings',

    // Chats view
    chatsTitle: 'Chats',
    chatsSubtitle: 'Here are your conversations.',
    chatsWithSellers: 'Chats with sellers',
    chatsWithBuyers: 'Chats with buyers',
    confirmDealBtn: 'Confirm deal',
    cancelDealBtn: 'Cancel',
    viewTermsBtn: 'View terms',
    messagePlaceholder: 'Write a message to the seller...',
    tradeSecurityBadge: 'Secured Scroll & Buy Protection',

    // Scenario header
    scenario1: 'Scenario 1: Purchase',
    scenario2: 'Scenario 2: Publishing',
    figmaComponents: 'Figma Library',
    wcagTokens: 'WCAG Tokens',
    resetDemo: 'Reset Demo',
  },
};

export const getTranslation = (lang: AppLanguage) => translations[lang] || translations.uk;
