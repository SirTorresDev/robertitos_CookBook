import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { AppleTheme, AppleSprings } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import { RonerCategory, RonerMeatFilter } from '@/types/roner';
import { RONER_ENTRIES, ROCOOK_RULES } from '@/data/ronerData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CATEGORIES: { label: string; value: RonerCategory; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Todas', value: 'Todas', icon: 'grid-outline' },
  { label: 'Carnes', value: 'Carnes', icon: 'flame-outline' },
  { label: 'Pescado', value: 'Pescado', icon: 'fish-outline' },
  { label: 'Marisco', value: 'Marisco', icon: 'water-outline' },
  { label: 'Verduras', value: 'Verduras y Hortalizas', icon: 'leaf-outline' },
  { label: 'Legumbres', value: 'Legumbres y Cereales', icon: 'nutrition-outline' },
  { label: 'Fruta', value: 'Fruta', icon: 'nutrition-outline' },
];

interface RonerChartProps {
  onBack?: () => void;
  showHeaderBack?: boolean;
}

export function RonerChart({ onBack, showHeaderBack = false }: RonerChartProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RonerCategory>('Todas');
  const [meatFilter, setMeatFilter] = useState<RonerMeatFilter>('Todas');
  const [showRules, setShowRules] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const toggleRules = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowRules((prev) => !prev);
    AppleHaptics.selection();
  };

  const handleSelectOption = (entryName: string, temp: number, time: string) => {
    AppleHaptics.success();
    setCopiedNotification(`${entryName}: ${temp} °C · ${time}`);
    setTimeout(() => {
      setCopiedNotification(null);
    }, 2800);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todas: RONER_ENTRIES.length };
    RONER_ENTRIES.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RONER_ENTRIES.filter((entry) => {
      // Category filter
      if (selectedCategory !== 'Todas' && entry.category !== selectedCategory) {
        return false;
      }

      // Meat sub-filter
      if (selectedCategory === 'Carnes' || (selectedCategory === 'Todas' && entry.category === 'Carnes')) {
        if (meatFilter === 'Directas' && entry.mode !== 'Directa') return false;
        if (meatFilter === 'Indirectas' && entry.mode !== 'Indirecta') return false;
      }

      // Text search
      if (!q) return true;

      const inName = entry.name.toLowerCase().includes(q);
      const inCategory = entry.category.toLowerCase().includes(q);
      const inNotes = entry.notes?.toLowerCase().includes(q) ?? false;
      const inPortion = entry.portionOrWeight?.toLowerCase().includes(q) ?? false;
      const inOptions = entry.options.some(
        (opt) =>
          String(opt.temperatureC).includes(q) ||
          opt.time.toLowerCase().includes(q) ||
          (opt.notes?.toLowerCase().includes(q) ?? false)
      );

      return inName || inCategory || inNotes || inPortion || inOptions;
    });
  }, [search, selectedCategory, meatFilter]);

  return (
    <View style={styles.container}>
      {/* Header Rocook */}
      <Animated.View entering={FadeInDown.duration(380).springify()} style={styles.header}>
        {showHeaderBack && onBack && (
          <ApplePressable onPress={onBack} style={styles.backBtn} scaleTo={0.92}>
            <Ionicons name="chevron-back" size={20} color={AppleTheme.colors.textPrimary} />
            <Text style={styles.backBtnText}>Volver</Text>
          </ApplePressable>
        )}

        <View style={styles.rocookBadgeRow}>
          <View style={styles.rocookBadge}>
            <Text style={styles.rocookBadgeText}>ROCOOK BY EL CELLER DE CAN ROCA</Text>
          </View>
          <View style={styles.itemsCountBadge}>
            <Text style={styles.itemsCountBadgeText}>{RONER_ENTRIES.length} Guías</Text>
          </View>
        </View>

        <Text style={styles.title}>Tabla Roner & Baja Temp.</Text>
        <Text style={styles.subtitle}>
          Tiempos, temperaturas y técnicas de cocción al vacío calibradas por Joan Roca para resultados de tres estrellas Michelin.
        </Text>
      </Animated.View>

      {/* Banner 4 Reglas Fundamentales (Colapsable) */}
      <Animated.View entering={FadeInDown.delay(50).duration(380).springify()}>
        <ApplePressable onPress={toggleRules} scaleTo={0.99} style={styles.rulesAccordionBtn}>
          <View style={styles.rulesBtnLeft}>
            <Ionicons name="sparkles" size={17} color={AppleTheme.colors.accentWarm} />
            <View>
              <Text style={styles.rulesBtnTitle}>4 Reglas de Oro de Cocción Rocook</Text>
              <Text style={styles.rulesBtnSubtitle}>
                {showRules ? 'Toca para contraer' : '5 °C de partida, Maillard, medio líquido y opciones'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={showRules ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={AppleTheme.colors.textTertiary}
          />
        </ApplePressable>

        {showRules && (
          <View style={styles.rulesContentBox}>
            {ROCOOK_RULES.map((rule, idx) => (
              <View key={rule.id} style={[styles.ruleItem, idx > 0 && styles.ruleItemBorder]}>
                <View style={styles.ruleIconCircle}>
                  <Ionicons
                    name={rule.iconName as keyof typeof Ionicons.glyphMap}
                    size={16}
                    color={AppleTheme.colors.accentWarm}
                  />
                </View>
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleItemTitle}>{rule.title}</Text>
                  <Text style={styles.ruleItemDetail}>{rule.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Animated.View>

      {/* Buscador */}
      <Animated.View
        entering={FadeInDown.delay(90).duration(380).springify()}
        style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={18} color={AppleTheme.colors.textTertiary} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar solomillo, pulpo, bacalao, 65 °C, alcachofa..."
          placeholderTextColor={AppleTheme.colors.textTertiary}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <ApplePressable
            onPress={() => {
              AppleHaptics.light();
              setSearch('');
            }}>
            <Ionicons name="close-circle" size={18} color={AppleTheme.colors.textTertiary} />
          </ApplePressable>
        )}
      </Animated.View>

      {/* Selector de Categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}>
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.value;
          const count = categoryCounts[cat.value] || 0;
          return (
            <ApplePressable
              key={cat.value}
              scaleTo={0.95}
              onPress={() => {
                AppleHaptics.selection();
                setSelectedCategory(cat.value);
                if (cat.value !== 'Carnes') {
                  setMeatFilter('Todas');
                }
              }}
              style={[styles.categoryPill, active && styles.categoryPillActive]}>
              <Ionicons
                name={cat.icon}
                size={14}
                color={active ? '#FFFFFF' : AppleTheme.colors.textSecondary}
              />
              <Text style={[styles.categoryPillText, active && styles.categoryPillTextActive]}>
                {cat.label}
              </Text>
              <View style={[styles.countTag, active && styles.countTagActive]}>
                <Text style={[styles.countTagText, active && styles.countTagTextActive]}>
                  {count}
                </Text>
              </View>
            </ApplePressable>
          );
        })}
      </ScrollView>

      {/* Subfiltro de Carnes (Directas vs Indirectas) */}
      {(selectedCategory === 'Carnes' || (selectedCategory === 'Todas' && !search)) && (
        <View style={styles.subfilterRow}>
          {(['Todas', 'Directas', 'Indirectas'] as RonerMeatFilter[]).map((filter) => {
            const active = meatFilter === filter;
            const label =
              filter === 'Todas'
                ? 'Todas las Carnes'
                : filter === 'Directas'
                ? 'Directas (Servir)'
                : 'Indirectas (Conservar)';
            return (
              <ApplePressable
                key={filter}
                scaleTo={0.96}
                onPress={() => {
                  AppleHaptics.selection();
                  setMeatFilter(filter);
                }}
                style={[styles.subfilterPill, active && styles.subfilterPillActive]}>
                <Text style={[styles.subfilterText, active && styles.subfilterTextActive]}>
                  {label}
                </Text>
              </ApplePressable>
            );
          })}
        </View>
      )}

      {/* Notificación de Selección / Ajuste copiado */}
      {copiedNotification && (
        <Animated.View entering={FadeInDown.duration(200)} style={styles.notificationToast}>
          <Ionicons name="checkmark-circle" size={17} color={AppleTheme.colors.success} />
          <Text style={styles.notificationToastText}>
            Parámetro Roner: <Text style={{ fontWeight: '700' }}>{copiedNotification}</Text>
          </Text>
        </Animated.View>
      )}

      {/* Lista de Registros */}
      <View style={styles.list}>
        {filteredEntries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="water-outline" size={38} color={AppleTheme.colors.textTertiary} />
            <Text style={styles.emptyTitle}>Sin resultados en la tabla</Text>
            <Text style={styles.emptySubtitle}>
              {'Prueba con otro término como "pulpo", "55", "solomillo" o limpia los filtros.'}
            </Text>
          </View>
        ) : (
          filteredEntries.map((entry, index) => {
            const hasMultipleOptions = entry.options.length > 1;

            return (
              <Animated.View
                key={entry.id}
                entering={FadeInDown.delay(Math.min(index * 30, 180))
                  .duration(380)
                  .springify()}
                layout={LinearTransition.springify()
                  .damping(AppleSprings.smooth.damping!)
                  .stiffness(AppleSprings.smooth.stiffness!)}
                style={styles.card}>
                {/* Cabecera del alimento */}
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleCol}>
                    <View style={styles.badgesRow}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{entry.category}</Text>
                      </View>
                      {entry.portionOrWeight && (
                        <View style={styles.weightBadge}>
                          <Ionicons
                            name="scale-outline"
                            size={12}
                            color={AppleTheme.colors.textSecondary}
                          />
                          <Text style={styles.weightBadgeText}>{entry.portionOrWeight}</Text>
                        </View>
                      )}
                      {entry.mode && (
                        <View
                          style={[
                            styles.modeBadge,
                            entry.mode === 'Directa'
                              ? styles.modeBadgeDirecta
                              : styles.modeBadgeIndirecta,
                          ]}>
                          <Text
                            style={[
                              styles.modeBadgeText,
                              entry.mode === 'Directa'
                                ? styles.modeBadgeTextDirecta
                                : styles.modeBadgeTextIndirecta,
                            ]}>
                            {entry.mode === 'Directa'
                              ? 'Directa · Servir'
                              : 'Indirecta · Conservable'}
                          </Text>
                        </View>
                      )}
                      {entry.searRecommended && (
                        <View style={styles.searBadge}>
                          <Ionicons name="flame" size={11} color="#B34720" />
                          <Text style={styles.searBadgeText}>Marcado Maillard</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.entryName}>{entry.name}</Text>
                  </View>
                </View>

                {/* Contenedor de Opciones de Temperatura y Tiempo */}
                <View style={styles.optionsContainer}>
                  {hasMultipleOptions && (
                    <View style={styles.optionsHeaderRow}>
                      <Ionicons
                        name="git-branch-outline"
                        size={13}
                        color={AppleTheme.colors.textSecondary}
                      />
                      <Text style={styles.optionsHeaderTitle}>
                        Alternativas de cocción equivalentes:
                      </Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.optionsGrid,
                      hasMultipleOptions && styles.optionsGridMultiple,
                    ]}>
                    {entry.options.map((opt, oIdx) => {
                      const isLowTemp = opt.temperatureC < 65;
                      const isHighTemp = opt.temperatureC >= 85;

                      return (
                        <ApplePressable
                          key={oIdx}
                          scaleTo={0.97}
                          onPress={() =>
                            handleSelectOption(entry.name, opt.temperatureC, opt.time)
                          }
                          style={[
                            styles.optionCard,
                            hasMultipleOptions && styles.optionCardMultiple,
                          ]}>
                          <View style={styles.optionTopRow}>
                            {hasMultipleOptions && (
                              <Text style={styles.optionLabel}>Opción {oIdx + 1}</Text>
                            )}
                            <View
                              style={[
                                styles.tempCircle,
                                isLowTemp
                                  ? styles.tempCircleLow
                                  : isHighTemp
                                  ? styles.tempCircleHigh
                                  : styles.tempCircleMid,
                              ]}>
                              <Ionicons
                                name="thermometer-outline"
                                size={13}
                                color={
                                  isLowTemp
                                    ? '#2C7A7B'
                                    : isHighTemp
                                    ? '#C53030'
                                    : AppleTheme.colors.accentWarm
                                }
                              />
                              <Text
                                style={[
                                  styles.tempValue,
                                  isLowTemp
                                    ? styles.tempValueLow
                                    : isHighTemp
                                    ? styles.tempValueHigh
                                    : styles.tempValueMid,
                                ]}>
                                {opt.temperatureC} °C
                              </Text>
                            </View>
                          </View>

                          <View style={styles.timeRow}>
                            <Ionicons
                              name="timer-outline"
                              size={15}
                              color={AppleTheme.colors.textPrimary}
                            />
                            <Text style={styles.timeValue}>{opt.time}</Text>
                          </View>

                          {opt.notes && <Text style={styles.optionNotes}>{opt.notes}</Text>}
                        </ApplePressable>
                      );
                    })}
                  </View>
                </View>

                {/* Notas culinarias del chef */}
                {entry.notes && (
                  <View style={styles.notesBox}>
                    <Ionicons name="sparkles" size={13} color={AppleTheme.colors.accentWarm} />
                    <Text style={styles.notesText}>{entry.notes}</Text>
                  </View>
                )}
              </Animated.View>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 14,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 4,
    alignSelf: 'flex-start',
  },
  backBtnText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  rocookBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rocookBadge: {
    backgroundColor: '#FAF5EF',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: AppleTheme.radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6D7C3',
  },
  rocookBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#8D4F22',
    letterSpacing: 0.6,
  },
  itemsCountBadge: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.pill,
  },
  itemsCountBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: 14,
    color: AppleTheme.colors.textSecondary,
    marginTop: 4,
    lineHeight: 19.5,
  },
  rulesAccordionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppleTheme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: AppleTheme.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    marginBottom: 12,
    ...AppleTheme.shadow.card,
  },
  rulesBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  rulesBtnTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  rulesBtnSubtitle: {
    fontSize: 11.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 1,
  },
  rulesContentBox: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.md,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    marginBottom: 14,
    ...AppleTheme.shadow.card,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  ruleItemBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.border,
  },
  ruleIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleTextContainer: {
    flex: 1,
  },
  ruleItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    marginBottom: 2,
  },
  ruleItemDetail: {
    fontSize: 12,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 17,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.md,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    marginBottom: 12,
    ...AppleTheme.shadow.card,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: AppleTheme.colors.textPrimary,
    paddingVertical: 0,
  },
  categoriesRow: {
    gap: 8,
    paddingBottom: 10,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppleTheme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: AppleTheme.radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    gap: 6,
  },
  categoryPillActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
    borderColor: AppleTheme.colors.textPrimary,
  },
  categoryPillText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  countTag: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
  },
  countTagActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  countTagText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
  },
  countTagTextActive: {
    color: '#FFFFFF',
  },
  subfilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    marginTop: 2,
  },
  subfilterPill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
  },
  subfilterPillActive: {
    backgroundColor: '#EAE6DF',
  },
  subfilterText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  subfilterTextActive: {
    color: AppleTheme.colors.textPrimary,
    fontWeight: '700',
  },
  notificationToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EDFDF2',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#B7EBC2',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: AppleTheme.radius.md,
    marginBottom: 12,
  },
  notificationToastText: {
    fontSize: 12.5,
    color: '#1E6B37',
    flex: 1,
  },
  list: {
    gap: 12,
    marginTop: 4,
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: AppleTheme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitleCol: {
    gap: 6,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.xs,
  },
  categoryBadgeText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  weightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.xs,
  },
  weightBadgeText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  modeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.xs,
  },
  modeBadgeDirecta: {
    backgroundColor: '#FDF1EB',
  },
  modeBadgeIndirecta: {
    backgroundColor: '#EEF4FF',
  },
  modeBadgeText: {
    fontSize: 10.5,
    fontWeight: '600',
  },
  modeBadgeTextDirecta: {
    color: '#9C421C',
  },
  modeBadgeTextIndirecta: {
    color: '#2A5298',
  },
  searBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFF2EB',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.xs,
  },
  searBadgeText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#9C421C',
  },
  entryName: {
    fontSize: 17,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  optionsContainer: {
    gap: 8,
  },
  optionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  optionsHeaderTitle: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  optionsGrid: {
    flexDirection: 'column',
    gap: 8,
  },
  optionsGridMultiple: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionCard: {
    backgroundColor: AppleTheme.colors.background,
    borderRadius: AppleTheme.radius.md,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    gap: 6,
  },
  optionCardMultiple: {
    flex: 1,
    minWidth: '47%',
  },
  optionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: AppleTheme.colors.textTertiary,
    textTransform: 'uppercase',
  },
  tempCircle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.pill,
  },
  tempCircleLow: {
    backgroundColor: '#E6FFFA',
  },
  tempCircleMid: {
    backgroundColor: '#FFF4EE',
  },
  tempCircleHigh: {
    backgroundColor: '#FFF5F5',
  },
  tempValue: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  tempValueLow: {
    color: '#234E52',
  },
  tempValueMid: {
    color: '#9C421C',
  },
  tempValueHigh: {
    color: '#9B2C2C',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  optionNotes: {
    fontSize: 11,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 15,
  },
  notesBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FAF7F3',
    padding: 10,
    borderRadius: AppleTheme.radius.sm,
    marginTop: 10,
  },
  notesText: {
    fontSize: 12,
    color: '#6E5D4B',
    lineHeight: 16.5,
    flex: 1,
  },
});
