import React, { useState } from 'react';
import { 
  Product, 
  ChatMessage, 
  SellerPublication, 
  BookingSlot, 
  BuyerOrder, 
  BuyerProfile, 
  SellerProfile, 
  ActiveTab, 
  DeviceType,
  AppLanguage,
  AppTheme
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CHAT_MESSAGES, 
  INITIAL_SELLER_PUBLICATIONS, 
  INITIAL_BOOKING_SLOTS, 
  INITIAL_BUYER_ORDERS,
  INITIAL_BUYER_PROFILE,
  INITIAL_SELLER_PROFILE,
  INITIAL_SELLER_PRODUCTS
} from './data/mockData';
import { DeviceFrame } from './components/DeviceFrame';
import { NavigationTabBar } from './components/NavigationTabBar';
import { FeedView } from './components/FeedView';
import { ProductCardModal } from './components/ProductCardModal';
import { ChatTradeView } from './components/ChatTradeView';
import { CreateListingView } from './components/CreateListingView';
import { SearchView } from './components/SearchView';
import { ProfileView } from './components/ProfileView';
import { MessagesListView } from './components/MessagesListView';
import { PublicSellerProfileModal } from './components/PublicSellerProfileModal';
import { DesignSystemModal } from './components/DesignSystemModal';
import { FigmaComponentLibraryModal } from './components/FigmaComponentLibraryModal';

