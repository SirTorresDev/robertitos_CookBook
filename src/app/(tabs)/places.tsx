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
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { useCookBookStore } from '@/store/useCookBookStore';
import {
  FoodiePlace,
  PlaceCategory,
  GourmetProduct,
  ProductCategory,
} from '@/types/cookbook';
import { AppleTheme } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import {
  openInGoogleMapsApp,
  openDirectionsInGoogleMaps,
} from '@/core/googleMaps';
import {
  captureProductImage,
  DEFAULT_PRODUCT_IMAGES,
} from '@/core/productImageHelper';

const PLACE_CATEGORIES: PlaceCategory[] = [
  'Todos',
  'Restaurante',
  'Mercado',
  'Tienda Gourmet / Molecular',
  'Pescadería / Producto',
  'Pastelería / Café',
];

const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Todos',
  'Aceites y Vinagres',
  'Especias y Condimentos',
  'Salsas y Pastas',
  'Conservas y Mar',
  'Lácteos y Quesos',
  'Ingredientes Moleculares',
  'Vinos y Licores',
  'Otros',
];

export default function PlacesAndProductsScreen() {
  const places = useCookBookStore((s) => s.places);
  const deletePlace = useCookBookStore((s) => s.deletePlace);
  const addPlace = useCookBookStore((s) => s.addPlace);

  const products = useCookBookStore((s) => s.products);
  const addProduct = useCookBookStore((s) => s.addProduct);
  const updateProduct = useCookBookStore((s) => s.updateProduct);
  const deleteProduct = useCookBookStore((s) => s.deleteProduct);

  // Selector de Pestaña Principal (Toggle tipo Fundamentos / Tabla Roner)
  const [activeTab, setActiveTab] = useState<'places' | 'products'>('places');

  // ==================== ESTADO SITIOS ====================
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<PlaceCategory>('Todos');
  const [selectedPlace, setSelectedPlace] = useState<FoodiePlace | null>(places[0] || null);

  const [showAddPlaceForm, setShowAddPlaceForm] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [placeCategory, setPlaceCategory] = useState<Exclude<PlaceCategory, 'Todos'>>('Restaurante');
  const [placeAddress, setPlaceAddress] = useState('');
  const [placeCity, setPlaceCity] = useState('Madrid');
  const [placeMustOrder, setPlaceMustOrder] = useState('');
  const [placePriceLevel, setPlacePriceLevel] = useState<'€' | '€€' | '€€€' | '€€€€'>('€€');
  const [placeReview, setPlaceReview] = useState('');

  // ==================== ESTADO PRODUCTOS ====================
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory>('Todos');

  // Modal para Añadir / Editar Producto
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodCategory, setProdCategory] = useState<Exclude<ProductCategory, 'Todos'>>('Aceites y Vinagres');
  const [prodPrice, setProdPrice] = useState('');
  const [prodWhereToBuy, setProdWhereToBuy] = useState('');
  const [prodNotes, setProdNotes] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [isCapturingImage, setIsCapturingImage] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [prodNameError, setProdNameError] = useState(false);

  // ==================== HANDLERS SITIOS ====================
  const handleAddPlace = async () => {
    if (!placeName.trim()) {
      Alert.alert('Falta el nombre', 'Introduce el nombre del restaurante o tienda.');
      return;
    }
    if (!placeAddress.trim()) {
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
      name: placeName.trim(),
      category: placeCategory,
      city: placeCity.trim() || 'Madrid',
      address: placeAddress.trim(),
      latitude: 40.4168 + (Math.random() - 0.5) * 0.04,
      longitude: -3.7038 + (Math.random() - 0.5) * 0.04,
      rating: 5.0,
      priceLevel: placePriceLevel,
      mustOrder: placeMustOrder.trim() || 'Plato estrella de la casa',
      review: placeReview.trim() || 'Recomendado por Roberto Torres para recetas de alta precisión.',
      imageUrl: categoryImages[placeCategory] || categoryImages['Restaurante'],
      createdAt: new Date().toISOString(),
    };

    await addPlace(newPlace);
    setSelectedPlace(newPlace);

    setPlaceName('');
    setPlaceAddress('');
    setPlaceMustOrder('');
    setPlaceReview('');
    setShowAddPlaceForm(false);
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

  // ==================== HANDLERS PRODUCTOS ====================
  const handleOpenProductPicker = async (source: 'camera' | 'gallery') => {
    AppleHaptics.selection();
    setIsCapturingImage(true);
    try {
      const imageUri = await captureProductImage(source);
      if (imageUri) {
        AppleHaptics.success();
        // Abrir modal con la foto cargada
        setEditingProductId(null);
        setProdName('');
        setProdBrand('');
        setProdCategory('Aceites y Vinagres');
        setProdPrice('');
        setProdWhereToBuy('');
        setProdNotes('');
        setProdImageUrl(imageUri);
        setProdNameError(false);
        setShowProductModal(true);
      }
    } catch (err: any) {
      Alert.alert('Acceso a Fotos', err?.message || 'No se pudo cargar la imagen seleccionada.');
    } finally {
      setIsCapturingImage(false);
    }
  };

  const handleOpenAddProductModalManual = () => {
    AppleHaptics.selection();
    setEditingProductId(null);
    setProdName('');
    setProdBrand('');
    setProdCategory('Aceites y Vinagres');
    setProdPrice('');
    setProdWhereToBuy('');
    setProdNotes('');
    setProdImageUrl('');
    setProdNameError(false);
    setShowProductModal(true);
  };

  const handleOpenEditProductModal = (prod: GourmetProduct) => {
    AppleHaptics.selection();
    setEditingProductId(prod.id);
    setProdName(prod.name);
    setProdBrand(prod.brand || '');
    setProdCategory(prod.category);
    setProdPrice(prod.price || '');
    setProdWhereToBuy(prod.whereToBuy);
    setProdNotes(prod.notes || '');
    setProdImageUrl(prod.imageUrl);
    setProdNameError(false);
    setShowProductModal(true);
  };

  const handleUpdateImageInModal = async (source: 'camera' | 'gallery') => {
    AppleHaptics.selection();
    setIsCapturingImage(true);
    try {
      const imageUri = await captureProductImage(source);
      if (imageUri) {
        AppleHaptics.success();
        setProdImageUrl(imageUri);
      }
    } catch (err: any) {
      Alert.alert('Acceso a Fotos', err?.message || 'No se pudo cargar la imagen.');
    } finally {
      setIsCapturingImage(false);
    }
  };

  const handleSaveProduct = async () => {
    const trimmedName = prodName.trim();
    if (!trimmedName) {
      setProdNameError(true);
      AppleHaptics.medium();
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.alert('Introduce el nombre del producto para guardarlo.');
      } else {
        Alert.alert('Nombre requerido', 'Por favor introduce el nombre del producto.');
      }
      return;
    }

    setIsSavingProduct(true);
    AppleHaptics.success();
    try {
      const trimmedWhere = prodWhereToBuy.trim() || 'Despensa personal';
      const finalImage =
        prodImageUrl.trim() ||
        DEFAULT_PRODUCT_IMAGES[prodCategory] ||
        DEFAULT_PRODUCT_IMAGES['Otros'];

      if (editingProductId) {
        const existing = products.find((p) => p.id === editingProductId);
        if (existing) {
          const updated: GourmetProduct = {
            ...existing,
            name: trimmedName,
            brand: prodBrand.trim() || undefined,
            category: prodCategory,
            price: prodPrice.trim() || undefined,
            whereToBuy: trimmedWhere,
            notes: prodNotes.trim() || undefined,
            imageUrl: finalImage,
            updatedAt: new Date().toISOString(),
          };
          await updateProduct(updated);
        }
      } else {
        const newProd: GourmetProduct = {
          id: `prod-${Date.now()}`,
          name: trimmedName,
          brand: prodBrand.trim() || undefined,
          category: prodCategory,
          price: prodPrice.trim() || undefined,
          whereToBuy: trimmedWhere,
          notes: prodNotes.trim() || undefined,
          imageUrl: finalImage,
          createdAt: new Date().toISOString(),
        };
        await addProduct(newProd);
      }
      setProdNameError(false);
      setShowProductModal(false);
    } catch (err: any) {
      console.error('[Places] Error al guardar producto:', err);
      const msg = err?.message || 'No se pudo guardar el producto. Inténtalo de nuevo.';
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.alert(`Error al guardar producto: ${msg}`);
      } else {
        Alert.alert('Error al guardar', msg);
      }
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = (prod: GourmetProduct) => {
    AppleHaptics.medium();

    const executeDeletion = async () => {
      AppleHaptics.success();
      await deleteProduct(prod.id);
    };

    if (Platform.OS === 'web') {
      const confirmed =
        typeof window !== 'undefined'
          ? window.confirm(
              `¿Estás seguro de que quieres eliminar "${prod.name}" de tus productos guardados?`
            )
          : true;
      if (confirmed) {
        void executeDeletion();
      }
    } else {
      Alert.alert(
        '¿Eliminar producto?',
        `¿Estás seguro de que quieres borrar "${prod.name}" de tus productos y despensa?`,
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

  // ==================== FILTRADOS ====================
  const filteredPlaces = useMemo(() => {
    return places.filter((p) =>
      selectedPlaceCategory === 'Todos' ? true : p.category === selectedPlaceCategory
    );
  }, [places, selectedPlaceCategory]);

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    return products.filter((prod) => {
      const matchesCategory =
        selectedProductCategory === 'Todos' || prod.category === selectedProductCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        prod.name.toLowerCase().includes(q) ||
        (prod.brand && prod.brand.toLowerCase().includes(q)) ||
        prod.whereToBuy.toLowerCase().includes(q) ||
        (prod.notes && prod.notes.toLowerCase().includes(q))
      );
    });
  }, [products, selectedProductCategory, productSearch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* ========================================================= */}
        {/* SELECTOR DE PESTAÑAS EDITORIAL (SITIOS VS PRODUCTOS)     */}
        {/* ========================================================= */}
        <View style={styles.segmentContainer}>
          <ApplePressable
            scaleTo={0.97}
            onPress={() => {
              AppleHaptics.selection();
              setActiveTab('places');
            }}
            style={[
              styles.segmentBtn,
              activeTab === 'places' && styles.segmentBtnActive,
            ]}>
            <View style={styles.segmentIconWrap}>
              <Ionicons
                name="location-outline"
                size={15}
                color={
                  activeTab === 'places'
                    ? AppleTheme.colors.textPrimary
                    : AppleTheme.colors.textSecondary
                }
              />
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.segmentText,
                activeTab === 'places' && styles.segmentTextActive,
              ]}>
              Sitios
            </Text>
            <View
              style={[
                styles.segmentTag,
                activeTab === 'places' && styles.segmentTagActive,
              ]}>
              <Text
                style={[
                  styles.segmentTagText,
                  activeTab === 'places' && styles.segmentTagTextActive,
                ]}>
                {places.length}
              </Text>
            </View>
          </ApplePressable>

          <ApplePressable
            scaleTo={0.97}
            onPress={() => {
              AppleHaptics.selection();
              setActiveTab('products');
            }}
            style={[
              styles.segmentBtn,
              activeTab === 'products' && styles.segmentBtnActive,
            ]}>
            <View style={styles.segmentIconWrap}>
              <Ionicons
                name="pricetag-outline"
                size={15}
                color={
                  activeTab === 'products'
                    ? AppleTheme.colors.accentWarm
                    : AppleTheme.colors.textSecondary
                }
              />
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.segmentText,
                activeTab === 'products' && styles.segmentTextActive,
              ]}>
              Productos
            </Text>
            <View
              style={[
                styles.segmentTag,
                activeTab === 'products' && styles.segmentTagActive,
              ]}>
              <Text
                style={[
                  styles.segmentTagText,
                  activeTab === 'products' && styles.segmentTagTextActive,
                ]}>
                {products.length}
              </Text>
            </View>
          </ApplePressable>
        </View>

        {/* ========================================================= */}
        {/* VISTA 1: RESTAURANTES Y SITIOS                           */}
        {/* ========================================================= */}
        {activeTab === 'places' && (
          <View>
            <Animated.View
              entering={FadeInDown.duration(400).springify()}
              style={styles.header}>
              <View style={styles.headerTopRow}>
                <View style={styles.googleMapsBadge}>
                  <Ionicons name="navigate-circle" size={16} color={AppleTheme.colors.googleBlue} />
                  <Text style={styles.googleMapsBadgeText}>GOOGLE MAPS</Text>
                </View>

                <ApplePressable
                  scaleTo={0.94}
                  onPress={() => {
                    AppleHaptics.selection();
                    setShowAddPlaceForm((v) => !v);
                  }}
                  style={styles.newBtn}>
                  <Ionicons
                    name={showAddPlaceForm ? 'close' : 'add'}
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text style={styles.newBtnText}>
                    {showAddPlaceForm ? 'Cerrar' : 'Añadir Sitio'}
                  </Text>
                </ApplePressable>
              </View>

              <Text style={styles.title}>Mis Sitios & Proveedores</Text>
              <Text style={styles.subtitle}>
                Restaurantes, mercados y lonjas clave para ingredientes y utensilios de alta cocina.
              </Text>
            </Animated.View>

            {/* Formulario Desplegable para Añadir Sitio */}
            {showAddPlaceForm && (
              <Animated.View
                entering={FadeInDown.duration(320).springify()}
                style={styles.formCard}>
                <View style={styles.formTitleRow}>
                  <Ionicons name="location" size={18} color={AppleTheme.colors.googleBlue} />
                  <Text style={styles.formTitle}>Guardar Nuevo Sitio o Proveedor</Text>
                </View>

                <TextInput
                  value={placeName}
                  onChangeText={setPlaceName}
                  placeholder="Nombre del sitio (ej. Pescaderías Coruñesas, DiverXO...)"
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  style={styles.input}
                />

                <TextInput
                  value={placeAddress}
                  onChangeText={setPlaceAddress}
                  placeholder="Dirección o calle (para abrir en Google Maps)"
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  style={styles.input}
                />

                <View style={styles.rowInputs}>
                  <TextInput
                    value={placeCity}
                    onChangeText={setPlaceCity}
                    placeholder="Ciudad (ej. Madrid)"
                    placeholderTextColor={AppleTheme.colors.textTertiary}
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  />
                  <View style={styles.pricePicker}>
                    {(['€', '€€', '€€€', '€€€€'] as const).map((lvl) => (
                      <ApplePressable
                        key={lvl}
                        scaleTo={0.9}
                        onPress={() => {
                          AppleHaptics.light();
                          setPlacePriceLevel(lvl);
                        }}
                        style={[
                          styles.pricePill,
                          placePriceLevel === lvl && styles.pricePillActive,
                        ]}>
                        <Text
                          style={[
                            styles.pricePillText,
                            placePriceLevel === lvl && styles.pricePillTextActive,
                          ]}>
                          {lvl}
                        </Text>
                      </ApplePressable>
                    ))}
                  </View>
                </View>

                <TextInput
                  value={placeMustOrder}
                  onChangeText={setPlaceMustOrder}
                  placeholder="Qué pedir / Qué comprar aquí (ej. Bogavante vivo, Tataki)"
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  style={styles.input}
                />

                <TextInput
                  value={placeReview}
                  onChangeText={setPlaceReview}
                  placeholder="Nota o motivo por el que lo recomiendas..."
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  multiline
                  numberOfLines={2}
                  style={[styles.input, { minHeight: 60, textAlignVertical: 'top' }]}
                />

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[styles.categoryScroll, { paddingBottom: 6 }]}>
                  {PLACE_CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                    <ApplePressable
                      key={c}
                      scaleTo={0.92}
                      onPress={() => {
                        AppleHaptics.light();
                        setPlaceCategory(c as Exclude<PlaceCategory, 'Todos'>);
                      }}
                      style={[
                        styles.categoryPill,
                        placeCategory === c && styles.categoryPillActive,
                      ]}>
                      <Text
                        style={[
                          styles.categoryPillText,
                          placeCategory === c && styles.categoryPillTextActive,
                        ]}>
                        {c}
                      </Text>
                    </ApplePressable>
                  ))}
                </ScrollView>

                <ApplePressable
                  scaleTo={0.97}
                  onPress={handleAddPlace}
                  style={styles.submitBtn}>
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.submitBtnText}>Guardar Sitio</Text>
                </ApplePressable>
              </Animated.View>
            )}

            {/* Categorías de Sitios */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}>
              {PLACE_CATEGORIES.map((cat) => {
                const isSelected = selectedPlaceCategory === cat;
                return (
                  <ApplePressable
                    key={cat}
                    scaleTo={0.94}
                    onPress={() => {
                      AppleHaptics.selection();
                      setSelectedPlaceCategory(cat);
                    }}
                    style={[
                      styles.categoryPill,
                      isSelected && styles.categoryPillActive,
                    ]}>
                    <Text
                      style={[
                        styles.categoryPillText,
                        isSelected && styles.categoryPillTextActive,
                      ]}>
                      {cat}
                    </Text>
                  </ApplePressable>
                );
              })}
            </ScrollView>

            {/* Lista de Sitios */}
            <View style={styles.placesList}>
              {filteredPlaces.map((place) => (
                <Animated.View
                  key={place.id}
                  layout={LinearTransition.springify()}
                  style={styles.placeCard}>
                  <Image
                    source={{ uri: place.imageUrl }}
                    style={styles.placeImage}
                    contentFit="cover"
                    transition={200}
                  />

                  <View style={styles.placeContent}>
                    <View style={styles.placeHeaderRow}>
                      <View style={styles.placeTitleBox}>
                        <Text style={styles.placeName}>{place.name}</Text>
                        <Text style={styles.placeAddressRow}>
                          <Ionicons name="location-sharp" size={13} color={AppleTheme.colors.accentWarm} />
                          {' '}{place.address}
                        </Text>
                      </View>
                      <View style={styles.priceTag}>
                        <Text style={styles.priceTagText}>{place.priceLevel}</Text>
                      </View>
                    </View>

                    <View style={styles.mustOrderBox}>
                      <Ionicons name="restaurant-outline" size={14} color={AppleTheme.colors.accentWarm} />
                      <Text style={styles.mustOrderText} numberOfLines={2}>
                        <Text style={{ fontWeight: '700' }}>Recomendado: </Text>
                        {place.mustOrder}
                      </Text>
                    </View>

                    {place.review ? (
                      <Text style={styles.placeReview} numberOfLines={3}>
                        «{place.review}»
                      </Text>
                    ) : null}

                    {/* Acciones de Google Maps */}
                    <View style={styles.actionsRow}>
                      <ApplePressable
                        scaleTo={0.96}
                        onPress={() => {
                          AppleHaptics.medium();
                          openInGoogleMapsApp(place);
                        }}
                        style={styles.googleMapsPrimaryBtn}>
                        <Ionicons name="navigate" size={16} color="#FFFFFF" />
                        <Text style={styles.googleMapsPrimaryText}>Ver en Google Maps</Text>
                      </ApplePressable>

                      <ApplePressable
                        scaleTo={0.96}
                        onPress={() => {
                          AppleHaptics.medium();
                          openDirectionsInGoogleMaps(place);
                        }}
                        style={styles.googleMapsSecondaryBtn}>
                        <Ionicons name="map-outline" size={16} color={AppleTheme.colors.googleBlue} />
                        <Text style={styles.googleMapsSecondaryText}>Ruta</Text>
                      </ApplePressable>

                      <ApplePressable
                        scaleTo={0.9}
                        onPress={() => handleDeletePlace(place)}
                        style={styles.deletePlaceBtn}>
                        <Ionicons name="trash-outline" size={16} color={AppleTheme.colors.danger} />
                      </ApplePressable>
                    </View>
                  </View>
                </Animated.View>
              ))}

              {filteredPlaces.length === 0 && (
                <View style={styles.emptyStateBox}>
                  <Ionicons name="location-outline" size={38} color={AppleTheme.colors.textTertiary} />
                  <Text style={styles.emptyStateTitle}>Sin sitios en esta categoría</Text>
                  <Text style={styles.emptyStateSub}>
                    Pulsa «Añadir Sitio» arriba para registrar tus restaurantes o tiendas favoritas.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* ========================================================= */}
        {/* VISTA 2: PRODUCTOS Y MARCAS GOURMET                       */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <View>
            <Animated.View
              entering={FadeInDown.duration(400).springify()}
              style={styles.header}>
              <View style={styles.headerTopRow}>
                <View style={[styles.googleMapsBadge, { backgroundColor: AppleTheme.colors.accentWarmSoft }]}>
                  <Ionicons name="basket-outline" size={15} color={AppleTheme.colors.accentWarm} />
                  <Text style={[styles.googleMapsBadgeText, { color: AppleTheme.colors.accentWarm }]}>
                    DESPENSA & MARCAS
                  </Text>
                </View>

                {/* Botón manual */}
                <ApplePressable
                  scaleTo={0.94}
                  onPress={handleOpenAddProductModalManual}
                  style={[styles.newBtn, { backgroundColor: AppleTheme.colors.textPrimary }]}>
                  <Ionicons name="add" size={16} color="#FFFFFF" />
                  <Text style={styles.newBtnText}>Añadir</Text>
                </ApplePressable>
              </View>

              <Text style={styles.title}>Mis Productos & Marcas</Text>
              <Text style={styles.subtitle}>
                Tus aceites, salsas, especias y marcas favoritas con foto, precio y dónde conseguirlos.
              </Text>

              {/* Botones rápidos de captura con cámara y galería */}
              <View style={styles.quickCaptureRow}>
                <ApplePressable
                  scaleTo={0.96}
                  disabled={isCapturingImage}
                  onPress={() => handleOpenProductPicker('camera')}
                  style={[styles.captureBtn, styles.captureBtnCamera]}>
                  {isCapturingImage ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Ionicons name="camera" size={18} color="#FFFFFF" />
                  )}
                  <View style={styles.captureBtnTextBox}>
                    <Text style={styles.captureBtnTitle}>Añadir con Cámara</Text>
                    <Text style={styles.captureBtnSubtitle}>Foto instantánea al bote o etiqueta</Text>
                  </View>
                </ApplePressable>

                <ApplePressable
                  scaleTo={0.96}
                  disabled={isCapturingImage}
                  onPress={() => handleOpenProductPicker('gallery')}
                  style={[styles.captureBtn, styles.captureBtnGallery]}>
                  <Ionicons name="images" size={18} color={AppleTheme.colors.textPrimary} />
                  <View style={styles.captureBtnTextBox}>
                    <Text style={[styles.captureBtnTitle, { color: AppleTheme.colors.textPrimary }]}>
                      Desde Galería
                    </Text>
                    <Text style={[styles.captureBtnSubtitle, { color: AppleTheme.colors.textSecondary }]}>
                      Elegir foto guardada
                    </Text>
                  </View>
                </ApplePressable>
              </View>
            </Animated.View>

            {/* Buscador de Productos */}
            <View style={styles.searchWrapper}>
              <Ionicons name="search" size={17} color={AppleTheme.colors.textTertiary} />
              <TextInput
                value={productSearch}
                onChangeText={setProductSearch}
                placeholder="Buscar producto, marca o tienda..."
                placeholderTextColor={AppleTheme.colors.textTertiary}
                style={styles.searchInput}
                clearButtonMode="while-editing"
              />
              {productSearch.length > 0 && (
                <ApplePressable
                  scaleTo={0.9}
                  onPress={() => setProductSearch('')}
                  style={styles.clearSearchBtn}>
                  <Ionicons name="close-circle" size={16} color={AppleTheme.colors.textTertiary} />
                </ApplePressable>
              )}
            </View>

            {/* Categorías de Productos */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}>
              {PRODUCT_CATEGORIES.map((cat) => {
                const isSelected = selectedProductCategory === cat;
                const count =
                  cat === 'Todos'
                    ? products.length
                    : products.filter((p) => p.category === cat).length;
                return (
                  <ApplePressable
                    key={cat}
                    scaleTo={0.94}
                    onPress={() => {
                      AppleHaptics.selection();
                      setSelectedProductCategory(cat);
                    }}
                    style={[
                      styles.categoryPill,
                      isSelected && styles.categoryPillActive,
                    ]}>
                    <Text
                      style={[
                        styles.categoryPillText,
                        isSelected && styles.categoryPillTextActive,
                      ]}>
                      {cat}
                    </Text>
                    <View
                      style={[
                        styles.catBadge,
                        isSelected && styles.catBadgeActive,
                      ]}>
                      <Text
                        style={[
                          styles.catBadgeText,
                          isSelected && styles.catBadgeTextActive,
                        ]}>
                        {count}
                      </Text>
                    </View>
                  </ApplePressable>
                );
              })}
            </ScrollView>

            {/* Lista / Grid de Productos Gourmet */}
            <View style={styles.productsGrid}>
              {filteredProducts.map((prod) => (
                <Animated.View
                  key={prod.id}
                  layout={LinearTransition.springify()}
                  style={styles.productCard}>
                  {/* Imagen del producto con badge de precio y categoría */}
                  <View style={styles.productImageWrapper}>
                    <Image
                      source={{ uri: prod.imageUrl }}
                      style={styles.productImage}
                      contentFit="cover"
                      transition={200}
                    />
                    <View style={styles.productBadgeTopRow}>
                      <View style={styles.productCategoryBadge}>
                        <Text style={styles.productCategoryBadgeText}>
                          {prod.category}
                        </Text>
                      </View>
                      {prod.price ? (
                        <View style={styles.productPriceBadge}>
                          <Text style={styles.productPriceBadgeText}>
                            {prod.price}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  {/* Cuerpo del producto */}
                  <View style={styles.productBody}>
                    {prod.brand ? (
                      <Text style={styles.productBrandText} numberOfLines={1}>
                        {prod.brand.toUpperCase()}
                      </Text>
                    ) : null}
                    <Text style={styles.productNameText} numberOfLines={2}>
                      {prod.name}
                    </Text>

                    {/* Dónde conseguirlo */}
                    <View style={styles.whereToBuyBox}>
                      <Ionicons
                        name="storefront-outline"
                        size={14}
                        color={AppleTheme.colors.accentWarm}
                      />
                      <Text style={styles.whereToBuyText} numberOfLines={2}>
                        <Text style={{ fontWeight: '700' }}>Dónde conseguirlo: </Text>
                        {prod.whereToBuy}
                      </Text>
                    </View>

                    {/* Notas / Matiz del chef */}
                    {prod.notes ? (
                      <View style={styles.productNotesBox}>
                        <Ionicons
                          name="sparkles"
                          size={13}
                          color={AppleTheme.colors.gold}
                        />
                        <Text style={styles.productNotesText} numberOfLines={3}>
                          {prod.notes}
                        </Text>
                      </View>
                    ) : null}

                    {/* Acciones de edición y borrado */}
                    <View style={styles.productActionsRow}>
                      <ApplePressable
                        scaleTo={0.94}
                        onPress={() => handleOpenEditProductModal(prod)}
                        style={styles.productEditBtn}>
                        <Ionicons
                          name="create-outline"
                          size={15}
                          color={AppleTheme.colors.textPrimary}
                        />
                        <Text style={styles.productEditBtnText}>Modificar</Text>
                      </ApplePressable>

                      <ApplePressable
                        scaleTo={0.9}
                        onPress={() => handleDeleteProduct(prod)}
                        style={styles.productDeleteBtn}>
                        <Ionicons
                          name="trash-outline"
                          size={15}
                          color={AppleTheme.colors.danger}
                        />
                      </ApplePressable>
                    </View>
                  </View>
                </Animated.View>
              ))}

              {filteredProducts.length === 0 && (
                <View style={styles.emptyStateBox}>
                  <Ionicons name="basket-outline" size={42} color={AppleTheme.colors.textTertiary} />
                  <Text style={styles.emptyStateTitle}>No hay productos guardados</Text>
                  <Text style={styles.emptyStateSub}>
                    Pulsa «Añadir con Cámara» o «Desde Galería» para subir una foto de tu producto favorito y registrar su precio y tienda.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* ========================================================= */}
      {/* MODAL PARA CREAR O EDITAR PRODUCTO GOURMET                */}
      {/* ========================================================= */}
      <Modal
        visible={showProductModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProductModal(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}>
          <View style={styles.modalBackdropTap}>
            <View style={styles.modalCard}>
              {/* Cabecera del modal */}
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>
                    {editingProductId ? 'Modificar Producto' : 'Guardar Producto Gourmet'}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    Se almacena directamente en la base de datos de tu recetario
                  </Text>
                </View>
                <ApplePressable
                  scaleTo={0.9}
                  onPress={() => setShowProductModal(false)}
                  style={styles.modalCloseBtn}>
                  <Ionicons name="close" size={20} color={AppleTheme.colors.textPrimary} />
                </ApplePressable>
              </View>

              <ScrollView
                style={styles.modalScrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalScrollBody}
                keyboardShouldPersistTaps="handled">
                {/* Previsualización y selector de foto */}
                <View style={styles.modalImageSection}>
                  {prodImageUrl ? (
                    <View style={styles.modalImageContainer}>
                      <Image
                        source={{ uri: prodImageUrl }}
                        style={styles.modalPreviewImage}
                        contentFit="cover"
                      />
                    </View>
                  ) : (
                    <View style={styles.modalImagePlaceholder}>
                      <Ionicons name="image-outline" size={36} color={AppleTheme.colors.textTertiary} />
                      <Text style={styles.modalImagePlaceholderText}>
                        Sin foto aún (se usará una por defecto)
                      </Text>
                    </View>
                  )}

                  <View style={styles.modalPhotoButtonsRow}>
                    <ApplePressable
                      scaleTo={0.95}
                      disabled={isCapturingImage}
                      onPress={() => handleUpdateImageInModal('camera')}
                      style={styles.modalPhotoBtn}>
                      <Ionicons name="camera" size={15} color={AppleTheme.colors.textPrimary} />
                      <Text style={styles.modalPhotoBtnText}>
                        {prodImageUrl ? 'Hacer otra foto' : 'Tomar con Cámara'}
                      </Text>
                    </ApplePressable>

                    <ApplePressable
                      scaleTo={0.95}
                      disabled={isCapturingImage}
                      onPress={() => handleUpdateImageInModal('gallery')}
                      style={styles.modalPhotoBtn}>
                      <Ionicons name="images" size={15} color={AppleTheme.colors.textPrimary} />
                      <Text style={styles.modalPhotoBtnText}>
                        Galería
                      </Text>
                    </ApplePressable>
                  </View>
                </View>

                {/* Campos del formulario */}
                <Text style={styles.fieldLabel}>Nombre del Producto *</Text>
                <TextInput
                  value={prodName}
                  onChangeText={(txt) => {
                    setProdName(txt);
                    if (txt.trim()) setProdNameError(false);
                  }}
                  placeholder="ej. Salsa de Soja Tokusen Shoyu, Aceite Picual..."
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  style={[styles.modalInput, prodNameError && styles.modalInputError]}
                />
                {prodNameError ? (
                  <Text style={styles.inputErrorText}>* Introduce el nombre de este producto para guardarlo</Text>
                ) : null}

                <View style={styles.modalTwoColRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fieldLabel}>Marca o Fabricante</Text>
                    <TextInput
                      value={prodBrand}
                      onChangeText={setProdBrand}
                      placeholder="ej. Yamasa, Castillo de Canena..."
                      placeholderTextColor={AppleTheme.colors.textTertiary}
                      style={styles.modalInput}
                    />
                  </View>

                  <View style={{ width: 110 }}>
                    <Text style={styles.fieldLabel}>Precio</Text>
                    <TextInput
                      value={prodPrice}
                      onChangeText={setProdPrice}
                      placeholder="ej. 5,20 €"
                      placeholderTextColor={AppleTheme.colors.textTertiary}
                      style={styles.modalInput}
                    />
                  </View>
                </View>

                {/* Selector de Categoría */}
                <Text style={styles.fieldLabel}>Categoría Culinaria</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.modalCategoryScroll}>
                  {PRODUCT_CATEGORIES.filter((c) => c !== 'Todos').map((c) => {
                    const isSelected = prodCategory === c;
                    return (
                      <ApplePressable
                        key={c}
                        scaleTo={0.94}
                        onPress={() => {
                          AppleHaptics.light();
                          setProdCategory(c as Exclude<ProductCategory, 'Todos'>);
                        }}
                        style={[
                          styles.modalCatPill,
                          isSelected && styles.modalCatPillActive,
                        ]}>
                        <Text
                          style={[
                            styles.modalCatPillText,
                            isSelected && styles.modalCatPillTextActive,
                          ]}>
                          {c}
                        </Text>
                      </ApplePressable>
                    );
                  })}
                </ScrollView>

                <Text style={styles.fieldLabel}>Dónde conseguirlo (Tienda / Mercado / Web)</Text>
                <TextInput
                  value={prodWhereToBuy}
                  onChangeText={setProdWhereToBuy}
                  placeholder="ej. Tokyo Ya, Club del Gourmet El Corte Inglés, Carrefour Bio, Despensa..."
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  style={styles.modalInput}
                />

                <Text style={styles.fieldLabel}>Notas o Por Qué me Gusta (Opcional)</Text>
                <TextInput
                  value={prodNotes}
                  onChangeText={setProdNotes}
                  placeholder="ej. Ideal para el marinado osmótico del tataki de atún rojo..."
                  placeholderTextColor={AppleTheme.colors.textTertiary}
                  multiline
                  numberOfLines={3}
                  style={[styles.modalInput, { minHeight: 70, textAlignVertical: 'top' }]}
                />
              </ScrollView>

              {/* Botón de Guardado y Eliminación */}
              <View style={styles.modalFooter}>
                <ApplePressable
                  scaleTo={0.96}
                  disabled={isSavingProduct}
                  onPress={handleSaveProduct}
                  style={[styles.modalSaveBtn, isSavingProduct && { opacity: 0.7 }]}>
                  {isSavingProduct ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                  )}
                  <Text style={styles.modalSaveBtnText}>
                    {isSavingProduct
                      ? 'Guardando...'
                      : editingProductId
                      ? 'Guardar Cambios'
                      : 'Guardar Producto'}
                  </Text>
                </ApplePressable>

                {editingProductId ? (
                  <ApplePressable
                    scaleTo={0.96}
                    disabled={isSavingProduct}
                    onPress={() => {
                      const prodToDelete = products.find((p) => p.id === editingProductId);
                      if (prodToDelete) {
                        setShowProductModal(false);
                        handleDeleteProduct(prodToDelete);
                      }
                    }}
                    style={styles.modalDeleteBtn}>
                    <Ionicons name="trash-outline" size={16} color={AppleTheme.colors.danger} />
                    <Text style={styles.modalDeleteBtnText}>Eliminar este producto</Text>
                  </ApplePressable>
                ) : null}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    paddingTop: 16,
    paddingBottom: 96,
  },

  // ==================== SEGMENTED TOGGLE ====================
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
    paddingHorizontal: 10,
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
    fontSize: 13,
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

  // ==================== HEADER ====================
  header: {
    marginBottom: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    fontSize: 11,
    fontWeight: '700',
    color: AppleTheme.colors.googleBlue,
    letterSpacing: 0.5,
  },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AppleTheme.colors.accentWarm,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: AppleTheme.radius.pill,
  },
  newBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  title: {
    fontFamily: AppleTheme.fonts.displayBold,
    fontSize: 27,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: AppleTheme.colors.textSecondary,
    marginTop: 4,
    lineHeight: 19,
  },

  // Botones Rápidos Cámara / Galería
  quickCaptureRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  captureBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: AppleTheme.radius.md,
    ...AppleTheme.shadow.card,
  },
  captureBtnCamera: {
    backgroundColor: AppleTheme.colors.accentWarm,
  },
  captureBtnGallery: {
    backgroundColor: AppleTheme.colors.surface,
    borderWidth: 1,
    borderColor: AppleTheme.colors.border,
  },
  captureBtnTextBox: {
    flex: 1,
    minWidth: 0,
  },
  captureBtnTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  captureBtnSubtitle: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 1,
  },

  // ==================== BUSCADOR ====================
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
  clearSearchBtn: {
    padding: 2,
  },

  // ==================== CATEGORÍAS ====================
  categoryScroll: {
    gap: 8,
    paddingBottom: 14,
    alignItems: 'center',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 7,
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
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  catBadge: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 10,
  },
  catBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  catBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
  },
  catBadgeTextActive: {
    color: '#FFFFFF',
  },

  // ==================== LISTA DE SITIOS ====================
  placesList: {
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
  placeImage: {
    width: '100%',
    height: 170,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
  },
  placeContent: {
    padding: 16,
  },
  placeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  placeTitleBox: {
    flex: 1,
  },
  placeName: {
    fontSize: 17,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  placeAddressRow: {
    fontSize: 12.5,
    color: AppleTheme.colors.textSecondary,
    marginTop: 2,
  },
  priceTag: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: AppleTheme.radius.xs,
  },
  priceTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
  },
  mustOrderBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: AppleTheme.colors.accentWarmSoft,
    padding: 8,
    borderRadius: AppleTheme.radius.sm,
    marginTop: 4,
    marginBottom: 8,
  },
  mustOrderText: {
    flex: 1,
    fontSize: 12.5,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 17,
  },
  placeReview: {
    fontSize: 13,
    color: AppleTheme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  googleMapsPrimaryBtn: {
    flex: 1,
    height: 40,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.googleBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  googleMapsPrimaryText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  googleMapsSecondaryBtn: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.googleBlueSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  googleMapsSecondaryText: {
    color: AppleTheme.colors.googleBlue,
    fontSize: 12.5,
    fontWeight: '700',
  },
  deletePlaceBtn: {
    width: 40,
    height: 40,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==================== LISTA DE PRODUCTOS ====================
  productsGrid: {
    gap: 16,
  },
  productCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderRadius: AppleTheme.radius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  productImageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productBadgeTopRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCategoryBadge: {
    backgroundColor: 'rgba(24, 21, 18, 0.78)',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: AppleTheme.radius.pill,
  },
  productCategoryBadgeText: {
    color: '#FAF7F0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  productPriceBadge: {
    backgroundColor: AppleTheme.colors.accentWarm,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: AppleTheme.radius.pill,
    ...AppleTheme.shadow.card,
  },
  productPriceBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  productBody: {
    padding: 16,
  },
  productBrandText: {
    fontSize: 11,
    fontWeight: '800',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  productNameText: {
    fontSize: 17,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  whereToBuyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    padding: 9,
    borderRadius: AppleTheme.radius.sm,
    marginTop: 10,
  },
  whereToBuyText: {
    flex: 1,
    fontSize: 12.5,
    color: AppleTheme.colors.textPrimary,
    lineHeight: 17,
  },
  productNotesBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    backgroundColor: '#FAF5EF',
    padding: 9,
    borderRadius: AppleTheme.radius.sm,
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EFE3D3',
  },
  productNotesText: {
    flex: 1,
    fontSize: 12,
    color: '#654B38',
    lineHeight: 16.5,
    fontStyle: 'italic',
  },
  productActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  productEditBtn: {
    flex: 1,
    height: 38,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: AppleTheme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  productEditBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  productDeleteBtn: {
    width: 38,
    height: 38,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==================== FORMULARIOS Y MODAL ====================
  formCard: {
    backgroundColor: AppleTheme.colors.surface,
    padding: 16,
    borderRadius: AppleTheme.radius.lg,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
    ...AppleTheme.shadow.card,
  },
  formTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  input: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderRadius: AppleTheme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13.5,
    color: AppleTheme.colors.textPrimary,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  pricePicker: {
    flexDirection: 'row',
    gap: 4,
  },
  pricePill: {
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderRadius: AppleTheme.radius.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  pricePillActive: {
    backgroundColor: AppleTheme.colors.googleBlue,
    borderColor: AppleTheme.colors.googleBlue,
  },
  pricePillText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AppleTheme.colors.textSecondary,
  },
  pricePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: AppleTheme.colors.accentWarm,
    paddingVertical: 11,
    borderRadius: AppleTheme.radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },

  // Modal Específico de Producto
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 12, 8, 0.7)',
    justifyContent: 'flex-end',
  },
  modalBackdropTap: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },
  modalCard: {
    backgroundColor: AppleTheme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    height: Platform.OS === 'web' ? '88vh' : undefined,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    ...AppleTheme.shadow.floating,
  },
  modalScrollView: {
    flex: 1,
    flexShrink: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppleTheme.colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 12,
    color: AppleTheme.colors.textSecondary,
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScrollBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  modalImageSection: {
    marginBottom: 16,
  },
  modalImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: AppleTheme.radius.md,
    overflow: 'hidden',
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    marginBottom: 8,
  },
  modalPreviewImage: {
    width: '100%',
    height: '100%',
  },
  modalImagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: AppleTheme.radius.md,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppleTheme.colors.border,
    borderStyle: 'dashed',
    marginBottom: 8,
    gap: 6,
  },
  modalImagePlaceholderText: {
    fontSize: 12,
    color: AppleTheme.colors.textTertiary,
  },
  modalPhotoButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalPhotoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 38,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderRadius: AppleTheme.radius.pill,
    borderWidth: 1,
    borderColor: AppleTheme.colors.border,
  },
  modalPhotoBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: AppleTheme.colors.textSecondary,
    marginBottom: 5,
    marginTop: 8,
    letterSpacing: 0.2,
  },
  modalInput: {
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderRadius: AppleTheme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: AppleTheme.colors.textPrimary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  modalTwoColRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCategoryScroll: {
    gap: 6,
    paddingVertical: 4,
  },
  modalCatPill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.surfaceSubtle,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppleTheme.colors.border,
  },
  modalCatPillActive: {
    backgroundColor: AppleTheme.colors.accentWarm,
    borderColor: AppleTheme.colors.accentWarm,
  },
  modalCatPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppleTheme.colors.textPrimary,
  },
  modalCatPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: AppleTheme.colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppleTheme.colors.border,
    gap: 8,
  },
  modalSaveBtn: {
    height: 46,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.accentWarm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...AppleTheme.shadow.card,
  },
  modalSaveBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  modalDeleteBtn: {
    height: 42,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: AppleTheme.colors.dangerSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  modalDeleteBtnText: {
    color: AppleTheme.colors.danger,
    fontSize: 13.5,
    fontWeight: '700',
  },
  modalInputError: {
    borderColor: AppleTheme.colors.danger,
    borderWidth: 1.5,
  },
  inputErrorText: {
    color: AppleTheme.colors.danger,
    fontSize: 12,
    fontWeight: '600',
    marginTop: -4,
    marginBottom: 8,
    marginLeft: 2,
  },

  // ==================== VACÍO ====================
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
