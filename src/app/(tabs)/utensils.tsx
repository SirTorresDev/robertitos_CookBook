import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { useCookBookStore } from '@/store/useCookBookStore';
import {
  KitchenUtensil,
  UtensilCategory,
  UtensilPriority,
} from '@/types/cookbook';
import { AppleTheme, AppleSprings } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';

type FilterMode = 'pending' | 'acquired' | 'all';

const PRIORITIES: UtensilPriority[] = ['Necesito', 'Capricho Chef', 'Básico'];
const CATEGORIES: Exclude<UtensilCategory, 'Todos'>[] = [
  'Precisión y Sous-Vide',
  'Molecular y Sifones',
  'Sartenes y Cocción',
  'Cuchillería y Corte',
  'Repostería y Acabado',
];

export default function UtensilsScreen() {
  const utensils = useCookBookStore((s) => s.utensils);
  const toggleUtensilAcquired = useCookBookStore((s) => s.toggleUtensilAcquired);
  const addUtensil = useCookBookStore((s) => s.addUtensil);
  const deleteUtensil = useCookBookStore((s) => s.deleteUtensil);

  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Estado formulario rápido
  const [name, setName] = useState('');
  const [usedFor, setUsedFor] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [priority, setPriority] = useState<UtensilPriority>('Necesito');
  const [category, setCategory] = useState<Exclude<UtensilCategory, 'Todos'>>(
    'Precisión y Sous-Vide'
  );

  const handleDeleteUtensil = (item: KitchenUtensil) => {
    AppleHaptics.medium();

    const doDelete = async () => {
      AppleHaptics.success();
      await deleteUtensil(item.id);
    };

    if (Platform.OS === 'web') {
      const ok =
        typeof window !== 'undefined'
          ? window.confirm(
              `¿Estás seguro de que quieres eliminar "${item.name}" de tus utensilios?`
            )
          : true;
      if (ok) void doDelete();
    } else {
      Alert.alert(
        '¿Eliminar utensilio?',
        `¿Estás seguro de que quieres borrar "${item.name}" de tus utensilios?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sí, eliminar',
            style: 'destructive',
            onPress: () => void doDelete(),
          },
        ]
      );
    }
  };

  const stats = useMemo(() => {
    const total = utensils.length;
    const owned = utensils.filter((u) => u.acquired).length;
    const pending = total - owned;
    return { total, owned, pending };
  }, [utensils]);

  const filteredUtensils = useMemo(() => {
    return utensils.filter((u) => {
      if (filterMode === 'pending') return !u.acquired;
      if (filterMode === 'acquired') return u.acquired;
      return true;
    });
  }, [utensils, filterMode]);

  const handleCreateUtensil = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    AppleHaptics.success();
    const newItem: KitchenUtensil = {
      id: `ut-${Date.now()}`,
      name: trimmed,
      category,
      priority,
      usedFor: usedFor.trim() || 'Equipamiento para mi cocina técnica',
      estimatedPrice: estimatedPrice.trim() || undefined,
      acquired: false,
      createdAt: new Date().toISOString(),
    };
    await addUtensil(newItem);
    setName('');
    setUsedFor('');
    setEstimatedPrice('');
    setShowAddForm(false);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Cabecera */}
        <Animated.View
          entering={FadeInDown.duration(400).springify()}
          style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.eyebrow}>EQUIPAMIENTO TÉCNICO</Text>
            <ApplePressable
              scaleTo={0.94}
              onPress={() => {
                AppleHaptics.selection();
                setShowAddForm((v) => !v);
              }}
              style={styles.newBtn}>
              <Ionicons
                name={showAddForm ? 'close' : 'add'}
                size={16}
                color="#FFFFFF"
              />
              <Text style={styles.newBtnText}>
                {showAddForm ? 'Cerrar' : 'Añadir Utensilio'}
              </Text>
            </ApplePressable>
          </View>

          <Text style={styles.title}>Checklist de Utensilios</Text>
          <Text style={styles.subtitle}>
            Marca lo que ya tienes en tu cocina y anota lo que necesitas o quieres comprar.
          </Text>
        </Animated.View>

        {/* Tarjeta de Resumen / Progreso */}
        <Animated.View
          entering={FadeInDown.delay(60).duration(400).springify()}
          style={styles.summaryCard}>
          <View style={styles.summaryStatsRow}>
            <View>
              <Text style={styles.summaryBigNumber}>
                {stats.owned} <Text style={styles.summarySlash}>/ {stats.total}</Text>
              </Text>
              <Text style={styles.summaryLabel}>Utensilios en mi cocina</Text>
            </View>

            <View style={styles.pendingBadge}>
              <Text style={styles.pendingBadgeText}>
                {stats.pending} por conseguir
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    stats.total > 0 ? Math.round((stats.owned / stats.total) * 100) : 0
                  }%`,
                },
              ]}
            />
          </View>
        </Animated.View>

        {/* Formulario Rápido Desplegable */}
        {showAddForm && (
          <Animated.View
            entering={FadeInDown.duration(320).springify()}
            style={styles.formCard}>
            <Text style={styles.formTitle}>Nuevo Utensilio que Quiero / Necesito</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Ej. Mandolina Japonesa Benriner, Roner, Sifón..."
              placeholderTextColor={AppleTheme.colors.textTertiary}
              style={styles.input}
            />

            <View style={styles.rowInputs}>
              <TextInput
                value={usedFor}
                onChangeText={setUsedFor}
                placeholder="¿Para qué técnica o receta?"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={[styles.input, { flex: 1 }]}
              />
              <TextInput
                value={estimatedPrice}
                onChangeText={setEstimatedPrice}
                placeholder="Precio (ej. 45€)"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={[styles.input, { width: 115 }]}
              />
            </View>

            <Text style={styles.miniLabel}>Prioridad</Text>
            <View style={styles.chipsWrap}>
              {PRIORITIES.map((p) => {
                const active = priority === p;
                return (
                  <ApplePressable
                    key={p}
                    scaleTo={0.95}
                    onPress={() => {
                      AppleHaptics.selection();
                      setPriority(p);
                    }}
                    style={[styles.chip, active && styles.chipActive]}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {p}
                    </Text>
                  </ApplePressable>
                );
              })}
            </View>

            <Text style={styles.miniLabel}>Categoría</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
              {CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <ApplePressable
                    key={c}
                    scaleTo={0.95}
                    onPress={() => {
                      AppleHaptics.selection();
                      setCategory(c);
                    }}
                    style={[styles.chip, active && styles.chipActive]}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {c}
                    </Text>
                  </ApplePressable>
                );
              })}
            </ScrollView>

            <ApplePressable
              scaleTo={0.97}
              onPress={handleCreateUtensil}
              style={styles.saveBtn}>
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              <Text style={styles.saveBtnText}>Guardar en mi Checklist</Text>
            </ApplePressable>
          </Animated.View>
        )}

        {/* Selector Segmentado Estilo iOS */}
        <View style={styles.segmentedControl}>
          {(
            [
              { key: 'all', label: `Todos (${stats.total})` },
              { key: 'pending', label: `Necesito (${stats.pending})` },
              { key: 'acquired', label: `Ya tengo (${stats.owned})` },
            ] as const
          ).map((seg) => {
            const active = filterMode === seg.key;
            return (
              <ApplePressable
                key={seg.key}
                scaleTo={0.97}
                onPress={() => {
                  AppleHaptics.selection();
                  setFilterMode(seg.key);
                }}
                style={[styles.segmentBtn, active && styles.segmentBtnActive]}>
                <Text
                  style={[
                    styles.segmentBtnText,
                    active && styles.segmentBtnTextActive,
                  ]}>
                  {seg.label}
                </Text>
              </ApplePressable>
            );
          })}
        </View>

        {/* Lista Interactiva de Utensilios */}
        <View style={styles.list}>
          {filteredUtensils.map((item, idx) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(Math.min(idx * 40, 240))
                .duration(380)
                .springify()}
              layout={LinearTransition.springify()
                .damping(AppleSprings.smooth.damping!)
                .stiffness(AppleSprings.smooth.stiffness!)}>
              <View
                style={[styles.itemCard, item.acquired && styles.itemCardOwned]}>
                <ApplePressable
                  scaleTo={0.985}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: item.acquired }}
                  accessibilityLabel={`${item.name}, ${item.acquired ? 'adquirido' : 'pendiente'}`}
                  onPress={() => {
                    AppleHaptics.medium();
                    toggleUtensilAcquired(item.id);
                  }}
                  style={styles.itemMainTouchArea}>
                  <View style={styles.checkCol}>
                    <Ionicons
                      name={item.acquired ? 'checkmark-circle' : 'ellipse-outline'}
                      size={26}
                      color={
                        item.acquired
                          ? AppleTheme.colors.success
                          : AppleTheme.colors.textTertiary
                      }
                    />
                  </View>

                  <View style={styles.itemBody}>
                    <View style={styles.itemMetaRow}>
                      <View
                        style={[
                          styles.priorityPill,
                          item.priority === 'Necesito' && styles.priorityNeed,
                          item.priority === 'Capricho Chef' && styles.priorityWish,
                        ]}>
                        <Text
                          style={[
                            styles.priorityText,
                            item.priority === 'Necesito' && {
                              color: AppleTheme.colors.accentWarm,
                            },
                          ]}>
                          {item.acquired ? 'En mi cocina' : item.priority}
                        </Text>
                      </View>

                      <Text style={styles.categoryText}>{item.category}</Text>
                      {item.estimatedPrice && (
                        <Text style={styles.priceText}>{item.estimatedPrice}</Text>
                      )}
                    </View>

                    <Text
                      style={[
                        styles.itemTitle,
                        item.acquired && styles.itemTitleOwned,
                      ]}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemUsedFor}>{item.usedFor}</Text>
                  </View>
                </ApplePressable>

                <ApplePressable
                  scaleTo={0.88}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel={`Eliminar ${item.name}`}
                  onPress={() => handleDeleteUtensil(item)}
                  style={styles.deleteBtn}>
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={AppleTheme.colors.danger}
                  />
                </ApplePressable>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
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
  header: {
    marginBottom: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.8,
  },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppleTheme.colors.textPrimary,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: AppleTheme.radius.pill,
  },
  newBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '600',
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
  summaryCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    padding: 18,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  summaryStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  summaryBigNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.6,
  },
  summarySlash: {
    fontSize: 18,
    fontWeight: '500',
    color: AppleTheme.colors.textTertiary,
  },
  summaryLabel: {
    fontSize: 13,
    color: AppleTheme.colors.textSecondary,
    marginTop: 2,
  },
  pendingBadge: {
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
  },
  pendingBadgeText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: AppleTheme.colors.pillBg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppleTheme.colors.textPrimary,
    borderRadius: 4,
  },
  formCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    padding: 18,
    marginBottom: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
    gap: 10,
    ...AppleTheme.shadow.card,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    marginBottom: 2,
  },
  input: {
    backgroundColor: AppleTheme.colors.background,
    borderRadius: AppleTheme.radius.sm,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14.5,
    color: AppleTheme.colors.textPrimary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    minWidth: 0,
    maxWidth: '100%',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    minWidth: 0,
  },
  miniLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
    marginTop: 4,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.pillBg,
  },
  chipActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  saveBtn: {
    marginTop: 6,
    backgroundColor: AppleTheme.colors.textPrimary,
    height: 46,
    borderRadius: AppleTheme.radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: AppleTheme.colors.pillBg,
    borderRadius: AppleTheme.radius.sm,
    padding: 3,
    marginBottom: 16,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: AppleTheme.colors.surface,
    ...AppleTheme.shadow.card,
  },
  segmentBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  segmentBtnTextActive: {
    color: AppleTheme.colors.textPrimary,
    fontWeight: '700',
  },
  list: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  itemMainTouchArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemCardOwned: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
  },
  checkCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBody: {
    flex: 1,
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 4,
  },
  priorityPill: {
    backgroundColor: AppleTheme.colors.pillBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: AppleTheme.radius.xs,
  },
  priorityNeed: {
    backgroundColor: AppleTheme.colors.accentWarmSoft,
  },
  priorityWish: {
    backgroundColor: AppleTheme.colors.warningSoft,
  },
  priorityText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
  },
  categoryText: {
    fontSize: 11.5,
    color: AppleTheme.colors.textTertiary,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  itemTitleOwned: {
    textDecorationLine: 'line-through',
    color: AppleTheme.colors.textTertiary,
  },
  itemUsedFor: {
    fontSize: 13,
    color: AppleTheme.colors.textSecondary,
    marginTop: 3,
    lineHeight: 18,
  },
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(210, 65, 47, 0.15)',
    marginLeft: 4,
  },
});
