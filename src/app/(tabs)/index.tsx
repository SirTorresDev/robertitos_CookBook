import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { useCookBookStore } from '@/store/useCookBookStore';
import { RecipeCategory } from '@/types/cookbook';
import { AppleTheme, AppleSprings } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';

const CATEGORIES: RecipeCategory[] = [
  'Todos',
  'Pescados y Mariscos',
  'Carnes y Sous-Vide',
  'Arroces y Cremas',
  'Tapas y Croquetas',
  'Molecular y Espumas',
  'Postres y Dulces',
];

export default function RecipesScreen() {
  const router = useRouter();
  const recipes = useCookBookStore((s) => s.recipes);
  const toggleFavoriteRecipe = useCookBookStore((s) => s.toggleFavoriteRecipe);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('Todos');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredRecipes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return recipes.filter((r) => {
      if (onlyFavorites && !r.isFavorite) return false;
      if (selectedCategory !== 'Todos' && r.category !== selectedCategory) return false;
      if (!q) return true;
      const inTitle = r.title.toLowerCase().includes(q);
      const inSub = r.subtitle.toLowerCase().includes(q);
      const inNote = r.chefNote.toLowerCase().includes(q);
      const inIng = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
      return inTitle || inSub || inNote || inIng;
    });
  }, [recipes, search, selectedCategory, onlyFavorites]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Cabecera Minimalista Estilo Apple */}
        <Animated.View
          entering={FadeInDown.duration(420).springify()}
          style={styles.header}>
          <View style={styles.headerTopRow}>
            <ApplePressable
              scaleTo={0.94}
              onPress={() => {
                AppleHaptics.selection();
                setOnlyFavorites((v) => !v);
              }}
              style={[
                styles.favFilterBtn,
                onlyFavorites && styles.favFilterBtnActive,
              ]}>
              <Ionicons
                name={onlyFavorites ? 'heart' : 'heart-outline'}
                size={15}
                color={onlyFavorites ? '#FFFFFF' : AppleTheme.colors.textPrimary}
              />
              <Text
                style={[
                  styles.favFilterText,
                  onlyFavorites && styles.favFilterTextActive,
                ]}>
                Favoritas
              </Text>
            </ApplePressable>
          </View>

          <Text style={styles.brandTitle}>Robertito´s CookBook</Text>
          <Text style={styles.brandSubtitle}>
            Fundamentos, texturas, tiempos de precisión y recetario de autor.
          </Text>
        </Animated.View>

        {/* Buscador iOS */}
        <Animated.View
          entering={FadeInDown.delay(60).duration(420).springify()}
          style={styles.searchWrapper}>
          <Ionicons
            name="search-outline"
            size={18}
            color={AppleTheme.colors.textTertiary}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar plato, ingrediente, Roner, sifón..."
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

        {/* Categorías Deslizables */}
        <Animated.View entering={FadeInDown.delay(110).duration(420).springify()}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}>
            {CATEGORIES.map((cat) => {
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
        </Animated.View>

        {/* Banner Acceso Directo Tabla Roner Rocook */}
        <Animated.View entering={FadeInDown.delay(120).duration(420).springify()}>
          <ApplePressable
            scaleTo={0.98}
            onPress={() => {
              AppleHaptics.selection();
              router.push({ pathname: '/(tabs)/tips', params: { view: 'roner' } });
            }}
            style={styles.ronerBannerCard}>
            <View style={styles.ronerBannerLeft}>
              <View style={styles.ronerBannerIconCircle}>
                <Ionicons name="water" size={17} color={AppleTheme.colors.accentWarm} />
              </View>
              <View style={styles.ronerBannerTextContainer}>
                <View style={styles.ronerBannerEyebrowRow}>
                  <Text style={styles.ronerBannerEyebrow}>ROCOOK · CAN ROCA</Text>
                  <View style={styles.ronerBannerPill}>
                    <Text style={styles.ronerBannerPillText}>99 Alimentos</Text>
                  </View>
                </View>
                <Text style={styles.ronerBannerTitle}>Tabla de Tiempo y Temperatura</Text>
                <Text style={styles.ronerBannerDesc}>
                  Carnes directas/indirectas, pescado, marisco, verduras y frutas al vacío.
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={17} color={AppleTheme.colors.textTertiary} />
          </ApplePressable>
        </Animated.View>

        {/* Contador Sutil */}
        <View style={styles.sectionMetaRow}>
          <Text style={styles.sectionCount}>
            {filteredRecipes.length}{' '}
            {filteredRecipes.length === 1 ? 'receta técnica' : 'recetas técnicas'}
          </Text>
          <Text style={styles.sectionHint}>Toca para escalar y abrir timers</Text>
        </View>

        {/* Lista de Recetas con Transiciones Spring */}
        <View style={styles.cardsList}>
          {filteredRecipes.map((recipe, idx) => {
            const timersCount = recipe.steps.filter((s) => (s.timerSeconds ?? 0) > 0).length;

            return (
              <Animated.View
                key={recipe.id}
                entering={FadeInDown.delay(Math.min(idx * 45, 260))
                  .duration(420)
                  .springify()}
                layout={LinearTransition.springify()
                  .damping(AppleSprings.smooth.damping!)
                  .stiffness(AppleSprings.smooth.stiffness!)}>
                <ApplePressable
                  scaleTo={0.98}
                  onPress={() => {
                    AppleHaptics.light();
                    router.push(`/recipe/${recipe.id}`);
                  }}
                  style={styles.card}>
                  <View style={styles.cardImageContainer}>
                    <Image
                      source={{ uri: recipe.imageUrl }}
                      style={styles.cardImage}
                      contentFit="cover"
                      transition={300}
                    />
                    <View style={styles.imageTopBadges}>
                      {recipe.code ? (
                        <View style={styles.codeBadge}>
                          <Text style={styles.codeBadgeText}>§ {recipe.code}</Text>
                        </View>
                      ) : <View />}

                      <ApplePressable
                        scaleTo={0.88}
                        onPress={(e) => {
                          e.stopPropagation();
                          AppleHaptics.medium();
                          toggleFavoriteRecipe(recipe.id);
                        }}
                        style={styles.heartButton}>
                        <Ionicons
                          name={recipe.isFavorite ? 'heart' : 'heart-outline'}
                          size={18}
                          color={
                            recipe.isFavorite
                              ? AppleTheme.colors.danger
                              : AppleTheme.colors.textPrimary
                          }
                        />
                      </ApplePressable>
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.metaTagsRow}>
                      <Text style={styles.categoryTag}>{recipe.category.toUpperCase()}</Text>
                      <View style={styles.dotSeparator} />
                      <Text style={styles.difficultyTag}>{recipe.difficulty}</Text>
                    </View>

                    <Text style={styles.cardTitle}>{recipe.title}</Text>
                    <Text style={styles.cardSubtitle} numberOfLines={2}>
                      {recipe.subtitle}
                    </Text>

                    <View style={styles.cardFooter}>
                      <View style={styles.footerItem}>
                        <Ionicons
                          name="time-outline"
                          size={15}
                          color={AppleTheme.colors.textSecondary}
                        />
                        <Text style={styles.footerText}>{recipe.prepTimeMinutes} min</Text>
                      </View>

                      <View style={styles.footerItem}>
                        <Ionicons
                          name="timer-outline"
                          size={15}
                          color={AppleTheme.colors.accentWarm}
                        />
                        <Text style={[styles.footerText, { color: AppleTheme.colors.accentWarm }]}>
                          {timersCount} {timersCount === 1 ? 'timer activo' : 'timers activos'}
                        </Text>
                      </View>

                      <View style={styles.footerItem}>
                        <Ionicons
                          name="people-outline"
                          size={15}
                          color={AppleTheme.colors.textSecondary}
                        />
                        <Text style={styles.footerText}>{recipe.baseServings} pax</Text>
                      </View>
                    </View>
                  </View>
                </ApplePressable>
              </Animated.View>
            );
          })}
        </View>
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
  header: {
    marginBottom: 18,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  ronerBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppleTheme.colors.surface,
    padding: 14,
    borderRadius: AppleTheme.radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    marginBottom: 14,
    ...AppleTheme.shadow.card,
  },
  ronerBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  ronerBannerIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FAF5EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6D7C3',
  },
  ronerBannerTextContainer: {
    flex: 1,
  },
  ronerBannerEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  ronerBannerEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8D4F22',
    letterSpacing: 0.6,
  },
  ronerBannerPill: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
  },
  ronerBannerPillText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
  },
  ronerBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  ronerBannerDesc: {
    fontSize: 11.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  favFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  favFilterBtnActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
    borderColor: AppleTheme.colors.textPrimary,
  },
  favFilterText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  favFilterTextActive: {
    color: '#FFFFFF',
  },
  brandTitle: {
    fontSize: 33,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.9,
  },
  brandSubtitle: {
    fontSize: 14.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
    letterSpacing: -0.2,
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
    ...AppleTheme.shadow.card,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  categoriesRow: {
    paddingVertical: 16,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 15,
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
    color: AppleTheme.colors.textSecondary,
    letterSpacing: -0.1,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  sectionMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  sectionHint: {
    fontSize: 12,
    color: AppleTheme.colors.textTertiary,
  },
  cardsList: {
    gap: 18,
  },
  card: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  cardImageContainer: {
    height: 205,
    width: '100%',
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageTopBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: AppleTheme.radius.pill,
  },
  codeBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: 0.2,
  },
  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: 18,
  },
  metaTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.6,
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: AppleTheme.colors.textTertiary,
  },
  difficultyTag: {
    fontSize: 11.5,
    fontWeight: '500',
    color: AppleTheme.colors.textSecondary,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13.5,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 19,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.border,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
});
