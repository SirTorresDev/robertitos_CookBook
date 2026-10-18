import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { useCookBookStore } from '@/store/useCookBookStore';
import { FoodiePlace, PlaceCategory } from '@/types/cookbook';
import { AppleTheme, AppleSprings } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import {
  openInGoogleMapsApp,
  openDirectionsInGoogleMaps,
} from '@/core/googleMaps';

const PLACE_CATEGORIES: PlaceCategory[] = [
  'Todos',
  'Restaurante',
  'Mercado',
  'Tienda Gourmet / Molecular',
  'Pescadería / Producto',
  'Pastelería / Café',
];

export default function PlacesScreen() {
  const places = useCookBookStore((s) => s.places);
  const deletePlace = useCookBookStore((s) => s.deletePlace);
  const addPlace = useCookBookStore((s) => s.addPlace);

  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>('Todos');
  const [selectedPlace, setSelectedPlace] = useState<FoodiePlace | null>(
    places[0] || null
  );

  // Formulario rápido para añadir nuevo sitio
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Exclude<PlaceCategory, 'Todos'>>('Restaurante');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Madrid');
  const [mustOrder, setMustOrder] = useState('');
  const [priceLevel, setPriceLevel] = useState<'€' | '€€' | '€€€' | '€€€€'>('€€');
  const [review, setReview] = useState('');

  const handleAddPlace = async () => {
    if (!name.trim()) {
      Alert.alert('Falta el nombre', 'Introduce el nombre del restaurante o tienda.');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Falta la dirección', 'Introduce una calle o dirección para abrir en Google Maps.');
      return;
    }

    AppleHaptics.success();

    const categoryImages: Record<Exclude<PlaceCategory, 'Todos'>, string> = {
      'Restaurante': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
      'Mercado': 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80',
      'Tienda Gourmet / Molecular': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
      'Pescadería / Producto': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
      'Pastelería / Café': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    };

    const newPlace: FoodiePlace = {
      id: `place-${Date.now()}`,
      name: name.trim(),
      category,
      city: city.trim() || 'Madrid',
      address: address.trim(),
      latitude: 40.4168 + (Math.random() - 0.5) * 0.04,
      longitude: -3.7038 + (Math.random() - 0.5) * 0.04,
      rating: 5.0,
      priceLevel,
      mustOrder: mustOrder.trim() || 'Plato estrella de la casa',
      review: review.trim() || 'Recomendado por Roberto Torres para recetas de alta precisión.',
      imageUrl: categoryImages[category] || categoryImages['Restaurante'],
      createdAt: new Date().toISOString(),
    };

    await addPlace(newPlace);
    setSelectedPlace(newPlace);

    setName('');
    setAddress('');
    setMustOrder('');
    setReview('');
    setShowAddForm(false);
  };

  const handleDeletePlace = (place: FoodiePlace) => {
    AppleHaptics.medium();

    const executeDeletion = async () => {
      AppleHaptics.success();
      if (selectedPlace?.id === place.id) {
        const remaining = places.filter((p) => p.id !== place.id);
        setSelectedPlace(remaining[0] || null);
      }
      await deletePlace(place.id);
    };

    if (Platform.OS === 'web') {
      const confirmed =
        typeof window !== 'undefined'
          ? window.confirm(
              `¿Estás seguro de que quieres eliminar "${place.name}" de tus sitios guardados?`
            )
          : true;
      if (confirmed) {
        void executeDeletion();
      }
    } else {
      Alert.alert(
        '¿Eliminar sitio?',
        `¿Estás seguro de que quieres borrar "${place.name}" de tus sitios guardados?`,
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

  const filteredPlaces = useMemo(() => {
    return places.filter((p) =>
      selectedCategory === 'Todos' ? true : p.category === selectedCategory
    );
  }, [places, selectedCategory]);

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
          <View style={styles.headerTopRow}>
            <View style={styles.googleMapsBadge}>
              <Ionicons name="navigate-circle" size={16} color={AppleTheme.colors.googleBlue} />
              <Text style={styles.googleMapsBadgeText}>
                GOOGLE MAPS APP
              </Text>
            </View>

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
                {showAddForm ? 'Cerrar' : 'Añadir Sitio'}
              </Text>
            </ApplePressable>
          </View>

          <Text style={styles.title}>Mis Sitios & Producto</Text>
          <Text style={styles.subtitle}>
            Restaurantes, mercados y proveedores clave para tus ingredientes y utensilios.
          </Text>
        </Animated.View>

        {/* Formulario Desplegable para Añadir Sitio */}
        {showAddForm && (
          <Animated.View
            entering={FadeInDown.duration(320).springify()}
            style={styles.formCard}>
            <View style={styles.formTitleRow}>
              <Ionicons name="location" size={18} color={AppleTheme.colors.googleBlue} />
              <Text style={styles.formTitle}>Guardar Nuevo Sitio o Proveedor</Text>
            </View>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nombre del sitio (ej. Pescaderías Coruñesas, DiverXO...)"
              placeholderTextColor={AppleTheme.colors.textTertiary}
              style={styles.input}
            />

            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Dirección o calle (para abrir en Google Maps)"
              placeholderTextColor={AppleTheme.colors.textTertiary}
              style={styles.input}
            />

            <View style={styles.rowInputs}>
              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder="Ciudad (ej. Madrid)"
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={[styles.input, { flex: 1 }]}
              />

              {/* Selector de Rango de Precio */}
              <View style={styles.priceSelector}>
                {(['€', '€€', '€€€', '€€€€'] as const).map((p) => {
                  const active = priceLevel === p;
                  return (
                    <ApplePressable
                      key={p}
                      scaleTo={0.92}
                      onPress={() => {
                        AppleHaptics.selection();
                        setPriceLevel(p);
                      }}
                      style={[styles.pricePill, active && styles.pricePillActive]}>
                      <Text
                        style={[
                          styles.pricePillText,
                          active && styles.pricePillTextActive,
                        ]}>
                        {p}
                      </Text>
                    </ApplePressable>
                  );
                })}
              </View>
            </View>

            <Text style={styles.miniLabel}>Categoría</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.formChipsRow}>
              {(
                [
                  'Restaurante',
                  'Mercado',
                  'Tienda Gourmet / Molecular',
                  'Pescadería / Producto',
                  'Pastelería / Café',
                ] as const
              ).map((cat) => {
                const active = category === cat;
                return (
                  <ApplePressable
                    key={cat}
                    scaleTo={0.95}
                    onPress={() => {
                      AppleHaptics.selection();
                      setCategory(cat);
                    }}
                    style={[styles.formChip, active && styles.formChipActive]}>
                    <Text
                      style={[
                        styles.formChipText,
                        active && styles.formChipTextActive,
                      ]}>
                      {cat}
                    </Text>
                  </ApplePressable>
                );
              })}
            </ScrollView>

            <TextInput
              value={mustOrder}
              onChangeText={setMustOrder}
              placeholder="¿Qué producto o plato pedir sí o sí? (Imprescindible)"
              placeholderTextColor={AppleTheme.colors.textTertiary}
              style={styles.input}
            />

            <TextInput
              value={review}
              onChangeText={setReview}
              placeholder="Nota personal o por qué te gusta este sitio..."
              placeholderTextColor={AppleTheme.colors.textTertiary}
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={2}
            />

            <ApplePressable
              scaleTo={0.97}
              onPress={handleAddPlace}
              style={styles.submitBtn}>
              <Ionicons name="navigate" size={17} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Guardar Sitio con Google Maps</Text>
            </ApplePressable>
          </Animated.View>
        )}

        {/* Mapa Visual Minimalista + Lanzador Directo a Google Maps App */}
        <Animated.View
          entering={FadeInDown.delay(70).duration(420).springify()}
          style={styles.mapCanvasCard}>
          <View style={styles.mapGridBackground}>
            <View style={[styles.gridRoadH, { top: '32%' }]} />
            <View style={[styles.gridRoadH, { top: '68%' }]} />
            <View style={[styles.gridRoadV, { left: '28%' }]} />
            <View style={[styles.gridRoadV, { left: '66%' }]} />

            {filteredPlaces.map((place, idx) => {
              const isSelected = selectedPlace?.id === place.id;
              const positions = [
                { top: 34, left: 48 },
                { top: 82, left: 195 },
                { top: 112, left: 82 },
                { top: 44, left: 245 },
                { top: 96, left: 145 },
              ];
              const pos = positions[idx % positions.length];

              return (
                <ApplePressable
                  key={place.id}
                  scaleTo={0.9}
                  onPress={() => {
                    AppleHaptics.selection();
                    setSelectedPlace(place);
                  }}
                  style={[
                    styles.mapPin,
                    { top: pos.top, left: pos.left },
                    isSelected && styles.mapPinActive,
                  ]}>
                  <Ionicons
                    name="location"
                    size={14}
                    color={isSelected ? '#FFFFFF' : AppleTheme.colors.googleBlue}
                  />
                  <Text
                    style={[
                      styles.mapPinText,
                      isSelected && { color: '#FFFFFF' },
                    ]}
                    numberOfLines={1}>
                    {place.name.split(' ')[0]}
                  </Text>
                </ApplePressable>
              );
            })}
          </View>

          {selectedPlace && (
            <View style={styles.mapSelectedBanner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.mapSelectedName}>{selectedPlace.name}</Text>
                <Text style={styles.mapSelectedAddr} numberOfLines={1}>
                  {selectedPlace.address}
                </Text>
              </View>

              <ApplePressable
                scaleTo={0.94}
                onPress={() => {
                  AppleHaptics.medium();
                  openInGoogleMapsApp(selectedPlace);
                }}
                style={styles.openGoogleMapsCompactBtn}>
                <Ionicons name="map" size={14} color="#FFFFFF" />
                <Text style={styles.openGoogleMapsCompactText}>Google Maps</Text>
              </ApplePressable>
            </View>
          )}
        </Animated.View>

        {/* Filtros de Categoría */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}>
          {PLACE_CATEGORIES.map((cat) => {
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

        {/* Tarjetas de Sitios con Acciones Google Maps */}
        <View style={styles.list}>
          {filteredPlaces.map((place, idx) => (
            <Animated.View
              key={place.id}
              entering={FadeInDown.delay(Math.min(idx * 50, 240))
                .duration(400)
                .springify()}
              layout={LinearTransition.springify()
                .damping(AppleSprings.smooth.damping!)
                .stiffness(AppleSprings.smooth.stiffness!)}
              style={styles.placeCard}>
              <View style={styles.imageRow}>
                <Image
                  source={{ uri: place.imageUrl }}
                  style={styles.placeImage}
                  contentFit="cover"
                  transition={250}
                />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
                </View>
              </View>

              <View style={styles.placeBody}>
                <View style={styles.placeMetaRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
                    <Text style={styles.placeCategory}>{place.category.toUpperCase()}</Text>
                    <Text style={styles.placePrice}>
                      · {place.priceLevel} · {place.city}
                    </Text>
                  </View>
                </View>

                <Text style={styles.placeTitle}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>

                <View style={styles.mustOrderBox}>
                  <Ionicons
                    name="bookmark"
                    size={14}
                    color={AppleTheme.colors.accentWarm}
                  />
                  <Text style={styles.mustOrderText}>
                    <Text style={{ fontWeight: '700' }}>Imprescindible: </Text>
                    {place.mustOrder}
                  </Text>
                </View>

                <Text style={styles.placeReview}>{place.review}</Text>

                {/* Botones Directos a Google Maps App + Único Botón Accesible de Eliminar */}
                <View style={styles.actionsRow}>
                  <ApplePressable
                    scaleTo={0.96}
                    onPress={() => {
                      AppleHaptics.medium();
                      openInGoogleMapsApp(place);
                    }}
                    style={styles.googleMapsPrimaryBtn}>
                    <Ionicons name="location" size={16} color="#FFFFFF" />
                    <Text style={styles.googleMapsPrimaryText}>
                      Abrir en Maps
                    </Text>
                  </ApplePressable>

                  <ApplePressable
                    scaleTo={0.96}
                    onPress={() => {
                      AppleHaptics.medium();
                      openDirectionsInGoogleMaps(place);
                    }}
                    style={styles.googleMapsSecondaryBtn}>
                    <Ionicons
                      name="navigate"
                      size={15}
                      color={AppleTheme.colors.googleBlue}
                    />
                    <Text style={styles.googleMapsSecondaryText}>Ruta</Text>
                  </ApplePressable>

                  <ApplePressable
                    scaleTo={0.92}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    accessibilityRole="button"
                    accessibilityLabel={`Eliminar ${place.name}`}
                    onPress={() => handleDeletePlace(place)}
                    style={styles.deletePlaceBtn}>
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={AppleTheme.colors.danger}
                    />
                  </ApplePressable>
                </View>
              </View>
            </Animated.View>
          ))}

          {filteredPlaces.length === 0 && (
            <View style={styles.emptyStateBox}>
              <Ionicons
                name="location-outline"
                size={42}
                color={AppleTheme.colors.textTertiary}
              />
              <Text style={styles.emptyStateTitle}>No hay sitios guardados</Text>
              <Text style={styles.emptyStateSub}>
                Añade tus restaurantes, mercados y tiendas gourmet favoritos desde la pestaña Crear.
              </Text>
            </View>
          )}
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
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  googleMapsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: AppleTheme.colors.googleBlueSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: AppleTheme.radius.pill,
  },
  googleMapsBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: AppleTheme.colors.googleBlue,
    letterSpacing: 0.5,
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
  formTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 4,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
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
    alignItems: 'center',
  },
  priceSelector: {
    flexDirection: 'row',
    backgroundColor: AppleTheme.colors.background,
    borderRadius: AppleTheme.radius.pill,
    padding: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    gap: 3,
  },
  pricePill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: AppleTheme.radius.pill,
  },
  pricePillActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
  },
  pricePillText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  pricePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  miniLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
    marginTop: 4,
  },
  formChipsRow: {
    gap: 8,
    paddingVertical: 3,
  },
  formChip: {
    backgroundColor: AppleTheme.colors.background,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: AppleTheme.radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  formChipActive: {
    backgroundColor: AppleTheme.colors.textPrimary,
    borderColor: AppleTheme.colors.textPrimary,
  },
  formChipText: {
    fontSize: 12.5,
    color: AppleTheme.colors.textSecondary,
    fontWeight: '500',
  },
  formChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  textArea: {
    height: 70,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: AppleTheme.colors.googleBlue,
    borderRadius: AppleTheme.radius.pill,
    paddingVertical: 13,
    marginTop: 6,
    ...AppleTheme.shadow.card,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
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
  mapCanvasCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    marginBottom: 8,
    ...AppleTheme.shadow.card,
  },
  mapGridBackground: {
    height: 165,
    backgroundColor: '#EEF2F6',
    position: 'relative',
    overflow: 'hidden',
  },
  gridRoadH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#FFFFFF',
    opacity: 0.75,
  },
  gridRoadV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 10,
    backgroundColor: '#FFFFFF',
    opacity: 0.75,
  },
  mapPin: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
    ...AppleTheme.shadow.card,
  },
  mapPinActive: {
    backgroundColor: AppleTheme.colors.googleBlue,
  },
  mapPinText: {
    fontSize: 12,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    maxWidth: 95,
  },
  mapSelectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppleTheme.colors.surface,
    gap: 12,
  },
  mapSelectedName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  mapSelectedAddr: {
    fontSize: 12,
    color: AppleTheme.colors.textSecondary,
    marginTop: 1,
  },
  openGoogleMapsCompactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppleTheme.colors.googleBlue,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: AppleTheme.radius.pill,
  },
  openGoogleMapsCompactText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  categoriesRow: {
    paddingVertical: 14,
    gap: 8,
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
    color: AppleTheme.colors.textSecondary,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: 16,
  },
  placeCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  imageRow: {
    height: 155,
    width: '100%',
    position: 'relative',
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: AppleTheme.radius.pill,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  placeBody: {
    padding: 18,
  },
  placeMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  placeCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.googleBlue,
    letterSpacing: 0.5,
  },
  placePrice: {
    fontSize: 12,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  placeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.4,
  },
  placeAddress: {
    fontSize: 13,
    color: AppleTheme.colors.textTertiary,
    marginTop: 2,
    marginBottom: 12,
  },
  mustOrderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    padding: 11,
    borderRadius: AppleTheme.radius.sm,
    marginBottom: 10,
  },
  mustOrderText: {
    flex: 1,
    fontSize: 13,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 18,
  },
  placeReview: {
    fontSize: 13.5,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 19,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  googleMapsPrimaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.googleBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  googleMapsPrimaryText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  googleMapsSecondaryBtn: {
    height: 44,
    paddingHorizontal: 15,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.googleBlueSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  googleMapsSecondaryText: {
    color: AppleTheme.colors.googleBlue,
    fontSize: 13,
    fontWeight: '700',
  },
  deletePlaceBtn: {
    width: 44,
    height: 44,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(210, 65, 47, 0.2)',
  },
  emptyStateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    marginTop: 6,
  },
  emptyStateSub: {
    fontSize: 13,
    color: AppleTheme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
