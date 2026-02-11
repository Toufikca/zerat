// deepseek_javascript_20260210_french_complete.js - Système complet en français

// Données mock pour le système
window.mockData = {
    players: [
        {
            id: 1,
            name: "Karim Benzema",
            age: 34,
            position: "FW",
            number: 9,
            rating: 92,
            value: 45000000,
            salary: 150000,
            height: 185,
            weight: 81,
            foot: "Left",
            status: "active",
            team: "Real Madrid",
            contract: "2024-06-30",
            stats: { matches: 28, goals: 22, assists: 8, cards: 3 }
        },
        {
            id: 2,
            name: "Kylian Mbappé",
            age: 24,
            position: "FW",
            number: 7,
            rating: 95,
            value: 180000000,
            salary: 220000,
            height: 178,
            weight: 73,
            foot: "Right",
            status: "active",
            team: "PSG",
            contract: "2025-06-30",
            stats: { matches: 32, goals: 35, assists: 12, cards: 1 }
        },
        {
            id: 3,
            name: "N'Golo Kanté",
            age: 31,
            position: "MF",
            number: 6,
            rating: 88,
            value: 35000000,
            salary: 120000,
            height: 168,
            weight: 68,
            foot: "Right",
            status: "active",
            team: "Chelsea",
            contract: "2023-06-30",
            stats: { matches: 25, goals: 2, assists: 5, cards: 4 }
        },
        {
            id: 4,
            name: "Hugo Lloris",
            age: 35,
            position: "GK",
            number: 1,
            rating: 86,
            value: 8000000,
            salary: 100000,
            height: 188,
            weight: 82,
            foot: "Right",
            status: "active",
            team: "Tottenham",
            contract: "2024-06-30",
            stats: { matches: 30, saves: 98, cleanSheets: 12 }
        }
    ],
    upcomingMatches: [
        {
            id: 1,
            date: "15/03/2024",
            homeTeam: "Paris Saint-Germain",
            awayTeam: "Olympique de Marseille",
            competition: "Ligue 1",
            stadium: "Parc des Princes"
        },
        {
            id: 2,
            date: "22/03/2024",
            homeTeam: "Olympique Lyonnais",
            awayTeam: "AS Monaco",
            competition: "Ligue 1",
            stadium: "Groupama Stadium"
        }
    ],
    dashboardStats: {
        leaguePosition: 3,
        budget: 125,
        budgetChange: 2.4,
        injuredPlayers: 2,
        injuryChange: -1,
        points: 45,
        upcomingMatches: [
            {
                id: 1,
                date: "15/03/2024",
                homeTeam: "PSG",
                awayTeam: "OM",
                competition: "Ligue 1"
            },
            {
                id: 2,
                date: "22/03/2024",
                homeTeam: "OL",
                awayTeam: "ASM",
                competition: "Ligue 1"
            }
        ],
        topPlayers: [
            {
                id: 1,
                name: "K. Mbappé",
                position: "Attaquant",
                rating: 95
            },
            {
                id: 2,
                name: "N. Kanté",
                position: "Milieu",
                rating: 88
            }
        ]
    },
    trainingSessions: [
        {
            id: 1,
            date: "10/03/2024",
            type: "Technique",
            duration: "90 min",
            intensity: "Haute",
            participants: 22,
            coach: "Coach Dupont"
        },
        {
            id: 2,
            date: "11/03/2024",
            type: "Physique",
            duration: "120 min",
            intensity: "Moyenne",
            participants: 20,
            coach: "Coach Martin"
        }
    ],
    injuries: [
        {
            id: 1,
            playerId: 5,
            playerName: "Lucas Hernandez",
            type: "Blessure musculaire",
            severity: "Moyenne",
            startDate: "01/03/2024",
            expectedReturn: "01/04/2024",
            status: "En traitement"
        },
        {
            id: 2,
            playerId: 8,
            playerName: "Paul Pogba",
            type: "Blessure au genou",
            severity: "Grave",
            startDate: "15/02/2024",
            expectedReturn: "15/05/2024",
            status: "Opération"
        }
    ]
};

/**
 * Initialisation de l'application avec gestion des erreurs
 */
class EnhancedFootballManagerApp {
    constructor() {
        this.config = this.loadConfig();
        this.state = this.createState();
        this.api = new EnhancedAPIManager(this.config.API_URL);
        this.auth = new EnhancedAuthManager();
        this.store = new EnhancedDataStore();
        this.router = new Router();
        this.notificationManager = new NotificationManager();
        this.offlineManager = new OfflineManager();
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.init();
    }
    
    /**
     * Chargement de la configuration
     */
    loadConfig() {
        const defaultConfig = {
            APP_NAME: 'S-MAINT Football Manager Pro 2027',
            VERSION: '2.1.0',
            API_URL: 'http://localhost:3000/api',
            CACHE_TTL: 5 * 60 * 1000, // 5 minutes
            FEATURES: {
                MULTI_TEAM: true,
                TRANSFER_MARKET: true,
                YOUTH_ACADEMY: true,
                TRAINING_PLANS: true,
                INJURY_MANAGEMENT: true,
                FINANCIAL_MANAGEMENT: true,
                SCOUTING_NETWORK: true,
                REAL_TIME_UPDATES: true,
                OFFLINE_MODE: true
            },
            DEFAULT_SETTINGS: {
                LANGUAGE: 'fr',
                CURRENCY: 'EUR',
                TIMEZONE: 'Europe/Paris',
                DATE_FORMAT: 'dd/MM/yyyy',
                NOTIFICATIONS: true,
                THEME: 'light',
                SIDEBAR_COLLAPSED: false
            },
            DEBUG: false
        };
        
        try {
            const savedConfig = localStorage.getItem('app_config');
            return savedConfig ? { ...defaultConfig, ...JSON.parse(savedConfig) } : defaultConfig;
        } catch (error) {
            console.error('Erreur de chargement de la configuration:', error);
            return defaultConfig;
        }
    }
    
    /**
     * Création de l'état de l'application
     */
    createState() {
        return {
            isLoading: false,
            isSidebarCollapsed: localStorage.getItem('sidebar_collapsed') === 'true',
            currentView: 'dashboard',
            searchQuery: '',
            filters: {},
            selectedItems: [],
            lastUpdate: null,
            online: navigator.onLine
        };
    }
    
    /**
     * Initialisation de l'application
     */
    async init() {
        try {
            // Masquer l'écran de chargement initial
            this.hidePreloader();
            
            // Initialiser le gestionnaire hors ligne
            this.offlineManager.init();
            
            // Vérifier l'état de l'authentification
            const isAuthenticated = await this.auth.checkAuth();
            
            if (isAuthenticated) {
                this.currentUser = this.auth.getCurrentUser();
                await this.loadInitialData();
                this.setupEventListeners();
                this.renderApp();
                this.setupServiceWorker();
            } else {
                this.showLogin();
            }
        } catch (error) {
            console.error('Erreur d\'initialisation de l\'application:', error);
            this.showError('Impossible de charger l\'application, veuillez réessayer plus tard');
        }
    }
    
