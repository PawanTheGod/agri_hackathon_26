import { Platform } from 'react-native';

export const COLORS = {
  background:   '#F4F7FC',     // Clean light-blue/gray background
  surface:      '#FFFFFF',     // Pure white card surfaces
  surfaceLight: '#F8FAFC',     // Slight off-white for layer distinction
  primary:      '#0B8A44',     // Deep professional green
  primaryLight: '#18B35A',     // Brighter green gradient
  primaryPale:  '#E2FBE9',     // Very faint green for icon backgrounds
  secondary:    '#6366F1',     // Professional Indigo
  text:         '#1E293B',     // Deep slate black text
  textSecondary:'#64748B',     // Muted gray text
  textMuted:    '#94A3B8',     // Very faint text
  success:      '#10B981',
  warning:      '#F59E0B',
  danger:       '#EF4444',
  divider:      '#E2E8F0',     // Light border lines
  border:       '#CBD5E1',     // Stronger borders for inputs
  glass:        'rgba(255, 255, 255, 0.7)',
  glassBorder:  'rgba(0, 0, 0, 0.05)',

  // NodeCard legacy aliases
  accent:       '#10B981',
  error:        '#EF4444',
  ledOff:       '#CBD5E1',
};

export const RADIUS = {
  sm: 8,      // sensor chips only
  md: 12,     // inner elements
  lg: 16,     // standard cards ← default for everything
  xl: 20,     // hero cards
  pill: 100,  // badges, tags
};

export const SPACING = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48
};

export const TEXT_STYLES = {
  h1: { fontFamily: 'Outfit-Bold',      fontSize: 28, lineHeight: 34 },
  h2: { fontFamily: 'Outfit-Bold',      fontSize: 22, lineHeight: 28 },
  h3: { fontFamily: 'Outfit-SemiBold',  fontSize: 18, lineHeight: 24 },
  h4: { fontFamily: 'Outfit-SemiBold',  fontSize: 15, lineHeight: 21 },
  body: { fontFamily: 'Inter-Regular',  fontSize: 14, lineHeight: 22 },
  small:{ fontFamily: 'Inter-Regular',  fontSize: 12, lineHeight: 18 },
  data: { fontFamily: 'JetBrainsMono-Regular', fontSize: 13, lineHeight: 18 },
};

export const SHADOWS = {
  sm: { shadowColor:'#000', shadowOffset:{width:0,height:1},
        shadowOpacity:0.06, shadowRadius:4,  elevation:2 },
  md: { shadowColor:'#000', shadowOffset:{width:0,height:4},
        shadowOpacity:0.09, shadowRadius:12, elevation:5 },
  lg: { shadowColor:'#000', shadowOffset:{width:0,height:8},
        shadowOpacity:0.12, shadowRadius:20, elevation:10 },
};

export const CARD = {
  backgroundColor: '#FFFFFF',
  borderRadius: RADIUS.lg,
  padding: SPACING.xl,
  ...SHADOWS.md,
  // NO borderWidth, NO borderColor — shadows do the job
};

export const GAPS = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONTS = {
  mono: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
};
