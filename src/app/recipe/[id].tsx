import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Alert,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useCookBookStore } from '@/store/useCookBookStore';
import {
  Ingredient,
  Recipe,
  RecipeCategory,
  RecipeDifficulty,
  RecipeStep,
} from '@/types/cookbook';
import { AppleTheme } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import {
  exportRecipeToPdfAndShare,
  generateRecipePdfData,
  RecipePdfData,
} from '@/core/pdfExporter';
import { RecipePdfModal } from '@/components/RecipePdfModal';
import { pickRecipeImage } from '@/core/recipeScanner';
import { getRecipeImageSource } from '@/constants/recipeImages';
import { playTimerSound, primeAudioSession } from '@/core/sound';

const EDIT_CATEGORIES: Exclude<RecipeCategory, 'Todos'>[] = [
  'Pescados y Mariscos',
  'Carnes y Sous-Vide',
  'Arroces y Cremas',
  'Tapas y Croquetas',
  'Molecular y Espumas',
  'Postres y Dulces',
];

const EDIT_DIFFICULTIES: RecipeDifficulty[] = ['Fácil', 'Media', 'Alta Cocina'];

function formatAmount(amount: number): string {
  if (Number.isInteger(amount)) return String(amount);
  const rounded = Math.round(amount * 100) / 100;
  return String(rounded).replace('.', ',');
}

function formatTimerClock(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Icono de olla hirviendo con animación dinámica y continua de borboteo y vapor.
 */
function AnimatedCookingPot() {
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-9, { duration: 160, easing: Easing.inOut(Easing.quad) }),
        withTiming(9, { duration: 160, easing: Easing.inOut(Easing.quad) }),
        withTiming(-5, { duration: 130, easing: Easing.inOut(Easing.quad) }),
        withTiming(5, { duration: 130, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 160, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 550 })
      ),
      -1,
      false
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(-3.5, { duration: 160, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 160, easing: Easing.in(Easing.quad) }),
        withTiming(-2, { duration: 130, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 130, easing: Easing.in(Easing.quad) }),
        withTiming(0, { duration: 710 })
      ),
      -1,
      false
    );
  }, [rotation, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <MaterialCommunityIcons name="pot-steam" size={22} color="#FFFFFF" />
    </Animated.View>
  );
}

/**
 * Modal visual de alta cocina "¡Tiempo!" cuando una cuenta atrás llega a 0.
 */