export default function App() {
  // Application Data States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);
  const [publications, setPublications] = useState<SellerPublication[]>(INITIAL_SELLER_PUBLICATIONS);
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>(INITIAL_BOOKING_SLOTS);
  const [buyerOrders, setBuyerOrders] = useState<BuyerOrder[]>(INITIAL_BUYER_ORDERS);
  const [sellerProducts, setSellerProducts] = useState<Product[]>(INITIAL_SELLER_PRODUCTS);

  // User Profiles (Separated Buyer & Seller)
  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile>(INITIAL_BUYER_PROFILE);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile>(INITIAL_SELLER_PROFILE);

  // Navigation & View States
  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [activeChatProduct, setActiveChatProduct] = useState<Product | null>(null);
  const [publicSellerHandle, setPublicSellerHandle] = useState<string | null>(null);
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [showFigmaLibrary, setShowFigmaLibrary] = useState(false);

  // Device Frame State (Default Android)
  const [deviceType, setDeviceType] = useState<DeviceType>('android');

  // Application Language & Theme (Global State)
  const [appLanguage, setAppLanguage] = useState<AppLanguage>('uk');
  const [appTheme, setAppTheme] = useState<AppTheme>('light');

  React.useEffect(() => {
    if (appTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appTheme]);

  // Interactive Handlers
  const handleToggleLike = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isLiked: !p.isLiked } : p
      )
    );
  };

  const handleToggleBookmark = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    );
  };

  const handleOpenProduct = (product: Product) => {
    setActiveModalProduct(product);
  };

  const handleProceedToPurchase = (product: Product) => {
    setActiveModalProduct(null);
    setActiveChatProduct(product);
    setActiveTab('messages');
  };

  const handleOpenChatFromModal = (product: Product) => {
    setActiveModalProduct(null);
    setActiveChatProduct(product);
    setActiveTab('messages');
  };

  const handleOpenSellerProfile = (handle: string) => {
    setPublicSellerHandle(handle);
  };

  const handleWatchVideo = (product: Product) => {
    // Close any open overlays and navigate to Reels Feed focused on this item
    setActiveModalProduct(null);
    setPublicSellerHandle(null);
    const existingIndex = products.findIndex((p) => p.id === product.id || p.authorHandle === product.authorHandle);
    if (existingIndex !== -1) {
      setCurrentProductIndex(existingIndex);
    } else {
      setProducts((prev) => [product, ...prev]);
      setCurrentProductIndex(0);
    }
    setActiveTab('feed');
  };

  const handleConfirmTrade = (cardId: string) => {
    if (!activeChatProduct) return;
    const sellerHandle = activeChatProduct.authorHandle;

    setChatHistory((prev) => {
      const existing = prev[sellerHandle] || [];
      const updated = existing.map((msg) => {
        if (msg.tradeCard && msg.tradeCard.id === cardId) {
          return {
            ...msg,
            tradeCard: {
              ...msg.tradeCard,
              status: 'confirmed' as const,
              confirmationCode: `С&Б-8492-ЗАХИСТ`,
            },
          };
        }
        return msg;
      });

      return {
        ...prev,
        [sellerHandle]: [
          ...updated,
          {
            id: `msg-${Date.now()}`,
            sender: 'system',
            text: 'Офіційна фіксація Scroll & Buy: Угоду підтверджено покупцем. Кошти безпечно задепоновано на ескроу-рахунку, автору надіслано підтвердження на відправку.',
            timestamp: 'Зараз',
          },
        ],
      };
    });

    // Add to buyer orders list for Natalia with individual delivery tracking number
    const newTrackingNum = `NP204509${Math.floor(100000 + Math.random() * 900000)}`;
    setBuyerOrders((prev) => [
      {
        id: `ORD-${Date.now().toString().slice(-4)}`,
        title: activeChatProduct.title,
        author: `${activeChatProduct.author} (${activeChatProduct.authorHandle})`,
        authorHandle: activeChatProduct.authorHandle,
        price: activeChatProduct.price,
        currency: activeChatProduct.currency,
        status: 'In Transit',
        date: 'Сьогодні, щойно',
        type: activeChatProduct.type,
        imageType: activeChatProduct.id.replace('prod-', ''),
        trackingNumber: newTrackingNum,
        carrier: 'Нова Пошта (Експрес)',
        estimatedDelivery: 'Очікується через 1-2 дні',
        deliveryAddress: `${buyerProfile.city}, Відділення №24 (вул. Стрийська, 45)`,
        trackingSteps: [
          { title: 'Замовлення підтверджено в системі', date: 'Сьогодні, щойно', location: 'Онлайн ескроу', completed: true },
          { title: 'Очікує комплектації майстром', date: 'Сьогодні', location: 'Майстерня автора', completed: true },
          { title: 'Передано перевізнику Нова Пошта', date: 'Завтра', location: 'Відділення №24', completed: false },
          { title: 'Очікує одержувача', date: 'Через 2 дні', location: 'вул. Стрийська, 45', completed: false },
        ],
      },
      ...prev,
    ]);
  };

  const handleCancelTrade = (cardId: string, reason: string) => {
    if (!activeChatProduct) return;
    const sellerHandle = activeChatProduct.authorHandle;

    setChatHistory((prev) => {
      const existing = prev[sellerHandle] || [];
      const updated = existing.map((msg) => {
        if (msg.tradeCard && msg.tradeCard.id === cardId) {
          return {
            ...msg,
            tradeCard: {
              ...msg.tradeCard,
              status: 'cancelled' as const,
              cancelReason: reason,
            },
          };
        }
        return msg;
      });

      return {
        ...prev,
        [sellerHandle]: [
          ...updated,
          {
            id: `msg-${Date.now()}`,
            sender: 'system',
            text: `Угоду скасовано покупцем. Причина: ${reason}. Кошти депонованого ескроу розблоковано.`,
            timestamp: 'Зараз',
          },
        ],
      };
    });

    // Update or add cancelled status in buyerOrders
    setBuyerOrders((prev) =>
      prev.map((ord) =>
        ord.title === activeChatProduct.title
          ? {
              ...ord,
              status: 'Cancelled',
              cancelReason: reason,
            }
          : ord
      )
    );
  };

  const handleSendMessage = (text: string) => {
    if (!activeChatProduct) return;
    const sellerHandle = activeChatProduct.authorHandle;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      text,
      timestamp: 'Зараз',
    };

    setChatHistory((prev) => ({
      ...prev,
      [sellerHandle]: [...(prev[sellerHandle] || []), newMsg],
    }));

    setTimeout(() => {
      setChatHistory((prev) => ({
        ...prev,
        [sellerHandle]: [
          ...(prev[sellerHandle] || []),
          {
            id: `msg-reply-${Date.now()}`,
            sender: 'seller',
            text: 'Дякую за повідомлення! Всі деталі узгоджено, я вже готую замовлення.',
            timestamp: 'Зараз',
          },
        ],
      }));
    }, 1200);
  };

  const handlePublicationCreated = (newPub: SellerPublication) => {
    setPublications((prev) => [newPub, ...prev]);

    if (newPub.type === 'video') {
      const newProductItem: Product = {
        id: `prod-${newPub.id}`,
        title: newPub.title,
        author: sellerProfile.name,
        authorHandle: sellerProfile.handle,
        authorAvatar: sellerProfile.avatar,
        price: newPub.price || 490,
        currency: newPub.currency || 'грн',
        description: newPub.description,
        category: newPub.category,
        tags: ['#новапублікація', '#львів', '#крафт'],
        inStock: true,
        type: 'product',
        condition: 'new',
        rating: 5.0,
        reviewsCount: 1,
        location: sellerProfile.address,
        videoTitle: newPub.title,
        soundTitle: newPub.soundTitle || 'Оригінальний звук автора',
        likes: 1,
        comments: 0,
        shares: 0,
        imageBgColor: '#2D1F18',
        badgeText: 'Нова публікація майстра',
      };
      setProducts((prev) => [newProductItem, ...prev]);
    }
  };

  const handleDeletePublication = (id: string) => {
    setPublications((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteSellerProduct = (id: string) => {
    setSellerProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddSellerProduct = (newProd: Product) => {
    setSellerProducts((prev) => [newProd, ...prev]);
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteBookingSlot = (id: string) => {
    setBookingSlots((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddBookingSlot = (newSlot: BookingSlot) => {
    setBookingSlots((prev) => [newSlot, ...prev]);
  };

  const handleBookServiceSlot = (title: string, master: string, date: string, time: string, price: number) => {
    setBuyerOrders((prev) => [
      {
        id: `BRN-${Date.now().toString().slice(-4)}`,
        title,
        author: master,
        price,
        currency: 'грн',
        status: 'Заброньовано',
        date: `${date}, ${time}`,
        type: 'service',
        imageType: 'ceramic',
      },
      ...prev,
    ]);
  };

  // Quick Preset Actions for testing
  const handleJumpScenario1 = () => {
    setActiveTab('feed');
    setCurrentProductIndex(0);
    setActiveChatProduct(null);
    setPublicSellerHandle(null);
    setActiveModalProduct(products[0]);
  };

  const handleJumpScenario2 = () => {
    setActiveTab('create');
    setActiveModalProduct(null);
    setActiveChatProduct(null);
    setPublicSellerHandle(null);
  };

  const handleJumpChats = () => {
    setActiveTab('messages');
    setActiveChatProduct(products[0]);
    setActiveModalProduct(null);
    setPublicSellerHandle(null);
  };

  const handleResetDemo = () => {
    setProducts(INITIAL_PRODUCTS);
    setChatHistory(INITIAL_CHAT_MESSAGES);
    setPublications(INITIAL_SELLER_PUBLICATIONS);
    setBookingSlots(INITIAL_BOOKING_SLOTS);
    setBuyerOrders(INITIAL_BUYER_ORDERS);
    setSellerProducts(INITIAL_SELLER_PRODUCTS);
    setBuyerProfile(INITIAL_BUYER_PROFILE);
    setSellerProfile(INITIAL_SELLER_PROFILE);
    setCurrentProductIndex(0);
    setActiveTab('feed');
    setActiveModalProduct(null);
    setActiveChatProduct(null);
    setPublicSellerHandle(null);
  };

  const pendingCount = Object.values(chatHistory)
    .flat()
    .filter((m) => m.tradeCard?.status === 'pending').length;

  const isTabBarVisible = !activeModalProduct && !(activeTab === 'messages' && activeChatProduct) && !publicSellerHandle;
  const savedProducts = products.filter((p) => p.isBookmarked || p.isLiked);

  return (
    <DeviceFrame
      deviceType={deviceType}
      onDeviceTypeChange={setDeviceType}
      onResetDemo={handleResetDemo}
      onJumpScenario1={handleJumpScenario1}
      onJumpScenario2={handleJumpScenario2}
      onJumpChats={handleJumpChats}
      onOpenDesignSystem={() => setShowDesignSystem(true)}
      onOpenFigmaLibrary={() => setShowFigmaLibrary(true)}
      appLanguage={appLanguage}
      appTheme={appTheme}
    >
      {/* Screen Body Viewport */}
      <div className={`relative flex-1 w-full h-full overflow-hidden flex flex-col transition-colors ${
        appTheme === 'dark' ? 'dark bg-[#121618] text-white' : 'bg-[#F2F2F2] text-[#0D0D0D]'
      }`}>
        {/* Tab 1: Video Reels Feed */}
        {activeTab === 'feed' && (
          <FeedView
            products={products}
            currentProductIndex={currentProductIndex}
            onSelectIndex={setCurrentProductIndex}
            onOpenProduct={handleOpenProduct}
            onToggleLike={handleToggleLike}
            onToggleBookmark={handleToggleBookmark}
            onOpenSellerProfile={handleOpenSellerProfile}
          />
        )}

        {/* Tab 2: Search & Discover */}
        {activeTab === 'search' && (
          <SearchView
            products={products}
            onOpenProduct={handleOpenProduct}
            onOpenSellerProfile={handleOpenSellerProfile}
            appLanguage={appLanguage}
            appTheme={appTheme}
          />
        )}

        {/* Tab 3: Create Listing / Video */}
        {activeTab === 'create' && (
          <CreateListingView
            onBack={() => setActiveTab('profile')}
            onPublicationCreated={handlePublicationCreated}
          />
        )}

        {/* Tab 4: Messages / Active Trade Cards */}
        {activeTab === 'messages' && (
          activeChatProduct ? (
            <ChatTradeView
              product={activeChatProduct}
              messages={chatHistory[activeChatProduct.authorHandle] || []}
              onBack={() => setActiveChatProduct(null)}
              onConfirmTrade={handleConfirmTrade}
              onCancelTrade={handleCancelTrade}
              onSendMessage={handleSendMessage}
              onOpenSellerProfile={handleOpenSellerProfile}
            />
          ) : (
            <MessagesListView
              products={products}
              chatHistory={chatHistory}
              onSelectChat={(p) => setActiveChatProduct(p)}
              appLanguage={appLanguage}
              appTheme={appTheme}
            />
          )
        )}

        {/* Tab 5: Profile & Cabinets (Buyer Natalia & Seller Lviv Leather Craft) */}
        {activeTab === 'profile' && (
          <ProfileView
            buyerProfile={buyerProfile}
            sellerProfile={sellerProfile}
            onUpdateBuyerProfile={setBuyerProfile}
            onUpdateSellerProfile={setSellerProfile}
            publications={publications}
            bookingSlots={bookingSlots}
            buyerOrders={buyerOrders}
            sellerProducts={sellerProducts}
            savedProducts={savedProducts}
            onCreateClick={() => setActiveTab('create')}
            onOpenProduct={handleOpenProduct}
            onWatchVideo={handleWatchVideo}
            onDeletePublication={handleDeletePublication}
            onDeleteSellerProduct={handleDeleteSellerProduct}
            onAddSellerProduct={handleAddSellerProduct}
            onDeleteBookingSlot={handleDeleteBookingSlot}
            onAddBookingSlot={handleAddBookingSlot}
            appLanguage={appLanguage}
            onLanguageChange={setAppLanguage}
            appTheme={appTheme}
            onThemeChange={setAppTheme}
          />
        )}

        {/* Product Card Detail Modal */}
        {activeModalProduct && (
          <ProductCardModal
            product={activeModalProduct}
            onClose={() => setActiveModalProduct(null)}
            onProceedToPurchase={handleProceedToPurchase}
            onOpenChat={handleOpenChatFromModal}
            onOpenSellerProfile={handleOpenSellerProfile}
          />
        )}

        {/* Public Seller Profile Modal (When viewing another seller's page) */}
        {publicSellerHandle && (
          <PublicSellerProfileModal
            authorHandle={publicSellerHandle}
            products={products}
            onClose={() => setPublicSellerHandle(null)}
            onOpenChat={(p) => {
              setPublicSellerHandle(null);
              handleProceedToPurchase(p);
            }}
            onOpenProduct={(p) => {
              setPublicSellerHandle(null);
              handleOpenProduct(p);
            }}
            onWatchVideo={(p) => {
              handleWatchVideo(p);
            }}
            onBookServiceSlot={handleBookServiceSlot}
          />
        )}
      </div>

      {/* Navigation Tab Bar */}
      {isTabBarVisible && (
        <NavigationTabBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab !== 'messages') {
              setActiveChatProduct(null);
            }
            setActiveModalProduct(null);
            setPublicSellerHandle(null);
          }}
          pendingTradeCount={pendingCount}
          appLanguage={appLanguage}
          appTheme={appTheme}
        />
      )}

      {/* WCAG Design Tokens Modal */}
      {showDesignSystem && (
        <DesignSystemModal onClose={() => setShowDesignSystem(false)} />
      )}

      {/* Full Figma Component Library Suite Modal */}
      {showFigmaLibrary && (
        <FigmaComponentLibraryModal onClose={() => setShowFigmaLibrary(false)} />
      )}
    </DeviceFrame>
  );
}
