import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
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
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>('Todos');
  const [selectedPlace, setSelectedPlace] = useState<FoodiePlace | null>(
    places[0] || null
  );

  const handleDeletePlace = (place: FoodiePlace) => {
    AppleHaptics.medium();
    Alert.alert(
      '¿Eliminar sitio?',
      `¿Estás seguro de que quieres borrar "${place.name}" de tus sitios guardados?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, eliminar',
          style: 'destructive',
          onPress: async () => {
            AppleHaptics.success();
            await deletePlace(place.id);
            if (selectedPlace?.id === place.id) {
              const remaining = places.filter((p) => p.id !== place.id);
              setSelectedPlace(remaining[0] || null);
            }
          },
        },
      ]
    );
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
        showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInDown.duration(400).springify()}
          style={styles.header}>
          <View style={styles.googleMapsBadge}>
            <Ionicons name="navigate-circle" size={16} color={AppleTheme.colors.googleBlue} />
            <Text style={styles.googleMapsBadgeText}>
              CONECTADO CON GOOGLE MAPS APP (iOS)
            </Text>
          </View>
          <Text style={styles.title}>Mis Sitios & Producto</Text>
          <Text style={styles.subtitle}>
            Restaurantes, mercados y proveedores clave para tus ingredientes y utensilios.
          </Text>
        </Animated.View>

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

                  <ApplePressable
                    scaleTo={0.9}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    onPress={() => handleDeletePlace(place)}
                    style={styles.deletePlaceQuickBtn}>
                    <Ionicons
                      name="trash-outline"
                      size={16}
                      color={AppleTheme.colors.textTertiary}
                    />
                  </ApplePressable>
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

                {/* Botones Directos a Google Maps App + Eliminar */}
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
                    onPress={() => handleDeletePlace(place)}
                    style={styles.deletePlaceBtn}>
                    <Ionicons
                      name="trash-outline"
                      size={16}
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
  googleMapsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: AppleTheme.colors.googleBlueSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: AppleTheme.radius.pill,
    marginBottom: 8,
  },
  googleMapsBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: AppleTheme.colors.googleBlue,
    letterSpacing: 0.5,
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
  deletePlaceQuickBtn: {
    padding: 4,
    borderRadius: 8,
  },
  deletePlaceBtn: {
    width: 44,
    height: 44,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(210, 65, 47, 0.15)',
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