    /**
     * Masquer l'écran de chargement
     */
    hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    }
    
    /**
     * Charger les données initiales
     */
    async loadInitialData() {
        this.setState({ isLoading: true });
        
        try {
            const [players, teams, matches, stats, injuries, trainings] = await Promise.allSettled([
                this.api.getPlayers(),
                this.api.getTeams(),
                this.api.getUpcomingMatches(),
                this.api.getDashboardStats(),
                this.api.getInjuries(),
                this.api.getTrainingSessions()
            ]);
            
            // Traiter les résultats
            this.store.set('players', players.status === 'fulfilled' ? players.value : []);
            this.store.set('teams', teams.status === 'fulfilled' ? teams.value : []);
            this.store.set('matches', matches.status === 'fulfilled' ? matches.value : []);
            this.store.set('stats', stats.status === 'fulfilled' ? stats.value : {});
            this.store.set('injuries', injuries.status === 'fulfilled' ? injuries.value : []);
            this.store.set('trainings', trainings.status === 'fulfilled' ? trainings.value : []);
            
            this.setState({
                isLoading: false,
                lastUpdate: new Date()
            });
            
            // Mettre en cache les données
            this.cacheData();
            
        } catch (error) {
            console.error('Erreur de chargement des données:', error);
            this.setState({ isLoading: false });
            
            // Essayer d'utiliser les données en cache
            this.loadCachedData();
        }
    }
    
    /**
     * Mettre en cache les données
     */
    cacheData() {
        const cache = {
            players: this.store.get('players'),
            teams: this.store.get('teams'),
            matches: this.store.get('matches'),
            stats: this.store.get('stats'),
            injuries: this.store.get('injuries'),
            trainings: this.store.get('trainings'),
            timestamp: Date.now()
        };
        
        try {
            localStorage.setItem('app_cache', JSON.stringify(cache));
        } catch (error) {
            console.error('Erreur de mise en cache des données:', error);
        }
    }
    
    /**
     * Charger les données en cache
     */
    loadCachedData() {
        try {
            const cache = localStorage.getItem('app_cache');
            if (cache) {
                const data = JSON.parse(cache);
                const cacheAge = Date.now() - data.timestamp;
                
                if (cacheAge < this.config.CACHE_TTL) {
                    this.store.set('players', data.players || []);
                    this.store.set('teams', data.teams || []);
                    this.store.set('matches', data.matches || []);
                    this.store.set('stats', data.stats || {});
                    this.store.set('injuries', data.injuries || []);
                    this.store.set('trainings', data.trainings || []);
                    
                    this.notificationManager.show(
                        'Données chargées depuis le cache',
                        'info'
                    );
                }
            }
        } catch (error) {
            console.error('Erreur de chargement du cache:', error);
        }
    }
    
    /**
     * Configurer le Service Worker
     */
    async setupServiceWorker() {
        if ('serviceWorker' in navigator && this.config.FEATURES.OFFLINE_MODE) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker enregistré:', registration);
            } catch (error) {
                console.error('Erreur d\'enregistrement du Service Worker:', error);
            }
        }
    }
    
    /**
     * Configurer les écouteurs d'événements
     */
    setupEventListeners() {
        // Événements internet/hors ligne
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
        
        // Événements clavier
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Empêcher la double soumission des formulaires
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                const submitBtn = e.target.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
                }
            }
        });
        
        // Rafraîchir les données périodiquement
        if (this.config.FEATURES.REAL_TIME_UPDATES) {
            setInterval(() => this.refreshData(), 30000); // Toutes les 30 secondes
        }
    }
    
    /**
     * Gérer le statut de connexion
     */
    handleOnlineStatus(isOnline) {
        this.setState({ online: isOnline });
        
        if (isOnline) {
            this.offlineManager.hideIndicator();
            this.refreshData();
            this.notificationManager.show('Connexion internet rétablie', 'success');
        } else {
            this.offlineManager.showIndicator();
            this.notificationManager.show('Vous êtes hors ligne', 'warning');
        }
    }
    
    /**
     * Gérer les raccourcis clavier
     */
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K pour la recherche
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-box input')?.focus();
        }
        
        // Ctrl/Cmd + N pour ajouter un joueur
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            this.openAddPlayerModal();
        }
        
        // Escape pour fermer les fenêtres
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
        
        // F5 pour rafraîchir les données
        if (e.key === 'F5') {
            e.preventDefault();
            this.refreshData();
        }
    }
    
    /**
     * Rafraîchir les données
     */
    async refreshData() {
        if (!this.state.online) return;
        
        try {
            await this.loadInitialData();
            this.updateUI();
            this.notificationManager.show('Données mises à jour', 'success');
        } catch (error) {
            console.error('Erreur de rafraîchissement des données:', error);
        }
    }
    
    /**
     * Mettre à jour l'interface utilisateur
     */
    updateUI() {
        this.updateFooterStats();
        this.updateDashboard();
        
        if (this.currentPage === 'players') {
            this.updatePlayersGrid();
        } else if (this.currentPage === 'injuries') {
            this.updateInjuriesList();
        } else if (this.currentPage === 'training') {
            this.updateTrainingSessions();
        }
    }
    
    /**
     * Mettre à jour le tableau de bord
     */
    updateDashboard() {
        const dashboardEl = document.querySelector('.dashboard-container');
        if (dashboardEl) {
            this.loadPageContent('dashboard');
        }
    }
    
    /**
     * Mettre à jour la grille des joueurs
     */
    updatePlayersGrid() {
        const playersGrid = document.getElementById('players-grid');
        if (playersGrid) {
            this.loadPageContent('players');
        }
    }
    
    /**
     * Mettre à jour la liste des blessures
     */
    updateInjuriesList() {
        const injuriesList = document.getElementById('injuries-list');
        if (injuriesList) {
            this.loadPageContent('injuries');
        }
    }
    
    /**
     * Mettre à jour les sessions d'entraînement
     */
    updateTrainingSessions() {
        const trainingList = document.getElementById('training-list');
        if (trainingList) {
            this.loadPageContent('training');
        }
    }
    
    /**
     * Mettre à jour les statistiques du pied de page
     */
    updateFooterStats() {
        const players = this.store.get('players') || [];
        const stats = this.store.get('stats') || {};
        
        setTimeout(() => {
            const totalPlayersEl = document.getElementById('total-players');
            const totalPointsEl = document.getElementById('total-points');
            const totalBudgetEl = document.getElementById('total-budget');
            
            if (totalPlayersEl) totalPlayersEl.textContent = players.length;
            if (totalPointsEl) totalPointsEl.textContent = stats.points || '0';
            if (totalBudgetEl) totalBudgetEl.textContent = stats.budget || '0';
            
            // Mettre à jour l'heure de la dernière mise à jour
            const lastUpdateEl = document.getElementById('last-update');
            if (lastUpdateEl) {
                lastUpdateEl.textContent = `Dernière mise à jour: ${new Date().toLocaleString('fr-FR')}`;
            }
        }, 100);
    }
    
    /**
     * Rendre l'application
     */
    renderApp() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = '';
        appContainer.appendChild(this.createAppStructure());
        
        this.bindGlobalEvents();
        this.navigateTo(this.state.currentView);
    }
    
    /**
     * Créer la structure de l'application
     */
    createAppStructure() {
        const container = document.createElement('div');
        container.className = 'app-container';
        
        container.appendChild(this.createHeader());
        container.appendChild(this.createSidebar());
        container.appendChild(this.createMainContent());
        container.appendChild(this.createFooter());
        
        return container;
    }
    
    /**
     * Créer l'en-tête
     */
    createHeader() {
        const header = document.createElement('header');
        header.className = 'app-header';
        header.innerHTML = this.getHeaderTemplate();
        return header;
    }
    
    /**
     * Template de l'en-tête
     */
    getHeaderTemplate() {
        return `
            <div class="header-left">
                <button class="sidebar-toggle" onclick="app.toggleSidebar()" aria-label="Basculer le menu latéral">
                    <i class="fas ${this.state.isSidebarCollapsed ? 'fa-bars' : 'fa-times'}"></i>
                </button>
                <a href="#" class="logo" onclick="app.navigateTo('dashboard')">
                    <div class="logo-icon">
                        <i class="fas fa-futbol"></i>
                    </div>
                    <div class="logo-text">
                        <span class="primary">S-MAINT Pro 2027</span>
                        <span class="secondary">Système de gestion d'équipes de football</span>
                    </div>
                </a>
            </div>
            <div class="header-center">
                <div class="search-box">
                    <input type="text" 
                           placeholder="Rechercher joueurs, matchs, rapports..." 
                           aria-label="Recherche"
                           value="${this.state.searchQuery}"
                           oninput="app.handleSearch(event)">
                    <i class="fas fa-search search-icon"></i>
                    <button class="search-clear" onclick="app.clearSearch()" aria-label="Effacer la recherche">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="header-right">
                <div class="user-menu" onclick="app.toggleUserDropdown(event)">
                    <div class="user-avatar" aria-label="Photo de profil">
                        ${this.currentUser?.name?.charAt(0) || 'C'}
                    </div>
                    <div class="user-info">
                        <span class="user-name">${this.currentUser?.name || 'Coach Français'}</span>
                        <span class="user-role">${this.currentUser?.role || 'Entraîneur'}</span>
                        <span class="user-status">Actif</span>
                    </div>
                    <div class="dropdown">
                        <button class="dropdown-toggle" aria-label="Options utilisateur" aria-haspopup="true">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="dropdown-menu" role="menu">
                            <a href="#" role="menuitem" onclick="app.showProfile()">
                                <i class="fas fa-user"></i> Profil
                                <span class="badge badge-primary">1</span>
                            </a>
                            <a href="#" role="menuitem" onclick="app.showSettings()">
                                <i class="fas fa-cog"></i> Paramètres
                            </a>
                            <a href="#" role="menuitem" onclick="app.showNotifications()">
                                <i class="fas fa-bell"></i> Notifications
                                <span class="badge badge-danger">3</span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="#" role="menuitem" onclick="app.logout()">
                                <i class="fas fa-sign-out-alt"></i> Déconnexion
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Créer la barre latérale
     */
    createSidebar() {
        const sidebar = document.createElement('nav');
        sidebar.className = `app-sidebar ${this.state.isSidebarCollapsed ? 'collapsed' : ''}`;
        sidebar.setAttribute('aria-label', 'Menu principal');
        sidebar.innerHTML = this.getSidebarTemplate();
        return sidebar;
    }
    
    /**
     * Template de la barre latérale
     */
    getSidebarTemplate() {
        const menuItems = this.getMenuItems();
        
        return `
            <div class="sidebar-header">
                <div class="club-info">
                    <div class="club-logo" onclick="app.showClubInfo()">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="club-name">Paris Saint-Germain</div>
                    <div class="club-division">Ligue 1 - Position 3</div>
                </div>
            </div>
            <ul class="sidebar-menu" role="menubar">
                ${menuItems.map(item => this.createMenuItem(item)).join('')}
            </ul>
            <div class="sidebar-footer">
                <div class="version">Version ${this.config.VERSION}</div>
                <div class="copyright">© 2027 S-MAINT Systems</div>
            </div>
        `;
    }
    
    /**
     * Obtenir les éléments du menu
     */
    getMenuItems() {
        const playersCount = this.store.get('players')?.length || 0;
        const injuriesCount = this.store.get('injuries')?.length || 0;
        
        return [
            { 
                id: 'dashboard', 
                icon: 'tachometer-alt', 
                label: 'Tableau de bord',
                notification: 0
            },
            { 
                id: 'players', 
                icon: 'users', 
                label: 'Joueurs', 
                badge: playersCount,
                submenu: [
                    { id: 'players-list', label: 'Liste des joueurs' },
                    { id: 'players-add', label: 'Ajouter joueur' },
                    { id: 'players-squad', label: 'Effectif' }
                ]
            },
            { 
                id: 'teams', 
                icon: 'shirt', 
                label: 'Équipes',
                submenu: [
                    { id: 'teams-list', label: 'Liste des équipes' },
                    { id: 'teams-setup', label: 'Configuration équipe' }
                ]
            },
            { 
                id: 'matches', 
                icon: 'calendar-alt', 
                label: 'Matchs',
                badge: 2
            },
            { 
                id: 'training', 
                icon: 'dumbbell', 
                label: 'Entraînement' 
            },
            { 
                id: 'injuries', 
                icon: 'user-injured', 
                label: 'Blessures',
                badge: injuriesCount
            },
            { 
                id: 'tactics', 
                icon: 'chess-board', 
                label: 'Tactiques' 
            },
            { 
                id: 'transfers', 
                icon: 'exchange-alt', 
                label: 'Transferts',
                notification: 1
            },
            { 
                id: 'reports', 
                icon: 'chart-bar', 
                label: 'Rapports' 
            },
            { 
                id: 'scouting', 
                icon: 'binoculars', 
                label: 'Détection' 
            },
            { 
                id: 'finances', 
                icon: 'coins', 
                label: 'Finances' 
            },
            { 
                id: 'settings', 
                icon: 'cog', 
                label: 'Paramètres' 
            }
        ];
    }
    
    /**
     * Créer un élément de menu
     */
    createMenuItem(item) {
        const isActive = this.state.currentView === item.id;
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        
        return `
            <li role="none">
                <a href="#" 
                   class="sidebar-item ${isActive ? 'active' : ''} ${hasSubmenu ? 'has-submenu' : ''}"
                   data-page="${item.id}"
                   role="menuitem"
                   aria-haspopup="${hasSubmenu}"
                   aria-expanded="${isActive && hasSubmenu}"
                   onclick="app.navigateTo('${item.id}')">
                    <i class="fas fa-${item.icon}"></i>
                    <span class="item-text">${item.label}</span>
                    ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
                    ${item.notification ? `<span class="badge badge-danger">${item.notification}</span>` : ''}
                    ${hasSubmenu ? `<i class="fas fa-chevron-down arrow"></i>` : ''}
                </a>
                ${hasSubmenu ? this.createSubmenu(item.submenu, isActive) : ''}
            </li>
        `;
    }
    
    /**
     * Créer un sous-menu
     */
    createSubmenu(items, isActive) {
        return `
            <div class="submenu ${isActive ? 'show' : ''}" role="menu">
                ${items.map(subItem => `
                    <a href="#" 
                       class="submenu-item" 
                       data-page="${subItem.id}"
                       role="menuitem"
                       onclick="app.navigateTo('${subItem.id}')">
                        ${subItem.label}
                    </a>
                `).join('')}
            </div>
        `;
    }
    
    /**
     * Créer le contenu principal
     */
    createMainContent() {
        const main = document.createElement('main');
        main.className = `app-main ${this.state.isSidebarCollapsed ? 'full-width' : ''}`;
        main.setAttribute('role', 'main');
        main.innerHTML = `
            <div class="page-header">
                <div>
                    <h1 class="page-title" id="page-title">Tableau de bord</h1>
                    <div class="page-subtitle" id="page-subtitle">Vue d'ensemble du système</div>
                </div>
                <div class="page-actions" id="page-actions"></div>
            </div>
            <div class="page-content" id="page-content">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement du contenu...</p>
                </div>
            </div>
        `;
        return main;
    }
    
    /**
     * Créer le pied de page
     */
    createFooter() {
        const footer = document.createElement('footer');
        footer.className = `app-footer ${this.state.isSidebarCollapsed ? 'full-width' : ''}`;
        footer.innerHTML = this.getFooterTemplate();
        return footer;
    }
    
    /**
     * Template du pied de page
     */
    getFooterTemplate() {
        return `
            <div class="footer-content">
                <div class="quick-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>Joueurs: <strong id="total-players">0</strong></span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-trophy"></i>
                        <span>Points: <strong id="total-points">0</strong></span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-coins"></i>
                        <span>Budget: <strong id="total-budget">0</strong> M€</span>
                    </div>
                </div>
                <div class="system-info">
                    <span id="last-update">Dernière mise à jour: ${new Date().toLocaleString('fr-FR')}</span>
                    <span class="${this.state.online ? 'online' : 'offline'}">
                        <i class="fas fa-${this.state.online ? 'wifi' : 'wifi-slash'}"></i>
                        ${this.state.online ? 'En ligne' : 'Hors ligne'}
                    </span>
                </div>
            </div>
        `;
    }
    
    /**
     * Lier les événements globaux
     */
    bindGlobalEvents() {
        // Événement de redimensionnement de la fenêtre
        window.addEventListener('resize', () => this.handleResize());
        
        // Clic en dehors des menus déroulants
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Empêcher le comportement par défaut des liens
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    }
    
    /**
     * Gérer le redimensionnement
     */
    handleResize() {
        if (window.innerWidth < 992) {
            if (!this.state.isSidebarCollapsed) {
                this.setState({ isSidebarCollapsed: true });
            }
        }
    }
    
    /**
     * Gérer les clics en dehors des menus
     */
    handleOutsideClick(e) {
        // Fermer les menus déroulants
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
        
        // Fermer la barre latérale sur mobile
        if (window.innerWidth < 992) {
            if (!e.target.closest('.app-sidebar') && 
                !e.target.closest('.sidebar-toggle') &&
                !this.state.isSidebarCollapsed) {
                this.toggleSidebar();
            }
        }
    }
    
    /**
     * Gérer la recherche
     */
    handleSearch(event) {
        const query = event.target.value.trim();
        this.setState({ searchQuery: query });
        
        if (this.currentPage === 'players') {
            this.filterPlayers();
        } else if (this.currentPage === 'matches') {
            this.filterMatches();
        } else if (this.currentPage === 'injuries') {
            this.filterInjuries();
        }
    }
    
    /**
     * Effacer la recherche
     */
    clearSearch() {
        this.setState({ searchQuery: '' });
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
        
        if (this.currentPage === 'players') {
            this.filterPlayers();
        } else if (this.currentPage === 'matches') {
            this.filterMatches();
        } else if (this.currentPage === 'injuries') {
            this.filterInjuries();
        }
    }
    
    /**
     * Filtrer les joueurs
     */
    filterPlayers() {
        const players = this.store.get('players') || [];
        const query = this.state.searchQuery.toLowerCase();
        const position = document.getElementById('position-filter')?.value;
        const status = document.getElementById('status-filter')?.value;
        
        const filteredPlayers = players.filter(player => {
            // Recherche textuelle
            const matchesSearch = !query || 
                player.name.toLowerCase().includes(query) ||
                player.position.toLowerCase().includes(query) ||
                player.number.toString().includes(query);
            
            // Filtre par position
            const matchesPosition = !position || player.position === position;
            
            // Filtre par statut
            const matchesStatus = !status || player.status === status;
            
            return matchesSearch && matchesPosition && matchesStatus;
        });
        
        this.renderPlayersGrid(filteredPlayers);
    }
    
    /**
     * Filtrer les matchs
     */
    filterMatches() {
        const matches = this.store.get('matches') || window.mockData.upcomingMatches;
        const query = this.state.searchQuery.toLowerCase();
        const type = document.getElementById('match-type')?.value;
        const status = document.getElementById('match-status')?.value;
        
        const filteredMatches = matches.filter(match => {
            const matchesSearch = !query || 
                match.homeTeam.toLowerCase().includes(query) ||
                match.awayTeam.toLowerCase().includes(query) ||
                match.competition.toLowerCase().includes(query);
            
            return matchesSearch;
        });
        
        this.renderMatchesList(filteredMatches);
    }
    
    /**
     * Filtrer les blessures
     */
    filterInjuries() {
        const injuries = this.store.get('injuries') || [];
        const query = this.state.searchQuery.toLowerCase();
        const severity = document.getElementById('injury-severity')?.value;
        const status = document.getElementById('injury-status')?.value;
        
        const filteredInjuries = injuries.filter(injury => {
            const matchesSearch = !query || 
                injury.playerName.toLowerCase().includes(query) ||
                injury.type.toLowerCase().includes(query);
            
            const matchesSeverity = !severity || injury.severity === severity;
            const matchesStatus = !status || injury.status === status;
            
            return matchesSearch && matchesSeverity && matchesStatus;
        });
        
        this.renderInjuriesList(filteredInjuries);
    }
    
    /**
     * Afficher la grille des joueurs
     */
    renderPlayersGrid(players) {
        const playersGrid = document.getElementById('players-grid');
        if (!playersGrid) return;
        
        if (players.length === 0) {
            playersGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h4>Aucun joueur</h4>
                    <p>${this.state.searchQuery ? 'Aucun joueur ne correspond à la recherche' : 'Aucun joueur n\'a été ajouté'}</p>
                    <button class="btn btn-primary" onclick="app.openAddPlayerModal()">
                        <i class="fas fa-user-plus"></i> Ajouter un joueur
                    </button>
                </div>
            `;
            return;
        }
        
        playersGrid.innerHTML = players.map(player => this.createPlayerCard(player)).join('');
    }
    
    /**
     * Afficher la liste des matchs
     */
    renderMatchesList(matches) {
        const matchesList = document.getElementById('matches-list');
        if (!matchesList) return;
        
        if (matches.length === 0) {
            matchesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h4>Aucun match</h4>
                    <p>Aucun match ne correspond aux critères</p>
                    <button class="btn btn-primary" onclick="app.addNewMatch()">
                        <i class="fas fa-plus"></i> Ajouter un match
                    </button>
                </div>
            `;
            return;
        }
        
        matchesList.innerHTML = matches.map(match => this.createMatchCard(match)).join('');
    }
    
    /**
     * Afficher la liste des blessures
     */
    renderInjuriesList(injuries) {
        const injuriesList = document.getElementById('injuries-list');
        if (!injuriesList) return;
        
        if (injuries.length === 0) {
            injuriesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heartbeat"></i>
                    <h4>Aucune blessure</h4>
                    <p>Aucune blessure enregistrée</p>
                    <button class="btn btn-primary" onclick="app.openAddInjuryModal()">
                        <i class="fas fa-plus"></i> Ajouter une blessure
                    </button>
                </div>
            `;
            return;
        }
        
        injuriesList.innerHTML = injuries.map(injury => this.createInjuryCard(injury)).join('');
    }
    
    /**
     * Créer une carte de joueur
     */
    createPlayerCard(player) {
        return `
            <div class="player-card" data-player-id="${player.id}">
                <div class="player-card-header">
                    <div class="player-number">${player.number || '#'}</div>
                    <div class="player-position-badge ${player.position}">${this.getPositionLabel(player.position)}</div>
                    <div class="player-status-indicator ${player.status || 'active'}"></div>
                </div>
                <div class="player-card-body">
                    <div class="player-avatar-large">${player.name.charAt(0)}</div>
                    <h4 class="player-name">${player.name}</h4>
                    <div class="player-info">
                        <div class="info-item">
                            <i class="fas fa-birthday-cake"></i>
                            <span>${player.age} ans</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-ruler-vertical"></i>
                            <span>${player.height} cm</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-weight"></i>
                            <span>${player.weight} kg</span>
                        </div>
                    </div>
                    <div class="player-rating">
                        <div class="rating-stars">
                            ${this.generateStarRating(player.rating)}
                        </div>
                        <div class="rating-value">${player.rating}/100</div>
                    </div>
                </div>
                <div class="player-card-footer">
                    <button class="btn btn-sm btn-primary btn-edit" onclick="app.editPlayer(${player.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" onclick="app.deletePlayer(${player.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                    <button class="btn btn-sm btn-info btn-details" onclick="app.showPlayerDetails(${player.id})">
                        <i class="fas fa-info-circle"></i> Détails
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Créer une carte de match
     */
    createMatchCard(match) {
        return `
            <div class="match-card" data-match-id="${match.id}">
                <div class="match-date">
                    <i class="far fa-calendar"></i>
                    ${match.date}
                </div>
                <div class="match-teams">
                    <div class="team home-team">
                        <div class="team-logo">${match.homeTeam.charAt(0)}</div>
                        <div class="team-name">${match.homeTeam}</div>
                    </div>
                    <div class="match-vs">vs</div>
                    <div class="team away-team">
                        <div class="team-logo">${match.awayTeam.charAt(0)}</div>
                        <div class="team-name">${match.awayTeam}</div>
                    </div>
                </div>
                <div class="match-competition">
                    <i class="fas fa-trophy"></i> ${match.competition}
                </div>
                <div class="match-actions">
                    <button class="btn btn-sm btn-primary" onclick="app.viewMatchDetails(${match.id})">
                        <i class="fas fa-eye"></i> Voir
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="app.editMatch(${match.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteMatch(${match.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Créer une carte de blessure
     */
    createInjuryCard(injury) {
        const severityColors = {
            'Légère': 'success',
            'Moyenne': 'warning',
            'Grave': 'danger'
        };
        
        return `
            <div class="injury-card" data-injury-id="${injury.id}">
                <div class="injury-header">
                    <h4>${injury.playerName}</h4>
                    <span class="badge badge-${severityColors[injury.severity] || 'warning'}">${injury.severity}</span>
                </div>
                <div class="injury-body">
                    <div class="injury-info">
                        <div class="info-item">
                            <i class="fas fa-band-aid"></i>
                            <span>${injury.type}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-calendar-day"></i>
                            <span>Début: ${injury.startDate}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-calendar-check"></i>
                            <span>Retour prévu: ${injury.expectedReturn}</span>
                        </div>
                    </div>
                    <div class="injury-status">
                        <span class="status-badge ${injury.status === 'Rétabli' ? 'success' : 'warning'}">
                            ${injury.status}
                        </span>
                    </div>
                </div>
                <div class="injury-footer">
                    <button class="btn btn-sm btn-primary" onclick="app.editInjury(${injury.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteInjury(${injury.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                    <button class="btn btn-sm btn-success" onclick="app.markInjuryRecovered(${injury.id})">
                        <i class="fas fa-heartbeat"></i> Rétabli
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Obtenir le libellé de la position
     */
    getPositionLabel(position) {
        const positions = {
            'GK': 'Gardien',
            'DF': 'Défenseur',
            'MF': 'Milieu',
            'FW': 'Attaquant'
        };
        return positions[position] || position;
    }
    
    /**
     * Générer l'évaluation en étoiles
     */
    generateStarRating(rating) {
        const stars = Math.floor(rating / 20);
        let starsHTML = '';
        
        for (let i = 0; i < 5; i++) {
            starsHTML += i < stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }
    
    /**
     * Mettre à jour l'état de l'application
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        
        // Sauvegarder certains états dans localStorage
        if (newState.isSidebarCollapsed !== undefined) {
            localStorage.setItem('sidebar_collapsed', newState.isSidebarCollapsed);
        }
        
        // Re-rendre l'application si nécessaire
        if (newState.isSidebarCollapsed !== undefined) {
            this.updateLayout();
        }
    }
    
    /**
     * Mettre à jour la mise en page
     */
    updateLayout() {
        const sidebar = document.querySelector('.app-sidebar');
        const main = document.querySelector('.app-main');
        const footer = document.querySelector('.app-footer');
        
        if (sidebar) {
            sidebar.classList.toggle('collapsed', this.state.isSidebarCollapsed);
        }
        
        if (main) {
            main.classList.toggle('full-width', this.state.isSidebarCollapsed);
        }
        
        if (footer) {
            footer.classList.toggle('full-width', this.state.isSidebarCollapsed);
        }
    }
    
    /**
     * Basculer la barre latérale
     */
    toggleSidebar() {
        this.setState({ isSidebarCollapsed: !this.state.isSidebarCollapsed });
        
        // Mettre à jour le bouton de bascule
        const toggleBtn = document.querySelector('.sidebar-toggle i');
        if (toggleBtn) {
            toggleBtn.className = this.state.isSidebarCollapsed ? 
                'fas fa-bars' : 'fas fa-times';
        }
    }
    
    /**
     * Basculer le menu déroulant utilisateur
     */
    toggleUserDropdown(event) {
        event.stopPropagation();
        const dropdown = document.querySelector('.user-menu .dropdown-menu');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }
    
    /**
     * Naviguer entre les pages
     */
    async navigateTo(pageId) {
        this.currentPage = pageId;
        this.setState({ currentView: pageId });
        
        // Mettre à jour le menu latéral
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-expanded', 'false');
        });
        
        const targetItem = document.querySelector(`[data-page="${pageId}"]`);
        if (targetItem) {
            targetItem.classList.add('active');
            targetItem.setAttribute('aria-expanded', 'true');
            
            // Afficher le sous-menu s'il existe
            const submenu = targetItem.closest('.has-submenu')?.nextElementSibling;
            if (submenu) {
                submenu.classList.add('show');
            }
        }
        
        // Mettre à jour le titre de la page
        await this.updatePageTitle(pageId);
        
        // Charger le contenu de la page
        await this.loadPageContent(pageId);
        
        // Mettre à jour l'historique de navigation
        history.pushState({ page: pageId }, '', `#${pageId}`);
    }
    
    /**
     * Mettre à jour le titre de la page
     */
    async updatePageTitle(pageId) {
        const titles = {
            dashboard: 'Tableau de bord',
            players: 'Gestion des joueurs',
            'players-list': 'Liste des joueurs',
            'players-add': 'Ajouter un joueur',
            'players-squad': 'Effectif de l\'équipe',
            teams: 'Gestion des équipes',
            'teams-list': 'Liste des équipes',
            'teams-setup': 'Configuration de l\'équipe',
            matches: 'Matchs et calendrier',
            training: 'Entraînement et présence',
            injuries: 'Gestion des blessures',
            tactics: 'Tactiques et plans',
            transfers: 'Marché des transferts',
            reports: 'Rapports et statistiques',
            scouting: 'Détection de talents',
            finances: 'Gestion financière',
            settings: 'Paramètres avancés'
        };
        
        const subtitles = {
            dashboard: 'Vue d\'ensemble du système et statistiques',
            players: 'Gestion, ajout et modification des joueurs',
            matches: 'Programmation et suivi des matchs',
            training: 'Programmes d\'entraînement et suivi des performances',
            injuries: 'Suivi et gestion des blessures des joueurs',
            tactics: 'Formations et plans tactiques',
            transfers: 'Marché des transferts et négociations',
            reports: 'Rapports de performance d\'équipe et de joueurs',
            scouting: 'Détection et suivi des talents',
            finances: 'Gestion financière et budget',
            settings: 'Paramètres système et utilisateur'
        };
        
        const titleEl = document.getElementById('page-title');
        const subtitleEl = document.getElementById('page-subtitle');
        const actionsEl = document.getElementById('page-actions');
        
        if (titleEl) titleEl.textContent = titles[pageId] || pageId;
        if (subtitleEl) subtitleEl.textContent = subtitles[pageId] || '';
        
        // Mettre à jour les boutons de la page
        await this.updatePageActions(pageId, actionsEl);
    }
    
    /**
     * Mettre à jour les actions de la page
     */
    async updatePageActions(pageId, container) {
        if (!container) return;
        
        const actions = {
            dashboard: `
                <button class="btn btn-primary" onclick="app.refreshData()">
                    <i class="fas fa-sync-alt"></i> Rafraîchir
                </button>
                <button class="btn btn-success" onclick="app.generateReport()">
                    <i class="fas fa-file-export"></i> Exporter rapport
                </button>
            `,
            players: `
                <button class="btn btn-primary" onclick="app.openAddPlayerModal()">
                    <i class="fas fa-user-plus"></i> Ajouter joueur
                </button>
                <button class="btn btn-secondary" onclick="app.exportPlayers()">
                    <i class="fas fa-download"></i> Exporter
                </button>
                <button class="btn btn-success" onclick="app.importPlayers()">
                    <i class="fas fa-upload"></i> Importer
                </button>
            `,
            matches: `
                <button class="btn btn-primary" onclick="app.addNewMatch()">
                    <i class="fas fa-plus"></i> Nouveau match
                </button>
                <button class="btn btn-secondary" onclick="app.generateFixture()">
                    <i class="fas fa-calendar-plus"></i> Générer calendrier
                </button>
            `,
            injuries: `
                <button class="btn btn-primary" onclick="app.openAddInjuryModal()">
                    <i class="fas fa-plus"></i> Ajouter blessure
                </button>
                <button class="btn btn-success" onclick="app.generateInjuryReport()">
                    <i class="fas fa-file-medical"></i> Rapport médical
                </button>
            `,
            training: `
                <button class="btn btn-primary" onclick="app.addTrainingSession()">
                    <i class="fas fa-plus"></i> Session d'entraînement
                </button>
                <button class="btn btn-success" onclick="app.generateTrainingSchedule()">
                    <i class="fas fa-calendar-alt"></i> Planifier entraînement
                </button>
            `,
            transfers: `
                <button class="btn btn-primary" onclick="app.searchForPlayer()">
                    <i class="fas fa-search"></i> Rechercher joueur
                </button>
                <button class="btn btn-success" onclick="app.showTransferOffers()">
                    <i class="fas fa-handshake"></i> Offres de transfert
                </button>
            `
        };
        
        container.innerHTML = actions[pageId] || '';
    }
    
    /**
     * Charger le contenu de la page
     */
    async loadPageContent(pageId) {
        const contentContainer = document.getElementById('page-content');
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Chargement du contenu...</p>
            </div>
        `;
        
        try {
            let content = '';
            
            switch(pageId) {
                case 'dashboard':
                    content = await this.loadDashboard();
                    break;
                case 'players':
                case 'players-list':
                    content = await this.loadPlayersPage();
                    break;
                case 'players-add':
                    content = await this.loadAddPlayerPage();
                    break;
                case 'players-squad':
                    content = await this.loadSquadPage();
                    break;
                case 'teams':
                case 'teams-list':
                    content = await this.loadTeamsPage();
                    break;
                case 'matches':
                    content = await this.loadMatchesPage();
                    break;
                case 'training':
                    content = await this.loadTrainingPage();
                    break;
                case 'injuries':
                    content = await this.loadInjuriesPage();
                    break;
                case 'tactics':
                    content = await this.loadTacticsPage();
                    break;
                case 'transfers':
                    content = await this.loadTransfersPage();
                    break;
                case 'reports':
                    content = await this.loadReportsPage();
                    break;
                case 'scouting':
                    content = await this.loadScoutingPage();
                    break;
                case 'finances':
                    content = await this.loadFinancesPage();
                    break;
                case 'settings':
                    content = await this.loadSettingsPage();
                    break;
                default:
                    content = await this.loadDefaultPage();
            }
            
            contentContainer.innerHTML = content;
            this.bindPageEvents(pageId);
            
        } catch (error) {
            console.error('Erreur de chargement du contenu:', error);
            contentContainer.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erreur survenue</h3>
                    <p>Impossible de charger le contenu, veuillez réessayer</p>
                    <div class="mt-3">
                        <button class="btn btn-primary" onclick="app.loadPageContent('${pageId}')">
                            <i class="fas fa-redo"></i> Réessayer
                        </button>
                        <button class="btn btn-secondary" onclick="app.navigateTo('dashboard')">
                            <i class="fas fa-home"></i> Retour au tableau de bord
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    /**
     * Lier les événements de la page
     */
    bindPageEvents(pageId) {
        switch(pageId) {
            case 'players':
                this.bindPlayersEvents();
                break;
            case 'matches':
                this.bindMatchesEvents();
                break;
            case 'dashboard':
                this.bindDashboardEvents();
                break;
            case 'injuries':
                this.bindInjuriesEvents();
                break;
            case 'training':
                this.bindTrainingEvents();
                break;
            case 'tactics':
                this.bindTacticsEvents();
                break;
        }
        
        // Ajouter les écouteurs d'événements pour les formulaires
        this.bindFormEvents();
    }
    
    /**
     * Lier les événements des formulaires
     */
    bindFormEvents() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleFormSubmit(form);
            });
        });
        
        // Améliorer l'expérience des champs de saisie
        document.querySelectorAll('input[type="range"]').forEach(range => {
            const output = range.nextElementSibling;
            if (output && output.tagName === 'OUTPUT') {
                range.addEventListener('input', () => {
                    output.value = range.value;
                });
            }
        });
    }
    
    /**
     * Gérer la soumission du formulaire
     */
    async handleFormSubmit(form) {
        const formId = form.id;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.innerHTML;
        
        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            }
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            let result;
            if (formId === 'add-player-form') {
                result = await this.api.addPlayer(data);
                this.store.add('players', result);
                this.notificationManager.show('Joueur ajouté avec succès', 'success');
            } else if (formId === 'edit-player-form') {
                const playerId = form.dataset.playerId;
                result = await this.api.updatePlayer(playerId, data);
                // Mettre à jour les données locales
                const players = this.store.get('players');
                const index = players.findIndex(p => p.id == playerId);
                if (index !== -1) {
                    players[index] = { ...players[index], ...result };
                    this.store.set('players', players);
                }
                this.notificationManager.show('Joueur modifié avec succès', 'success');
            } else if (formId === 'add-match-form') {
                result = await this.api.addMatch(data);
                this.store.add('matches', result);
                this.notificationManager.show('Match ajouté avec succès', 'success');
            } else if (formId === 'add-injury-form') {
                result = await this.api.addInjury(data);
                this.store.add('injuries', result);
                this.notificationManager.show('Blessure enregistrée avec succès', 'success');
            } else if (formId === 'add-training-form') {
                result = await this.api.addTrainingSession(data);
                this.store.add('trainings', result);
                this.notificationManager.show('Session d\'entraînement ajoutée', 'success');
            }
            
            this.closeModal();
            
            // Recharger la page si nécessaire
            if (formId.includes('player')) {
                await this.navigateTo('players');
            } else if (formId.includes('match')) {
                await this.navigateTo('matches');
            } else if (formId.includes('injury')) {
                await this.navigateTo('injuries');
            } else if (formId.includes('training')) {
                await this.navigateTo('training');
            }
            
        } catch (error) {
            console.error('Erreur de traitement du formulaire:', error);
            this.notificationManager.show('Erreur lors du traitement', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    }
    
    // === Fonctions de chargement de pages ===
    
    async loadDashboard() {
        const stats = this.store.get('stats') || window.mockData.dashboardStats;
        const players = this.store.get('players') || [];
        const injuries = this.store.get('injuries') || [];
        const trainings = this.store.get('trainings') || [];
        
        return `
            <div class="dashboard-container">
                <!-- Statistiques principales -->
                <div class="stats-grid">
                    <div class="stat-card card-primary">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${players.length}</div>
                            <div class="stat-label">Total joueurs</div>
                            <div class="stat-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+2 ce mois</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card card-success">
                        <div class="stat-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.leaguePosition || '-'}</div>
                            <div class="stat-label">Position en ligue</div>
                            <div class="stat-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+1 depuis le mois dernier</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card card-warning">
                        <div class="stat-icon">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.budget || 0}</div>
                            <div class="stat-label">Budget (M€)</div>
                            <div class="stat-change ${stats.budgetChange >= 0 ? 'positive' : 'negative'}">
                                <i class="fas fa-arrow-${stats.budgetChange >= 0 ? 'up' : 'down'}"></i>
                                <span>${Math.abs(stats.budgetChange || 0)}%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card card-danger">
                        <div class="stat-icon">
                            <i class="fas fa-user-injured"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${injuries.length}</div>
                            <div class="stat-label">Joueurs blessés</div>
                            <div class="stat-change ${stats.injuryChange <= 0 ? 'positive' : 'negative'}">
                                <i class="fas fa-arrow-${stats.injuryChange <= 0 ? 'down' : 'up'}"></i>
                                <span>${stats.injuryChange || 0} cette semaine</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Prochains matchs -->
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-calendar-day"></i> Prochains matchs</h3>
                        <div class="section-actions">
                            <a href="#" onclick="app.navigateTo('matches')">Voir tout</a>
                            <button class="btn btn-sm btn-primary" onclick="app.addNewMatch()">
                                <i class="fas fa-plus"></i> Ajouter match
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="matches-list">
                            ${stats.upcomingMatches?.map(match => `
                                <div class="match-card upcoming">
                                    <div class="match-date">
                                        <i class="far fa-calendar"></i>
                                        ${match.date}
                                    </div>
                                    <div class="match-teams">
                                        <div class="team home-team">
                                            <div class="team-logo">${match.homeTeam.charAt(0)}</div>
                                            <div class="team-name">${match.homeTeam}</div>
                                        </div>
                                        <div class="match-vs">vs</div>
                                        <div class="team away-team">
                                            <div class="team-logo">${match.awayTeam.charAt(0)}</div>
                                            <div class="team-name">${match.awayTeam}</div>
                                        </div>
                                    </div>
                                    <div class="match-competition">
                                        <i class="fas fa-trophy"></i> ${match.competition}
                                    </div>
                                    <div class="match-actions">
                                        <button class="btn btn-sm btn-primary" onclick="app.viewMatchDetails(${match.id})">
                                            <i class="fas fa-eye"></i> Voir
                                        </button>
                                        <button class="btn btn-sm btn-secondary" onclick="app.editMatch(${match.id})">
                                            <i class="fas fa-edit"></i> Modifier
                                        </button>
                                    </div>
                                </div>
                            `).join('') || '<div class="empty-state"><i class="fas fa-calendar-times"></i><h4>Aucun match à venir</h4></div>'}
                        </div>
                    </div>
                </div>
                
                <!-- Meilleurs joueurs -->
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-crown"></i> Meilleurs joueurs cette saison</h3>
                        <div class="section-actions">
                            <a href="#" onclick="app.navigateTo('players')">Voir tout</a>
                            <button class="btn btn-sm btn-primary" onclick="app.generatePerformanceReport()">
                                <i class="fas fa-chart-line"></i> Rapport performance
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="players-grid-small">
                            ${stats.topPlayers?.map(player => `
                                <div class="player-card-small">
                                    <div class="player-avatar">${player.name.charAt(0)}</div>
                                    <div class="player-info">
                                        <div class="player-name">${player.name}</div>
                                        <div class="player-position">${player.position}</div>
                                        <div class="player-rating">
                                            <div class="rating-stars">
                                                ${this.generateStarRating(player.rating)}
                                            </div>
                                            <span>${player.rating}/100</span>
                                        </div>
                                    </div>
                                    <button class="btn btn-sm btn-outline-primary" onclick="app.showPlayerDetails(${player.id})">
                                        <i class="fas fa-chart-bar"></i> Statistiques
                                    </button>
                                </div>
                            `).join('') || '<div class="empty-state"><i class="fas fa-users-slash"></i><h4>Aucune donnée de joueurs</h4></div>'}
                        </div>
                    </div>
                </div>
                
                <!-- Blessures récentes -->
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-user-injured"></i> Blessures récentes</h3>
                        <div class="section-actions">
                            <a href="#" onclick="app.navigateTo('injuries')">Voir tout</a>
                            <button class="btn btn-sm btn-primary" onclick="app.openAddInjuryModal()">
                                <i class="fas fa-plus"></i> Ajouter blessure
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="injuries-list-small">
                            ${injuries.slice(0, 3).map(injury => `
                                <div class="injury-card-small">
                                    <div class="injury-player">${injury.playerName}</div>
                                    <div class="injury-type">${injury.type}</div>
                                    <div class="injury-severity ${injury.severity.toLowerCase()}">${injury.severity}</div>
                                    <div class="injury-return">Retour: ${injury.expectedReturn}</div>
                                </div>
                            `).join('') || '<div class="empty-state"><i class="fas fa-heartbeat"></i><h4>Aucune blessure récente</h4></div>'}
                        </div>
                    </div>
                </div>
                
                <!-- Séances d'entraînement -->
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-dumbbell"></i> Dernières séances d'entraînement</h3>
                        <div class="section-actions">
                            <a href="#" onclick="app.navigateTo('training')">Voir tout</a>
                            <button class="btn btn-sm btn-primary" onclick="app.addTrainingSession()">
                                <i class="fas fa-plus"></i> Ajouter séance
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="trainings-list-small">
                            ${trainings.slice(0, 3).map(training => `
                                <div class="training-card-small">
                                    <div class="training-date">${training.date}</div>
                                    <div class="training-type">${training.type}</div>
                                    <div class="training-duration">${training.duration}</div>
                                    <div class="training-participants">${training.participants} joueurs</div>
                                </div>
                            `).join('') || '<div class="empty-state"><i class="fas fa-dumbbell"></i><h4>Aucune séance récente</h4></div>'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadPlayersPage() {
        const players = this.store.get('players') || [];
        
        return `
            <div class="players-page">
                <div class="toolbar">
                    <div class="search-box">
                        <input type="text" 
                               placeholder="Rechercher un joueur par nom ou numéro..." 
                               value="${this.state.searchQuery}"
                               oninput="app.handleSearch(event)">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                    <div class="filters">
                        <select id="position-filter" onchange="app.filterPlayers()">
                            <option value="">Toutes positions</option>
                            <option value="GK">Gardien</option>
                            <option value="DF">Défenseur</option>
                            <option value="MF">Milieu</option>
                            <option value="FW">Attaquant</option>
                        </select>
                        <select id="status-filter" onchange="app.filterPlayers()">
                            <option value="">Tous statuts</option>
                            <option value="active">Actif</option>
                            <option value="injured">Blessé</option>
                            <option value="suspended">Suspendu</option>
                        </select>
                        <select id="sort-by" onchange="app.sortPlayers()">
                            <option value="name">Ordre alphabétique</option>
                            <option value="rating">Meilleure note</option>
                            <option value="age">Plus jeune</option>
                            <option value="value">Plus haute valeur</option>
                        </select>
                    </div>
                    <div class="actions">
                        <button class="btn btn-primary" onclick="app.openAddPlayerModal()">
                            <i class="fas fa-user-plus"></i> Ajouter joueur
                        </button>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" onclick="app.toggleDropdown(this)">
                                <i class="fas fa-download"></i> Exporter
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="#" onclick="app.exportPlayers('csv')"><i class="fas fa-file-csv"></i> CSV</a>
                                <a href="#" onclick="app.exportPlayers('excel')"><i class="fas fa-file-excel"></i> Excel</a>
                                <a href="#" onclick="app.exportPlayers('json')"><i class="fas fa-file-code"></i> JSON</a>
                            </div>
                        </div>
                        <button class="btn btn-success" onclick="app.importPlayers()">
                            <i class="fas fa-upload"></i> Importer
                        </button>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-users"></i> Liste des joueurs</h3>
                        <div class="section-actions">
                            <span class="chip">${players.length} joueurs</span>
                            <button class="btn btn-sm btn-outline-primary" onclick="app.showSquadView()">
                                <i class="fas fa-th-large"></i> Voir effectif
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="players-grid" id="players-grid">
                            ${players.map(player => this.createPlayerCard(player)).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-chart-bar"></i> Statistiques de l'équipe</h3>
                    </div>
                    <div class="section-body">
                        <div class="stats-cards">
                            <div class="stat-card">
                                <div class="stat-title">Âge moyen</div>
                                <div class="stat-value">${this.calculateAverageAge(players)}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Note moyenne</div>
                                <div class="stat-value">${this.calculateAverageRating(players)}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Valeur totale</div>
                                <div class="stat-value">${this.calculateTotalValue(players)}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Pied droit</div>
                                <div class="stat-value">${this.calculateRightFootPercentage(players)}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadMatchesPage() {
        const matches = this.store.get('matches') || window.mockData.upcomingMatches;
        
        return `
            <div class="matches-page">
                <div class="toolbar">
                    <div class="search-box">
                        <input type="text" placeholder="Rechercher un match...">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                    <div class="filters">
                        <select id="match-type" onchange="app.filterMatches()">
                            <option value="">Tous les matchs</option>
                            <option value="league">Ligue</option>
                            <option value="cup">Coupe</option>
                            <option value="friendly">Amical</option>
                        </select>
                        <select id="match-status" onchange="app.filterMatches()">
                            <option value="">Tous statuts</option>
                            <option value="upcoming">À venir</option>
                            <option value="live">En direct</option>
                            <option value="finished">Terminé</option>
                        </select>
                    </div>
                    <div class="actions">
                        <button class="btn btn-primary" onclick="app.addNewMatch()">
                            <i class="fas fa-plus"></i> Nouveau match
                        </button>
                        <button class="btn btn-success" onclick="app.generateFixture()">
                            <i class="fas fa-calendar-plus"></i> Générer calendrier
                        </button>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-calendar-alt"></i> Matchs à venir</h3>
                        <div class="section-actions">
                            <a href="#" onclick="app.showPastMatches()">Matchs passés</a>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="matches-list" id="matches-list">
                            ${matches.map(match => this.createMatchCard(match)).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-chart-line"></i> Statistiques des matchs</h3>
                    </div>
                    <div class="section-body">
                        <div class="stats-cards">
                            <div class="stat-card">
                                <div class="stat-title">Matchs cette saison</div>
                                <div class="stat-value">24</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Victoires</div>
                                <div class="stat-value">15</div>
                                <div class="stat-label">(62.5%)</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Nuls</div>
                                <div class="stat-value">5</div>
                                <div class="stat-label">(20.8%)</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Défaites</div>
                                <div class="stat-value">4</div>
                                <div class="stat-label">(16.7%)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadTrainingPage() {
        const trainings = this.store.get('trainings') || window.mockData.trainingSessions;
        
        return `
            <div class="training-page">
                <div class="toolbar">
                    <div class="search-box">
                        <input type="text" placeholder="Rechercher une séance...">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                    <div class="filters">
                        <select id="training-type">
                            <option value="">Tous types</option>
                            <option value="Technique">Technique</option>
                            <option value="Physique">Physique</option>
                            <option value="Tactique">Tactique</option>
                        </select>
                        <select id="training-intensity">
                            <option value="">Toutes intensités</option>
                            <option value="Basse">Basse</option>
                            <option value="Moyenne">Moyenne</option>
                            <option value="Haute">Haute</option>
                        </select>
                    </div>
                    <div class="actions">
                        <button class="btn btn-primary" onclick="app.addTrainingSession()">
                            <i class="fas fa-plus"></i> Nouvelle séance
                        </button>
                        <button class="btn btn-success" onclick="app.generateTrainingSchedule()">
                            <i class="fas fa-calendar-alt"></i> Planifier entraînement
                        </button>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-dumbbell"></i> Séances d'entraînement</h3>
                        <div class="section-actions">
                            <a href="#" onclick="app.showTrainingStats()">Statistiques</a>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="trainings-list" id="training-list">
                            ${trainings.map(training => `
                                <div class="training-card">
                                    <div class="training-header">
                                        <h4>${training.type}</h4>
                                        <span class="chip">${training.date}</span>
                                    </div>
                                    <div class="training-body">
                                        <div class="training-info">
                                            <div class="info-item">
                                                <i class="fas fa-clock"></i>
                                                <span>${training.duration}</span>
                                            </div>
                                            <div class="info-item">
                                                <i class="fas fa-bolt"></i>
                                                <span>Intensité: ${training.intensity}</span>
                                            </div>
                                            <div class="info-item">
                                                <i class="fas fa-users"></i>
                                                <span>${training.participants} participants</span>
                                            </div>
                                        </div>
                                        <div class="training-coach">
                                            <i class="fas fa-user-tie"></i>
                                            <span>${training.coach}</span>
                                        </div>
                                    </div>
                                    <div class="training-footer">
                                        <button class="btn btn-sm btn-primary" onclick="app.editTraining(${training.id})">
                                            <i class="fas fa-edit"></i> Modifier
                                        </button>
                                        <button class="btn btn-sm btn-danger" onclick="app.deleteTraining(${training.id})">
                                            <i class="fas fa-trash"></i> Supprimer
                                        </button>
                                        <button class="btn btn-sm btn-info" onclick="app.viewTrainingDetails(${training.id})">
                                            <i class="fas fa-eye"></i> Détails
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-chart-bar"></i> Programme d'entraînement hebdomadaire</h3>
                    </div>
                    <div class="section-body">
                        <div class="training-schedule">
                            <table class="schedule-table">
                                <thead>
                                    <tr>
                                        <th>Lundi</th>
                                        <th>Mardi</th>
                                        <th>Mercredi</th>
                                        <th>Jeudi</th>
                                        <th>Vendredi</th>
                                        <th>Samedi</th>
                                        <th>Dimanche</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Technique<br>09:00-10:30</td>
                                        <td>Physique<br>09:00-11:00</td>
                                        <td>Tactique<br>10:00-12:00</td>
                                        <td>Récupération<br>09:00-10:00</td>
                                        <td>Match<br>20:00</td>
                                        <td>Repos</td>
                                        <td>Récupération<br>10:00-11:00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadInjuriesPage() {
        const injuries = this.store.get('injuries') || window.mockData.injuries;
        
        return `
            <div class="injuries-page">
                <div class="toolbar">
                    <div class="search-box">
                        <input type="text" placeholder="Rechercher une blessure...">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                    <div class="filters">
                        <select id="injury-severity" onchange="app.filterInjuries()">
                            <option value="">Toutes gravités</option>
                            <option value="Légère">Légère</option>
                            <option value="Moyenne">Moyenne</option>
                            <option value="Grave">Grave</option>
                        </select>
                        <select id="injury-status" onchange="app.filterInjuries()">
                            <option value="">Tous statuts</option>
                            <option value="En traitement">En traitement</option>
                            <option value="Rétabli">Rétabli</option>
                            <option value="Opération">Opération</option>
                        </select>
                    </div>
                    <div class="actions">
                        <button class="btn btn-primary" onclick="app.openAddInjuryModal()">
                            <i class="fas fa-plus"></i> Nouvelle blessure
                        </button>
                        <button class="btn btn-success" onclick="app.generateInjuryReport()">
                            <i class="fas fa-file-medical"></i> Rapport médical
                        </button>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-user-injured"></i> Blessures des joueurs</h3>
                        <div class="section-actions">
                            <span class="chip">${injuries.length} blessures</span>
                            <button class="btn btn-sm btn-outline-primary" onclick="app.showInjuryStatistics()">
                                <i class="fas fa-chart-pie"></i> Statistiques
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="injuries-list" id="injuries-list">
                            ${injuries.map(injury => this.createInjuryCard(injury)).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-chart-line"></i> Statistiques des blessures</h3>
                    </div>
                    <div class="section-body">
                        <div class="stats-cards">
                            <div class="stat-card">
                                <div class="stat-title">Blessures actives</div>
                                <div class="stat-value">${injuries.filter(i => i.status !== 'Rétabli').length}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Moyenne de jours</div>
                                <div class="stat-value">21</div>
                                <div class="stat-label">jours d'absence</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Taux de récupération</div>
                                <div class="stat-value">85%</div>
                                <div class="stat-label">des joueurs</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-title">Coût total</div>
                                <div class="stat-value">250K</div>
                                <div class="stat-label">€ de soins</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadTacticsPage() {
        return `
            <div class="tactics-page">
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-chess-board"></i> Formations tactiques</h3>
                        <div class="section-actions">
                            <button class="btn btn-primary" onclick="app.createNewTactic()">
                                <i class="fas fa-plus"></i> Nouvelle formation
                            </button>
                            <button class="btn btn-success" onclick="app.analyzeTactics()">
                                <i class="fas fa-chart-bar"></i> Analyse tactique
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="tactics-grid">
                            <div class="tactic-card">
                                <div class="tactic-header">
                                    <h4>4-3-3 Offensif</h4>
                                    <span class="chip chip-primary">Actif</span>
                                </div>
                                <p class="tactic-description">Formation équilibrée offensive avec focus sur les ailiers</p>
                                <div class="tactic-stats">
                                    <div class="stat">
                                        <span class="stat-label">Points</span>
                                        <span class="stat-value">85%</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">Victoires</span>
                                        <span class="stat-value">12</span>
                                    </div>
                                </div>
                                <div class="tactic-actions">
                                    <button class="btn btn-sm btn-primary" onclick="app.applyTactic(1)">Appliquer</button>
                                    <button class="btn btn-sm btn-secondary" onclick="app.editTactic(1)">Modifier</button>
                                </div>
                            </div>
                            
                            <div class="tactic-card">
                                <div class="tactic-header">
                                    <h4>4-4-2 Classique</h4>
                                    <span class="chip">Réservé</span>
                                </div>
                                <p class="tactic-description">Formation défensive équilibrée pour matchs difficiles</p>
                                <div class="tactic-stats">
                                    <div class="stat">
                                        <span class="stat-label">Points</span>
                                        <span class="stat-value">78%</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">Victoires</span>
                                        <span class="stat-value">8</span>
                                    </div>
                                </div>
                                <div class="tactic-actions">
                                    <button class="btn btn-sm btn-primary" onclick="app.applyTactic(2)">Appliquer</button>
                                    <button class="btn btn-sm btn-secondary" onclick="app.editTactic(2)">Modifier</button>
                                </div>
                            </div>
                            
                            <div class="tactic-card">
                                <div class="tactic-header">
                                    <h4>3-5-2 Milieu terrain</h4>
                                    <span class="chip">Réservé</span>
                                </div>
                                <p class="tactic-description">Formation milieu terrain forte pour contrôle du terrain</p>
                                <div class="tactic-stats">
                                    <div class="stat">
                                        <span class="stat-label">Points</span>
                                        <span class="stat-value">82%</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">Victoires</span>
                                        <span class="stat-value">10</span>
                                    </div>
                                </div>
                                <div class="tactic-actions">
                                    <button class="btn btn-sm btn-primary" onclick="app.applyTactic(3)">Appliquer</button>
                                    <button class="btn btn-sm btn-secondary" onclick="app.editTactic(3)">Modifier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadTeamsPage() {
        return `
            <div class="teams-page">
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-users"></i> Équipes</h3>
                        <div class="section-actions">
                            <button class="btn btn-primary" onclick="app.createNewTeam()">
                                <i class="fas fa-plus"></i> Nouvelle équipe
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="teams-grid">
                            <div class="team-card">
                                <div class="team-logo-large">PSG</div>
                                <div class="team-info">
                                    <h4>Équipe Première</h4>
                                    <div class="team-stats">
                                        <span>25 joueurs</span>
                                        <span>Moyenne d'âge: 26.5</span>
                                        <span>Valeur: 850M€</span>
                                    </div>
                                </div>
                                <div class="team-actions">
                                    <button class="btn btn-sm btn-primary" onclick="app.manageTeam(1)">Gérer</button>
                                    <button class="btn btn-sm btn-secondary" onclick="app.viewTeamStats(1)">Statistiques</button>
                                </div>
                            </div>
                            
                            <div class="team-card">
                                <div class="team-logo-large">R</div>
                                <div class="team-info">
                                    <h4>Équipe Réserve</h4>
                                    <div class="team-stats">
                                        <span>18 joueurs</span>
                                        <span>Moyenne d'âge: 21.3</span>
                                        <span>Valeur: 120M€</span>
                                    </div>
                                </div>
                                <div class="team-actions">
                                    <button class="btn btn-sm btn-primary" onclick="app.manageTeam(2)">Gérer</button>
                                    <button class="btn btn-sm btn-secondary" onclick="app.viewTeamStats(2)">Statistiques</button>
                                </div>
                            </div>
                            
                            <div class="team-card">
                                <div class="team-logo-large">J</div>
                                <div class="team-info">
                                    <h4>Équipe Junior</h4>
                                    <div class="team-stats">
                                        <span>22 joueurs</span>
                                        <span>Moyenne d'âge: 18.7</span>
                                        <span>Valeur: 45M€</span>
                                    </div>
                                </div>
                                <div class="team-actions">
                                    <button class="btn btn-sm btn-primary" onclick="app.manageTeam(3)">Gérer</button>
                                    <button class="btn btn-sm btn-secondary" onclick="app.viewTeamStats(3)">Statistiques</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadTransfersPage() {
        return `
            <div class="transfers-page">
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-exchange-alt"></i> Marché des transferts</h3>
                        <div class="section-actions">
                            <button class="btn btn-primary" onclick="app.searchForPlayer()">
                                <i class="fas fa-search"></i> Rechercher joueur
                            </button>
                            <button class="btn btn-success" onclick="app.showTransferOffers()">
                                <i class="fas fa-handshake"></i> Offres de transfert
                                <span class="badge badge-danger">3</span>
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="players-grid-small">
                            ${window.mockData.players.slice(0, 4).map(player => `
                                <div class="player-card-small">
                                    <div class="player-avatar">${player.name.charAt(0)}</div>
                                    <div class="player-info">
                                        <div class="player-name">${player.name}</div>
                                        <div class="player-position">${this.getPositionLabel(player.position)}</div>
                                        <div class="player-value">${player.value.toLocaleString()} €</div>
                                        <div class="player-club">${player.team}</div>
                                    </div>
                                    <div class="player-actions">
                                        <button class="btn btn-sm btn-success" onclick="app.startNegotiation(${player.id})">
                                            <i class="fas fa-comments-dollar"></i> Négocier
                                        </button>
                                        <button class="btn btn-sm btn-info" onclick="app.scoutPlayer(${player.id})">
                                            <i class="fas fa-binoculars"></i> Suivre
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-4">
                            <h4><i class="fas fa-clock"></i> Transferts récents</h4>
                            <div class="table-responsive mt-3">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Joueur</th>
                                            <th>De</th>
                                            <th>À</th>
                                            <th>Valeur</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Ahmed Ali</td>
                                            <td>Club de la Capitale</td>
                                            <td>Paris SG</td>
                                            <td>5,000,000 €</td>
                                            <td>15/01/2024</td>
                                        </tr>
                                        <tr>
                                            <td>Salim Mourad</td>
                                            <td>Paris SG</td>
                                            <td>Union Top</td>
                                            <td>3,500,000 €</td>
                                            <td>10/01/2024</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadReportsPage() {
        return `
            <div class="reports-page">
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-chart-bar"></i> Rapports et statistiques</h3>
                        <div class="section-actions">
                            <button class="btn btn-primary" onclick="app.generateReport()">
                                <i class="fas fa-file-export"></i> Générer rapport
                            </button>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" onclick="app.toggleDropdown(this)">
                                    <i class="fas fa-download"></i> Exporter rapports
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#"><i class="fas fa-file-pdf"></i> PDF</a>
                                    <a href="#"><i class="fas fa-file-excel"></i> Excel</a>
                                    <a href="#"><i class="fas fa-file-word"></i> Word</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="reports-grid">
                            <div class="report-card">
                                <div class="report-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <h4>Rapport performance équipe</h4>
                                <p>Statistiques et performance de l'équipe sur les 10 derniers matchs</p>
                                <button class="btn btn-sm btn-primary" onclick="app.viewTeamReport()">Voir rapport</button>
                            </div>
                            
                            <div class="report-card">
                                <div class="report-icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <h4>Rapport joueurs</h4>
                                <p>Performance et progression des joueurs pendant la saison</p>
                                <button class="btn btn-sm btn-primary" onclick="app.viewPlayersReport()">Voir rapport</button>
                            </div>
                            
                            <div class="report-card">
                                <div class="report-icon">
                                    <i class="fas fa-coins"></i>
                                </div>
                                <h4>Rapport financier</h4>
                                <p>Situation financière du club et dépenses</p>
                                <button class="btn btn-sm btn-primary" onclick="app.viewFinancialReport()">Voir rapport</button>
                            </div>
                            
                            <div class="report-card">
                                <div class="report-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <h4>Analyse statistique</h4>
                                <p>Analyse statistique détaillée de la performance de l'équipe</p>
                                <button class="btn btn-sm btn-primary" onclick="app.viewStatisticalAnalysis()">Voir rapport</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadFinancesPage() {
        return `
            <div class="finances-page">
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-coins"></i> Gestion financière</h3>
                        <div class="section-actions">
                            <button class="btn btn-primary" onclick="app.addFinancialTransaction()">
                                <i class="fas fa-plus"></i> Transaction financière
                            </button>
                            <button class="btn btn-success" onclick="app.generateFinancialReport()">
                                <i class="fas fa-file-invoice-dollar"></i> Rapport financier
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="stats-grid">
                            <div class="stat-card card-primary">
                                <div class="stat-icon">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value">125</div>
                                    <div class="stat-label">Budget (M€)</div>
                                    <div class="stat-change positive">
                                        <i class="fas fa-arrow-up"></i>
                                        <span>+15.2 ce mois</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="stat-card card-success">
                                <div class="stat-icon">
                                    <i class="fas fa-arrow-up"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value">15.2</div>
                                    <div class="stat-label">Revenus (M€)</div>
                                    <div class="stat-change positive">
                                        <i class="fas fa-arrow-up"></i>
                                        <span>+2.4 depuis le mois dernier</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="stat-card card-warning">
                                <div class="stat-icon">
                                    <i class="fas fa-arrow-down"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value">12.8</div>
                                    <div class="stat-label">Dépenses (M€)</div>
                                    <div class="stat-change negative">
                                        <i class="fas fa-arrow-down"></i>
                                        <span>-1.2 depuis le mois dernier</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="stat-card card-info">
                                <div class="stat-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value">+2.4</div>
                                    <div class="stat-label">Bénéfice net (M€)</div>
                                    <div class="stat-change positive">
                                        <i class="fas fa-arrow-up"></i>
                                        <span>+20% depuis le mois dernier</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-4">
                            <h4><i class="fas fa-list"></i> Dépenses détaillées</h4>
                            <div class="table-responsive mt-3">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Poste</th>
                                            <th>Montant</th>
                                            <th>Pourcentage</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Salaires joueurs</td>
                                            <td>8,500,000 €</td>
                                            <td>66.4%</td>
                                            <td>Février</td>
                                        </tr>
                                        <tr>
                                            <td>Maintenance installations</td>
                                            <td>2,100,000 €</td>
                                            <td>16.4%</td>
                                            <td>Février</td>
                                        </tr>
                                        <tr>
                                            <td>Marketing et publicité</td>
                                            <td>1,200,000 €</td>
                                            <td>9.4%</td>
                                            <td>Février</td>
                                        </tr>
                                        <tr>
                                            <td>Autres dépenses</td>
                                            <td>1,000,000 €</td>
                                            <td>7.8%</td>
                                            <td>Février</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadSettingsPage() {
        return `
            <div class="settings-page">
                <div class="section">
                    <div class="section-header">
                        <h3><i class="fas fa-cog"></i> Paramètres avancés</h3>
                        <div class="section-actions">
                            <button class="btn btn-primary" onclick="app.saveSettings()">
                                <i class="fas fa-save"></i> Sauvegarder
                            </button>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="settings-form">
                            <div class="form-group">
                                <label>Nom d'utilisateur</label>
                                <input type="text" value="Coach Français" class="form-control">
                            </div>
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="coach@psg.fr" class="form-control">
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Langue</label>
                                    <select class="form-control">
                                        <option selected>Français</option>
                                        <option>Anglais</option>
                                        <option>Espagnol</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Devise</label>
                                    <select class="form-control">
                                        <option selected>Euro (EUR)</option>
                                        <option>Dollar US (USD)</option>
                                        <option>Livre Sterling (GBP)</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Fuseau horaire</label>
                                    <select class="form-control">
                                        <option selected>Europe/Paris (GMT+1)</option>
                                        <option>Europe/London (GMT+0)</option>
                                        <option>America/New_York (GMT-5)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Format date</label>
                                    <select class="form-control">
                                        <option selected>dd/MM/yyyy</option>
                                        <option>MM/dd/yyyy</option>
                                        <option>yyyy-MM-dd</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="checkbox">
                                    <input type="checkbox" checked>
                                    <span>Activer notifications</span>
                                </label>
                            </div>
                            
                            <div class="form-group">
                                <label class="checkbox">
                                    <input type="checkbox" checked>
                                    <span>Mise à jour automatique</span>
                                </label>
                            </div>
                            
                            <div class="form-group">
                                <label class="checkbox">
                                    <input type="checkbox">
                                    <span>Mode nuit</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadDefaultPage() {
        return `
            <div class="default-page">
                <i class="fas fa-info-circle"></i>
                <h3>Page non disponible</h3>
                <p>Cette page n'est pas encore implémentée</p>
                <button class="btn btn-primary mt-3" onclick="app.navigateTo('dashboard')">
                    <i class="fas fa-arrow-right"></i> Retour au tableau de bord
                </button>
            </div>
        `;
    }
    
    // === Fonctions de calcul de statistiques ===
    
    calculateAverageAge(players) {
        if (!players.length) return '0';
        const totalAge = players.reduce((sum, player) => sum + (player.age || 0), 0);
        return (totalAge / players.length).toFixed(1);
    }
    
    calculateAverageRating(players) {
        if (!players.length) return '0';
        const totalRating = players.reduce((sum, player) => sum + (player.rating || 0), 0);
        return (totalRating / players.length).toFixed(1);
    }
    
    calculateTotalValue(players) {
        if (!players.length) return '0';
        const totalValue = players.reduce((sum, player) => sum + (player.value || 0), 0);
        return (totalValue / 1000000).toFixed(1) + 'M€';
    }
    
    calculateRightFootPercentage(players) {
        if (!players.length) return '0';
        const rightFootCount = players.filter(p => p.foot === 'Right').length;
        return Math.round((rightFootCount / players.length) * 100);
    }
    
    // === Gestion des modales ===
    
    openAddPlayerModal() {
        const modal = this.createModal({
            title: 'Ajouter un nouveau joueur',
            body: this.getAddPlayerForm(),
            footer: `
                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                <button type="submit" form="add-player-form" class="btn btn-primary">Sauvegarder</button>
            `,
            size: 'lg'
        });
        
        document.body.appendChild(modal);
        this.bindFormValidation('add-player-form');
    }
    
    editPlayer(playerId) {
        const player = this.store.get('players').find(p => p.id === playerId);
        if (!player) {
            this.notificationManager.show('Joueur non trouvé', 'error');
            return;
        }
        
        const modal = this.createModal({
            title: 'Modifier les informations du joueur',
            body: this.getEditPlayerForm(player),
            footer: `
                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                <button type="submit" form="edit-player-form" class="btn btn-primary">Sauvegarder</button>
            `,
            size: 'lg'
        });
        
        document.body.appendChild(modal);
        this.bindFormValidation('edit-player-form');
    }
    
    deletePlayer(playerId) {
        const player = this.store.get('players').find(p => p.id === playerId);
        if (!player) return;
        
        this.showConfirmationModal({
            title: 'Confirmer suppression',
            message: `Êtes-vous sûr de vouloir supprimer le joueur <strong>${player.name}</strong> ? Cette action est irréversible.`,
            confirmText: 'Oui, supprimer',
            cancelText: 'Annuler',
            type: 'danger',
            onConfirm: async () => {
                try {
                    await this.api.deletePlayer(playerId);
                    this.store.remove('players', playerId);
                    this.notificationManager.show('Joueur supprimé avec succès', 'success');
                    
                    // Recharger la page si c'est la page joueurs
                    if (this.currentPage === 'players') {
                        await this.navigateTo('players');
                    }
                } catch (error) {
                    this.notificationManager.show('Échec de la suppression du joueur', 'error');
                }
            }
        });
    }
    
    openAddInjuryModal() {
        const players = this.store.get('players') || [];
        
        const modal = this.createModal({
            title: 'Ajouter une nouvelle blessure',
            body: this.getAddInjuryForm(players),
            footer: `
                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                <button type="submit" form="add-injury-form" class="btn btn-primary">Enregistrer</button>
            `,
            size: 'lg'
        });
        
        document.body.appendChild(modal);
        this.bindFormValidation('add-injury-form');
    }
    
    addTrainingSession() {
        const modal = this.createModal({
            title: 'Ajouter une séance d\'entraînement',
            body: this.getAddTrainingForm(),
            footer: `
                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                <button type="submit" form="add-training-form" class="btn btn-primary">Sauvegarder</button>
            `,
            size: 'lg'
        });
        
        document.body.appendChild(modal);
        this.bindFormValidation('add-training-form');
    }
    
    addNewMatch() {
        const modal = this.createModal({
            title: 'Ajouter un nouveau match',
            body: this.getAddMatchForm(),
            footer: `
                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                <button type="submit" form="add-match-form" class="btn btn-primary">Sauvegarder</button>
            `,
            size: 'lg'
        });
        
        document.body.appendChild(modal);
        this.bindFormValidation('add-match-form');
    }
    
    createModal(options) {
        const modalId = 'modal-' + Date.now();
        
        return document.createRange().createContextualFragment(`
            <div class="modal-overlay" id="${modalId}">
                <div class="modal-content ${options.size ? 'modal-' + options.size : ''}">
                    <div class="modal-header">
                        <h3>${options.title}</h3>
                        <button class="modal-close" onclick="app.closeModal('#${modalId}')">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${options.body}
                    </div>
                    <div class="modal-footer">
                        ${options.footer}
                    </div>
                </div>
            </div>
        `).firstChild;
    }
    
    showConfirmationModal(options) {
        const modal = this.createModal({
            title: options.title,
            body: `
                <div class="confirmation-dialog">
                    <div class="confirmation-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="confirmation-message">
                        ${options.message}
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="app.closeModal()">${options.cancelText}</button>
                <button class="btn btn-${options.type || 'danger'}" onclick="app.closeModal(); ${options.onConfirm}()">
                    ${options.confirmText}
                </button>
            `,
            size: 'sm'
        });
        
        document.body.appendChild(modal);
    }
    
    closeModal(selector) {
        if (selector) {
            const modal = document.querySelector(selector);
            if (modal) modal.remove();
        } else {
            document.querySelectorAll('.modal-overlay').forEach(modal => modal.remove());
        }
    }
    
    closeAllModals() {
        this.closeModal();
    }
    
    // === Fonctions de formulaires ===
    
    getAddPlayerForm() {
        return `
            <form id="add-player-form" class="form-container">
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-required">Nom complet</label>
                        <input type="text" name="name" required placeholder="Entrez le nom complet">
                    </div>
                    <div class="form-group">
                        <label class="label-required">Âge</label>
                        <input type="number" name="age" min="16" max="45" required placeholder="Âge">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-required">Position</label>
                        <select name="position" required>
                            <option value="">Sélectionnez une position</option>
                            <option value="GK">Gardien</option>
                            <option value="DF">Défenseur</option>
                            <option value="MF">Milieu</option>
                            <option value="FW">Attaquant</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="label-required">Numéro</label>
                        <input type="number" name="number" min="1" max="99" required placeholder="Numéro de maillot">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-required">Pied préféré</label>
                        <select name="foot" required>
                            <option value="">Sélectionnez le pied préféré</option>
                            <option value="Right">Droit</option>
                            <option value="Left">Gauche</option>
                            <option value="Both">Les deux</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Statut</label>
                        <select name="status">
                            <option value="active">Actif</option>
                            <option value="injured">Blessé</option>
                            <option value="suspended">Suspendu</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Taille (cm)</label>
                        <input type="number" name="height" min="150" max="220" placeholder="Taille en centimètres">
                    </div>
                    <div class="form-group">
                        <label>Poids (kg)</label>
                        <input type="number" name="weight" min="50" max="120" placeholder="Poids en kilogrammes">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Note (0-100)</label>
                    <div class="rating-slider">
                        <input type="range" name="rating" min="0" max="100" value="70" class="slider">
                        <output name="rating-output" class="slider-output">70</output>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Valeur marchande (€)</label>
                    <input type="number" name="value" min="0" placeholder="Valeur marchande">
                </div>
                
                <div class="form-group">
                    <label>Salaire mensuel (€)</label>
                    <input type="number" name="salary" min="0" placeholder="Salaire mensuel">
                </div>
                
                <div class="form-group">
                    <label>Date fin de contrat</label>
                    <input type="date" name="contract_end">
                </div>
                
                <div class="form-group">
                    <label>Notes supplémentaires</label>
                    <textarea name="notes" rows="3" placeholder="Notes supplémentaires sur le joueur"></textarea>
                </div>
            </form>
        `;
    }
    
    getEditPlayerForm(player) {
        return `
            <form id="edit-player-form" data-player-id="${player.id}" class="form-container">
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-required">Nom complet</label>
                        <input type="text" name="name" value="${player.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="label-required">Âge</label>
                        <input type="number" name="age" value="${player.age}" min="16" max="45" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-required">Position</label>
                        <select name="position" required>
                            <option value="GK" ${player.position === 'GK' ? 'selected' : ''}>Gardien</option>
                            <option value="DF" ${player.position === 'DF' ? 'selected' : ''}>Défenseur</option>
                            <option value="MF" ${player.position === 'MF' ? 'selected' : ''}>Milieu</option>
                            <option value="FW" ${player.position === 'FW' ? 'selected' : ''}>Attaquant</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="label-required">Numéro</label>
                        <input type="number" name="number" value="${player.number}" min="1" max="99" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-required">Pied préféré</label>
                        <select name="foot" required>
                            <option value="Right" ${player.foot === 'Right' ? 'selected' : ''}>Droit</option>
                            <option value="Left" ${player.foot === 'Left' ? 'selected' : ''}>Gauche</option>
                            <option value="Both" ${player.foot === 'Both' ? 'selected' : ''}>Les deux</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Statut</label>
                        <select name="status">
                            <option value="active" ${player.status === 'active' ? 'selected' : ''}>Actif</option>
                            <option value="injured" ${player.status === 'injured' ? 'selected' : ''}>Blessé</option>
                            <option value="suspended" ${player.status === 'suspended' ? 'selected' : ''}>Suspendu</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Taille (cm)</label>
                        <input type="number" name="height" value="${player.height}" min="150" max="220">
                    </div>
                    <div class="form-group">
                        <label>Poids (kg)</label>
                        <input type="number" name="weight" value="${player.weight}" min="50" max="120">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Note (0-100)</label>
                    <div class="rating-slider">
                        <input type="range" name="rating" min="0" max="100" value="${player.rating}" class="slider">
                        <output name="rating-output" class="slider-output">${player.rating}</output>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Valeur marchande (€)</label>
                    <input type="number" name="value" value="${player.value}" min="0">
                </div>
                
                <div class="form-group">
                    <label>Salaire mensuel (€)</label>
                    <input type="number" name="salary" value="${player.salary}" min="0">
                </div>
                
                <div class="form-group">
                    <label>Date fin de contrat</label>
                                    <input type="date" name="contract_end" value="${player.contract}">
                                </div>
                                
                                <div class="form-group">
                                    <label>Notes supplémentaires</label>
                                    <textarea name="notes" rows="3">${player.notes || ''}</textarea>
                                </div>
                            </form>
                        `;
                    }
                    
                    getAddInjuryForm(players) {
                        const playersOptions = players.map(p => 
                            `<option value="${p.id}">${p.name} (${p.position})</option>`
                        ).join('');
                        
                        return `
                            <form id="add-injury-form" class="form-container">
                                <div class="form-group">
                                    <label class="label-required">Joueur</label>
                                    <select name="playerId" required>
                                        <option value="">Sélectionnez un joueur</option>
                                        ${playersOptions}
                                    </select>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Type de blessure</label>
                                        <input type="text" name="type" required placeholder="Ex: Entorse, Fracture...">
                                    </div>
                                    <div class="form-group">
                                        <label class="label-required">Gravité</label>
                                        <select name="severity" required>
                                            <option value="">Sélectionnez la gravité</option>
                                            <option value="Légère">Légère</option>
                                            <option value="Moyenne">Moyenne</option>
                                            <option value="Grave">Grave</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Date de début</label>
                                        <input type="date" name="startDate" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="label-required">Retour prévu</label>
                                        <input type="date" name="expectedReturn" required>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label>Statut</label>
                                    <select name="status">
                                        <option value="En traitement">En traitement</option>
                                        <option value="Rétabli">Rétabli</option>
                                        <option value="Opération">Opération nécessaire</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Traitement</label>
                                    <textarea name="treatment" rows="3" placeholder="Détails du traitement..."></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label>Notes médicales</label>
                                    <textarea name="notes" rows="3" placeholder="Notes supplémentaires..."></textarea>
                                </div>
                            </form>
                        `;
                    }
                    
                    getAddTrainingForm() {
                        return `
                            <form id="add-training-form" class="form-container">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Date</label>
                                        <input type="date" name="date" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="label-required">Type</label>
                                        <select name="type" required>
                                            <option value="">Sélectionnez un type</option>
                                            <option value="Technique">Technique</option>
                                            <option value="Physique">Physique</option>
                                            <option value="Tactique">Tactique</option>
                                            <option value="Récupération">Récupération</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Durée</label>
                                        <input type="text" name="duration" required placeholder="Ex: 90 min">
                                    </div>
                                    <div class="form-group">
                                        <label class="label-required">Intensité</label>
                                        <select name="intensity" required>
                                            <option value="">Sélectionnez l'intensité</option>
                                            <option value="Basse">Basse</option>
                                            <option value="Moyenne">Moyenne</option>
                                            <option value="Haute">Haute</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="label-required">Participants</label>
                                    <input type="number" name="participants" min="1" max="30" required placeholder="Nombre de participants">
                                </div>
                                
                                <div class="form-group">
                                    <label class="label-required">Entraîneur responsable</label>
                                    <input type="text" name="coach" required placeholder="Nom de l'entraîneur">
                                </div>
                                
                                <div class="form-group">
                                    <label>Objectifs</label>
                                    <textarea name="objectives" rows="3" placeholder="Objectifs de la séance..."></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label>Exercices</label>
                                    <textarea name="exercises" rows="3" placeholder="Exercices prévus..."></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label>Notes</label>
                                    <textarea name="notes" rows="3" placeholder="Notes supplémentaires..."></textarea>
                                </div>
                            </form>
                        `;
                    }
                    
                    getAddMatchForm() {
                        return `
                            <form id="add-match-form" class="form-container">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Date</label>
                                        <input type="date" name="date" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="label-required">Heure</label>
                                        <input type="time" name="time" required>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Équipe domicile</label>
                                        <input type="text" name="homeTeam" required placeholder="Nom de l'équipe domicile">
                                    </div>
                                    <div class="form-group">
                                        <label class="label-required">Équipe extérieure</label>
                                        <input type="text" name="awayTeam" required placeholder="Nom de l'équipe extérieure">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="label-required">Compétition</label>
                                    <select name="competition" required>
                                        <option value="">Sélectionnez une compétition</option>
                                        <option value="Ligue 1">Ligue 1</option>
                                        <option value="Coupe de France">Coupe de France</option>
                                        <option value="Ligue des Champions">Ligue des Champions</option>
                                        <option value="Amical">Amical</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Stade</label>
                                    <input type="text" name="stadium" placeholder="Nom du stade">
                                </div>
                                
                                <div class="form-group">
                                    <label>Arbitre</label>
                                    <input type="text" name="referee" placeholder="Nom de l'arbitre">
                                </div>
                                
                                <div class="form-group">
                                    <label>Notes</label>
                                    <textarea name="notes" rows="3" placeholder="Notes sur le match..."></textarea>
                                </div>
                            </form>
                        `;
                    }
                    
                    bindFormValidation(formId) {
                        const form = document.getElementById(formId);
                        if (!form) return;
                        
                        form.addEventListener('submit', (e) => {
                            if (!form.checkValidity()) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            
                            form.classList.add('was-validated');
                        });
                        
                        // Lier les entrées et sorties pour les curseurs de notation
                        const ratingInput = form.querySelector('input[name="rating"]');
                        const ratingOutput = form.querySelector('output[name="rating-output"]');
                        if (ratingInput && ratingOutput) {
                            ratingInput.addEventListener('input', () => {
                                ratingOutput.value = ratingInput.value;
                            });
                        }
                    }
                    
                    // === Fonctions supplémentaires ===
                    
                    async exportPlayers(format = 'json') {
                        const players = this.store.get('players') || [];
                        
                        try {
                            let data, filename, mimeType;
                            
                            switch(format) {
                                case 'csv':
                                    const headers = ['Nom', 'Âge', 'Position', 'Numéro', 'Note', 'Valeur', 'Statut'];
                                    const rows = players.map(p => [
                                        p.name,
                                        p.age,
                                        p.position,
                                        p.number,
                                        p.rating,
                                        p.value,
                                        p.status
                                    ]);
                                    
                                    data = [headers, ...rows].map(row => 
                                        row.map(cell => `"${cell}"`).join(',')
                                    ).join('\n');
                                    
                                    filename = `joueurs-${new Date().toISOString().split('T')[0]}.csv`;
                                    mimeType = 'text/csv';
                                    break;
                                    
                                case 'excel':
                                    // Simuler l'export Excel
                                    data = JSON.stringify(players, null, 2);
                                    filename = `joueurs-${new Date().toISOString().split('T')[0]}.xlsx`;
                                    mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                                    break;
                                    
                                case 'json':
                                default:
                                    data = JSON.stringify(players, null, 2);
                                    filename = `joueurs-${new Date().toISOString().split('T')[0]}.json`;
                                    mimeType = 'application/json';
                            }
                            
                            const blob = new Blob([data], { type: mimeType });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = filename;
                            link.click();
                            URL.revokeObjectURL(url);
                            
                            this.notificationManager.show(`Données exportées au format ${format.toUpperCase()}`, 'success');
                            
                        } catch (error) {
                            console.error('Erreur d\'export:', error);
                            this.notificationManager.show('Échec de l\'export des données', 'error');
                        }
                    }
                    
                    async importPlayers() {
                        this.showConfirmationModal({
                            title: 'Importer des données',
                            message: 'Les données des joueurs seront importées depuis un fichier. Assurez-vous que le fichier est au format JSON correct.',
                            confirmText: 'Continuer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = '.json,.csv';
                                
                                input.onchange = async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    
                                    try {
                                        const text = await file.text();
                                        let players;
                                        
                                        if (file.name.endsWith('.csv')) {
                                            // Parser CSV
                                            const lines = text.split('\n');
                                            const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
                                            players = lines.slice(1).map(line => {
                                                const values = line.split(',').map(v => v.replace(/"/g, ''));
                                                const player = {};
                                                headers.forEach((header, index) => {
                                                    player[header] = values[index];
                                                });
                                                return player;
                                            });
                                        } else {
                                            // Parser JSON
                                            players = JSON.parse(text);
                                        }
                                        
                                        this.store.set('players', players);
                                        this.notificationManager.show('Données importées avec succès', 'success');
                                        await this.navigateTo('players');
                                        
                                    } catch (error) {
                                        console.error('Erreur d\'import:', error);
                                        this.notificationManager.show('Échec de l\'import des données', 'error');
                                    }
                                };
                                
                                input.click();
                            }
                        });
                    }
                    
                    showLogin() {
                        const appContainer = document.getElementById('app');
                        appContainer.innerHTML = this.getLoginTemplate();
                        this.bindLoginEvents();
                    }
                    
                    getLoginTemplate() {
                        return `
                            <div class="login-container">
                                <div class="login-card">
                                    <div class="login-header">
                                        <i class="fas fa-futbol"></i>
                                        <h1>S-MAINT Pro 2027</h1>
                                        <p>Système professionnel de gestion d'équipes de football</p>
                                    </div>
                                    <div class="login-body">
                                        <form id="login-form">
                                            <div class="form-group">
                                                <label>Nom d'utilisateur</label>
                                                <input type="text" name="username" required autofocus>
                                            </div>
                                            <div class="form-group">
                                                <label>Mot de passe</label>
                                                <div class="password-input">
                                                    <input type="password" name="password" required id="password-field">
                                                    <button type="button" class="password-toggle" onclick="app.togglePasswordVisibility()">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="form-options">
                                                <label class="checkbox">
                                                    <input type="checkbox" name="remember">
                                                    <span>Se souvenir de moi</span>
                                                </label>
                                                <a href="#" class="forgot-password" onclick="app.showForgotPassword()">Mot de passe oublié ?</a>
                                            </div>
                                            <button type="submit" class="btn btn-primary btn-block">
                                                <i class="fas fa-sign-in-alt"></i> Connexion
                                            </button>
                                        </form>
                                    </div>
                                    <div class="login-footer">
                                        <p>Pas de compte ? <a href="#" onclick="app.showRegister()">Inscrivez-vous</a></p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    
                    bindLoginEvents() {
                        const loginForm = document.getElementById('login-form');
                        if (loginForm) {
                            loginForm.addEventListener('submit', async (e) => {
                                e.preventDefault();
                                
                                const formData = new FormData(e.target);
                                const credentials = Object.fromEntries(formData.entries());
                                
                                try {
                                    const result = await this.auth.login(credentials);
                                    
                                    if (result.success) {
                                        this.currentUser = result.user;
                                        await this.init();
                                    } else {
                                        this.notificationManager.show('Identifiants incorrects', 'error');
                                    }
                                } catch (error) {
                                    console.error('Erreur de connexion:', error);
                                    this.notificationManager.show('Erreur système', 'error');
                                }
                            });
                        }
                    }
                    
                    togglePasswordVisibility() {
                        const passwordField = document.getElementById('password-field');
                        const toggleBtn = document.querySelector('.password-toggle i');
                        
                        if (passwordField.type === 'password') {
                            passwordField.type = 'text';
                            toggleBtn.className = 'fas fa-eye-slash';
                        } else {
                            passwordField.type = 'password';
                            toggleBtn.className = 'fas fa-eye';
                        }
                    }
                    
                    async logout() {
                        try {
                            await this.auth.logout();
                            this.currentUser = null;
                            this.store.clear();
                            this.showLogin();
                        } catch (error) {
                            console.error('Erreur de déconnexion:', error);
                        }
                    }
                    
                    showError(message) {
                        const appContainer = document.getElementById('app');
                        appContainer.innerHTML = `
                            <div class="error-container">
                                <i class="fas fa-exclamation-triangle"></i>
                                <h2>Erreur survenue</h2>
                                <p>${message}</p>
                                <button class="btn btn-primary mt-3" onclick="location.reload()">
                                    <i class="fas fa-redo"></i> Recharger
                                </button>
                                <button class="btn btn-secondary mt-2" onclick="app.showLogin()">
                                    <i class="fas fa-sign-in-alt"></i> Connexion
                                </button>
                            </div>
                        `;
                    }
                    
                    // === Fonctions d'affichage ===
                    
                    showPlayerDetails(playerId) {
                        const player = this.store.get('players').find(p => p.id === playerId);
                        if (!player) return;
                        
                        const modal = this.createModal({
                            title: `Détails du joueur: ${player.name}`,
                            body: this.getPlayerDetailsTemplate(player),
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Fermer</button>
                                <button class="btn btn-primary" onclick="app.editPlayer(${player.id})">Modifier</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    getPlayerDetailsTemplate(player) {
                        return `
                            <div class="player-details">
                                <div class="player-details-header">
                                    <div class="player-avatar-large">${player.name.charAt(0)}</div>
                                    <div class="player-info-summary">
                                        <h4>${player.name}</h4>
                                        <div class="player-meta">
                                            <span class="chip ${player.position}">${this.getPositionLabel(player.position)}</span>
                                            <span class="chip">Numéro ${player.number}</span>
                                            <span class="chip ${player.status}">${player.status === 'active' ? 'Actif' : player.status === 'injured' ? 'Blessé' : 'Suspendu'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="player-details-body">
                                    <div class="details-grid">
                                        <div class="detail-item">
                                            <div class="detail-label">Âge</div>
                                            <div class="detail-value">${player.age} ans</div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Taille</div>
                                            <div class="detail-value">${player.height} cm</div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Poids</div>
                                            <div class="detail-value">${player.weight} kg</div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Pied préféré</div>
                                            <div class="detail-value">${player.foot === 'Right' ? 'Droit' : player.foot === 'Left' ? 'Gauche' : 'Les deux'}</div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Note</div>
                                            <div class="detail-value">
                                                <div class="rating-display">
                                                    ${this.generateStarRating(player.rating)}
                                                    <span class="rating-number">${player.rating}/100</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Valeur marchande</div>
                                            <div class="detail-value">${player.value?.toLocaleString() || '0'} €</div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Salaire mensuel</div>
                                            <div class="detail-value">${player.salary?.toLocaleString() || '0'} €</div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Fin de contrat</div>
                                            <div class="detail-value">${player.contract || 'Non spécifié'}</div>
                                        </div>
                                    </div>
                                    
                                    ${player.notes ? `
                                        <div class="detail-section">
                                            <h5>Notes</h5>
                                            <p>${player.notes}</p>
                                        </div>
                                    ` : ''}
                                    
                                    <div class="detail-section">
                                        <h5>Statistiques cette saison</h5>
                                        <div class="stats-grid-small">
                                            <div class="stat-item">
                                                <div class="stat-label">Matchs</div>
                                                <div class="stat-value">${player.stats?.matches || 0}</div>
                                            </div>
                                            <div class="stat-item">
                                                <div class="stat-label">Buts</div>
                                                <div class="stat-value">${player.stats?.goals || 0}</div>
                                            </div>
                                            <div class="stat-item">
                                                <div class="stat-label">Arrêts</div>
                                                <div class="stat-value">${player.stats?.saves || 0}</div>
                                            </div>
                                            <div class="stat-item">
                                                <div class="stat-label">Cartons</div>
                                                <div class="stat-value">${player.stats?.cards || 0}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    
                    // === Fonctions pour lier les événements ===
                    
                    bindPlayersEvents() {
                        // Lier les événements de recherche et filtrage
                        const searchInput = document.querySelector('#player-search');
                        const positionFilter = document.getElementById('position-filter');
                        const statusFilter = document.getElementById('status-filter');
                        const sortBy = document.getElementById('sort-by');
                        
                        if (searchInput) {
                            searchInput.addEventListener('input', (e) => this.handleSearch(e));
                        }
                        
                        if (positionFilter) {
                            positionFilter.addEventListener('change', () => this.filterPlayers());
                        }
                        
                        if (statusFilter) {
                            statusFilter.addEventListener('change', () => this.filterPlayers());
                        }
                        
                        if (sortBy) {
                            sortBy.addEventListener('change', () => this.sortPlayers());
                        }
                    }
                    
                    bindMatchesEvents() {
                        // Lier les événements des matchs
                        console.log('Événements des matchs liés');
                    }
                    
                    bindDashboardEvents() {
                        // Lier les événements du tableau de bord
                        console.log('Événements du tableau de bord liés');
                    }
                    
                    bindInjuriesEvents() {
                        // Lier les événements des blessures
                        console.log('Événements des blessures liés');
                    }
                    
                    bindTrainingEvents() {
                        // Lier les événements de l'entraînement
                        console.log('Événements de l\'entraînement liés');
                    }
                    
                    bindTacticsEvents() {
                        // Lier les événements des tactiques
                        console.log('Événements des tactiques liés');
                    }
                    
                    sortPlayers() {
                        const sortBy = document.getElementById('sort-by')?.value;
                        const players = [...(this.store.get('players') || [])];
                        
                        let sortedPlayers;
                        switch(sortBy) {
                            case 'rating':
                                sortedPlayers = players.sort((a, b) => b.rating - a.rating);
                                break;
                            case 'age':
                                sortedPlayers = players.sort((a, b) => a.age - b.age);
                                break;
                            case 'value':
                                sortedPlayers = players.sort((a, b) => b.value - a.value);
                                break;
                            case 'name':
                            default:
                                sortedPlayers = players.sort((a, b) => a.name.localeCompare(b.name));
                        }
                        
                        this.renderPlayersGrid(sortedPlayers);
                    }
                    
                    // === Fonctions d'assistance ===
                    
                    toggleDropdown(button) {
                        const menu = button.nextElementSibling;
                        if (menu) {
                            menu.classList.toggle('show');
                        }
                    }
                    
                    showNotification(message, type = 'info') {
                        this.notificationManager.show(message, type);
                    }
                    
                    showProfile() {
                        const modal = this.createModal({
                            title: 'Profil utilisateur',
                            body: `
                                <div class="profile-details">
                                    <div class="profile-header">
                                        <div class="profile-avatar-large">C</div>
                                        <div class="profile-info">
                                            <h4>Coach Français</h4>
                                            <p>Entraîneur principal</p>
                                            <p><i class="fas fa-envelope"></i> coach@psg.fr</p>
                                        </div>
                                    </div>
                                    <div class="profile-stats">
                                        <div class="stat-item">
                                            <div class="stat-label">Équipe</div>
                                            <div class="stat-value">Paris Saint-Germain</div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">Depuis</div>
                                            <div class="stat-value">2023</div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">Matchs dirigés</div>
                                            <div class="stat-value">45</div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">Taux de victoire</div>
                                            <div class="stat-value">68%</div>
                                        </div>
                                    </div>
                                </div>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Fermer</button>
                                <button class="btn btn-primary" onclick="app.editProfile()">Modifier profil</button>
                            `
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    showNotifications() {
                        const modal = this.createModal({
                            title: 'Notifications',
                            body: `
                                <div class="notifications-list">
                                    <div class="notification-item unread">
                                        <div class="notification-icon">
                                            <i class="fas fa-user-plus"></i>
                                        </div>
                                        <div class="notification-content">
                                            <div class="notification-title">Nouveau joueur ajouté</div>
                                            <div class="notification-message">Ahmed Ali a été ajouté à l'équipe</div>
                                            <div class="notification-time">Il y a 2 heures</div>
                                        </div>
                                    </div>
                                    <div class="notification-item unread">
                                        <div class="notification-icon">
                                            <i class="fas fa-calendar-alt"></i>
                                        </div>
                                        <div class="notification-content">
                                            <div class="notification-title">Match à venir</div>
                                            <div class="notification-message">PSG vs Marseille dans 3 jours</div>
                                            <div class="notification-time">Il y a 5 heures</div>
                                        </div>
                                    </div>
                                    <div class="notification-item">
                                        <div class="notification-icon">
                                            <i class="fas fa-user-injured"></i>
                                        </div>
                                        <div class="notification-content">
                                            <div class="notification-title">Blessure signalée</div>
                                            <div class="notification-message">Lucas Hernandez - Blessure musculaire</div>
                                            <div class="notification-time">Hier</div>
                                        </div>
                                    </div>
                                </div>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Fermer</button>
                                <button class="btn btn-primary" onclick="app.markAllAsRead()">Tout marquer comme lu</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    showClubInfo() {
                        const modal = this.createModal({
                            title: 'Informations du club',
                            body: `
                                <div class="club-details">
                                    <div class="club-header">
                                        <div class="club-logo-large">PSG</div>
                                        <div class="club-info">
                                            <h4>Paris Saint-Germain Football Club</h4>
                                            <p>Fondé en 1970</p>
                                            <p>Stade: Parc des Princes (48,583 places)</p>
                                            <p>Président: Nasser Al-Khelaïfi</p>
                                        </div>
                                    </div>
                                    <div class="club-stats">
                                        <div class="stat-item">
                                            <div class="stat-label">Championnats</div>
                                            <div class="stat-value">11</div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">Coupes de France</div>
                                            <div class="stat-value">14</div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">Valeur de l'équipe</div>
                                            <div class="stat-value">850M€</div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">Supporters</div>
                                            <div class="stat-value">4.2M</div>
                                        </div>
                                    </div>
                                </div>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Fermer</button>
                                <button class="btn btn-primary" onclick="app.editClubInfo()">Modifier informations</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    editMatch(matchId) {
                        const matches = this.store.get('matches') || window.mockData.upcomingMatches;
                        const match = matches.find(m => m.id === matchId);
                        
                        if (!match) {
                            this.notificationManager.show('Match non trouvé', 'error');
                            return;
                        }
                        
                        const modal = this.createModal({
                            title: 'Modifier le match',
                            body: this.getEditMatchForm(match),
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button type="submit" form="edit-match-form" class="btn btn-primary">Sauvegarder</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                        this.bindFormValidation('edit-match-form');
                    }
                    
                    getEditMatchForm(match) {
                        return `
                            <form id="edit-match-form" data-match-id="${match.id}" class="form-container">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Date</label>
                                        <input type="date" name="date" value="${match.date}" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Heure</label>
                                        <input type="time" name="time" value="20:00">
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Équipe domicile</label>
                                        <input type="text" name="homeTeam" value="${match.homeTeam}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="label-required">Équipe extérieure</label>
                                        <input type="text" name="awayTeam" value="${match.awayTeam}" required>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="label-required">Compétition</label>
                                    <select name="competition" required>
                                        <option value="Ligue 1" ${match.competition === 'Ligue 1' ? 'selected' : ''}>Ligue 1</option>
                                        <option value="Coupe de France" ${match.competition === 'Coupe de France' ? 'selected' : ''}>Coupe de France</option>
                                        <option value="Ligue des Champions" ${match.competition === 'Ligue des Champions' ? 'selected' : ''}>Ligue des Champions</option>
                                        <option value="Amical" ${match.competition === 'Amical' ? 'selected' : ''}>Amical</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Stade</label>
                                    <input type="text" name="stadium" value="${match.stadium || ''}" placeholder="Nom du stade">
                                </div>
                                
                                <div class="form-group">
                                    <label>Arbitre</label>
                                    <input type="text" name="referee" placeholder="Nom de l'arbitre">
                                </div>
                                
                                <div class="form-group">
                                    <label>Notes</label>
                                    <textarea name="notes" rows="3" placeholder="Notes sur le match...">${match.notes || ''}</textarea>
                                </div>
                            </form>
                        `;
                    }
                    
                    deleteMatch(matchId) {
                        this.showConfirmationModal({
                            title: 'Supprimer le match',
                            message: 'Êtes-vous sûr de vouloir supprimer ce match ?',
                            confirmText: 'Oui, supprimer',
                            cancelText: 'Annuler',
                            type: 'danger',
                            onConfirm: async () => {
                                try {
                                    await this.api.deleteMatch(matchId);
                                    this.store.remove('matches', matchId);
                                    this.notificationManager.show('Match supprimé avec succès', 'success');
                                    
                                    if (this.currentPage === 'matches') {
                                        await this.navigateTo('matches');
                                    }
                                } catch (error) {
                                    this.notificationManager.show('Échec de la suppression du match', 'error');
                                }
                            }
                        });
                    }
                    
                    viewMatchDetails(matchId) {
                        const matches = this.store.get('matches') || window.mockData.upcomingMatches;
                        const match = matches.find(m => m.id === matchId);
                        
                        if (!match) {
                            this.notificationManager.show('Match non trouvé', 'error');
                            return;
                        }
                        
                        const modal = this.createModal({
                            title: `Détails du match: ${match.homeTeam} vs ${match.awayTeam}`,
                            body: `
                                <div class="match-details">
                                    <div class="match-header">
                                        <div class="match-teams-large">
                                            <div class="team">
                                                <div class="team-logo-large">${match.homeTeam.charAt(0)}</div>
                                                <div class="team-name">${match.homeTeam}</div>
                                            </div>
                                            <div class="match-vs-large">vs</div>
                                            <div class="team">
                                                <div class="team-logo-large">${match.awayTeam.charAt(0)}</div>
                                                <div class="team-name">${match.awayTeam}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="match-info">
                                        <div class="info-item">
                                            <i class="far fa-calendar"></i>
                                            <span>${match.date}</span>
                                        </div>
                                        <div class="info-item">
                                            <i class="fas fa-trophy"></i>
                                            <span>${match.competition}</span>
                                        </div>
                                        ${match.stadium ? `
                                            <div class="info-item">
                                                <i class="fas fa-map-marker-alt"></i>
                                                <span>${match.stadium}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                    
                                    <div class="match-preview">
                                        <h5>Prévision</h5>
                                        <p>Match important pour la course au titre. Les deux équipes sont en forme.</p>
                                    </div>
                                    
                                    <div class="match-stats">
                                        <h5>Statistiques prévisionnelles</h5>
                                        <div class="stats-bars">
                                            <div class="stat-bar">
                                                <div class="stat-label">Possession</div>
                                                <div class="stat-value">
                                                    <div class="bar-container">
                                                        <div class="bar home" style="width: 55%">55%</div>
                                                        <div class="bar away" style="width: 45%">45%</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="stat-bar">
                                                <div class="stat-label">Tirs cadrés</div>
                                                <div class="stat-value">
                                                    <div class="bar-container">
                                                        <div class="bar home" style="width: 60%">6</div>
                                                        <div class="bar away" style="width: 40%">4</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Fermer</button>
                                <button class="btn btn-primary" onclick="app.editMatch(${matchId})">Modifier</button>
                                <button class="btn btn-success" onclick="app.enterMatchResult(${matchId})">Entrer résultat</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    generateFixture() {
                        this.showConfirmationModal({
                            title: 'Générer calendrier',
                            message: 'Voulez-vous générer automatiquement le calendrier pour la saison ?',
                            confirmText: 'Générer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Calendrier généré avec succès', 'success');
                                this.refreshData();
                            }
                        });
                    }
                    
                    showPastMatches() {
                        this.notificationManager.show('Affichage des matchs passés', 'info');
                        // Implémentation à venir
                    }
                    
                    editTraining(trainingId) {
                        const trainings = this.store.get('trainings') || window.mockData.trainingSessions;
                        const training = trainings.find(t => t.id === trainingId);
                        
                        if (!training) {
                            this.notificationManager.show('Séance non trouvée', 'error');
                            return;
                        }
                        
                        this.notificationManager.show(`Modification de la séance ${trainingId}`, 'info');
                        // Implémentation à venir
                    }
                    
                    deleteTraining(trainingId) {
                        this.showConfirmationModal({
                            title: 'Supprimer séance',
                            message: 'Êtes-vous sûr de vouloir supprimer cette séance d\'entraînement ?',
                            confirmText: 'Oui, supprimer',
                            cancelText: 'Annuler',
                            type: 'danger',
                            onConfirm: () => {
                                this.notificationManager.show('Séance supprimée', 'success');
                                // Implémentation à venir
                            }
                        });
                    }
                    
                    viewTrainingDetails(trainingId) {
                        this.notificationManager.show(`Détails de la séance ${trainingId}`, 'info');
                        // Implémentation à venir
                    }
                    
                    showTrainingStats() {
                        this.notificationManager.show('Statistiques d\'entraînement', 'info');
                        // Implémentation à venir
                    }
                    
                    generateTrainingSchedule() {
                        this.showConfirmationModal({
                            title: 'Planifier entraînement',
                            message: 'Voulez-vous générer automatiquement le planning d\'entraînement pour le mois prochain ?',
                            confirmText: 'Générer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Planning généré avec succès', 'success');
                            }
                        });
                    }
                    
                    editInjury(injuryId) {
                        const injuries = this.store.get('injuries') || window.mockData.injuries;
                        const injury = injuries.find(i => i.id === injuryId);
                        
                        if (!injury) {
                            this.notificationManager.show('Blessure non trouvée', 'error');
                            return;
                        }
                        
                        this.notificationManager.show(`Modification de la blessure ${injuryId}`, 'info');
                        // Implémentation à venir
                    }
                    
                    deleteInjury(injuryId) {
                        this.showConfirmationModal({
                            title: 'Supprimer blessure',
                            message: 'Êtes-vous sûr de vouloir supprimer cette entrée de blessure ?',
                            confirmText: 'Oui, supprimer',
                            cancelText: 'Annuler',
                            type: 'danger',
                            onConfirm: () => {
                                this.notificationManager.show('Blessure supprimée', 'success');
                                // Implémentation à venir
                            }
                        });
                    }
                    
                    markInjuryRecovered(injuryId) {
                        this.showConfirmationModal({
                            title: 'Marquer comme rétabli',
                            message: 'Marquer cette blessure comme complètement rétablie ?',
                            confirmText: 'Oui, rétabli',
                            cancelText: 'Annuler',
                            type: 'success',
                            onConfirm: () => {
                                this.notificationManager.show('Blessure marquée comme rétablie', 'success');
                                // Implémentation à venir
                            }
                        });
                    }
                    
                    showInjuryStatistics() {
                        this.notificationManager.show('Statistiques des blessures', 'info');
                        // Implémentation à venir
                    }
                    
                    generateInjuryReport() {
                        this.showConfirmationModal({
                            title: 'Générer rapport médical',
                            message: 'Voulez-vous générer un rapport médical complet ?',
                            confirmText: 'Générer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Rapport médical généré', 'success');
                                // Implémentation à venir
                            }
                        });
                    }
                    
                    applyTactic(tacticId) {
                        this.showConfirmationModal({
                            title: 'Appliquer formation',
                            message: 'Voulez-vous appliquer cette formation tactique pour le prochain match ?',
                            confirmText: 'Appliquer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Formation appliquée avec succès', 'success');
                            }
                        });
                    }
                    
                    createNewTactic() {
                        const modal = this.createModal({
                            title: 'Créer nouvelle formation',
                            body: `
                                <form id="create-tactic-form" class="form-container">
                                    <div class="form-group">
                                        <label class="label-required">Nom de la formation</label>
                                        <input type="text" name="name" required placeholder="Ex: 4-3-3 Offensif">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="label-required">Format</label>
                                        <select name="format" required>
                                            <option value="">Sélectionnez un format</option>
                                            <option value="4-3-3">4-3-3</option>
                                            <option value="4-4-2">4-4-2</option>
                                            <option value="3-5-2">3-5-2</option>
                                            <option value="4-2-3-1">4-2-3-1</option>
                                            <option value="3-4-3">3-4-3</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Style de jeu</label>
                                        <select name="style">
                                            <option value="Offensif">Offensif</option>
                                            <option value="Défensif">Défensif</option>
                                            <option value="Contre-attaque">Contre-attaque</option>
                                            <option value="Possession">Possession</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Instructions</label>
                                        <textarea name="instructions" rows="4" placeholder="Instructions tactiques..."></textarea>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Points forts</label>
                                        <textarea name="strengths" rows="3" placeholder="Points forts de cette formation..."></textarea>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Points faibles</label>
                                        <textarea name="weaknesses" rows="3" placeholder="Points faibles de cette formation..."></textarea>
                                    </div>
                                </form>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button type="submit" form="create-tactic-form" class="btn btn-primary">Créer</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                        this.bindFormValidation('create-tactic-form');
                    }
                    
                    analyzeTactics() {
                        this.notificationManager.show('Analyse tactique en cours', 'info');
                        // Implémentation à venir
                    }
                    
                    searchForPlayer() {
                        const modal = this.createModal({
                            title: 'Rechercher joueur',
                            body: `
                                <form id="search-player-form" class="form-container">
                                    <div class="form-group">
                                        <label>Nom du joueur</label>
                                        <input type="text" name="name" placeholder="Nom du joueur">
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Position</label>
                                            <select name="position">
                                                <option value="">Toutes positions</option>
                                                <option value="GK">Gardien</option>
                                                <option value="DF">Défenseur</option>
                                                <option value="MF">Milieu</option>
                                                <option value="FW">Attaquant</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Âge maximum</label>
                                            <input type="number" name="maxAge" min="16" max="40" placeholder="Âge maximum">
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Valeur minimum (€)</label>
                                            <input type="number" name="minValue" placeholder="Valeur minimum">
                                        </div>
                                        <div class="form-group">
                                            <label>Valeur maximum (€)</label>
                                            <input type="text" name="maxValue" placeholder="Valeur maximum">
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Club actuel</label>
                                        <input type="text" name="currentClub" placeholder="Club actuel">
                                    </div>
                                </form>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button class="btn btn-primary" onclick="app.executePlayerSearch()">Rechercher</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    executePlayerSearch() {
                        this.notificationManager.show('Recherche de joueurs en cours', 'info');
                        this.closeModal();
                        // Implémentation à venir
                    }
                    
                    startNegotiation(playerId) {
                        this.showConfirmationModal({
                            title: 'Démarrer négociation',
                            message: 'Voulez-vous démarrer les négociations avec ce joueur ?',
                            confirmText: 'Démarrer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Négociations démarrées', 'success');
                            }
                        });
                    }
                    
                    scoutPlayer(playerId) {
                        this.notificationManager.show(`Joueur ${playerId} ajouté au suivi`, 'success');
                    }
                    
                    showTransferOffers() {
                        const modal = this.createModal({
                            title: 'Offres de transfert',
                            body: `
                                <div class="transfer-offers">
                                    <div class="offer-item">
                                        <div class="offer-header">
                                            <h5>Kylian Mbappé</h5>
                                            <span class="badge badge-success">25M€</span>
                                        </div>
                                        <div class="offer-details">
                                            <p><strong>De:</strong> Real Madrid</p>
                                            <p><strong>Date:</strong> 10/03/2024</p>
                                            <p><strong>Statut:</strong> En attente</p>
                                        </div>
                                        <div class="offer-actions">
                                            <button class="btn btn-sm btn-success" onclick="app.acceptOffer(1)">Accepter</button>
                                            <button class="btn btn-sm btn-danger" onclick="app.rejectOffer(1)">Rejeter</button>
                                            <button class="btn btn-sm btn-primary" onclick="app.negotiateOffer(1)">Négocier</button>
                                        </div>
                                    </div>
                                    
                                    <div class="offer-item">
                                        <div class="offer-header">
                                            <h5>N\'Golo Kanté</h5>
                                            <span class="badge badge-warning">15M€</span>
                                        </div>
                                        <div class="offer-details">
                                            <p><strong>De:</strong> Chelsea FC</p>
                                            <p><strong>Date:</strong> 08/03/2024</p>
                                            <p><strong>Statut:</strong> En négociation</p>
                                        </div>
                                        <div class="offer-actions">
                                            <button class="btn btn-sm btn-success" onclick="app.acceptOffer(2)">Accepter</button>
                                            <button class="btn btn-sm btn-danger" onclick="app.rejectOffer(2)">Rejeter</button>
                                            <button class="btn btn-sm btn-primary" onclick="app.negotiateOffer(2)">Négocier</button>
                                        </div>
                                    </div>
                                </div>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Fermer</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    acceptOffer(offerId) {
                        this.showConfirmationModal({
                            title: 'Accepter l\'offre',
                            message: 'Êtes-vous sûr de vouloir accepter cette offre de transfert ?',
                            confirmText: 'Accepter',
                            cancelText: 'Annuler',
                            type: 'success',
                            onConfirm: () => {
                                this.notificationManager.show('Offre acceptée', 'success');
                                this.closeModal();
                            }
                        });
                    }
                    
                    rejectOffer(offerId) {
                        this.showConfirmationModal({
                            title: 'Rejeter l\'offre',
                            message: 'Êtes-vous sûr de vouloir rejeter cette offre de transfert ?',
                            confirmText: 'Rejeter',
                            cancelText: 'Annuler',
                            type: 'danger',
                            onConfirm: () => {
                                this.notificationManager.show('Offre rejetée', 'success');
                                this.closeModal();
                            }
                        });
                    }
                    
                    negotiateOffer(offerId) {
                        this.notificationManager.show('Négociation démarrée', 'info');
                        this.closeModal();
                    }
                    
                    generateReport() {
                        this.showConfirmationModal({
                            title: 'Générer rapport',
                            message: 'Voulez-vous générer un rapport complet du système ?',
                            confirmText: 'Générer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Rapport généré avec succès', 'success');
                            }
                        });
                    }
                    
                    viewTeamReport() {
                        this.notificationManager.show('Rapport d\'équipe généré', 'info');
                    }
                    
                    viewPlayersReport() {
                        this.notificationManager.show('Rapport des joueurs généré', 'info');
                    }
                    
                    viewFinancialReport() {
                        this.notificationManager.show('Rapport financier généré', 'info');
                    }
                    
                    viewStatisticalAnalysis() {
                        this.notificationManager.show('Analyse statistique générée', 'info');
                    }
                    
                    addFinancialTransaction() {
                        const modal = this.createModal({
                            title: 'Ajouter transaction',
                            body: this.getAddTransactionForm(),
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button type="submit" form="add-transaction-form" class="btn btn-primary">Ajouter</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                        this.bindFormValidation('add-transaction-form');
                    }
                    
                    getAddTransactionForm() {
                        return `
                            <form id="add-transaction-form" class="form-container">
                                <div class="form-group">
                                    <label class="label-required">Type</label>
                                    <select name="type" required>
                                        <option value="">Sélectionnez un type</option>
                                        <option value="Dépense">Dépense</option>
                                        <option value="Recette">Recette</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="label-required">Montant (€)</label>
                                    <input type="number" name="amount" required placeholder="Montant en euros">
                                </div>
                                
                                <div class="form-group">
                                    <label class="label-required">Description</label>
                                    <input type="text" name="description" required placeholder="Description de la transaction">
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="label-required">Date</label>
                                        <input type="date" name="date" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Catégorie</label>
                                        <select name="category">
                                            <option value="">Sélectionnez une catégorie</option>
                                            <option value="Salaires">Salaires</option>
                                            <option value="Transferts">Transferts</option>
                                            <option value="Infrastructure">Infrastructure</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label>Notes</label>
                                    <textarea name="notes" rows="3" placeholder="Notes supplémentaires..."></textarea>
                                </div>
                            </form>
                        `;
                    }
                    
                    generateFinancialReport() {
                        this.showConfirmationModal({
                            title: 'Générer rapport financier',
                            message: 'Voulez-vous générer un rapport financier complet ?',
                            confirmText: 'Générer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Rapport financier généré', 'success');
                            }
                        });
                    }
                    
                    saveSettings() {
                        this.notificationManager.show('Paramètres sauvegardés avec succès', 'success');
                    }
                    
                    showSquadView() {
                        const players = this.store.get('players') || [];
                        const goalkeepers = players.filter(p => p.position === 'GK');
                        const defenders = players.filter(p => p.position === 'DF');
                        const midfielders = players.filter(p => p.position === 'MF');
                        const forwards = players.filter(p => p.position === 'FW');
                        
                        const modal = this.createModal({
                            title: 'Effectif de l\'équipe',
                            body: `
                                <div class="squad-view">
                                    <div class="formation">Formation: 4-3-3</div>
                                    
                                    <div class="pitch">
                                        <div class="position-row goalkeepers">
                                            ${goalkeepers.map(player => `
                                                <div class="player-on-pitch" onclick="app.showPlayerDetails(${player.id})">
                                                    <div class="player-number">${player.number}</div>
                                                    <div class="player-name">${player.name.split(' ')[0]}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                        
                                        <div class="position-row defenders">
                                            ${defenders.slice(0, 4).map(player => `
                                                <div class="player-on-pitch" onclick="app.showPlayerDetails(${player.id})">
                                                    <div class="player-number">${player.number}</div>
                                                    <div class="player-name">${player.name.split(' ')[0]}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                        
                                        <div class="position-row midfielders">
                                            ${midfielders.slice(0, 3).map(player => `
                                                <div class="player-on-pitch" onclick="app.showPlayerDetails(${player.id})">
                                                    <div class="player-number">${player.number}</div>
                                                    <div class="player-name">${player.name.split(' ')[0]}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                        
                                        <div class="position-row forwards">
                                            ${forwards.slice(0, 3).map(player => `
                                                <div class="player-on-pitch" onclick="app.showPlayerDetails(${player.id})">
                                                    <div class="player-number">${player.number}</div>
                                                    <div class="player-name">${player.name.split(' ')[0]}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <div class="squad-stats">
                                        <h5>Statistiques de l\'effectif</h5>
                                        <div class="stats-grid">
                                            <div class="stat-item">
                                                <div class="stat-label">Total joueurs</div>
                                                <div class="stat-value">${players.length}</div>
                                            </div>
                                            <div class="stat-item">
                                                <div class="stat-label">Âge moyen</div>
                                                <div class="stat-value">${this.calculateAverageAge(players)}</div>
                                            </div>
                                            <div class="stat-item">
                                                <div class="stat-label">Note moyenne</div>
                                                <div class="stat-value">${this.calculateAverageRating(players)}</div>
                                            </div>
                                            <div class="stat-item">
                                                <div class="stat-label">Valeur totale</div>
                                                <div class="stat-value">${this.calculateTotalValue(players)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Fermer</button>
                                <button class="btn btn-primary" onclick="app.printSquad()">Imprimer</button>
                            `,
                            size: 'xl'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    printSquad() {
                        window.print();
                    }
                    
                    createNewTeam() {
                        const modal = this.createModal({
                            title: 'Créer nouvelle équipe',
                            body: this.getCreateTeamForm(),
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button type="submit" form="create-team-form" class="btn btn-primary">Créer</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                        this.bindFormValidation('create-team-form');
                    }
                    
                    getCreateTeamForm() {
                        return `
                            <form id="create-team-form" class="form-container">
                                <div class="form-group">
                                    <label class="label-required">Nom de l\'équipe</label>
                                    <input type="text" name="name" required placeholder="Nom de l\'équipe">
                                </div>
                                
                                <div class="form-group">
                                    <label>Type d\'équipe</label>
                                    <select name="type">
                                        <option value="Première">Équipe première</option>
                                        <option value="Réserve">Équipe réserve</option>
                                        <option value="Jeunes">Équipe jeunes</option>
                                        <option value="Féminine">Équipe féminine</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Catégorie d\'âge</label>
                                    <input type="text" name="ageCategory" placeholder="Ex: U19, Senior">
                                </div>
                                
                                <div class="form-group">
                                    <label>Entraîneur</label>
                                    <input type="text" name="coach" placeholder="Nom de l\'entraîneur">
                                </div>
                                
                                <div class="form-group">
                                    <label>Stade d\'entraînement</label>
                                    <input type="text" name="trainingGround" placeholder="Stade d\'entraînement">
                                </div>
                                
                                <div class="form-group">
                                    <label>Notes</label>
                                    <textarea name="notes" rows="3" placeholder="Notes sur l\'équipe..."></textarea>
                                </div>
                            </form>
                        `;
                    }
                    
                    manageTeam(teamId) {
                        this.notificationManager.show(`Gestion de l'équipe ${teamId}`, 'info');
                        // Implémentation à venir
                    }
                    
                    viewTeamStats(teamId) {
                        this.notificationManager.show(`Statistiques de l'équipe ${teamId}`, 'info');
                        // Implémentation à venir
                    }
                    
                    showForgotPassword() {
                        const modal = this.createModal({
                            title: 'Mot de passe oublié',
                            body: `
                                <form id="forgot-password-form" class="form-container">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" required placeholder="Votre email">
                                    </div>
                                    <p class="form-hint">Un lien de réinitialisation vous sera envoyé par email.</p>
                                </form>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button class="btn btn-primary" onclick="app.sendResetLink()">Envoyer le lien</button>
                            `,
                            size: 'sm'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    sendResetLink() {
                        this.notificationManager.show('Lien de réinitialisation envoyé', 'success');
                        this.closeModal();
                    }
                    
                    showRegister() {
                        const modal = this.createModal({
                            title: 'Créer un compte',
                            body: `
                                <form id="register-form" class="form-container">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label class="label-required">Prénom</label>
                                            <input type="text" name="firstName" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="label-required">Nom</label>
                                            <input type="text" name="lastName" required>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="label-required">Email</label>
                                        <input type="email" name="email" required>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label class="label-required">Mot de passe</label>
                                            <input type="password" name="password" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="label-required">Confirmation</label>
                                            <input type="password" name="confirmPassword" required>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Club/Équipe</label>
                                        <input type="text" name="club" placeholder="Nom de votre club">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="checkbox">
                                            <input type="checkbox" required>
                                            <span>J\'accepte les conditions d\'utilisation</span>
                                        </label>
                                    </div>
                                </form>
                            `,
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button class="btn btn-primary" onclick="app.submitRegistration()">S\'inscrire</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                        this.bindFormValidation('register-form');
                    }
                    
                    submitRegistration() {
                        this.notificationManager.show('Inscription réussie!', 'success');
                        this.closeModal();
                    }
                    
                    generatePerformanceReport() {
                        this.showConfirmationModal({
                            title: 'Rapport de performance',
                            message: 'Générer un rapport détaillé de performance des joueurs ?',
                            confirmText: 'Générer',
                            cancelText: 'Annuler',
                            type: 'info',
                            onConfirm: () => {
                                this.notificationManager.show('Rapport de performance généré', 'success');
                            }
                        });
                    }
                    
                    editProfile() {
                        this.notificationManager.show('Modification du profil', 'info');
                        // Implémentation à venir
                    }
                    
                    markAllAsRead() {
                        this.notificationManager.show('Toutes les notifications marquées comme lues', 'success');
                        this.closeModal();
                    }
                    
                    editClubInfo() {
                        this.notificationManager.show('Modification des informations du club', 'info');
                        // Implémentation à venir
                    }
                    
                    enterMatchResult(matchId) {
                        const modal = this.createModal({
                            title: 'Entrer résultat du match',
                            body: this.getMatchResultForm(matchId),
                            footer: `
                                <button class="btn btn-secondary" onclick="app.closeModal()">Annuler</button>
                                <button class="btn btn-primary" onclick="app.saveMatchResult(${matchId})">Enregistrer</button>
                            `,
                            size: 'lg'
                        });
                        
                        document.body.appendChild(modal);
                    }
                    
                    getMatchResultForm(matchId) {
                        const matches = this.store.get('matches') || window.mockData.upcomingMatches;
                        const match = matches.find(m => m.id === matchId);
                        
                        return `
                            <form id="match-result-form" class="form-container">
                                <div class="form-group">
                                    <label>Score</label>
                                    <div class="score-input">
                                        <input type="number" name="homeScore" min="0" max="20" placeholder="0" style="width: 60px; text-align: center;">
                                        <span style="margin: 0 10px;">-</span>
                                        <input type="number" name="awayScore" min="0" max="20" placeholder="0" style="width: 60px; text-align: center;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label>Possession (%)</label>
                                    <div class="possession-input">
                                        <input type="range" name="possession" min="0" max="100" value="50" class="slider">
                                        <output name="possession-output" class="slider-output">50%</output>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Tirs</label>
                                        <input type="number" name="shots" min="0" placeholder="Total tirs">
                                    </div>
                                    <div class="form-group">
                                        <label>Tirs cadrés</label>
                                        <input type="number" name="shotsOnTarget" min="0" placeholder="Tirs cadrés">
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Corners</label>
                                        <input type="number" name="corners" min="0" placeholder="Corners">
                                    </div>
                                    <div class="form-group">
                                        <label>Fautes</label>
                                        <input type="number" name="fouls" min="0" placeholder="Fautes">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label>Cartons jaunes</label>
                                    <input type="number" name="yellowCards" min="0" placeholder="Cartons jaunes">
                                </div>
                                
                                <div class="form-group">
                                    <label>Cartons rouges</label>
                                    <input type="number" name="redCards" min="0" placeholder="Cartons rouges">
                                </div>
                                
                                <div class="form-group">
                                    <label>Commentaire du match</label>
                                    <textarea name="commentary" rows="4" placeholder="Commentaire sur le match..."></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label>Meilleur joueur</label>
                                    <input type="text" name="manOfTheMatch" placeholder="Meilleur joueur du match">
                                </div>
                            </form>
                        `;
                    }
                    
                    saveMatchResult(matchId) {
                        this.notificationManager.show('Résultat du match enregistré', 'success');
                        this.closeModal();
                    }
                }
                
                /**
                 * Système de gestion API amélioré
                 */
                class EnhancedAPIManager {
                    constructor(baseURL) {
                        this.baseURL = baseURL || 'http://localhost:3000/api';
                        this.token = localStorage.getItem('auth_token');
                        this.cache = new Map();
                        this.requestQueue = [];
                        this.isProcessingQueue = false;
                    }
                    
                    async request(endpoint, options = {}) {
                        const cacheKey = `${endpoint}-${JSON.stringify(options)}`;
                        const cacheTTL = 5 * 60 * 1000; // 5 minutes
                        
                        // Vérifier le cache
                        if (options.method === 'GET' && this.cache.has(cacheKey)) {
                            const cached = this.cache.get(cacheKey);
                            if (Date.now() - cached.timestamp < cacheTTL) {
                                return cached.data;
                            }
                        }
                        
                        try {
                            // Simulation API
                            const response = await this.mockRequest(endpoint, options);
                            
                            // Mettre en cache
                            if (options.method === 'GET') {
                                this.cache.set(cacheKey, {
                                    data: response,
                                    timestamp: Date.now()
                                });
                            }
                            
                            return response;
                            
                        } catch (error) {
                            console.error('Erreur de requête API:', error);
                            throw error;
                        }
                    }
                    
                    async mockRequest(endpoint, options) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                try {
                                    let response;
                                    
                                    switch(endpoint) {
                                        case '/players':
                                            if (options.method === 'POST') {
                                                const playerData = JSON.parse(options.body);
                                                response = {
                                                    id: Date.now(),
                                                    ...playerData,
                                                    team: 'Paris SG',
                                                    status: playerData.status || 'active',
                                                    value: playerData.value || 1000000,
                                                    salary: playerData.salary || 20000,
                                                    contract: playerData.contract_end || '2024-06-30',
                                                    created_at: new Date().toISOString(),
                                                    updated_at: new Date().toISOString()
                                                };
                                            } else if (options.method === 'PUT') {
                                                const playerData = JSON.parse(options.body);
                                                response = {
                                                    ...playerData,
                                                    updated_at: new Date().toISOString()
                                                };
                                            } else if (options.method === 'DELETE') {
                                                response = { success: true, message: 'Supprimé avec succès' };
                                            } else {
                                                response = [...window.mockData.players];
                                            }
                                            break;
                                            
                                        case '/teams':
                                            response = [{ id: 1, name: 'Paris SG', division: 'Ligue 1' }];
                                            break;
                                            
                                        case '/matches':
                                            if (options.method === 'POST') {
                                                const matchData = JSON.parse(options.body);
                                                response = {
                                                    id: Date.now(),
                                                    ...matchData,
                                                    created_at: new Date().toISOString()
                                                };
                                            } else if (options.method === 'DELETE') {
                                                response = { success: true, message: 'Match supprimé' };
                                            } else {
                                                response = [...window.mockData.upcomingMatches];
                                            }
                                            break;
                                            
                                        case '/matches/upcoming':
                                            response = [...window.mockData.upcomingMatches];
                                            break;
                                            
                                        case '/dashboard/stats':
                                            response = { 
                                                ...window.mockData.dashboardStats,
                                                budgetChange: 2.4,
                                                injuryChange: -1,
                                                points: 45
                                            };
                                            break;
                                            
                                        case '/injuries':
                                            if (options.method === 'POST') {
                                                const injuryData = JSON.parse(options.body);
                                                const player = window.mockData.players.find(p => p.id == injuryData.playerId);
                                                response = {
                                                    id: Date.now(),
                                                    ...injuryData,
                                                    playerName: player?.name || 'Joueur inconnu',
                                                    created_at: new Date().toISOString()
                                                };
                                            } else {
                                                response = [...window.mockData.injuries];
                                            }
                                            break;
                                            
                                        case '/trainings':
                                            if (options.method === 'POST') {
                                                const trainingData = JSON.parse(options.body);
                                                response = {
                                                    id: Date.now(),
                                                    ...trainingData,
                                                    created_at: new Date().toISOString()
                                                };
                                            } else {
                                                response = [...window.mockData.trainingSessions];
                                            }
                                            break;
                                            
                                        default:
                                            response = {};
                                    }
                                    
                                    resolve(response);
                                } catch (error) {
                                    reject(error);
                                }
                            }, 300);
                        });
                    }
                    
                    async getPlayers() {
                        return this.request('/players');
                    }
                    
                    async getPlayer(id) {
                        return this.request(`/players/${id}`);
                    }
                    
                    async addPlayer(playerData) {
                        return this.request('/players', {
                            method: 'POST',
                            body: JSON.stringify(playerData)
                        });
                    }
                    
                    async updatePlayer(id, playerData) {
                        return this.request(`/players/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify(playerData)
                        });
                    }
                    
                    async deletePlayer(id) {
                        return this.request(`/players/${id}`, {
                            method: 'DELETE'
                        });
                    }
                    
                    async getTeams() {
                        return this.request('/teams');
                    }
                    
                    async getUpcomingMatches() {
                        return this.request('/matches/upcoming');
                    }
                    
                    async getDashboardStats() {
                        return this.request('/dashboard/stats');
                    }
                    
                    async getInjuries() {
                        return this.request('/injuries');
                    }
                    
                    async addInjury(injuryData) {
                        return this.request('/injuries', {
                            method: 'POST',
                            body: JSON.stringify(injuryData)
                        });
                    }
                    
                    async getTrainingSessions() {
                        return this.request('/trainings');
                    }
                    
                    async addTrainingSession(trainingData) {
                        return this.request('/trainings', {
                            method: 'POST',
                            body: JSON.stringify(trainingData)
                        });
                    }
                    
                    async addMatch(matchData) {
                        return this.request('/matches', {
                            method: 'POST',
                            body: JSON.stringify(matchData)
                        });
                    }
                    
                    async deleteMatch(id) {
                        return this.request(`/matches/${id}`, {
                            method: 'DELETE'
                        });
                    }
                    
                    clearCache() {
                        this.cache.clear();
                    }
                }
                
                /**
                 * Système d'authentification amélioré
                 */
                class EnhancedAuthManager {
                    constructor() {
                        this.user = null;
                        this.token = localStorage.getItem('auth_token');
                        this.refreshToken = localStorage.getItem('refresh_token');
                        this.tokenExpiry = localStorage.getItem('token_expiry');
                    }
                    
                    async checkAuth() {
                        try {
                            // Vérifier la validité du token
                            if (this.token && this.tokenExpiry) {
                                const expiryTime = parseInt(this.tokenExpiry);
                                if (Date.now() < expiryTime) {
                                    // Token valide
                                    this.user = await this.getUserFromToken(this.token);
                                    return true;
                                } else if (this.refreshToken) {
                                    // Essayer de rafraîchir le token
                                    const refreshed = await this.refreshAuthToken();
                                    return refreshed;
                                }
                            }
                            
                            return false;
                        } catch (error) {
                            console.error('Erreur de vérification d\'authentification:', error);
                            return false;
                        }
                    }
                    
                    async login(credentials) {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                if (credentials.username && credentials.password) {
                                    // Simulation de connexion réussie
                                    this.token = 'mock_jwt_token_' + Date.now();
                                    this.refreshToken = 'mock_refresh_token_' + Date.now();
                                    this.tokenExpiry = (Date.now() + 24 * 60 * 60 * 1000).toString(); // 24 heures
                                    
                                    this.user = {
                                        id: 1,
                                        name: 'Coach Français',
                                        role: 'Entraîneur',
                                        email: 'coach@psg.fr',
                                        permissions: ['players.read', 'players.write', 'matches.read', 'matches.write']
                                    };
                                    
                                    // Sauvegarder dans localStorage
                                    this.saveAuthData();
                                    
                                    resolve({
                                        success: true,
                                        user: this.user
                                    });
                                } else {
                                    resolve({
                                        success: false,
                                        error: 'Identifiants incorrects'
                                    });
                                }
                            }, 500);
                        });
                    }
                    
                    async logout() {
                        try {
                            // Simulation de déconnexion du serveur
                            await new Promise(resolve => setTimeout(resolve, 100));
                            
                            // Effacer les données locales
                            this.clearAuth();
                            
                        } catch (error) {
                            console.error('Erreur de déconnexion:', error);
                        }
                    }
                    
                    async refreshAuthToken() {
                        try {
                            // Simulation de rafraîchissement de token
                            this.token = 'mock_jwt_token_refreshed_' + Date.now();
                            this.tokenExpiry = (Date.now() + 24 * 60 * 60 * 1000).toString();
                            
                            this.saveAuthData();
                            return true;
                            
                        } catch (error) {
                            console.error('Erreur de rafraîchissement du token:', error);
                            this.clearAuth();
                            return false;
                        }
                    }
                    
                    async getUserFromToken(token) {
                        // Simulation de récupération des données utilisateur depuis le token
                        return {
                            id: 1,
                            name: 'Coach Français',
                            role: 'Entraîneur',
                            email: 'coach@psg.fr'
                        };
                    }
                    
                    saveAuthData() {
                        localStorage.setItem('auth_token', this.token);
                        localStorage.setItem('refresh_token', this.refreshToken);
                        localStorage.setItem('token_expiry', this.tokenExpiry);
                        localStorage.setItem('user', JSON.stringify(this.user));
                    }
                    
                    clearAuth() {
                        this.token = null;
                        this.refreshToken = null;
                        this.tokenExpiry = null;
                        this.user = null;
                        
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('refresh_token');
                        localStorage.removeItem('token_expiry');
                        localStorage.removeItem('user');
                    }
                    
                    getCurrentUser() {
                        return this.user;
                    }
                    
                    hasPermission(permission) {
                        return this.user?.permissions?.includes(permission) || false;
                    }
                }
                
                /**
                 * Système de stockage de données amélioré
                 */
                class EnhancedDataStore {
                    constructor() {
                        this.data = new Map();
                        this.subscribers = new Map();
                    }
                    
                    set(key, value) {
                        this.data.set(key, value);
                        this.notifySubscribers(key, value);
                        
                        // Sauvegarder dans localStorage pour usage futur
                        try {
                            localStorage.setItem(`store_${key}`, JSON.stringify(value));
                        } catch (error) {
                            console.error('Erreur de sauvegarde des données:', error);
                        }
                    }
                    
                    get(key) {
                        // Essayer de récupérer de la mémoire
                        if (this.data.has(key)) {
                            return this.data.get(key);
                        }
                        
                        // Essayer de récupérer de localStorage
                        try {
                            const stored = localStorage.getItem(`store_${key}`);
                            if (stored) {
                                const value = JSON.parse(stored);
                                this.data.set(key, value);
                                return value;
                            }
                        } catch (error) {
                            console.error('Erreur de chargement des données:', error);
                        }
                        
                        return null;
                    }
                    
                    add(key, item) {
                        const collection = this.get(key) || [];
                        const newItem = { id: Date.now(), ...item };
                        collection.push(newItem);
                        this.set(key, collection);
                        return newItem;
                    }
                    
                    update(key, id, updates) {
                        const collection = this.get(key) || [];
                        const index = collection.findIndex(item => item.id === id);
                        
                        if (index !== -1) {
                            collection[index] = { ...collection[index], ...updates };
                            this.set(key, collection);
                            return collection[index];
                        }
                        
                        return null;
                    }
                    
                    remove(key, id) {
                        const collection = this.get(key) || [];
                        const filtered = collection.filter(item => item.id !== id);
                        this.set(key, filtered);
                    }
                    
                    subscribe(key, callback) {
                        if (!this.subscribers.has(key)) {
                            this.subscribers.set(key, new Set());
                        }
                        this.subscribers.get(key).add(callback);
                        
                        // Retourner une fonction pour se désabonner
                        return () => {
                            this.subscribers.get(key)?.delete(callback);
                        };
                    }
                    
                    notifySubscribers(key, value) {
                        const callbacks = this.subscribers.get(key);
                        if (callbacks) {
                            callbacks.forEach(callback => callback(value));
                        }
                    }
                    
                    clear() {
                        this.data.clear();
                        this.subscribers.clear();
                    }
                }
                
                /**
                 * Système de routage
                 */
                class Router {
                    constructor() {
                        this.routes = new Map();
                        this.currentRoute = null;
                        this.init();
                    }
                    
                    init() {
                        // Gérer le bouton retour
                        window.addEventListener('popstate', (e) => {
                            if (e.state && e.state.route) {
                                this.navigate(e.state.route, false);
                            }
                        });
                        
                        // Gérer les liens
                        document.addEventListener('click', (e) => {
                            const link = e.target.closest('a[data-route]');
                            if (link) {
                                e.preventDefault();
                                const route = link.dataset.route;
                                this.navigate(route);
                            }
                        });
                    }
                    
                    addRoute(path, handler) {
                        this.routes.set(path, handler);
                    }
                    
                    navigate(path, pushState = true) {
                        const handler = this.routes.get(path);
                        if (handler) {
                            this.currentRoute = path;
                            
                            if (pushState) {
                                history.pushState({ route: path }, '', `#${path}`);
                            }
                            
                            handler();
                        } else {
                            console.warn(`Route non trouvée: ${path}`);
                        }
                    }
                    
                    getCurrentRoute() {
                        return this.currentRoute;
                    }
                }
                
                /**
                 * Système de notifications amélioré
                 */
                class NotificationManager {
                    constructor() {
                        this.container = null;
                        this.notifications = [];
                        this.maxNotifications = 5;
                        this.init();
                    }
                    
                    init() {
                        this.createContainer();
                        
                        // Vérifier les notifications stockées
                        this.loadStoredNotifications();
                    }
                    
                    createContainer() {
                        this.container = document.getElementById('notification-container');
                        if (!this.container) {
                            this.container = document.createElement('div');
                            this.container.id = 'notification-container';
                            this.container.className = 'notification-container';
                            document.body.appendChild(this.container);
                        }
                    }
                    
                    show(message, type = 'info', title = '', duration = 5000) {
                        const notification = {
                            id: Date.now(),
                            title,
                            message,
                            type,
                            duration,
                            timestamp: new Date()
                        };
                        
                        this.notifications.unshift(notification);
                        
                        // Afficher la notification
                        this.displayNotification(notification);
                        
                        // Sauvegarder dans localStorage
                        this.saveNotification(notification);
                        
                        // Limiter les anciennes notifications
                        if (this.notifications.length > this.maxNotifications) {
                            this.notifications.pop();
                        }
                        
                        // Supprimer la notification après la durée spécifiée
                        setTimeout(() => {
                            this.removeNotification(notification.id);
                        }, duration);
                    }
                    
                    displayNotification(notification) {
                        const notificationEl = document.createElement('div');
                        notificationEl.className = `notification notification-${notification.type}`;
                        notificationEl.id = `notification-${notification.id}`;
                        
                        const icon = this.getNotificationIcon(notification.type);
                        
                        notificationEl.innerHTML = `
                            <div class="notification-icon">
                                ${icon}
                            </div>
                            <div class="notification-content">
                                ${notification.title ? `<div class="notification-title">${notification.title}</div>` : ''}
                                <div class="notification-message">${notification.message}</div>
                            </div>
                            <button class="notification-close" onclick="app.notificationManager.removeNotification(${notification.id})">
                                &times;
                            </button>
                        `;
                        
                        this.container.appendChild(notificationEl);
                        
                        // Ajouter un effet d'apparition
                        requestAnimationFrame(() => {
                            notificationEl.style.opacity = '1';
                            notificationEl.style.transform = 'translateX(0)';
                        });
                    }
                    
                    getNotificationIcon(type) {
                        const icons = {
                            success: '<i class="fas fa-check-circle"></i>',
                            error: '<i class="fas fa-exclamation-circle"></i>',
                            warning: '<i class="fas fa-exclamation-triangle"></i>',
                            info: '<i class="fas fa-info-circle"></i>'
                        };
                        return icons[type] || icons.info;
                    }
                    
                    removeNotification(id) {
                        const notificationEl = document.getElementById(`notification-${id}`);
                        if (notificationEl) {
                            notificationEl.classList.add('fade-out');
                            
                            setTimeout(() => {
                                notificationEl.remove();
                                
                                // Retirer du tableau
                                this.notifications = this.notifications.filter(n => n.id !== id);
                                
                                // Mettre à jour localStorage
                                this.saveAllNotifications();
                            }, 300);
                        }
                    }
                    
                    saveNotification(notification) {
                        try {
                            const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
                            stored.unshift(notification);
                            
                            // Limiter les notifications stockées
                            if (stored.length > 20) {
                                stored.length = 20;
                            }
                            
                            localStorage.setItem('notifications', JSON.stringify(stored));
                        } catch (error) {
                            console.error('Erreur de sauvegarde de notification:', error);
                        }
                    }
                    
                    saveAllNotifications() {
                        try {
                            localStorage.setItem('notifications', JSON.stringify(this.notifications));
                        } catch (error) {
                            console.error('Erreur de sauvegarde de toutes les notifications:', error);
                        }
                    }
                    
                    loadStoredNotifications() {
                        try {
                            const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
                            this.notifications = stored.slice(0, this.maxNotifications);
                            
                            // Afficher les notifications stockées
                            this.notifications.forEach(notification => {
                                this.displayNotification(notification);
                            });
                        } catch (error) {
                            console.error('Erreur de chargement des notifications:', error);
                        }
                    }
                    
                    clearAll() {
                        this.notifications = [];
                        this.container.innerHTML = '';
                        localStorage.removeItem('notifications');
                    }
                }
                
                /**
                 * Système de gestion hors ligne
                 */
                class OfflineManager {
                    constructor() {
                        this.indicator = null;
                        this.offlineQueue = [];
                        this.init();
                    }
                    
                    init() {
                        this.createIndicator();
                        this.setupEventListeners();
                    }
                    
                    createIndicator() {
                        this.indicator = document.getElementById('offline-indicator');
                        if (!this.indicator) {
                            this.indicator = document.createElement('div');
                            this.indicator.id = 'offline-indicator';
                            this.indicator.className = 'offline-indicator hidden';
                            this.indicator.innerHTML = `
                                <i class="fas fa-wifi-slash"></i>
                                <span>Vous êtes hors ligne</span>
                            `;
                            document.body.appendChild(this.indicator);
                        }
                    }
                    
                    setupEventListeners() {
                        window.addEventListener('online', () => {
                            this.hideIndicator();
                            this.processQueue();
                        });
                        
                        window.addEventListener('offline', () => {
                            this.showIndicator();
                        });
                    }
                    
                    showIndicator() {
                        if (this.indicator) {
                            this.indicator.classList.remove('hidden');
                        }
                    }
                    
                    hideIndicator() {
                        if (this.indicator) {
                            this.indicator.classList.add('hidden');
                        }
                    }
                    
                    addToQueue(action) {
                        this.offlineQueue.push(action);
                        this.saveQueue();
                    }
                    
                    async processQueue() {
                        if (this.offlineQueue.length === 0) return;
                        
                        const queueCopy = [...this.offlineQueue];
                        this.offlineQueue = [];
                        
                        for (const action of queueCopy) {
                            try {
                                await action();
                            } catch (error) {
                                console.error('Erreur de traitement de l\'action hors ligne:', error);
                                // Remettre l'action dans la file en cas d'échec
                                this.offlineQueue.push(action);
                            }
                        }
                        
                        this.saveQueue();
                    }
                    
                    saveQueue() {
                        try {
                            // Peut stocker la file dans localStorage
                            localStorage.setItem('offline_queue', JSON.stringify(this.offlineQueue.map(a => a.toString())));
                        } catch (error) {
                            console.error('Erreur de sauvegarde de la file hors ligne:', error);
                        }
                    }
                    
                    loadQueue() {
                        try {
                            const saved = localStorage.getItem('offline_queue');
                            if (saved) {
                                // Charger la file stockée
                                const queue = JSON.parse(saved);
                                this.offlineQueue = queue.map(actionStr => eval(`(${actionStr})`));
                            }
                        } catch (error) {
                            console.error('Erreur de chargement de la file hors ligne:', error);
                        }
                    }
                }
                
                /**
                 * Initialisation de l'application au chargement de la page
                 */
                window.addEventListener('DOMContentLoaded', () => {
                    // Initialiser la variable globale de l'application
                    window.app = new EnhancedFootballManagerApp();
                    
                    // Ajouter des optimisations supplémentaires
                    addPerformanceOptimizations();
                    addAccessibilityFeatures();
                });
                
                /**
                 * Optimisations de performance
                 */
                function addPerformanceOptimizations() {
                    // Lazy loading pour les images
                    if ('IntersectionObserver' in window) {
                        const imageObserver = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    const img = entry.target;
                                    img.src = img.dataset.src;
                                    imageObserver.unobserve(img);
                                }
                            });
                        });
                        
                        document.querySelectorAll('img[data-src]').forEach(img => {
                            imageObserver.observe(img);
                        });
                    }
                    
                    // Debounce pour la recherche
                    function debounce(func, wait) {
                        let timeout;
                        return function executedFunction(...args) {
                            const later = () => {
                                clearTimeout(timeout);
                                func(...args);
                            };
                            clearTimeout(timeout);
                            timeout = setTimeout(later, wait);
                        };
                    }
                    
                    // Optimiser le défilement
                    let scrollTimeout;
                    window.addEventListener('scroll', () => {
                        document.body.classList.add('scrolling');
                        
                        clearTimeout(scrollTimeout);
                        scrollTimeout = setTimeout(() => {
                            document.body.classList.remove('scrolling');
                        }, 150);
                    });
                }
                
                /**
                 * Améliorations d'accessibilité
                 */
                function addAccessibilityFeatures() {
                    // Ajouter des labels ARIA
                    document.querySelectorAll('button').forEach(button => {
                        if (!button.hasAttribute('aria-label')) {
                            const text = button.textContent.trim();
                            if (text) {
                                button.setAttribute('aria-label', text);
                            }
                        }
                    });
                    
                    // Focus sur le contenu principal
                    document.addEventListener('keydown', (e) => {
                        if (e.key === 'Tab' && !e.shiftKey) {
                            const main = document.querySelector('main');
                            if (main && !main.contains(document.activeElement)) {
                                e.preventDefault();
                                main.setAttribute('tabindex', '-1');
                                main.focus();
                            }
                        }
                    });
                    
                    // Améliorer la lecture d'écran
                    if (typeof liveRegion === 'undefined') {
                        const liveRegion = document.createElement('div');
                        liveRegion.id = 'live-region';
                        liveRegion.setAttribute('aria-live', 'polite');
                        liveRegion.setAttribute('aria-atomic', 'true');
                        liveRegion.style.position = 'absolute';
                        liveRegion.style.width = '1px';
                        liveRegion.style.height = '1px';
                        liveRegion.style.margin = '-1px';
                        liveRegion.style.padding = '0';
                        liveRegion.style.overflow = 'hidden';
                        liveRegion.style.clip = 'rect(0, 0, 0, 0)';
                        liveRegion.style.border = '0';
                        document.body.appendChild(liveRegion);
                    }
                }
                
                /**
                 * CSS supplémentaire pour les améliorations
                 */
                const additionalStyles = `
                    .scrolling * {
                        pointer-events: none !important;
                    }
                    
                    .password-input {
                        position: relative;
                    }
                    
                    .password-toggle {
                        position: absolute;
                        left: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: var(--gray-500);
                        cursor: pointer;
                    }
                    
                    .rating-slider {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    
                    .slider {
                        flex: 1;
                    }
                    
                    .slider-output {
                        min-width: 40px;
                        text-align: center;
                        font-weight: bold;
                        color: var(--primary-color);
                    }
                    
                    .injury-card {
                        background: white;
                        border-radius: var(--border-radius);
                        padding: var(--spacing-lg);
                        margin-bottom: var(--spacing-md);
                        border-left: 4px solid var(--warning-color);
                        box-shadow: var(--shadow-sm);
                    }
                    
                    .injury-card[data-severity="Grave"] {
                        border-left-color: var(--danger-color);
                    }
                    
                    .injury-card[data-severity="Légère"] {
                        border-left-color: var(--success-color);
                    }
                    
                    .injury-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: var(--spacing-sm);
                    }
                    
                    .injury-body {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .injury-info {
                        flex: 1;
                    }
                    
                    .injury-footer {
                        margin-top: var(--spacing-md);
                        display: flex;
                        gap: var(--spacing-sm);
                    }
                    
                    .training-card {
                        background: white;
                        border-radius: var(--border-radius);
                        padding: var(--spacing-lg);
                        margin-bottom: var(--spacing-md);
                        border: 1px solid var(--gray-200);
                        box-shadow: var(--shadow-sm);
                    }
                    
                    .training-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: var(--spacing-sm);
                    }
                    
                    .training-body {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .training-info {
                        flex: 1;
                        display: flex;
                        gap: var(--spacing-lg);
                    }
                    
                    .training-footer {
                        margin-top: var(--spacing-md);
                        display: flex;
                        gap: var(--spacing-sm);
                    }
                    
                    .schedule-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    
                    .schedule-table th,
                    .schedule-table td {
                        padding: var(--spacing-md);
                        text-align: center;
                        border: 1px solid var(--gray-200);
                    }
                    
                    .schedule-table th {
                        background: var(--gray-100);
                        font-weight: 600;
                    }
                    
                    .squad-view {
                        text-align: center;
                    }
                    
                    .formation {
                        font-size: 1.2rem;
                        font-weight: bold;
                        margin-bottom: var(--spacing-lg);
                        color: var(--primary-color);
                    }
                    
                    .pitch {
                        background: linear-gradient(135deg, #2e7d32, #4caf50);
                        border-radius: var(--border-radius);
                        padding: var(--spacing-xl);
                        margin-bottom: var(--spacing-lg);
                        position: relative;
                        min-height: 400px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    
                    .position-row {
                        display: flex;
                        justify-content: center;
                        gap: var(--spacing-lg);
                    }
                    
                    .player-on-pitch {
                        background: white;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: transform 0.2s;
                        box-shadow: var(--shadow-sm);
                    }
                    
                    .player-on-pitch:hover {
                        transform: scale(1.1);
                        box-shadow: var(--shadow-md);
                    }
                    
                    .player-number {
                        font-weight: bold;
                        font-size: 1.2rem;
                    }
                    
                    .player-name {
                        font-size: 0.8rem;
                        margin-top: 2px;
                    }
                    
                    .transfer-offers {
                        display: flex;
                        flex-direction: column;
                        gap: var(--spacing-lg);
                    }
                    
                    .offer-item {
                        background: var(--gray-50);
                        border-radius: var(--border-radius);
                        padding: var(--spacing-lg);
                        border: 1px solid var(--gray-200);
                    }
                    
                    .offer-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: var(--spacing-sm);
                    }
                    
                    .offer-actions {
                        display: flex;
                        gap: var(--spacing-sm);
                        margin-top: var(--spacing-md);
                    }
                    
                    .club-logo-large {
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 2rem;
                        font-weight: bold;
                        margin-right: var(--spacing-lg);
                    }
                    
                    .club-header {
                        display: flex;
                        align-items: center;
                        margin-bottom: var(--spacing-xl);
                    }
                    
                    .team-logo-large {
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-right: var(--spacing-md);
                    }
                    
                    .team-card {
                        background: white;
                        border-radius: var(--border-radius);
                        padding: var(--spacing-lg);
                        display: flex;
                        align-items: center;
                        margin-bottom: var(--spacing-md);
                        box-shadow: var(--shadow-sm);
                    }
                    
                    .team-info {
                        flex: 1;
                    }
                    
                    .team-stats {
                        display: flex;
                        gap: var(--spacing-lg);
                        margin-top: var(--spacing-sm);
                        color: var(--gray-600);
                        font-size: 0.9rem;
                    }
                    
                    .team-actions {
                        display: flex;
                        gap: var(--spacing-sm);
                    }
                    
                    .match-teams-large {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: var(--spacing-xl);
                        margin-bottom: var(--spacing-lg);
                    }
                    
                    .team-logo-large {
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 2rem;
                        font-weight: bold;
                    }
                    
                    .match-vs-large {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: var(--gray-600);
                    }
                    
                    .match-info {
                        display: flex;
                        justify-content: center;
                        gap: var(--spacing-xl);
                        margin-bottom: var(--spacing-lg);
                    }
                    
                    .info-item {
                        display: flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        color: var(--gray-600);
                    }
                    
                    .stats-bars {
                        display: flex;
                        flex-direction: column;
                        gap: var(--spacing-md);
                    }
                    
                    .stat-bar {
                        display: flex;
                        align-items: center;
                        gap: var(--spacing-md);
                    }
                    
                    .bar-container {
                        flex: 1;
                        display: flex;
                        height: 20px;
                        border-radius: 10px;
                        overflow: hidden;
                        background: var(--gray-200);
                    }
                    
                    .bar {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 0.8rem;
                        font-weight: bold;
                    }
                    
                    .bar.home {
                        background: var(--primary-color);
                    }
                    
                    .bar.away {
                        background: var(--secondary-color);
                    }
                    
                    .modal-xl .modal-content {
                        max-width: 1000px;
                    }
                    
                    .mt-2 { margin-top: 0.5rem; }
                    .mt-3 { margin-top: 1rem; }
                    .mt-4 { margin-top: 1.5rem; }
                    .mt-5 { margin-top: 2rem; }
                    
                    .mb-2 { margin-bottom: 0.5rem; }
                    .mb-3 { margin-bottom: 1rem; }
                    .mb-4 { margin-bottom: 1.5rem; }
                    .mb-5 { margin-bottom: 2rem; }
                `;
                
                // Ajouter les styles supplémentaires
                const styleElement = document.createElement('style');
                styleElement.textContent = additionalStyles;
                document.head.appendChild(styleElement);