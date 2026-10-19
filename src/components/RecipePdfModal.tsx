import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppleTheme } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';
import {
  RecipePdfData,
  sharePdfData,
  downloadPdfData,
  printPdfData,
} from '@/core/pdfExporter';

interface RecipePdfModalProps {
  visible: boolean;
  onClose: () => void;
  data: RecipePdfData | null;
  recipeTitle: string;
  servings: number;
}

export function RecipePdfModal({
  visible,
  onClose,
  data,
  recipeTitle,
  servings,
}: RecipePdfModalProps) {
  const [sharing, setSharing] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!visible || !data) return null;

  const handleShare = async () => {
    if (sharing) return;
    AppleHaptics.medium();
    setSharing(true);
    try {
      await sharePdfData(data);
    } finally {
      setSharing(false);
    }
  };

  const handleDownload = () => {
    AppleHaptics.success();
    downloadPdfData(data);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    AppleHaptics.light();
    printPdfData(data);
  };

  const handleClose = () => {
    AppleHaptics.light();
    onClose();
  };

  const windowHeight = Dimensions.get('window').height;
  const isSmallScreen = windowHeight < 700;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={[styles.card, isSmallScreen && { maxHeight: '92%' }]}>
          {/* Cabecera */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.pillBadge}>
                <Ionicons name="document-text" size={13} color="#C08A3E" />
                <Text style={styles.pillBadgeText}>FICHA TÉCNICA · A4</Text>
              </View>
              <Text style={styles.title} numberOfLines={1}>
                {recipeTitle}
              </Text>
              <Text style={styles.subtitle}>
                {servings} comensales · Lista para compartir
              </Text>
            </View>

            <ApplePressable
              scaleTo={0.92}
              onPress={handleClose}
              style={styles.closeBtn}>
              <Ionicons
                name="close"
                size={20}
                color={AppleTheme.colors.textPrimary}
              />
            </ApplePressable>
          </View>

          {/* Vista previa visual desplazable */}
          <ScrollView
            style={styles.previewScroll}
            contentContainerStyle={styles.previewScrollContent}
            showsVerticalScrollIndicator={true}>
            {Platform.OS === 'web' && data.html ? (
              <View style={styles.sheetShadowWrap}>
                <iframe
                  srcDoc={data.html}
                  title="Ficha Técnica"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: '#FAF7F0',
                  }}
                />
              </View>
            ) : data.previewImageUrl ? (
              <View style={styles.sheetShadowWrap}>
                <Image
                  source={{ uri: data.previewImageUrl }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.noPreviewBox}>
                <Ionicons name="document-text-outline" size={48} color="#C08A3E" />
                <Text style={styles.noPreviewText}>Ficha Técnica A4 Generada</Text>
              </View>
            )}

            <View style={styles.iosTipBox}>
              <Ionicons name="bulb-outline" size={15} color="#8A6528" />
              <Text style={styles.iosTipText}>
                En iPhone pulsa «Compartir PDF» para enviarlo por WhatsApp o guardarlo en Archivos.
              </Text>
            </View>
          </ScrollView>

          {/* Barra de Acciones Inferior */}
          <View style={styles.actionsBar}>
            {/* Botón Principal: Compartir Nativo (WhatsApp, Archivos, AirDrop) */}
            <ApplePressable
              scaleTo={0.96}
              disabled={sharing}
              onPress={handleShare}
              style={[styles.btnPrimary, sharing && { opacity: 0.8 }]}>
              {sharing ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="share-outline" size={19} color="#FFFFFF" />
              )}
              <Text style={styles.btnPrimaryText}>
                {sharing ? 'Abriendo selector...' : 'Compartir PDF'}
              </Text>
            </ApplePressable>

            {/* Fila de Acciones Secundarias */}
            <View style={styles.secondaryRow}>
              <ApplePressable
                scaleTo={0.96}
                onPress={handleDownload}
                style={styles.btnSecondary}>
                <Ionicons
                  name={downloaded ? 'checkmark-circle' : 'download-outline'}
                  size={17}
                  color={downloaded ? '#3F8F5B' : AppleTheme.colors.textPrimary}
                />
                <Text
                  style={[
                    styles.btnSecondaryText,
                    downloaded && { color: '#3F8F5B' },
                  ]}>
                  {downloaded ? 'Guardado' : 'Descargar Archivo'}
                </Text>
              </ApplePressable>

              {Platform.OS === 'web' ? (
                <ApplePressable
                  scaleTo={0.96}
                  onPress={handlePrint}
                  style={styles.btnSecondaryIcon}>
                  <Ionicons
                    name="print-outline"
                    size={17}
                    color={AppleTheme.colors.textPrimary}
                  />
                  <Text style={styles.btnSecondaryText}>Imprimir</Text>
                </ApplePressable>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 12, 8, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '86%',
    backgroundColor: '#FAF7F0',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DEC8',
    ...AppleTheme.shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8DEC8',
    backgroundColor: '#FAF7F0',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 12,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F5ECDA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  pillBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#9E6A1B',
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: AppleTheme.fonts.display,
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1915',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12.5,
    color: '#7A6E63',
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFE8DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewScroll: {
    flex: 1,
    backgroundColor: '#F0E9DA',
  },
  previewScrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  sheetShadowWrap: {
    width: '100%',
    maxWidth: 420,
    aspectRatio: 210 / 297,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#2B1C0E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  noPreviewBox: {
    width: '100%',
    maxWidth: 380,
    height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  noPreviewText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7A6E63',
  },
  iosTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FBF5E8',
    borderWidth: 1,
    borderColor: '#E6D7B8',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    marginTop: 14,
    maxWidth: 420,
    width: '100%',
  },
  iosTipText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 16,
    color: '#73521E',
  },
  actionsBar: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    backgroundColor: '#FAF7F0',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E8DEC8',
    gap: 10,
  },
  btnPrimary: {
    width: '100%',
    height: 48,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: '#1E1915',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1E1915',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  btnPrimaryText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  secondaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnSecondary: {
    flex: 1,
    height: 42,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: '#F3ECE0',
    borderWidth: 1,
    borderColor: '#DFCBB0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  btnSecondaryIcon: {
    paddingHorizontal: 16,
    height: 42,
    borderRadius: AppleTheme.radius.pill,
    backgroundColor: '#F3ECE0',
    borderWidth: 1,
    borderColor: '#DFCBB0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnSecondaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1915',
  },
});
