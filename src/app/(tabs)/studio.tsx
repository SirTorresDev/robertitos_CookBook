import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCookBookStore } from '@/store/useCookBookStore';
import {
  Ingredient,
  RecipeCategory,
  RecipeDifficulty,
  RecipeStep,
} from '@/types/cookbook';
import { getFirebaseProjectInfo } from '@/core/firebase';
import { AppleTheme } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import {
  analyzeRecipeFromImage,
  getSavedGeminiApiKey,
  parseRecipeFromRawText,
  pickRecipeImage,
  saveGeminiApiKey,
} from '@/core/recipeScanner';

type CreationMode = 'recipe' | 'tip' | 'place';

const RECIPE_CATEGORIES: Exclude<RecipeCategory, 'Todos'>[] = [
  'Pescados y Mariscos',
  'Carnes y Sous-Vide',
  'Arroces y Cremas',
  'Tapas y Croquetas',
  'Molecular y Espumas',
  'Postres y Dulces',
];

const DIFFICULTIES: RecipeDifficulty[] = ['Fácil', 'Media', 'Alta Cocina'];

export default function StudioScreen() {
  const addRecipe = useCookBookStore((s) => s.addRecipe);
  const addTip = useCookBookStore((s) => s.addTip);
  const addPlace = useCookBookStore((s) => s.addPlace);
  const syncWithFirebase = useCookBookStore((s) => s.syncWithFirebase);
  const resetToFactory = useCookBookStore((s) => s.resetToFactory);

  const [mode, setMode] = useState<CreationMode>('recipe');
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [scanningImage, setScanningImage] = useState(false);
  const [showAiConfig, setShowAiConfig] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [rawTextToScan, setRawTextToScan] = useState('');

  // Campos Completos de Receta Manual / Escaneada
  const [rTitle, setRTitle] = useState('');
  const [rSubtitle, setRSubtitle] = useState('');
  const [rCategory, setRCategory] = useState<Exclude<RecipeCategory, 'Todos'>>(
    'Carnes y Sous-Vide'
  );
  const [rDifficulty, setRDifficulty] = useState<RecipeDifficulty>('Media');
  const [rPrepMinutes, setRPrepMinutes] = useState('35');
  const [rBaseServings, setRBaseServings] = useState('2');
  const [rImageUrl, setRImageUrl] = useState('');
  const [rChefNote, setRChefNote] = useState('');
  const [rPairing, setRPairing] = useState('');
  const [rIngredients, setRIngredients] = useState<Ingredient[]>([
    { id: 'ing-init-1', name: '', amount: 200, unit: 'g' },
  ]);
  const [rSteps, setRSteps] = useState<RecipeStep[]>([
    { stepNumber: 1, title: 'Paso 1', instruction: '', timerSeconds: 300 },
  ]);

  // Campos Tip
  const [tTitle, setTTitle] = useState('');
  const [tSummary, setTSummary] = useState('');
  const [tSecret, setTSecret] = useState('');

  // Campos Sitio (Google Maps)
  const [pName, setPName] = useState('');
  const [pAddress, setPAddress] = useState('');
  const [pCity, setPCity] = useState('Madrid');
  const [pMustOrder, setPMustOrder] = useState('');

  useEffect(() => {
    getSavedGeminiApiKey().then((k) => {
      if (k) setGeminiKey(k);
    });
  }, []);

  const fbInfo = getFirebaseProjectInfo();

  const applyScannedDraftToForm = (draft: Awaited<ReturnType<typeof analyzeRecipeFromImage>>) => {
    setMode('recipe');
    setRTitle(draft.title);
    setRSubtitle(draft.subtitle);
    setRCategory(draft.category);
    setRDifficulty(draft.difficulty);
    setRPrepMinutes(String(draft.prepTimeMinutes));
    setRBaseServings(String(draft.baseServings));
    setRImageUrl(draft.imageUrl);
    setRChefNote(draft.chefNote);
    setRPairing(draft.pairing || '');
    setRIngredients(draft.ingredients);
    setRSteps(draft.steps);
  };

  const handleScanFromCameraOrGallery = async (source: 'camera' | 'gallery') => {
    try {
      AppleHaptics.medium();
      const picked = await pickRecipeImage(source);
      if (!picked) return;

      setScanningImage(true);
      setStatusFeedback('Escaneando fotografía y detectando ingredientes, pasos y timers...');
      const draft = await analyzeRecipeFromImage({
        uri: picked.uri,
        base64: picked.base64,
        mimeType: picked.mimeType,
        rawTextHint: rawTextToScan,
      });

      applyScannedDraftToForm(draft);
      AppleHaptics.success();
      setStatusFeedback(
        draft.usedAiVision
          ? '✨ ¡Receta escaneada y estructurada automáticamente! Revisa los campos abajo y pulsa Guardar.'
          : '📸 Fotografía importada al formulario. Completa o pega el texto de la foto (Live Text) y pulsa Guardar.'
      );
    } catch (err: any) {
      Alert.alert('Escáner de Recetas', err?.message || 'No se pudo procesar la imagen.');
    } finally {
      setScanningImage(false);
    }
  };

  const handleParsePastedText = () => {
    if (!rawTextToScan.trim()) return;
    AppleHaptics.success();
    const draft = parseRecipeFromRawText(rawTextToScan, rImageUrl || undefined);
    applyScannedDraftToForm(draft);
    setRawTextToScan('');
    setStatusFeedback('✨ Texto escaneado convertido en ingredientes y pasos con timers.');
  };

  const handleSaveNewItem = async () => {
    AppleHaptics.success();
    if (mode === 'recipe') {
      if (!rTitle.trim()) {
        Alert.alert('Falta el título', 'Escribe un nombre para la receta.');
        return;
      }
      const validIngredients = rIngredients
        .filter((i) => i.name.trim().length > 0)
        .map((i) => ({ ...i, name: i.name.trim() }));

      const validSteps = rSteps
        .filter((s) => s.instruction.trim().length > 0 || s.title.trim().length > 0)
        .map((s, idx) => ({
          ...s,
          stepNumber: idx + 1,
          title: s.title.trim() || `Paso ${idx + 1}`,
          instruction: s.instruction.trim() || s.title.trim(),
        }));

      await addRecipe({
        id: `rec-${Date.now()}`,
        title: rTitle.trim(),
        subtitle: rSubtitle.trim() || 'Receta de autor añadida a Robertito´s CookBook',
        category: rCategory,
        difficulty: rDifficulty,
        prepTimeMinutes: Number(rPrepMinutes) || 30,
        baseServings: Math.max(1, Number(rBaseServings) || 2),
        imageUrl:
          rImageUrl.trim() ||
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85',
        chefNote: rChefNote.trim() || 'Controlar temperatura y punto de cocción.',
        pairing: rPairing.trim() || undefined,
        isFavorite: true,
        createdAt: new Date().toISOString(),
        ingredients:
          validIngredients.length > 0
            ? validIngredients
            : [{ id: `ing-${Date.now()}`, name: 'Ingrediente principal', amount: 200, unit: 'g' }],
        steps:
          validSteps.length > 0
            ? validSteps
            : [
                {
                  stepNumber: 1,
                  title: 'Ejecución principal',
                  instruction: 'Seguir punto de cocción indicado.',
                  timerSeconds: 300,
                },
              ],
      });

      setRTitle('');
      setRSubtitle('');
      setRImageUrl('');
      setRChefNote('');
      setRPairing('');
      setRIngredients([{ id: `ing-${Date.now()}`, name: '', amount: 200, unit: 'g' }]);
      setRSteps([{ stepNumber: 1, title: 'Paso 1', instruction: '', timerSeconds: 300 }]);
      setStatusFeedback('¡Receta añadida a Robertito´s CookBook! Ya puedes verla en la pestaña Recetas.');
    } else if (mode === 'tip') {
      if (!tTitle.trim()) return;
      await addTip({
        id: `tip-${Date.now()}`,
        code: 'PRO',
        title: tTitle.trim(),
        category: 'Física Culinaria',
        summary: tSummary.trim() || 'Apunte técnico de cocina.',
        keyRules: [tSummary.trim() || 'Aplicar control de temperatura.'],
        proSecret: tSecret.trim() || 'La técnica permite improvisar con criterio.',
        readTimeMinutes: 2,
        createdAt: new Date().toISOString(),
      });
      setTTitle('');
      setTSummary('');
      setTSecret('');
      setStatusFeedback('¡Nueva técnica añadida a tu manual!');
    } else {
      if (!pName.trim()) return;
      await addPlace({
        id: `place-${Date.now()}`,
        name: pName.trim(),
        category: 'Restaurante',
        city: pCity.trim() || 'Madrid',
        address: pAddress.trim() || pCity.trim(),
        latitude: 40.42,
        longitude: -3.69,
        rating: 4.9,
        priceLevel: '€€€',
        mustOrder: pMustOrder.trim() || 'Plato estrella de la casa',
        review: 'Añadido desde mi iPhone para abrir directamente en Google Maps.',
        imageUrl:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
        createdAt: new Date().toISOString(),
      });
      setPName('');
      setPAddress('');
      setPMustOrder('');
      setStatusFeedback('¡Nuevo sitio guardado con enlace a Google Maps!');
    }
  };

  const handleSyncCloud = async () => {
    AppleHaptics.medium();
    const res = await syncWithFirebase();
    setStatusFeedback(res.message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Animated.View
          entering={FadeInDown.duration(400).springify()}
          style={styles.header}>
          <Text style={styles.eyebrow}>ESTUDIO, ESCÁNER ÓPTICO & CLOUD</Text>
          <Text style={styles.title}>Añadir a mi CookBook</Text>
          <Text style={styles.subtitle}>
            Escanea una receta haciendo una foto o créala manualmente paso a paso.
          </Text>
        </Animated.View>

        {/* Tarjeta Destacada: Escanear Receta desde Cámara o Galería */}
        <Animated.View
          entering={FadeInDown.delay(45).duration(400).springify()}
          style={styles.scannerCard}>
          <View style={styles.scannerHeader}>
            <View style={styles.scannerTitleRow}>
              <View style={styles.scannerIconBadge}>
                <Ionicons name="scan" size={18} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.scannerTitle}>Escanear Receta por Fotografía</Text>
                <Text style={styles.scannerSub}>
                  Haz una foto a un libro, nota manuscrita o captura de tu galería
                </Text>
              </View>
            </View>

            <ApplePressable
              onPress={() => setShowAiConfig((v) => !v)}
              style={styles.aiGearBtn}>
              <Ionicons
                name="sparkles-outline"
                size={16}
                color={AppleTheme.colors.textPrimary}
              />
            </ApplePressable>
          </View>

          <View style={styles.scannerBtnsRow}>
            <ApplePressable
              scaleTo={0.96}
              disabled={scanningImage}
              onPress={() => handleScanFromCameraOrGallery('camera')}
              style={styles.scanPrimaryBtn}>
              {scanningImage ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="camera" size={18} color="#FFFFFF" />
              )}
              <Text style={styles.scanPrimaryBtnText}>Hacer Fotografía</Text>
            </ApplePressable>

            <ApplePressable
              scaleTo={0.96}
              disabled={scanningImage}
              onPress={() => handleScanFromCameraOrGallery('gallery')}
              style={styles.scanSecondaryBtn}>
              <Ionicons
                name="images"
                size={18}
                color={AppleTheme.colors.textPrimary}
              />
              <Text style={styles.scanSecondaryBtnText}>De la Galería</Text>
            </ApplePressable>
          </View>

          {showAiConfig && (
            <View style={styles.aiConfigBox}>
              <Text style={styles.aiConfigLabel}>
                Clave Gemini Vision (opcional para OCR IA directo) o pega texto con Live Text de iOS:
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                  value={geminiKey}
                  onChangeText={setGeminiKey}
                  placeholder="Pegar API Key de Google Gemini..."
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  secureTextEntry
                  style={[styles.input, { flex: 1, height: 40 }]}
                />
                <ApplePressable
                  onPress={async () => {
                    await saveGeminiApiKey(geminiKey);
                    AppleHaptics.success();
                    setStatusFeedback('Clave de escáner IA guardada en tu iPhone.');
                    setShowAiConfig(false);
                  }}
                  style={styles.saveKeyMiniBtn}>
                  <Text style={styles.saveKeyMiniText}>Guardar</Text>
                </ApplePressable>
              </View>

              <TextInput
                value={rawTextToScan}
                onChangeText={setRawTextToScan}
                placeholder="O usa 'Escanear texto' del teclado de tu iPhone aquí para auto-detectar ingredientes y timers..."
                placeholderTextColor={AppleTheme.colors.textTertiary}
                multiline
                style={[styles.input, { height: 70, paddingTop: 8, marginTop: 6 }]}
              />
              {rawTextToScan.trim().length > 0 && (
                <ApplePressable
                  onPress={handleParsePastedText}
                  style={styles.parseTextBtn}>
                  <Ionicons name="flash" size={15} color="#FFFFFF" />
                  <Text style={styles.saveKeyMiniText}>
                    Auto-Rellenar Receta desde este Texto
                  </Text>
                </ApplePressable>
              )}
            </View>
          )}
        </Animated.View>

        {statusFeedback && (
          <View style={styles.feedbackBanner}>
            <Text style={styles.feedbackText}>{statusFeedback}</Text>
          </View>
        )}

        {/* Selector de Creación Manual */}
        <View style={styles.segmentedControl}>
          {(
            [
              { key: 'recipe', label: 'Receta Manual' },
              { key: 'tip', label: 'Nueva Técnica' },
              { key: 'place', label: 'Nuevo Sitio' },
            ] as const
          ).map((item) => {
            const active = mode === item.key;
            return (
              <ApplePressable
                key={item.key}
                scaleTo={0.97}
                onPress={() => {
                  AppleHaptics.selection();
                  setMode(item.key);
                }}
                style={[styles.segmentBtn, active && styles.segmentBtnActive]}>
                <Text
                  style={[
                    styles.segmentText,
                    active && styles.segmentTextActive,
                  ]}>
                  {item.label}
                </Text>
              </ApplePressable>
            );
          })}
        </View>

        {/* Formulario Completo */}
        <View style={styles.formCard}>
          {mode === 'recipe' && (
            <>
              <Text style={styles.formSectionTitle}>
                Crear Receta Completa (Manual o Escaneada)
              </Text>

              {rImageUrl ? (
                <View style={styles.previewImgBox}>
                  <Image
                    source={{ uri: rImageUrl }}
                    style={styles.previewImg}
                    contentFit="cover"
                  />
                  <ApplePressable
                    onPress={() => setRImageUrl('')}
                    style={styles.removePreviewBtn}>
                    <Ionicons name="close-circle" size={22} color="#FFFFFF" />
                  </ApplePressable>
                </View>
              ) : null}

              <TextInput
                value={rTitle}
                onChangeText={setRTitle}
                placeholder="Título del plato (ej. Lubina a 56 °C con hinojo)"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
              <TextInput
                value={rSubtitle}
                onChangeText={setRSubtitle}
                placeholder="Subtítulo o técnica principal"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />

              <Text style={styles.miniLabel}>Categoría</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
                {RECIPE_CATEGORIES.map((c) => {
                  const active = rCategory === c;
                  return (
                    <ApplePressable
                      key={c}
                      onPress={() => setRCategory(c)}
                      style={[styles.chip, active && styles.chipActive]}>
                      <Text style={[styles.chipText, active && { color: '#FFF' }]}>
                        {c}
                      </Text>
                    </ApplePressable>
                  );
                })}
              </ScrollView>

              <Text style={styles.miniLabel}>Dificultad</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {DIFFICULTIES.map((d) => {
                  const active = rDifficulty === d;
                  return (
                    <ApplePressable
                      key={d}
                      onPress={() => setRDifficulty(d)}
                      style={[styles.chip, active && styles.chipActive]}>
                      <Text style={[styles.chipText, active && { color: '#FFF' }]}>
                        {d}
                      </Text>
                    </ApplePressable>
                  );
                })}
              </View>

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.miniLabel}>Tiempo total (min)</Text>
                  <TextInput
                    value={rPrepMinutes}
                    onChangeText={setRPrepMinutes}
                    keyboardType="numeric"
                    placeholder="35"
                    style={styles.input}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.miniLabel}>Raciones base (pax)</Text>
                  <TextInput
                    value={rBaseServings}
                    onChangeText={setRBaseServings}
                    keyboardType="numeric"
                    placeholder="2"
                    style={styles.input}
                  />
                </View>
              </View>

              <TextInput
                value={rChefNote}
                onChangeText={setRChefNote}
                placeholder="Clave técnica de Roberto..."
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
              <TextInput
                value={rPairing}
                onChangeText={setRPairing}
                placeholder="Maridaje recomendado (opcional)..."
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />

              {/* Ingredientes Dinámicos */}
              <View style={styles.dynamicHeader}>
                <Text style={styles.miniLabel}>
                  Ingredientes ({rIngredients.length})
                </Text>
                <ApplePressable
                  onPress={() =>
                    setRIngredients((prev) => [
                      ...prev,
                      { id: `ing-${Date.now()}`, name: '', amount: 100, unit: 'g' },
                    ])
                  }
                  style={styles.addSmallBtn}>
                  <Ionicons name="add" size={14} color="#FFFFFF" />
                  <Text style={styles.addSmallBtnText}>Añadir Ingrediente</Text>
                </ApplePressable>
              </View>

              {rIngredients.map((ing, idx) => (
                <View key={ing.id} style={styles.ingRow}>
                  <TextInput
                    value={ing.name}
                    onChangeText={(val) =>
                      setRIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, name: val } : item))
                      )
                    }
                    placeholder="Ingrediente"
                    placeholderTextColor={AppleTheme.colors.textTertiary}
                    style={[styles.input, { flex: 1 }]}
                  />
                  <TextInput
                    value={String(ing.amount)}
                    onChangeText={(val) =>
                      setRIngredients((prev) =>
                        prev.map((item, i) =>
                          i === idx
                            ? { ...item, amount: parseFloat(val.replace(',', '.')) || 0 }
                            : item
                        )
                      )
                    }
                    keyboardType="numeric"
                    placeholder="Cant."
                    style={[styles.input, { width: 68 }]}
                  />
                  <TextInput
                    value={ing.unit}
                    onChangeText={(val) =>
                      setRIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, unit: val } : item))
                      )
                    }
                    placeholder="g/ml/ud"
                    style={[styles.input, { width: 65 }]}
                  />
                  {rIngredients.length > 1 && (
                    <ApplePressable
                      onPress={() =>
                        setRIngredients((prev) => prev.filter((_, i) => i !== idx))
                      }>
                      <Ionicons
                        name="remove-circle"
                        size={20}
                        color={AppleTheme.colors.danger}
                      />
                    </ApplePressable>
                  )}
                </View>
              ))}

              {/* Pasos Dinámicos con Timer y Temperatura */}
              <View style={styles.dynamicHeader}>
                <Text style={styles.miniLabel}>
                  Pasos de Elaboración ({rSteps.length})
                </Text>
                <ApplePressable
                  onPress={() =>
                    setRSteps((prev) => [
                      ...prev,
                      {
                        stepNumber: prev.length + 1,
                        title: `Paso ${prev.length + 1}`,
                        instruction: '',
                        timerSeconds: 300,
                      },
                    ])
                  }
                  style={styles.addSmallBtn}>
                  <Ionicons name="add" size={14} color="#FFFFFF" />
                  <Text style={styles.addSmallBtnText}>Añadir Paso</Text>
                </ApplePressable>
              </View>

              {rSteps.map((st, sIdx) => (
                <View key={sIdx} style={styles.stepBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontWeight: '700', fontSize: 13 }}>#{sIdx + 1}</Text>
                    <TextInput
                      value={st.title}
                      onChangeText={(val) =>
                        setRSteps((prev) =>
                          prev.map((item, i) => (i === sIdx ? { ...item, title: val } : item))
                        )
                      }
                      placeholder="Título del paso"
                      style={[styles.input, { flex: 1 }]}
                    />
                    {rSteps.length > 1 && (
                      <ApplePressable
                        onPress={() =>
                          setRSteps((prev) => prev.filter((_, i) => i !== sIdx))
                        }>
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color={AppleTheme.colors.danger}
                        />
                      </ApplePressable>
                    )}
                  </View>

                  <TextInput
                    value={st.instruction}
                    onChangeText={(val) =>
                      setRSteps((prev) =>
                        prev.map((item, i) =>
                          i === sIdx ? { ...item, instruction: val } : item
                        )
                      )
                    }
                    placeholder="Explicación paso a paso..."
                    placeholderTextColor={AppleTheme.colors.textTertiary}
                    multiline
                    style={[styles.input, styles.textArea]}
                  />

                  <View style={styles.row}>
                    <TextInput
                      value={
                        st.timerSeconds ? String(Math.round(st.timerSeconds / 60)) : ''
                      }
                      onChangeText={(val) => {
                        const mins = parseFloat(val) || 0;
                        setRSteps((prev) =>
                          prev.map((item, i) =>
                            i === sIdx
                              ? {
                                  ...item,
                                  timerSeconds: mins > 0 ? Math.round(mins * 60) : undefined,
                                }
                              : item
                          )
                        );
                      }}
                      keyboardType="numeric"
                      placeholder="Timer (minutos)"
                      placeholderTextColor={AppleTheme.colors.textTertiary}
                      style={[styles.input, { flex: 1 }]}
                    />
                    <TextInput
                      value={st.temperature || ''}
                      onChangeText={(val) =>
                        setRSteps((prev) =>
                          prev.map((item, i) =>
                            i === sIdx ? { ...item, temperature: val || undefined } : item
                          )
                        )
                      }
                      placeholder="Temp (ej. 65 °C)"
                      placeholderTextColor={AppleTheme.colors.textTertiary}
                      style={[styles.input, { flex: 1 }]}
                    />
                  </View>
                </View>
              ))}
            </>
          )}

          {mode === 'tip' && (
            <>
              <Text style={styles.formSectionTitle}>Nuevo Fundamento o Truco</Text>
              <TextInput
                value={tTitle}
                onChangeText={setTTitle}
                placeholder="Título (ej. Emulsión de pil-pil a 62 °C)"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
              <TextInput
                value={tSummary}
                onChangeText={setTSummary}
                placeholder="Explicación técnica o regla principal"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                multiline
                style={[styles.input, styles.textArea]}
              />
              <TextInput
                value={tSecret}
                onChangeText={setTSecret}
                placeholder="El matiz secreto del chef..."
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
            </>
          )}

          {mode === 'place' && (
            <>
              <Text style={styles.formSectionTitle}>
                Nuevo Sitio para abrir en Google Maps
              </Text>
              <TextInput
                value={pName}
                onChangeText={setPName}
                placeholder="Nombre del restaurante, mercado o tienda"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
              <TextInput
                value={pAddress}
                onChangeText={setPAddress}
                placeholder="Dirección o calle (para localizar en Google Maps)"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
              <TextInput
                value={pCity}
                onChangeText={setPCity}
                placeholder="Ciudad (ej. Madrid, San Sebastián...)"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
              <TextInput
                value={pMustOrder}
                onChangeText={setPMustOrder}
                placeholder="¿Qué pedir o comprar sí o sí?"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.input}
              />
            </>
          )}

          <ApplePressable
            scaleTo={0.97}
            onPress={handleSaveNewItem}
            style={styles.submitBtn}>
            <Ionicons name="add-circle" size={19} color="#FFFFFF" />
            <Text style={styles.submitBtnText}>Guardar en Robertito´s CookBook</Text>
          </ApplePressable>
        </View>

        {/* Estado de Firebase Firestore Always-On */}
        <View style={styles.firebaseCard}>
          <View style={styles.firebaseHeader}>
            <View style={styles.firebaseTitleGroup}>
              <Ionicons name="flame" size={20} color={AppleTheme.colors.accentWarm} />
              <Text style={styles.firebaseCardTitle}>Firebase Firestore (Always-On)</Text>
            </View>
            <View
              style={[
                styles.fbBadge,
                fbInfo.configured && { backgroundColor: AppleTheme.colors.successSoft },
              ]}>
              <Text
                style={[
                  styles.fbBadgeText,
                  fbInfo.configured && { color: '#1A7F2B' },
                ]}>
                {fbInfo.configured ? 'Conectado' : 'Local + Cloud Ready'}
              </Text>
            </View>
          </View>

          <Text style={styles.firebaseDesc}>
            Proyecto: <Text style={{ fontWeight: '700' }}>{fbInfo.projectId}</Text>.{' '}
            Firestore nunca se duerme por inactividad y mantiene tus 4 colecciones
            sincronizadas en tiempo real.
          </Text>

          <View style={styles.cloudActionsRow}>
            <ApplePressable
              scaleTo={0.96}
              onPress={handleSyncCloud}
              style={styles.syncBtn}>
              <Ionicons name="cloud-upload-outline" size={16} color="#FFFFFF" />
              <Text style={styles.syncBtnText}>Sincronizar con Firebase</Text>
            </ApplePressable>

            <ApplePressable
              scaleTo={0.96}
              onPress={() => {
                Alert.alert(
                  '¿Restaurar Manual Original?',
                  'Esto restablecerá las recetas originales del Manual Técnico de Roberto Torres.',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                      text: 'Restaurar',
                      style: 'destructive',
                      onPress: async () => {
                        AppleHaptics.medium();
                        await resetToFactory();
                        setStatusFeedback(
                          'Manual Técnico original de Roberto Torres restaurado.'
                        );
                      },
                    },
                  ]
                );
              }}
              style={styles.resetBtn}>
              <Ionicons
                name="refresh-outline"
                size={16}
                color={AppleTheme.colors.textPrimary}
              />
              <Text style={styles.resetBtnText}>Restaurar Manual</Text>
            </ApplePressable>
          </View>
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
    marginBottom: 16,
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
  scannerCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    padding: 18,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  scannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  scannerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  scannerIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: AppleTheme.colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerTitle: {
    fontSize: 16.5,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  scannerSub: {
    fontSize: 12.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 2,
  },
  aiGearBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppleTheme.colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerBtnsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  scanPrimaryBtn: {
    flex: 1,
    height: 46,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.textPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  scanPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  scanSecondaryBtn: {
    flex: 1,
    height: 46,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.pillBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  scanSecondaryBtnText: {
    color: AppleTheme.colors.textPrimary,
    fontSize: 13.5,
    fontWeight: '700',
  },
  aiConfigBox: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.border,
    gap: 6,
  },
  aiConfigLabel: {
    fontSize: 12,
    color: AppleTheme.colors.textSecondary,
    marginBottom: 4,
  },
  saveKeyMiniBtn: {
    backgroundColor: AppleTheme.colors.textPrimary,
    paddingHorizontal: 14,
    borderRadius: AppleTheme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveKeyMiniText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  parseTextBtn: {
    marginTop: 6,
    height: 40,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.accentWarm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  feedbackBanner: {
    marginBottom: 14,
    padding: 12,
    borderRadius: AppleTheme.radius.md,
    backgroundColor: AppleTheme.colors.accentWarmSoft,
  },
  feedbackText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppleTheme.colors.accentWarm,
    lineHeight: 18,
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
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: AppleTheme.colors.surface,
    ...AppleTheme.shadow.card,
  },
  segmentText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  segmentTextActive: {
    color: AppleTheme.colors.textPrimary,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    padding: 18,
    gap: 11,
    marginBottom: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  formSectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    marginBottom: 2,
  },
  previewImgBox: {
    height: 150,
    borderRadius: AppleTheme.radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImg: {
    width: '100%',
    height: '100%',
  },
  removePreviewBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 14,
  },
  miniLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
    marginTop: 4,
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
  input: {
    backgroundColor: AppleTheme.colors.background,
    borderRadius: AppleTheme.radius.sm,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14.5,
    color: AppleTheme.colors.textPrimary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  textArea: {
    height: 82,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  dynamicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AppleTheme.colors.textPrimary,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
  },
  addSmallBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  ingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepBox: {
    backgroundColor: AppleTheme.colors.pillBg,
    padding: 12,
    borderRadius: AppleTheme.radius.md,
    gap: 8,
  },
  submitBtn: {
    marginTop: 8,
    height: 50,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.textPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  firebaseCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  firebaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  firebaseTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  firebaseCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  fbBadge: {
    backgroundColor: AppleTheme.colors.pillBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: AppleTheme.radius.pill,
  },
  fbBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
  },
  firebaseDesc: {
    fontSize: 13.5,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 19,
    marginBottom: 14,
  },
  cloudActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  syncBtn: {
    flex: 1,
    height: 44,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.textPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  syncBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  resetBtn: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.pillBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  resetBtnText: {
    color: AppleTheme.colors.textPrimary,
    fontSize: 12.5,
    fontWeight: '600',
  },
});
