import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCookBookStore } from '@/store/useCookBookStore';
import { TipCategory } from '@/types/cookbook';
import { AppleTheme } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import { RonerChart } from '@/components/RonerChart';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TIP_CATEGORIES: { label: TipCategory; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Todos', icon: 'apps-outline' },
  { label: 'Física Culinaria', icon: 'flame-outline' },
  { label: 'Técnicas Clásicas', icon: 'restaurant-outline' },
  { label: 'Sous-Vide / Roner', icon: 'thermometer-outline' },
  { label: 'Cocina Molecular', icon: 'flask-outline' },
  { label: 'Seguridad e Higiene', icon: 'shield-checkmark-outline' },
];

export default function TipsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ view?: string; t?: string }>();
  const tips = useCookBookStore((s) => s.tips);

  const [activeTab, setActiveTab] = useState<'fundamentos' | 'roner'>(
    params.view === 'roner' ? 'roner' : 'fundamentos'
  );
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TipCategory>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(tips[0]?.id || null);
  const didInitExpanded = useRef(false);

  useEffect(() => {
    if (!didInitExpanded.current && tips.length > 0) {
      didInitExpanded.current = true;
      setExpandedId((prev) => prev ?? tips[0].id);
    }
  }, [tips]);

  useEffect(() => {
    if (params.view === 'roner') {
      setActiveTab('roner');
    } else if (params.view === 'fundamentos') {
      setActiveTab('fundamentos');
    }
  }, [params.view, params.t]);

  const handleSwitchTab = (tab: 'fundamentos' | 'roner') => {
    AppleHaptics.selection();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTab(tab);
    router.setParams({ view: tab });
  };

  const handleToggleTip = (id: string) => {
    AppleHaptics.selection();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: tips.length };
    tips.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [tips]);

  const filteredTips = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tips.filter((t) => {
      if (selectedCategory !== 'Todos' && t.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.proSecret.toLowerCase().includes(q) ||
        t.keyRules.some((r) => r.toLowerCase().includes(q))
      );
    });
  }, [tips, search, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Selector de Pestañas Editorial */}
        <View style={styles.segmentContainer}>
          <ApplePressable
            scaleTo={0.97}
            onPress={() => handleSwitchTab('fundamentos')}
            style={[
              styles.segmentBtn,
              activeTab === 'fundamentos' && styles.segmentBtnActive,
            ]}>
            <View style={styles.segmentIconWrap}>
              <Ionicons
                name="book-outline"
                size={15}
                color={
                  activeTab === 'fundamentos'
                    ? AppleTheme.colors.textPrimary
                    : AppleTheme.colors.textSecondary
                }
              />
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.segmentText,
                activeTab === 'fundamentos' && styles.segmentTextActive,
              ]}>
              Fundamentos
            </Text>
            <View
              style={[
                styles.segmentTag,
                activeTab === 'fundamentos' && styles.segmentTagActive,
              ]}>
              <Text
                style={[
                  styles.segmentTagText,
                  activeTab === 'fundamentos' && styles.segmentTagTextActive,
                ]}>
                {tips.length}
              </Text>
            </View>
          </ApplePressable>

          <ApplePressable
            scaleTo={0.97}
            onPress={() => handleSwitchTab('roner')}
            style={[
              styles.segmentBtn,
              activeTab === 'roner' && styles.segmentBtnActive,
            ]}>
            <View style={styles.segmentIconWrap}>
              <Ionicons
                name="flame"
                size={15}
                color={
                  activeTab === 'roner'
                    ? AppleTheme.colors.accentWarm
                    : AppleTheme.colors.textSecondary
                }
              />
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.segmentText,
                activeTab === 'roner' && styles.segmentTextActive,
              ]}>
              Tabla Roner
            </Text>
            <View
              style={[
                styles.segmentTag,
                activeTab === 'roner' && styles.segmentTagActive,
              ]}>
              <Text
                style={[
                  styles.segmentTagText,
                  activeTab === 'roner' && styles.segmentTagTextActive,
                ]}>
                99
              </Text>
            </View>
          </ApplePressable>
        </View>

        {/* Vista Alternada: Roner vs Fundamentos */}
        {activeTab === 'roner' ? (
          <RonerChart />
        ) : (
          <View>
            {/* Cabecera Editorial Culinaria */}
            <View style={styles.header}>
              <View style={styles.eyebrowRow}>
                <Text style={styles.eyebrow}>ENCICLOPEDIA TÉCNICA DE COCINA</Text>
                <View style={styles.eyebrowPill}>
                  <Text style={styles.eyebrowPillText}>{filteredTips.length} principios</Text>
                </View>
              </View>
              <Text style={styles.title}>Fundamentos & Texturas</Text>
              <Text style={styles.subtitle}>
                Física culinaria, reacción de Maillard, baja temperatura, emulsiones e hidrocoloides explicados con rigor.
              </Text>
            </View>

            {/* Acceso Directo Minimalista a la Tabla Maestra */}
            <ApplePressable
              scaleTo={0.985}
              onPress={() => handleSwitchTab('roner')}
              style={styles.ronerCallout}>
              <View style={styles.ronerCalloutIcon}>
                <Ionicons name="flame" size={18} color={AppleTheme.colors.accentWarm} />
              </View>
              <View style={styles.ronerCalloutBody}>
                <Text style={styles.ronerCalloutTitle}>
                  Tabla Maestra de Tiempos y Cocciones
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={AppleTheme.colors.accentWarm}
              />
            </ApplePressable>

            {/* Buscador */}
            <View style={styles.searchWrapper}>
              <Ionicons
                name="search-outline"
                size={18}
                color={AppleTheme.colors.textTertiary}
              />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar Maillard, alginato, botulismo, 65 °C..."
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.searchInput}
              />
              {search.length > 0 && (
                <ApplePressable
                  onPress={() => {
                    AppleHaptics.light();
                    setSearch('');
                  }}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={AppleTheme.colors.textTertiary}
                  />
                </ApplePressable>
              )}
            </View>

            {/* Categorías con Contador */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}>
              {TIP_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.label;
                const count = categoryCounts[cat.label] || 0;
                return (
                  <ApplePressable
                    key={cat.label}
                    scaleTo={0.95}
                    onPress={() => {
                      AppleHaptics.selection();
                      setSelectedCategory(cat.label);
                    }}
                    style={[styles.categoryPill, active && styles.categoryPillActive]}>
                    <Ionicons
                      name={cat.icon}
                      size={14}
                      color={active ? '#FFFFFF' : AppleTheme.colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.categoryPillText,
                        active && styles.categoryPillTextActive,
                      ]}>
                      {cat.label}
                    </Text>
                    <View style={[styles.catCountBadge, active && styles.catCountBadgeActive]}>
                      <Text
                        style={[
                          styles.catCountText,
                          active && styles.catCountTextActive,
                        ]}>
                        {count}
                      </Text>
                    </View>
                  </ApplePressable>
                );
              })}
            </ScrollView>

            {/* Lista de Tarjetas Desplegables */}
            {filteredTips.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons
                  name="book-outline"
                  size={36}
                  color={AppleTheme.colors.textTertiary}
                />
                <Text style={styles.emptyStateTitle}>No se encontraron fundamentos</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Prueba con otro término técnico o selecciona la categoría «Todos».
                </Text>
              </View>
            ) : (
              <View style={styles.list}>
                {filteredTips.map((tip) => {
                  const expanded = expandedId === tip.id;

                  return (
                    <ApplePressable
                      key={tip.id}
                      scaleTo={0.99}
                      onPress={() => handleToggleTip(tip.id)}
                      style={[styles.card, expanded && styles.cardExpanded]}>
                      <View style={styles.cardTopRow}>
                        <View style={styles.badgesGroup}>
                          <View style={styles.codePill}>
                            <Text style={styles.codeText}>§ {tip.code}</Text>
                          </View>
                          <Text style={styles.categoryLabel}>{tip.category}</Text>
                        </View>

                        <View style={styles.rightTopGroup}>
                          {tip.temperatureBadge && (
                            <View style={styles.tempBadge}>
                              <Ionicons
                                name="thermometer-outline"
                                size={12}
                                color={AppleTheme.colors.accentWarm}
                              />
                              <Text style={styles.tempBadgeText}>{tip.temperatureBadge}</Text>
                            </View>
                          )}
                          <View
                            style={[
                              styles.chevronCircle,
                              expanded && styles.chevronCircleExpanded,
                            ]}>
                            <Ionicons
                              name={expanded ? 'chevron-up' : 'chevron-down'}
                              size={16}
                              color={
                                expanded
                                  ? '#FFFFFF'
                                  : AppleTheme.colors.textSecondary
                              }
                            />
                          </View>
                        </View>
                      </View>

                      <Text style={styles.cardTitle}>{tip.title}</Text>
                      <Text style={styles.cardSummary}>{tip.summary}</Text>

                      {expanded && (
                        <View style={styles.expandedContent}>
                          <View style={styles.rulesBox}>
                            <Text style={styles.rulesHeading}>PRINCIPIOS CLAVE</Text>
                            {tip.keyRules.map((rule, rIdx) => (
                              <View key={rIdx} style={styles.ruleRow}>
                                <View style={styles.ruleNumberBadge}>
                                  <Text style={styles.ruleNumberText}>{rIdx + 1}</Text>
                                </View>
                                <Text style={styles.ruleText}>{rule}</Text>
                              </View>
                            ))}
                          </View>

                          {tip.warning && (
                            <View style={styles.warningBox}>
                              <Ionicons
                                name="warning-outline"
                                size={18}
                                color={AppleTheme.colors.danger}
                              />
                              <View style={{ flex: 1 }}>
                                <Text style={styles.warningLabel}>PUNTO CRÍTICO DE SEGURIDAD</Text>
                                <Text style={styles.warningText}>{tip.warning}</Text>
                              </View>
                            </View>
                          )}

                          <View style={styles.secretBox}>
                            <View style={styles.secretHeader}>
                              <Ionicons
                                name="sparkles"
                                size={14}
                                color={AppleTheme.colors.accentWarm}
                              />
                              <Text style={styles.secretLabel}>MATIZ TÉCNICO DE ROBERTO</Text>
                            </View>
                            <Text style={styles.secretText}>{tip.proSecret}</Text>
                          </View>
                        </View>
                      )}
                    </ApplePressable>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppleTheme.colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 48,
  },
  segmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderRadius: AppleTheme.radius.pill,
    padding: 4,
    marginBottom: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 42,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: AppleTheme.radius.pill,
  },
  segmentBtnActive: {
    backgroundColor: AppleTheme.colors.surface,
    ...AppleTheme.shadow.card,
  },
  segmentIconWrap: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
    textAlign: 'center',
  },
  segmentTextActive: {
    color: AppleTheme.colors.textPrimary,
    fontWeight: '700',
  },
  segmentTag: {
    backgroundColor: '#FAF5EF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6D7C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentTagActive: {
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    borderColor: 'rgba(196, 83, 43, 0.25)',
  },
  segmentTagText: {
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: '700',
    color: '#8D4F22',
    textAlign: 'center',
  },
  segmentTagTextActive: {
    color: AppleTheme.colors.accentWarm,
  },
  header: {
    marginBottom: 16,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.9,
  },
  eyebrowPill: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.pill,
  },
  eyebrowPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  title: {
    fontFamily: AppleTheme.fonts.displayBold,
    fontSize: 31,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 5,
    lineHeight: 20,
  },
  ronerCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: AppleTheme.colors.surface,
    padding: 14,
    borderRadius: AppleTheme.radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
    marginBottom: 14,
    ...AppleTheme.shadow.card,
  },
  ronerCalloutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ronerCalloutBody: {
    flex: 1,
    minWidth: 0,
  },
  ronerCalloutBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  ronerCalloutEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.6,
  },
  ronerCalloutPill: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 8,
  },
  ronerCalloutPillText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
  },
  ronerCalloutTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  ronerCalloutSubtitle: {
    fontSize: 12,
    color: AppleTheme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.md,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    marginBottom: 12,
    ...AppleTheme.shadow.card,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 14.5,
    color: AppleTheme.colors.textPrimary,
    paddingVertical: 0,
  },
  categoriesRow: {
    gap: 8,
    paddingBottom: 14,
    alignItems: 'center',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  categoryPillActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
    borderColor: AppleTheme.colors.textPrimary,
  },
  categoryPillText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  catCountBadge: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catCountBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  catCountText: {
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
  },
  catCountTextActive: {
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 44,
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: AppleTheme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  list: {
    gap: 14,
    marginTop: 2,
  },
  card: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  cardExpanded: {
    borderColor: AppleTheme.colors.borderStrong,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 8,
  },
  badgesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  codePill: {
    backgroundColor: AppleTheme.colors.pillBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.xs,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  rightTopGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tempBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: AppleTheme.radius.pill,
  },
  tempBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronCircleExpanded: {
    backgroundColor: AppleTheme.colors.textPrimary,
  },
  cardTitle: {
    fontFamily: AppleTheme.fonts.display,
    fontSize: 19,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 5,
  },
  cardSummary: {
    fontSize: 14,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.borderStrong,
    gap: 12,
  },
  rulesBox: {
    gap: 10,
  },
  rulesHeading: {
    fontSize: 10.5,
    fontWeight: '800',
    color: AppleTheme.colors.textTertiary,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  ruleNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  ruleNumberText: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FCEDEA',
    padding: 13,
    borderRadius: AppleTheme.radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(210, 65, 47, 0.25)',
  },
  warningLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: AppleTheme.colors.danger,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppleTheme.colors.danger,
    lineHeight: 18,
  },
  secretBox: {
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    padding: 14,
    borderRadius: AppleTheme.radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(196, 83, 43, 0.2)',
  },
  secretHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  secretLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.6,
  },
  secretText: {
    fontSize: 13.5,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 19.5,
  },
});

