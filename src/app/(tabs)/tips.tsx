import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { useCookBookStore } from '@/store/useCookBookStore';
import { TipCategory } from '@/types/cookbook';
import { AppleTheme, AppleSprings } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import { RonerChart } from '@/components/RonerChart';

const TIP_CATEGORIES: TipCategory[] = [
  'Todos',
  'Física Culinaria',
  'Técnicas Clásicas',
  'Sous-Vide / Roner',
  'Cocina Molecular',
  'Seguridad e Higiene',
];

export default function TipsScreen() {
  const params = useLocalSearchParams<{ view?: string }>();
  const tips = useCookBookStore((s) => s.tips);

  const [activeTab, setActiveTab] = useState<'fundamentos' | 'roner'>(
    params.view === 'roner' ? 'roner' : 'fundamentos'
  );
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TipCategory>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(tips[0]?.id || null);

  useEffect(() => {
    if (params.view === 'roner') {
      setActiveTab('roner');
    }
  }, [params.view]);

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
        {/* Selector de Pestañas Apple */}
        <Animated.View
          entering={FadeInDown.duration(380).springify()}
          style={styles.segmentContainer}>
          <ApplePressable
            scaleTo={0.97}
            onPress={() => {
              AppleHaptics.selection();
              setActiveTab('fundamentos');
            }}
            style={[
              styles.segmentBtn,
              activeTab === 'fundamentos' && styles.segmentBtnActive,
            ]}>
            <Ionicons
              name="book-outline"
              size={15}
              color={
                activeTab === 'fundamentos'
                  ? AppleTheme.colors.textPrimary
                  : AppleTheme.colors.textSecondary
              }
            />
            <Text
              style={[
                styles.segmentText,
                activeTab === 'fundamentos' && styles.segmentTextActive,
              ]}>
              Fundamentos
            </Text>
          </ApplePressable>

          <ApplePressable
            scaleTo={0.97}
            onPress={() => {
              AppleHaptics.selection();
              setActiveTab('roner');
            }}
            style={[
              styles.segmentBtn,
              activeTab === 'roner' && styles.segmentBtnActive,
            ]}>
            <Ionicons
              name="flame"
              size={15}
              color={
                activeTab === 'roner'
                  ? AppleTheme.colors.accentWarm
                  : AppleTheme.colors.textSecondary
              }
            />
            <Text
              style={[
                styles.segmentText,
                activeTab === 'roner' && styles.segmentTextActive,
              ]}>
              Tabla Roner Rocook
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
        </Animated.View>

        {/* Vista Alternada: Roner vs Fundamentos */}
        {activeTab === 'roner' ? (
          <RonerChart />
        ) : (
          <View>
            <Animated.View
              entering={FadeInDown.duration(400).springify()}
              style={styles.header}>
              <Text style={styles.eyebrow}>MANUAL TÉCNICO DE COCINA</Text>
              <Text style={styles.title}>Fundamentos & Texturas</Text>
              <Text style={styles.subtitle}>
                Física culinaria, reacción de Maillard, baja temperatura e hidrocoloides.
              </Text>
            </Animated.View>

            {/* Banner invitación a la tabla Rocook */}
            <ApplePressable
              scaleTo={0.98}
              onPress={() => {
                AppleHaptics.selection();
                setActiveTab('roner');
              }}
              style={styles.ronerCallout}>
              <View style={styles.ronerCalloutIcon}>
                <Ionicons name="flame" size={16} color={AppleTheme.colors.accentWarm} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.ronerCalloutTitle}>
                  ¿Buscas tiempos y temperaturas exactos de Roner?
                </Text>
                <Text style={styles.ronerCalloutSubtitle}>
                  Accede a la Tabla Rocook de El Celler de Can Roca con 99 alimentos calibrados.
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={AppleTheme.colors.textTertiary}
              />
            </ApplePressable>

            {/* Buscador */}
            <Animated.View
              entering={FadeInDown.delay(60).duration(400).springify()}
              style={styles.searchWrapper}>
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
            </Animated.View>

            {/* Categorías */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}>
              {TIP_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <ApplePressable
                    key={cat}
                    scaleTo={0.95}
                    onPress={() => {
                      AppleHaptics.selection();
                      setSelectedCategory(cat);
                    }}
                    style={[styles.categoryPill, active && styles.categoryPillActive]}>
                    <Text
                      style={[
                        styles.categoryPillText,
                        active && styles.categoryPillTextActive,
                      ]}>
                      {cat}
                    </Text>
                  </ApplePressable>
                );
              })}
            </ScrollView>

            {/* Tarjetas Desplegables con Animación Spring */}
            <View style={styles.list}>
              {filteredTips.map((tip, index) => {
                const expanded = expandedId === tip.id;

                return (
                  <Animated.View
                    key={tip.id}
                    entering={FadeInDown.delay(Math.min(index * 45, 240))
                      .duration(400)
                      .springify()}
                    layout={LinearTransition.springify()
                      .damping(AppleSprings.smooth.damping!)
                      .stiffness(AppleSprings.smooth.stiffness!)}>
                    <ApplePressable
                      scaleTo={0.985}
                      onPress={() => {
                        AppleHaptics.selection();
                        setExpandedId(expanded ? null : tip.id);
                      }}
                      style={styles.card}>
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
                              <Text style={styles.tempBadgeText}>{tip.temperatureBadge}</Text>
                            </View>
                          )}
                          <Ionicons
                            name={expanded ? 'chevron-up' : 'chevron-down'}
                            size={18}
                            color={AppleTheme.colors.textTertiary}
                          />
                        </View>
                      </View>

                      <Text style={styles.cardTitle}>{tip.title}</Text>
                      <Text style={styles.cardSummary}>{tip.summary}</Text>

                      {expanded && (
                        <View style={styles.expandedContent}>
                          <View style={styles.rulesBox}>
                            {tip.keyRules.map((rule, rIdx) => (
                              <View key={rIdx} style={styles.ruleRow}>
                                <View style={styles.ruleBullet} />
                                <Text style={styles.ruleText}>{rule}</Text>
                              </View>
                            ))}
                          </View>

                          {tip.warning && (
                            <View style={styles.warningBox}>
                              <Ionicons
                                name="warning-outline"
                                size={17}
                                color={AppleTheme.colors.danger}
                              />
                              <Text style={styles.warningText}>{tip.warning}</Text>
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
                  </Animated.View>
                );
              })}
            </View>
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
    paddingBottom: 42,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderRadius: AppleTheme.radius.pill,
    padding: 3,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: AppleTheme.radius.pill,
  },
  segmentBtnActive: {
    backgroundColor: AppleTheme.colors.surface,
    ...AppleTheme.shadow.card,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  segmentTextActive: {
    color: AppleTheme.colors.textPrimary,
    fontWeight: '700',
  },
  segmentTag: {
    backgroundColor: '#FAF5EF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6D7C3',
  },
  segmentTagActive: {
    backgroundColor: '#FAF0E6',
  },
  segmentTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8D4F22',
  },
  segmentTagTextActive: {
    color: AppleTheme.colors.accentWarm,
  },
  header: {
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 14.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  ronerCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FAF5EF',
    padding: 12,
    borderRadius: AppleTheme.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6D7C3',
    marginBottom: 14,
  },
  ronerCalloutIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ronerCalloutTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#8D4F22',
  },
  ronerCalloutSubtitle: {
    fontSize: 11.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 1,
    lineHeight: 15,
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
    fontSize: 14.5,
    color: AppleTheme.colors.textPrimary,
    paddingVertical: 0,
  },
  categoriesRow: {
    gap: 8,
    paddingBottom: 12,
  },
  categoryPill: {
    paddingHorizontal: 14,
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
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: 12,
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
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badgesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.pill,
  },
  tempBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 4,
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
    borderTopColor: AppleTheme.colors.border,
    gap: 12,
  },
  rulesBox: {
    gap: 8,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },
  ruleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppleTheme.colors.textPrimary,
    marginTop: 7,
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
    gap: 8,
    backgroundColor: '#FFF2F1',
    padding: 12,
    borderRadius: AppleTheme.radius.sm,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: AppleTheme.colors.danger,
    lineHeight: 18,
  },
  secretBox: {
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    padding: 13,
    borderRadius: AppleTheme.radius.sm,
  },
  secretHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  secretLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.6,
  },
  secretText: {
    fontSize: 13.5,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 19,
  },
});