function TimeUpModalCard({
  step,
  onDismiss,
  onAddMinute,
  onNextStep,
  hasNextStep,
}: {
  step: RecipeStep;
  onDismiss: () => void;
  onAddMinute: () => void;
  onNextStep?: () => void;
  hasNextStep?: boolean;
}) {
  return (
    <Animated.View
      entering={FadeInDown.duration(280)}
      style={styles.timeUpCard}>
      {/* Halo e icono de alarma culinaria */}
      <View style={styles.timeUpIconRing}>
        <MaterialCommunityIcons
          name="timer-alert-outline"
          size={42}
          color={AppleTheme.colors.accentWarm}
        />
      </View>

      <Text style={styles.timeUpKicker}>CUENTA ATRÁS FINALIZADA</Text>
      <Text style={styles.timeUpTitle}>¡Tiempo!</Text>

      <View style={styles.timeUpStepTag}>
        <Text style={styles.timeUpStepTagText} numberOfLines={1}>
          Paso {step.stepNumber} · {step.title}
        </Text>
      </View>

      <Text style={styles.timeUpInstruction} numberOfLines={3}>
        {step.instruction}
      </Text>

      {step.temperature ? (
        <View style={styles.timeUpTempBadge}>
          <Ionicons name="thermometer-outline" size={13} color="#C84B24" />
          <Text style={styles.timeUpTempText}>{step.temperature}</Text>
        </View>
      ) : null}

      {step.tip ? (
        <View style={styles.timeUpTipBox}>
          <Ionicons name="sparkles" size={13} color={AppleTheme.colors.gold} />
          <Text style={styles.timeUpTipText} numberOfLines={2}>
            {step.tip}
          </Text>
        </View>
      ) : null}

      {/* Acciones para el Chef */}
      <View style={styles.timeUpActionsCol}>
        {hasNextStep && onNextStep ? (
          <ApplePressable
            scaleTo={0.96}
            onPress={onNextStep}
            style={[styles.timeUpBtnPrimary, { backgroundColor: AppleTheme.colors.accentWarm }]}>
            <Text style={styles.timeUpBtnPrimaryText}>Siguiente Paso</Text>
            <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
          </ApplePressable>
        ) : null}

        <ApplePressable
          scaleTo={0.96}
          onPress={onDismiss}
          style={styles.timeUpBtnPrimary}>
          <Text style={styles.timeUpBtnPrimaryText}>Entendido</Text>
          <Ionicons name="checkmark-circle" size={17} color="#FFFFFF" />
        </ApplePressable>

        <ApplePressable
          scaleTo={0.96}
          onPress={onAddMinute}
          style={styles.timeUpBtnSecondary}>
          <Ionicons name="add" size={16} color={AppleTheme.colors.textPrimary} />
          <Text style={styles.timeUpBtnSecondaryText}>+1 min extra de cocción</Text>
        </ApplePressable>
      </View>
    </Animated.View>
  );
}

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const recipe = useCookBookStore((s) => s.recipes.find((r) => r.id === id));
  const toggleFavoriteRecipe = useCookBookStore((s) => s.toggleFavoriteRecipe);
  const updateRecipe = useCookBookStore((s) => s.updateRecipe);
  const deleteRecipe = useCookBookStore((s) => s.deleteRecipe);

  const [servings, setServings] = useState(recipe?.baseServings || 2);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [cookingModeOpen, setCookingModeOpen] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [pdfData, setPdfData] = useState<RecipePdfData | null>(null);
  const cookingScrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  // Modal de Edición Completa
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editCategory, setEditCategory] = useState<Exclude<RecipeCategory, 'Todos'>>(
    'Pescados y Mariscos'
  );
  const [editDifficulty, setEditDifficulty] = useState<RecipeDifficulty>('Media');
  const [editPrepMinutes, setEditPrepMinutes] = useState('30');
  const [editBaseServings, setEditBaseServings] = useState('2');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editChefNote, setEditChefNote] = useState('');
  const [editPairing, setEditPairing] = useState('');
  const [editIngredients, setEditIngredients] = useState<Ingredient[]>([]);
  const [editSteps, setEditSteps] = useState<RecipeStep[]>([]);

  // Estado de timers por paso (stepNumber -> remainingSeconds)
  const [timersLeft, setTimersLeft] = useState<Record<number, number>>({});
  const [runningTimers, setRunningTimers] = useState<Record<number, boolean>>({});
  const [timeUpStep, setTimeUpStep] = useState<RecipeStep | null>(null);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.baseServings);
      const initialTimers: Record<number, number> = {};
      recipe.steps.forEach((st) => {
        if (st.timerSeconds && st.timerSeconds > 0) {
          initialTimers[st.stepNumber] = st.timerSeconds;
        }
      });
      setTimersLeft(initialTimers);
      setRunningTimers({});
      setTimeUpStep(null);
    }
  }, [recipe]);

  const anyTimerRunning = useMemo(
    () => Object.values(runningTimers).some(Boolean),
    [runningTimers]
  );

  useEffect(() => {
    if (cookingModeOpen || anyTimerRunning) {
      activateKeepAwakeAsync('cookbook-cooking-mode').catch(() => {});
    } else {
      deactivateKeepAwake('cookbook-cooking-mode').catch(() => {});
    }
    return () => {
      deactivateKeepAwake('cookbook-cooking-mode').catch(() => {});
    };
  }, [cookingModeOpen, anyTimerRunning]);

  useEffect(() => {
    if (cookingModeOpen) {
      cookingScrollRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [activeStepIdx, cookingModeOpen]);

  useEffect(() => {
    if (!anyTimerRunning) return;
    const interval = setInterval(() => {
      setTimersLeft((prev) => {
        const next = { ...prev };
        let finishedAny = false;
        let finishedStepNum: number | null = null;
        Object.keys(runningTimers).forEach((k) => {
          const stepNum = Number(k);
          if (runningTimers[stepNum]) {
            const current = next[stepNum] ?? 0;
            if (current <= 1) {
              next[stepNum] = 0;
              finishedAny = true;
              finishedStepNum = stepNum;
              setRunningTimers((r) => ({ ...r, [stepNum]: false }));
            } else {
              next[stepNum] = current - 1;
            }
          }
        });
        if (finishedAny && finishedStepNum !== null && recipe) {
          const stepObj = recipe.steps.find((s) => s.stepNumber === finishedStepNum);
          if (stepObj) {
            setTimeUpStep(stepObj);
          }
          playTimerSound();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [anyTimerRunning, runningTimers, recipe]);

  const handleDismissTimeUp = () => {
    AppleHaptics.selection();
    setTimeUpStep(null);
  };

  const handleAddMinuteTimeUp = (stepNum: number) => {
    AppleHaptics.medium();
    setTimersLeft((prev) => ({ ...prev, [stepNum]: (prev[stepNum] || 0) + 60 }));
    setRunningTimers((prev) => ({ ...prev, [stepNum]: true }));
    setTimeUpStep(null);
  };

  const handleNextStepFromTimeUp = () => {
    AppleHaptics.selection();
    setTimeUpStep(null);
    if (recipe && activeStepIdx < recipe.steps.length - 1) {
      setActiveStepIdx((idx) => idx + 1);
    }
  };

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundBox}>
          <Text style={styles.notFoundText}>Receta no encontrada</Text>
          <ApplePressable onPress={() => router.back()} style={styles.backFallbackBtn}>
            <Text style={styles.backFallbackText}>Volver</Text>
          </ApplePressable>
        </View>
      </SafeAreaView>
    );
  }

  const openEditModal = () => {
    AppleHaptics.selection();
    setEditTitle(recipe.title);
    setEditSubtitle(recipe.subtitle);
    setEditCategory(recipe.category);
    setEditDifficulty(recipe.difficulty);
    setEditPrepMinutes(String(recipe.prepTimeMinutes));
    setEditBaseServings(String(recipe.baseServings));
    setEditImageUrl(recipe.imageUrl);
    setEditChefNote(recipe.chefNote);
    setEditPairing(recipe.pairing || '');
    setEditIngredients(recipe.ingredients.map((i) => ({ ...i })));
    setEditSteps(recipe.steps.map((s) => ({ ...s })));
    setEditModalOpen(true);
  };

  const handleSaveEditedRecipe = async () => {
    if (!editTitle.trim()) {
      Alert.alert('Título obligatorio', 'Por favor indica un nombre para la receta.');
      return;
    }
    AppleHaptics.success();
    const updated: Recipe = {
      ...recipe,
      title: editTitle.trim(),
      subtitle: editSubtitle.trim(),
      category: editCategory,
      difficulty: editDifficulty,
      prepTimeMinutes: Number(editPrepMinutes) || 30,
      baseServings: Math.max(1, Number(editBaseServings) || 2),
      imageUrl: editImageUrl.trim() || recipe.imageUrl,
      chefNote: editChefNote.trim(),
      pairing: editPairing.trim() || undefined,
      ingredients: editIngredients.filter((i) => i.name.trim().length > 0),
      steps: editSteps.map((s, idx) => ({
        ...s,
        stepNumber: idx + 1,
      })),
      updatedAt: new Date().toISOString(),
    };
    await updateRecipe(updated);
    setEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    AppleHaptics.medium();

    const executeDeletion = async () => {
      AppleHaptics.success();
      await deleteRecipe(recipe.id);
      router.back();
    };

    if (Platform.OS === 'web') {
      const confirmed =
        typeof window !== 'undefined'
          ? window.confirm(
              `¿Estás seguro de que quieres borrar "${recipe.title}" de Robertito´s CookBook? Esta acción no se puede deshacer.`
            )
          : true;
      if (confirmed) {
        void executeDeletion();
      }
    } else {
      Alert.alert(
        '¿Eliminar receta?',
        `¿Estás seguro de que quieres borrar "${recipe.title}" de Robertito´s CookBook? Esta acción requiere confirmación.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sí, eliminar',
            style: 'destructive',
            onPress: () => {
              void executeDeletion();
            },
          },
        ]
      );
    }
  };

  const handleExportPdf = async () => {
    if (exportingPdf) return;
    AppleHaptics.medium();
    setExportingPdf(true);
    try {
      if (Platform.OS === 'web') {
        const data = await generateRecipePdfData(recipe, servings);
        setPdfData(data);
        setPdfModalVisible(true);
      } else {
        await exportRecipeToPdfAndShare(recipe, servings);
      }
    } catch (err: any) {
      console.error('[RecipeScreen] Error en exportación PDF:', err);
      Alert.alert(
        'Ficha Gastronómica',
        'No se pudo generar la ficha gastronómica. Inténtalo de nuevo.'
      );
    } finally {
      setExportingPdf(false);
    }
  };

  const scaleFactor = servings / recipe.baseServings;
  const currentStep = recipe.steps[activeStepIdx] || recipe.steps[0];
  const currentStepTimerTotal = currentStep?.timerSeconds || 0;
  const currentStepTimerLeft = timersLeft[currentStep?.stepNumber] ?? currentStepTimerTotal;
  const currentStepRunning = Boolean(runningTimers[currentStep?.stepNumber]);

  const toggleTimer = (stepNumber: number, defaultSeconds: number) => {
    primeAudioSession();
    AppleHaptics.medium();
    setTimersLeft((prev) => ({
      ...prev,
      [stepNumber]: prev[stepNumber] && prev[stepNumber] > 0 ? prev[stepNumber] : defaultSeconds,
    }));
    setRunningTimers((prev) => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const resetTimer = (stepNumber: number, defaultSeconds: number) => {
    AppleHaptics.light();
    setRunningTimers((prev) => ({ ...prev, [stepNumber]: false }));
    setTimersLeft((prev) => ({ ...prev, [stepNumber]: defaultSeconds }));
  };

  const adjustTimer = (stepNumber: number, deltaSeconds: number) => {
    primeAudioSession();
    AppleHaptics.selection();
    setTimersLeft((prev) => ({
      ...prev,
      [stepNumber]: Math.max(10, (prev[stepNumber] ?? 0) + deltaSeconds),
    }));
  };

  return (
    <View style={styles.screenRoot}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Imagen Hero con Botones Flotantes Estilo iOS (Back, Exportar PDF, Editar, Borrar, Favorito) */}
        <View style={styles.heroWrapper}>
          <Image
            source={getRecipeImageSource(recipe)}
            style={styles.heroImage}
            contentFit="cover"
            transition={250}
          />
          <SafeAreaView style={styles.heroOverlayBar}>
            <ApplePressable
              scaleTo={0.9}
              onPress={() => {
                AppleHaptics.light();
                router.back();
              }}
              style={styles.circleNavBtn}>
              <Ionicons name="chevron-back" size={22} color={AppleTheme.colors.textPrimary} />
            </ApplePressable>

            <View style={styles.heroRightActions}>
              {/* Botón Favorito */}
              <ApplePressable
                scaleTo={0.9}
                onPress={() => {
                  AppleHaptics.medium();
                  toggleFavoriteRecipe(recipe.id);
                }}
                style={styles.circleNavBtn}>
                <Ionicons
                  name={recipe.isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={
                    recipe.isFavorite
                      ? AppleTheme.colors.danger
                      : AppleTheme.colors.textPrimary
                  }
                />
              </ApplePressable>
            </View>
          </SafeAreaView>
        </View>

        {/* Contenedor Principal Minimalista */}
        <Animated.View
          entering={FadeInDown.duration(380).springify()}
          style={styles.sheetBody}>
          <View style={styles.topPillsRow}>
            <View style={styles.catPill}>
              <Text style={styles.catPillText}>{recipe.category}</Text>
            </View>
            <View style={styles.catPill}>
              <Text style={styles.catPillText}>{recipe.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.subtitle}>{recipe.subtitle}</Text>

          {/* Barra Rápida de Acciones: Exportar PDF, Modificar y Eliminar */}
          <View style={styles.quickActionRow}>
            <ApplePressable
              scaleTo={0.96}
              disabled={exportingPdf}
              onPress={handleExportPdf}
              style={[
                styles.quickActionPillPrimary,
                exportingPdf && { opacity: 0.8 },
              ]}>
              {exportingPdf ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="share-outline" size={16} color="#FFFFFF" />
              )}
              <Text style={styles.quickActionTextPrimary} numberOfLines={1}>
                {exportingPdf ? 'Generando PDF...' : 'Exportar PDF'}
              </Text>
            </ApplePressable>

            <ApplePressable
              scaleTo={0.96}
              onPress={openEditModal}
              style={styles.quickActionPill}>
              <Ionicons
                name="create-outline"
                size={16}
                color={AppleTheme.colors.textPrimary}
              />
              <Text style={styles.quickActionText}>Modificar</Text>
            </ApplePressable>

            <ApplePressable
              scaleTo={0.96}
              onPress={handleConfirmDelete}
              style={styles.quickActionPillDanger}>
              <Ionicons
                name="trash-outline"
                size={16}
                color={AppleTheme.colors.danger}
              />
            </ApplePressable>
          </View>

          {/* Clave Técnica del Chef & Maridaje */}
          <View style={styles.chefNoteCard}>
            <View style={styles.chefNoteHeader}>
              <Ionicons name="sparkles" size={16} color={AppleTheme.colors.accentWarm} />
              <Text style={styles.chefNoteLabel}>CLAVE TÉCNICA DE ROBERTO</Text>
            </View>
            <Text style={styles.chefNoteText}>{recipe.chefNote}</Text>
            {recipe.pairing && (
              <View style={styles.pairingRow}>
                <Ionicons name="wine-outline" size={15} color={AppleTheme.colors.textSecondary} />
                <Text style={styles.pairingText}>
                  <Text style={{ fontWeight: '700' }}>Maridaje recomendado: </Text>
                  {recipe.pairing}
                </Text>
              </View>
            )}
          </View>

          {/* Escalador Dinámico de Comensales */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={styles.sectionTitle}>Ingredientes</Text>
              <Text style={styles.sectionSub}>
                Toca cada ingrediente para marcar tu mise en place
              </Text>
            </View>

            <View style={styles.scalerControl}>
              <ApplePressable
                scaleTo={0.88}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => {
                  if (servings > 1) {
                    AppleHaptics.selection();
                    setServings((s) => s - 1);
                  }
                }}
                style={styles.scalerBtn}
                accessibilityRole="button"
                accessibilityLabel="Reducir comensales">
                <Ionicons name="remove" size={16} color={AppleTheme.colors.textPrimary} />
              </ApplePressable>
              <View style={styles.scalerValueBox}>
                <Text style={styles.scalerValue}>{servings}</Text>
                <Text style={styles.scalerUnit}>pax</Text>
              </View>
              <ApplePressable
                scaleTo={0.88}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => {
                  AppleHaptics.selection();
                  setServings((s) => s + 1);
                }}
                style={styles.scalerBtn}
                accessibilityRole="button"
                accessibilityLabel="Aumentar comensales">
                <Ionicons name="add" size={16} color={AppleTheme.colors.textPrimary} />
              </ApplePressable>
            </View>
          </View>

          {/* Lista de Ingredientes Interactiva */}
          <View style={styles.ingredientsCard}>
            {recipe.ingredients.map((ing, index) => {
              const checked = Boolean(checkedIngredients[ing.id]);
              const scaledAmount = formatAmount(ing.amount * scaleFactor);

              return (
                <ApplePressable
                  key={ing.id}
                  scaleTo={0.99}
                  onPress={() => {
                    AppleHaptics.selection();
                    setCheckedIngredients((prev) => ({
                      ...prev,
                      [ing.id]: !prev[ing.id],
                    }));
                  }}
                  style={[
                    styles.ingredientRow,
                    index < recipe.ingredients.length - 1 && styles.ingredientBorder,
                  ]}>
                  <View style={styles.ingredientLeft}>
                    <Ionicons
                      name={checked ? 'checkmark-circle' : 'ellipse-outline'}
                      size={21}
                      color={
                        checked
                          ? AppleTheme.colors.success
                          : AppleTheme.colors.textTertiary
                      }
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.ingredientName,
                          checked && styles.ingredientNameChecked,
                        ]}>
                        {ing.name}
                      </Text>
                      {ing.notes && (
                        <Text style={styles.ingredientNotes}>{ing.notes}</Text>
                      )}
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.ingredientAmount,
                      checked && styles.ingredientNameChecked,
                    ]}>
                    {scaledAmount} {ing.unit}
                  </Text>
                </ApplePressable>
              );
            })}
          </View>

          {/* Pasos de Precisión con Timers Integrados */}
          <View style={[styles.sectionHeaderRow, { marginTop: 28 }]}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={styles.sectionTitle}>Ejecución Paso a Paso</Text>
              <Text style={styles.sectionSub}>
                Cronómetros integrados con alerta háptica en tu iPhone
              </Text>
            </View>
          </View>

          <View style={styles.stepsList}>
            {recipe.steps.map((step) => {
              const hasTimer = Boolean(step.timerSeconds && step.timerSeconds > 0);
              const left = timersLeft[step.stepNumber] ?? (step.timerSeconds || 0);
              const isRunning = Boolean(runningTimers[step.stepNumber]);

              return (
                <Animated.View
                  key={step.stepNumber}
                  layout={LinearTransition.springify()}
                  style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <View style={styles.stepNumberCircle}>
                      <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                    </View>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    {step.temperature && (
                      <View style={styles.tempBadge}>
                        <Ionicons
                          name="thermometer-outline"
                          size={13}
                          color={AppleTheme.colors.accentWarm}
                        />
                        <Text style={styles.tempBadgeText}>{step.temperature}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.stepInstruction}>{step.instruction}</Text>

                  {step.tip && (
                    <View style={styles.stepTipBox}>
                      <Ionicons
                        name="bulb-outline"
                        size={15}
                        color={AppleTheme.colors.textSecondary}
                      />
                      <Text style={styles.stepTipText}>{step.tip}</Text>
                    </View>
                  )}

                  {hasTimer && step.timerSeconds && (
                    <View
                      style={[
                        styles.inlineTimerBar,
                        isRunning && styles.inlineTimerBarActive,
                      ]}>
                      <View style={styles.inlineTimerInfo}>
                        <Ionicons
                          name={isRunning ? 'timer' : 'timer-outline'}
                          size={18}
                          color={
                            isRunning
                              ? AppleTheme.colors.accentWarm
                              : AppleTheme.colors.textPrimary
                          }
                        />
                        <Text
                          style={[
                            styles.inlineTimerClock,
                            isRunning && { color: AppleTheme.colors.accentWarm },
                          ]}>
                          {formatTimerClock(left)}
                        </Text>
                      </View>

                      <View style={styles.inlineTimerActions}>
                        <ApplePressable
                          scaleTo={0.93}
                          onPress={() => toggleTimer(step.stepNumber, step.timerSeconds!)}
                          style={[
                            styles.timerPlayBtn,
                            isRunning && styles.timerPauseBtn,
                          ]}>
                          <Ionicons
                            name={isRunning ? 'pause' : 'play'}
                            size={14}
                            color="#FFFFFF"
                          />
                          <Text style={styles.timerPlayBtnText}>
                            {isRunning ? 'Pausar' : 'Iniciar Timer'}
                          </Text>
                        </ApplePressable>

                        <ApplePressable
                          scaleTo={0.9}
                          onPress={() => resetTimer(step.stepNumber, step.timerSeconds!)}
                          style={styles.timerResetBtn}>
                          <Ionicons
                            name="refresh"
                            size={16}
                            color={AppleTheme.colors.textSecondary}
                          />
                        </ApplePressable>
                      </View>
                    </View>
                  )}
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Barra Flotante Inferior: Modo Cocina Manos Libres */}
      <View style={styles.bottomFloatingBar}>
        <ApplePressable
          scaleTo={0.97}
          onPress={() => {
            primeAudioSession();
            AppleHaptics.medium();
            setActiveStepIdx(0);
            setCookingModeOpen(true);
          }}
          style={styles.cookingModeBtn}>
          <Text style={styles.cookingModeBtnText}>¡A Cocinar!</Text>
          <AnimatedCookingPot />
        </ApplePressable>
      </View>

      {/* Modal de Edición Completa de Receta */}
      <Modal
        visible={editModalOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setEditModalOpen(false)}>
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.editModalHeader}>
            <ApplePressable onPress={() => setEditModalOpen(false)}>
              <Text style={styles.editCancelText}>Cancelar</Text>
            </ApplePressable>
            <Text style={styles.editModalTitle}>Modificar Receta</Text>
            <ApplePressable onPress={handleSaveEditedRecipe}>
              <Text style={styles.editSaveText}>Guardar</Text>
            </ApplePressable>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.editScrollContent}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.editLabel}>Título y Subtítulo</Text>
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Título de la receta"
              style={styles.editInput}
            />
            <TextInput
              value={editSubtitle}
              onChangeText={setEditSubtitle}
              placeholder="Subtítulo o técnica"
              style={styles.editInput}
            />

            <Text style={styles.editLabel}>Fotografía del Plato</Text>
            <View style={styles.photoPickerRow}>
              <ApplePressable
                scaleTo={0.96}
                onPress={async () => {
                  try {
                    const img = await pickRecipeImage('camera');
                    if (img) setEditImageUrl(img.uri);
                  } catch (e: any) {
                    Alert.alert('Cámara', e?.message);
                  }
                }}
                style={styles.photoBtn}>
                <Ionicons name="camera-outline" size={16} color={AppleTheme.colors.textPrimary} />
                <Text style={styles.photoBtnText}>Hacer Foto</Text>
              </ApplePressable>

              <ApplePressable
                scaleTo={0.96}
                onPress={async () => {
                  try {
                    const img = await pickRecipeImage('gallery');
                    if (img) setEditImageUrl(img.uri);
                  } catch (e: any) {
                    Alert.alert('Galería', e?.message);
                  }
                }}
                style={styles.photoBtn}>
                <Ionicons name="images-outline" size={16} color={AppleTheme.colors.textPrimary} />
                <Text style={styles.photoBtnText}>Elegir de Galería</Text>
              </ApplePressable>
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.editLabel}>Tiempo (min)</Text>
                <TextInput
                  value={editPrepMinutes}
                  onChangeText={setEditPrepMinutes}
                  keyboardType="numeric"
                  style={styles.editInput}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.editLabel}>Raciones base (pax)</Text>
                <TextInput
                  value={editBaseServings}
                  onChangeText={setEditBaseServings}
                  keyboardType="numeric"
                  style={styles.editInput}
                />
              </View>
            </View>

            <Text style={styles.editLabel}>Categoría</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
              {EDIT_CATEGORIES.map((c) => {
                const active = editCategory === c;
                return (
                  <ApplePressable
                    key={c}
                    onPress={() => setEditCategory(c)}
                    style={[styles.editChip, active && styles.editChipActive]}>
                    <Text style={[styles.editChipText, active && { color: '#FFF' }]}>
                      {c}
                    </Text>
                  </ApplePressable>
                );
              })}
            </ScrollView>

            <Text style={styles.editLabel}>Dificultad</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {EDIT_DIFFICULTIES.map((d) => {
                const active = editDifficulty === d;
                return (
                  <ApplePressable
                    key={d}
                    onPress={() => setEditDifficulty(d)}
                    style={[styles.editChip, active && styles.editChipActive]}>
                    <Text style={[styles.editChipText, active && { color: '#FFF' }]}>
                      {d}
                    </Text>
                  </ApplePressable>
                );
              })}
            </View>

            <Text style={styles.editLabel}>Clave Técnica y Maridaje</Text>
            <TextInput
              value={editChefNote}
              onChangeText={setEditChefNote}
              placeholder="Clave técnica de Roberto"
              multiline
              style={[styles.editInput, { height: 74, paddingTop: 10 }]}
            />
            <TextInput
              value={editPairing}
              onChangeText={setEditPairing}
              placeholder="Maridaje recomendado (opcional)"
              style={styles.editInput}
            />

            {/* Edición Dinámica de Ingredientes */}
            <View style={styles.editBlockHeader}>
              <Text style={styles.editLabel}>Ingredientes ({editIngredients.length})</Text>
              <ApplePressable
                onPress={() =>
                  setEditIngredients((prev) => [
                    ...prev,
                    {
                      id: `ing-${Date.now()}`,
                      name: '',
                      amount: 100,
                      unit: 'g',
                    },
                  ])
                }
                style={styles.addRowMiniBtn}>
                <Ionicons name="add" size={15} color="#FFFFFF" />
                <Text style={styles.addRowMiniText}>Ingrediente</Text>
              </ApplePressable>
            </View>

            {editIngredients.map((ing, iIdx) => (
              <View key={ing.id} style={styles.dynamicItemRow}>
                <TextInput
                  value={ing.name}
                  onChangeText={(val) =>
                    setEditIngredients((prev) =>
                      prev.map((item, idx) => (idx === iIdx ? { ...item, name: val } : item))
                    )
                  }
                  placeholder="Ingrediente"
                  style={[styles.editInput, { flex: 1 }]}
                />
                <TextInput
                  value={String(ing.amount)}
                  onChangeText={(val) =>
                    setEditIngredients((prev) =>
                      prev.map((item, idx) =>
                        idx === iIdx
                          ? { ...item, amount: parseFloat(val.replace(',', '.')) || 0 }
                          : item
                      )
                    )
                  }
                  keyboardType="numeric"
                  placeholder="Cant."
                  style={[styles.editInput, { width: 68 }]}
                />
                <TextInput
                  value={ing.unit}
                  onChangeText={(val) =>
                    setEditIngredients((prev) =>
                      prev.map((item, idx) => (idx === iIdx ? { ...item, unit: val } : item))
                    )
                  }
                  placeholder="ud/g/ml"
                  style={[styles.editInput, { width: 64 }]}
                />
                <ApplePressable
                  onPress={() =>
                    setEditIngredients((prev) => prev.filter((_, idx) => idx !== iIdx))
                  }
                  style={styles.removeMiniBtn}>
                  <Ionicons name="close-circle" size={20} color={AppleTheme.colors.danger} />
                </ApplePressable>
              </View>
            ))}

            {/* Edición Dinámica de Pasos con Timers */}
            <View style={styles.editBlockHeader}>
              <Text style={styles.editLabel}>Pasos y Timers ({editSteps.length})</Text>
              <ApplePressable
                onPress={() =>
                  setEditSteps((prev) => [
                    ...prev,
                    {
                      stepNumber: prev.length + 1,
                      title: `Paso ${prev.length + 1}`,
                      instruction: '',
                      timerSeconds: 300,
                    },
                  ])
                }
                style={styles.addRowMiniBtn}>
                <Ionicons name="add" size={15} color="#FFFFFF" />
                <Text style={styles.addRowMiniText}>Paso</Text>
              </ApplePressable>
            </View>

            {editSteps.map((st, sIdx) => (
              <View key={sIdx} style={styles.stepEditCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontWeight: '700', fontSize: 13 }}>#{sIdx + 1}</Text>
                  <TextInput
                    value={st.title}
                    onChangeText={(val) =>
                      setEditSteps((prev) =>
                        prev.map((item, idx) => (idx === sIdx ? { ...item, title: val } : item))
                      )
                    }
                    placeholder="Título del paso"
                    style={[styles.editInput, { flex: 1 }]}
                  />
                  <ApplePressable
                    onPress={() =>
                      setEditSteps((prev) => prev.filter((_, idx) => idx !== sIdx))
                    }>
                    <Ionicons name="trash-outline" size={18} color={AppleTheme.colors.danger} />
                  </ApplePressable>
                </View>

                <TextInput
                  value={st.instruction}
                  onChangeText={(val) =>
                    setEditSteps((prev) =>
                      prev.map((item, idx) =>
                        idx === sIdx ? { ...item, instruction: val } : item
                      )
                    )
                  }
                  placeholder="Instrucción detallada..."
                  multiline
                  style={[styles.editInput, { height: 68, paddingTop: 8 }]}
                />

                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TextInput
                    value={st.timerSeconds ? String(Math.round(st.timerSeconds / 60)) : ''}
                    onChangeText={(val) => {
                      const mins = parseFloat(val) || 0;
                      setEditSteps((prev) =>
                        prev.map((item, idx) =>
                          idx === sIdx
                            ? { ...item, timerSeconds: mins > 0 ? Math.round(mins * 60) : undefined }
                            : item
                        )
                      );
                    }}
                    keyboardType="numeric"
                    placeholder="Timer (min)"
                    style={[styles.editInput, { flex: 1 }]}
                  />
                  <TextInput
                    value={st.temperature || ''}
                    onChangeText={(val) =>
                      setEditSteps((prev) =>
                        prev.map((item, idx) =>
                          idx === sIdx ? { ...item, temperature: val || undefined } : item
                        )
                      )
                    }
                    placeholder="Temp (ej. 65 °C)"
                    style={[styles.editInput, { flex: 1 }]}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Modal Pantalla Completa: Modo Cocina Manos Libres */}
      <Modal
        visible={cookingModeOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setCookingModeOpen(false)}>
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalContainer}>
            {/* Top Bar del Modo Cocina */}
            <View style={styles.modalHeader}>
              <View style={styles.keepAwakeBadge}>
                <View style={styles.keepAwakeDot} />
                <Text style={styles.keepAwakeText}>Pantalla Siempre Activa</Text>
              </View>

              <ApplePressable
                scaleTo={0.9}
                onPress={() => {
                  AppleHaptics.light();
                  setCookingModeOpen(false);
                }}
                style={styles.modalCloseBtn}>
                <Ionicons name="close" size={20} color={AppleTheme.colors.textPrimary} />
              </ApplePressable>
            </View>

            {/* Barra de Progreso de Pasos */}
            <View style={styles.progressStepsRow}>
              {recipe.steps.map((st, idx) => (
                <View
                  key={st.stepNumber}
                  style={[
                    styles.progressSegment,
                    idx <= activeStepIdx && styles.progressSegmentActive,
                  ]}
                />
              ))}
            </View>

            {/* Contenido del Paso Actual con Scroll fluido para evitar cualquier superposición */}
            <ScrollView
              ref={cookingScrollRef}
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
              bounces={true}>
              <Animated.View
                key={currentStep.stepNumber}
                entering={FadeIn.duration(260)}
                style={styles.modalStepBody}>
                <Text style={styles.modalStepCounter}>
                  PASO {activeStepIdx + 1} DE {recipe.steps.length}
                </Text>
                <Text style={styles.modalStepTitle}>{currentStep.title}</Text>

                {currentStep.temperature && (
                  <View style={styles.modalTempPill}>
                    <Ionicons
                      name="thermometer"
                      size={16}
                      color={AppleTheme.colors.accentWarm}
                    />
                    <Text style={styles.modalTempText}>
                      Temperatura objetivo: {currentStep.temperature}
                    </Text>
                  </View>
                )}

                <Text style={styles.modalStepInstruction}>
                  {currentStep.instruction}
                </Text>

                {currentStep.tip && (
                  <View style={styles.modalTipCard}>
                    <Ionicons
                      name="sparkles"
                      size={16}
                      color={AppleTheme.colors.accentWarm}
                    />
                    <Text style={styles.modalTipText}>{currentStep.tip}</Text>
                  </View>
                )}

                {/* Gran Cronómetro Interactivo del Paso */}
                {currentStepTimerTotal > 0 && (
                  <View style={styles.bigTimerCard}>
                    <Text style={styles.bigTimerLabel}>CRONÓMETRO DEL PASO</Text>
                    <Text style={styles.bigTimerDigits}>
                      {formatTimerClock(currentStepTimerLeft)}
                    </Text>

                    <View style={styles.bigTimerControls}>
                      <ApplePressable
                        onPress={() => adjustTimer(currentStep.stepNumber, -30)}
                        style={styles.adjustBtn}>
                        <Text style={styles.adjustBtnText}>-30s</Text>
                      </ApplePressable>

                      <ApplePressable
                        scaleTo={0.94}
                        onPress={() =>
                          toggleTimer(currentStep.stepNumber, currentStepTimerTotal)
                        }
                        style={[
                          styles.bigPlayBtn,
                          currentStepRunning && styles.bigPauseBtn,
                        ]}>
                        <Ionicons
                          name={currentStepRunning ? 'pause' : 'play'}
                          size={22}
                          color="#FFFFFF"
                        />
                        <Text style={styles.bigPlayText}>
                          {currentStepRunning ? 'Pausar' : 'Iniciar'}
                        </Text>
                      </ApplePressable>

                      <ApplePressable
                        onPress={() => adjustTimer(currentStep.stepNumber, 30)}
                        style={styles.adjustBtn}>
                        <Text style={styles.adjustBtnText}>+30s</Text>
                      </ApplePressable>
                    </View>
                  </View>
                )}
              </Animated.View>
            </ScrollView>

            {/* Navegación Anterior / Siguiente Paso */}
            <View style={styles.modalFooterNav}>
              <ApplePressable
                scaleTo={0.96}
                disabled={activeStepIdx === 0}
                onPress={() => {
                  AppleHaptics.selection();
                  setActiveStepIdx((i) => Math.max(0, i - 1));
                }}
                style={[
                  styles.navStepBtn,
                  activeStepIdx === 0 && { opacity: 0.35 },
                ]}>
                <Ionicons
                  name="arrow-back"
                  size={18}
                  color={AppleTheme.colors.textPrimary}
                />
                <Text style={styles.navStepBtnText}>Anterior</Text>
              </ApplePressable>

              <ApplePressable
                scaleTo={0.96}
                onPress={() => {
                  if (activeStepIdx < recipe.steps.length - 1) {
                    AppleHaptics.selection();
                    setActiveStepIdx((i) => i + 1);
                  } else {
                    AppleHaptics.success();
                    setCookingModeOpen(false);
                  }
                }}
                style={[styles.navStepBtn, styles.navStepBtnPrimary]}>
                <Text style={[styles.navStepBtnText, { color: '#FFFFFF' }]}>
                  {activeStepIdx < recipe.steps.length - 1
                    ? 'Siguiente Paso'
                    : '¡Plato Terminado!'}
                </Text>
                <Ionicons
                  name={
                    activeStepIdx < recipe.steps.length - 1
                      ? 'arrow-forward'
                      : 'checkmark-circle'
                  }
                  size={18}
                  color="#FFFFFF"
                />
              </ApplePressable>
            </View>

            {/* Overlay ¡Tiempo! en Modo Cocina */}
            {timeUpStep ? (
              <View style={styles.timeUpOverlayCookingMode}>
                <TimeUpModalCard
                  step={timeUpStep}
                  onDismiss={handleDismissTimeUp}
                  onAddMinute={() => handleAddMinuteTimeUp(timeUpStep.stepNumber)}
                  onNextStep={handleNextStepFromTimeUp}
                  hasNextStep={activeStepIdx < recipe.steps.length - 1}
                />
              </View>
            ) : null}
          </View>
        </SafeAreaView>
      </Modal>

      {/* Modal ¡Tiempo! en Vista Estándar de Receta */}
      {timeUpStep && !cookingModeOpen ? (
        <Modal
          visible={Boolean(timeUpStep)}
          transparent
          animationType="fade"
          onRequestClose={handleDismissTimeUp}>
          <View style={styles.timeUpCardBackdrop}>
            <TimeUpModalCard
              step={timeUpStep}
              onDismiss={handleDismissTimeUp}
              onAddMinute={() => handleAddMinuteTimeUp(timeUpStep.stepNumber)}
              hasNextStep={false}
            />
          </View>
        </Modal>
      ) : null}

      {/* Modal Interactivo de Exportación de Ficha Gastronómica */}
      <RecipePdfModal
        visible={pdfModalVisible}
        onClose={() => setPdfModalVisible(false)}
        data={pdfData}
        recipeTitle={recipe.title}
        servings={servings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: AppleTheme.colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: AppleTheme.colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroWrapper: {
    height: 310,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlayBar: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circleNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...AppleTheme.shadow.card,
  },
  sheetBody: {
    marginTop: -24,
    backgroundColor: AppleTheme.colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  topPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  codePill: {
    backgroundColor: AppleTheme.colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: AppleTheme.radius.pill,
  },
  codePillText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  catPill: {
    backgroundColor: AppleTheme.colors.surface,
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: AppleTheme.radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  catPillText: {
    color: AppleTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontFamily: AppleTheme.fonts.displayBold,
    fontSize: 28,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: 14,
  },
  quickActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  quickActionPillPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: AppleTheme.colors.textPrimary,
    height: 40,
    borderRadius: AppleTheme.radius.pill,
    paddingHorizontal: 8,
  },
  quickActionTextPrimary: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  quickActionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: AppleTheme.colors.surface,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: AppleTheme.radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
    flexShrink: 0,
  },
  quickActionText: {
    color: AppleTheme.colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  quickActionPillDanger: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF2F1',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chefNoteCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.md,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    marginBottom: 24,
    ...AppleTheme.shadow.card,
  },
  chefNoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  chefNoteLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.7,
  },
  chefNoteText: {
    fontSize: 14,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 20,
  },
  pairingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.border,
  },
  pairingText: {
    fontSize: 13,
    color: AppleTheme.colors.textSecondary,
    flex: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  sectionHeaderLeft: {
    flex: 1,
    paddingRight: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.4,
  },
  sectionSub: {
    fontSize: 12.5,
    color: AppleTheme.colors.textTertiary,
    marginTop: 2,
    lineHeight: 16.5,
  },
  scalerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.pill,
    padding: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    flexShrink: 0,
    ...AppleTheme.shadow.card,
  },
  scalerBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: AppleTheme.colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scalerValueBox: {
    minWidth: 34,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scalerValue: {
    fontSize: 14.5,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    lineHeight: 18,
  },
  scalerUnit: {
    fontSize: 10,
    fontWeight: '600',
    color: AppleTheme.colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  ingredientsCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.md,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    gap: 12,
  },
  ingredientBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppleTheme.colors.border,
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  ingredientName: {
    fontSize: 15,
    fontWeight: '500',
    color: AppleTheme.colors.textPrimary,
  },
  ingredientNameChecked: {
    textDecorationLine: 'line-through',
    color: AppleTheme.colors.textTertiary,
  },
  ingredientNotes: {
    fontSize: 12,
    color: AppleTheme.colors.textTertiary,
    marginTop: 2,
  },
  ingredientAmount: {
    fontSize: 14.5,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    flexShrink: 0,
    textAlign: 'right',
  },
  stepsList: {
    gap: 14,
  },
  stepCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.md,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  stepNumberCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AppleTheme.colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  stepTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.3,
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
    fontSize: 11.5,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
  },
  stepInstruction: {
    fontSize: 14.5,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 21,
  },
  stepTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,
    backgroundColor: AppleTheme.colors.background,
    padding: 10,
    borderRadius: AppleTheme.radius.xs,
  },
  stepTipText: {
    flex: 1,
    fontSize: 12.5,
    color: AppleTheme.colors.textSecondary,
  },
  inlineTimerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.border,
  },
  inlineTimerBarActive: {
    borderTopColor: AppleTheme.colors.accentWarm,
  },
  inlineTimerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  inlineTimerClock: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  inlineTimerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerPlayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: AppleTheme.colors.textPrimary,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: AppleTheme.radius.pill,
  },
  timerPauseBtn: {
    backgroundColor: AppleTheme.colors.accentWarm,
  },
  timerPlayBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '600',
  },
  timerResetBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppleTheme.colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomFloatingBar: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  cookingModeBtn: {
    backgroundColor: AppleTheme.colors.textPrimary,
    height: 54,
    borderRadius: AppleTheme.radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    ...AppleTheme.shadow.floating,
  },
  cookingModeBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppleTheme.colors.border,
  },
  editCancelText: {
    fontSize: 15,
    color: AppleTheme.colors.textSecondary,
    fontWeight: '500',
  },
  editModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  editSaveText: {
    fontSize: 15,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
  },
  editScrollContent: {
    padding: 20,
    gap: 10,
    paddingBottom: 60,
  },
  editLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
    marginTop: 6,
  },
  editInput: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.sm,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14.5,
    color: AppleTheme.colors.textPrimary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
    minWidth: 0,
    maxWidth: '100%',
  },
  photoPickerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  photoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 42,
    borderRadius: AppleTheme.radius.sm,
    backgroundColor: AppleTheme.colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
  },
  photoBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  editChip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
  },
  editChipActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
    borderColor: AppleTheme.colors.textPrimary,
  },
  editChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  editBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  addRowMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppleTheme.colors.textPrimary,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
  },
  addRowMiniText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dynamicItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '100%',
    minWidth: 0,
  },
  removeMiniBtn: {
    padding: 4,
  },
  stepEditCard: {
    backgroundColor: AppleTheme.colors.pillBg,
    padding: 12,
    borderRadius: AppleTheme.radius.md,
    gap: 8,
    width: '100%',
    overflow: 'hidden',
  },
  modalSafe: {
    flex: 1,
    backgroundColor: AppleTheme.colors.background,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: Platform.OS === 'ios' ? 12 : 16,
    backgroundColor: AppleTheme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  keepAwakeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: AppleTheme.colors.successSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
  },
  keepAwakeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: AppleTheme.colors.success,
  },
  keepAwakeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A7F2B',
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppleTheme.colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStepsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
    marginBottom: 14,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: AppleTheme.colors.borderStrong,
  },
  progressSegmentActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingTop: 6,
    paddingBottom: 24,
    flexGrow: 1,
  },
  modalStepBody: {
    width: '100%',
  },
  modalStepCounter: {
    fontSize: 12,
    fontWeight: '800',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  modalStepTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 12,
  },
  modalTempPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
    marginBottom: 14,
  },
  modalTempText: {
    fontSize: 13,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
  },
  modalStepInstruction: {
    fontSize: 18,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 27,
    letterSpacing: -0.2,
  },
  modalTipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    padding: 14,
    borderRadius: AppleTheme.radius.md,
    backgroundColor: AppleTheme.colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  modalTipText: {
    flex: 1,
    fontSize: 14,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 20,
  },
  bigTimerCard: {
    marginTop: 22,
    marginBottom: 10,
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  bigTimerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.textTertiary,
    letterSpacing: 0.8,
  },
  bigTimerDigits: {
    fontSize: 44,
    fontWeight: '800',
    color: AppleTheme.colors.textPrimary,
    marginVertical: 8,
    fontVariant: ['tabular-nums'],
  },
  bigTimerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  adjustBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.pillBg,
  },
  adjustBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  bigPlayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AppleTheme.colors.textPrimary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: AppleTheme.radius.pill,
    minWidth: 120,
    justifyContent: 'center',
  },
  bigPauseBtn: {
    backgroundColor: AppleTheme.colors.accentWarm,
  },
  bigPlayText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  modalFooterNav: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    backgroundColor: AppleTheme.colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.border,
  },
  navStepBtn: {
    flex: 1,
    height: 52,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  navStepBtnPrimary: {
    backgroundColor: AppleTheme.colors.textPrimary,
    borderColor: AppleTheme.colors.textPrimary,
  },
  navStepBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  notFoundBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  notFoundText: {
    fontSize: 17,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  backFallbackBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.textPrimary,
  },
  backFallbackText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  /* Modal y Alerta ¡Tiempo! */
  timeUpCardBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(18, 14, 10, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  timeUpOverlayCookingMode: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 14, 10, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
    zIndex: 99999,
  },
  timeUpCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EFE8DF',
    ...AppleTheme.shadow.floating,
  },
  timeUpIconRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FBEDE5',
    borderWidth: 2,
    borderColor: '#F5C8B5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  timeUpKicker: {
    fontSize: 11,
    fontWeight: '800',
    color: '#C08A3E',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  timeUpTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E1915',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  timeUpStepTag: {
    backgroundColor: '#F7F3EE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: AppleTheme.radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E2D6C1',
    marginTop: 8,
    maxWidth: '92%',
  },
  timeUpStepTagText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C4532B',
  },
  timeUpInstruction: {
    fontSize: 13.5,
    color: '#6F645B',
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 6,
    fontStyle: 'italic',
  },
  timeUpTempBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FDF0EA',
    borderWidth: 1,
    borderColor: '#F3C6B4',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.pill,
    marginBottom: 6,
  },
  timeUpTempText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#C84B24',
  },
  timeUpTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FAF5EC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 10,
    width: '100%',
  },
  timeUpTipText: {
    flex: 1,
    fontSize: 12,
    color: '#7D571C',
    fontWeight: '600',
  },
  timeUpActionsCol: {
    width: '100%',
    gap: 9,
    marginTop: 12,
  },
  timeUpBtnPrimary: {
    width: '100%',
    height: 48,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: '#1E1915',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  timeUpBtnPrimaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  timeUpBtnSecondary: {
    width: '100%',
    height: 42,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: '#F7F3EE',
    borderWidth: 1,
    borderColor: '#E2D6C1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  timeUpBtnSecondaryText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E1915',
  },
});
