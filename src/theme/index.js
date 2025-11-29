export const theme = {
    colors: {
        // Primary Brand Colors
        primary: '#FF6B6B', // Vibrant Coral Red (Modern 'Tomato')
        primaryDark: '#EE5253',
        primaryLight: '#FF9E9E',

        // Secondary/Accent Colors
        secondary: '#4ECDC4', // Fresh Teal
        accent: '#FFE66D', // Soft Yellow

        // Backgrounds
        background: '#F7F9FC', // Cool Light Grey
        surface: '#FFFFFF',
        surfaceHighlight: '#FDFDFD',

        // Text
        textPrimary: '#2D3436', // Dark Charcoal
        textSecondary: '#636E72', // Slate Grey
        textLight: '#B2BEC3',
        textInverse: '#FFFFFF',

        // Status
        success: '#00B894', // Mint Green
        warning: '#FDCB6E', // Sunflower
        error: '#D63031', // Bright Red
        info: '#0984E3', // Electron Blue

        // UI Elements
        border: '#DFE6E9',
        divider: '#F0F0F0',
        backdrop: 'rgba(0, 0, 0, 0.5)',
    },

    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },

    borderRadius: {
        s: 8,
        m: 12,
        l: 16,
        xl: 24,
        round: 999,
    },

    typography: {
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#2D3436',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2D3436',
        },
        h3: {
            fontSize: 20,
            fontWeight: '600',
            color: '#2D3436',
        },
        body: {
            fontSize: 16,
            color: '#636E72',
            lineHeight: 24,
        },
        caption: {
            fontSize: 14,
            color: '#B2BEC3',
        },
        button: {
            fontSize: 16,
            fontWeight: '600',
            color: '#FFFFFF',
        },
    },

    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        large: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 8,
        },
    }
};
