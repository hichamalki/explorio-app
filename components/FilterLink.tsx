import { Text, TouchableOpacity, View, Modal, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { CustomCheckbox } from "./Checkbox/Checkbox";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BottomTabParamList } from "../navigation/BottomTabs";

export const FilterLink = ({ text, icon, options, onSelect, defaultSelected = [] }: any) => {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])


  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    setOpen(false);
    onSelect?.(selected);
  };

  const isRating = text.toLowerCase().includes('note');

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Ionicons name={icon} size={16} color="#205A7B" />
        <Text style={styles.label}>
          {text}
          {selected.length > 0 && <View style={styles.dot} />}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalDropdown}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
              <Ionicons name="close" size={20} color="#205A7B" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{text}</Text>

            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
              {[...options]
                .sort((a, b) => {
                  if (isRating) {
                    return Number(b._id) - Number(a._id); // ✅ tri par nombre d’étoiles
                  }
                  return (b.count ?? 0) - (a.count ?? 0); // ✅ tri par count
                })
                .map((opt: any, idx: number) => {
                  const id = opt._id ?? opt.label;

                  const label = isRating ? (
                    <View style={styles.starsRow}>
                      {[...Array(Number(opt._id))].map((_, i) => (
                        <Ionicons key={i} name="star" size={15} color="#FFCA00" />
                      ))}
                    </View>
                  ) : (
                    <Text>{opt.label ?? opt._id}</Text>
                  );

                  return (
                    <View key={idx} style={styles.optionRow}>
                      <CustomCheckbox
                        label={label}
                        checked={selected.includes(id)}
                        onChange={() => toggleOption(id)}
                      />
                      {opt.count !== undefined && (
                        <Text style={styles.optionCount}>{opt.count}</Text>
                      )}
                    </View>
                  );
                })}
            </ScrollView>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Valider</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelected([])}>
              <Text style={styles.resetText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCA00',
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  label: {
    marginHorizontal: 6,
    fontWeight: 'bold',
    color: '#205A7B',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d65c5c',
    position: 'absolute',
    right: -13,
    top: 6
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalDropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: 260,
    maxHeight: 400,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 1,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#205A7B',
  },
  scrollArea: {
    maxHeight: 250,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionCount: {
    color: '#888',
    fontSize: 13,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#205A7B',
    paddingVertical: 8,
    borderRadius: 6,
  },
  confirmText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resetText: {
    marginTop: 8,
    color: '#205A7B',
    textAlign: 'center',
    fontSize: 14,
  },
  starsRow: {
    flexDirection: 'row',
  },

});